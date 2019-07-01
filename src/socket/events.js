/*********************
 * Helper Function   *
 ********************/

const getOtherAttendeeId = function(incomeingId1, incomeingId2, id){
  if(id === incomeingId1){
    return incomeingId2
  }
  return incomeingId1;
}



function eventHandlers(App) {

  const addNotification = function(type, obj){
    const notifications = App.state.notifications;
    switch(type){
      case 'message_received'  :
        const id = App.getNextNotificationId();
        const notification = {id : id, content : `You got a new message from ${obj.sender_id}`, type : 'message_received', sourcded : obj.sender_id}
        notifications[id] = notification;
        break;
    }
    App.setState({notifications})
  }

  const addMessage = function(attendee_id, message){
    const messages = App.state.messages;
    messages[attendee_id] = messages[attendee_id] ? messages[attendee_id].concat(message) : [message];
    App.setState({messages}); 
  } 

  /***************************************************
   *               Event Handlers
   ***************************************************/
  return {

    error_message : function(msg){
      console.log('ERROR', msg);
    },

    user : function(msg){
      // App.sendAlert(msg);
      msg=JSON.parse(msg);
      App.setState({user : msg})
    },

    attendee : function(msg){
      let attendee=JSON.parse(msg);
      if( !attendee.error){
        attendee.wants = !(attendee.wants[0] === 'null') ? attendee.wants : [];
        attendee.haves = !(attendee.haves[0] === 'null') ? attendee.haves : [];
        App.setState({attendee : attendee});
      }else {
        App.sendAlert(msg);
      }
    },
    
    update_attendee : function(msg){
      let attendee=JSON.parse(msg);
      if( !attendee.error){
        attendee.wants = App.state.attendee.wants;
        attendee.haves = App.state.attendee.haves;
        App.setState({attendee : attendee});
      }else {
        App.sendAlert(msg);
      }
    },

    attendees : function(msg){
      // App.sendAlert(msg);
      msg=JSON.parse(msg);
      App.setState({attendees : msg})
    },

    broadcast_attendee : function(msg){
      const attendee = JSON.parse(msg);
      const attendees = App.state.attendees;
      if(attendees[attendee.id]){
        attendees[attendee.id].id = attendee.id;
        attendees[attendee.id].tagline = attendee.tagline;
      }else{
        attendees[attendee.id] = attendee;
      }
      App.setState({attendees : attendees})
    },

    broadcast_interests : function(msg){
      const attendee = JSON.parse(msg);
      const attendees = App.state.attendees;
      if(attendees[attendee.id]){
        attendees[attendee.id].haves = attendee.haves;
        attendees[attendee.id].wants = attendee.wants;
      }
      App.setState({attendees : attendees})
    },

    attendee_interests : function(msg){
      msg=JSON.parse(msg);
      const attendee = App.state.attendee;
      attendee.haves = msg.haves;
      attendee.wants = msg.wants;
      App.setState({attendee : attendee})
      window.location.pathname = '/network'
    },

    categories : function(msg){
      // App.sendAlert(msg);
      msg=JSON.parse(msg);
      App.setState({categories: msg.categories, subCategories: msg.subCategories});
    },

    connection_change : function(msg){
      const notification = JSON.parse(msg);
      if(notification.error){
        alert(msg);
        return;
      }
      const {requester_id, responder_id, status} = notification
      const otherAttendeeId = getOtherAttendeeId(requester_id, responder_id, App.state.attendee.id)
      const attendees = App.state.attendees;
      if(attendees[otherAttendeeId]){
        attendees[otherAttendeeId].connection = {sender : requester_id, status : status};
      }
      App.setState({attendees});
    },

    update_to_connected : function(msg){
      const notification = JSON.parse(msg);
      const {id, photo, first_name} = notification
      const attendees = App.state.attendees;
      if(attendees[id]){
        attendees[id].photo = photo;
        attendees[id].first_name = first_name;
      }
      App.setState({attendees});
    },

    update_to_card_shared : function(msg){
      const notification = JSON.parse(msg);
      const {id, photo, first_name, last_name, email_address, phone_number, position, company} = notification;
      const attendees = App.state.attendees;
      if(attendees[id]){
        const target = attendees[id];
        target.first_name = first_name;
        target.last_name = last_name;
        target.photo = photo;
        target.email_address = email_address;
        target.phone_number = phone_number;
        target.position = position;
        target.company = company;
        target['linkedin-link'] = notification['linkedin-link'];
      }
      App.setState({attendees});
    },

    cardshare_change : function(msg){
      const notification = JSON.parse(msg);
      if(notification.error){
        alert(msg);
        return;
      }
      const attendees = App.state.attendees;
      const {sender_id, receiver_id, status} = notification
      if(App.state.attendee.id === sender_id){
        if(attendees[receiver_id]){
          let cards = attendees[receiver_id].cards ? attendees[receiver_id].cards : {};
          cards.to = 'SENT';
          attendees[receiver_id].cards = cards;
        }
      }else{
        if(attendees[sender_id]){
          let cards = attendees[sender_id].cards ? attendees[sender_id].cards : {};
          cards.from= status;
          attendees[sender_id].cards = cards;
        }
      }
      App.setState({attendees});
    },

    profile : function(msg){
      App.setState({profile : JSON.parse(msg)});
    },

    is_authorized : function(msg){
      App.setState({loggedIn : msg});
    },

    do : function(action){
      if(action === 'RECONNECT'){
        App.state.connection.disconnect();
        App.connect();
      }
    },

    message_sent : function(msg){
      const message = JSON.parse(msg);
      addMessage(message.receiver_id, message);
    },

    message_incoming : function(msg){
      const message = JSON.parse(msg);
      addNotification('message_received', message)
      addMessage(message.sender_id, message);
    }
  }
}



// ----------------------------------------------
//              Exports Module
// ----------------------------------------------

module.exports = eventHandlers