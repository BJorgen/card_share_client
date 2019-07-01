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
  const stringOrEmpty = function(string){
    return string || '';
  }

  const getDisplayName = function(obj){
    return stringOrEmpty(obj.first_name) + stringOrEmpty(obj.last_name);
  }

  const getDisplayNameWFrom = function(obj){
    let name = getDisplayName(obj);
    return name ? `from ${name}` : '';
  }

  // add a notification for the state
  // there is an isNotification flag for events which are also sent back to the actor 
  const addNotification = function(type, obj){
    const notifications = App.state.notifications;
    let notification;
    switch(type){
      case 'message_received'  :
        console.log(obj)
        const id = App.getNextNotificationId();
        notification = {
          id : id,
          content : `You have a new message ${getDisplayNameWFrom(App.state.attendees[obj.sender_id])}`,
          type : 'MESSAGE',
          source_id : obj.sender_id}
        notifications[id] = notification;
        break;
      case 'CONNECTION' :
        // if status is connected an other upate will come from the server with basic details
        if( (! obj.isNotification ) || obj.status !== 'SENT'){
          return;
        }
        notification = {
          id : App.getNextNotificationId(),
          content : `You have a new connection request ${getDisplayNameWFrom(obj)}`,
          type : 'CONNECTION', 
          source_id : obj.requester_id
        };
        notifications[notification.id] = notification;
        break;
      case 'CONNECTED' :
        if( obj.isNotification){ 
          notification = {
            id : App.getNextNotificationId(),
            content : `You are now connected with ${getDisplayName(obj)}`,
            type : 'CONNECTION', 
            source_id : obj.responder_id
          };
          notifications[notification.id] = notification;
        }
        break;
      case 'CARD_RECEIVED' :
          notification = {
            id : App.getNextNotificationId(),
            content : `You have received a card from ${obj.first_name} ${obj.last_name}`,
            type : 'CARD', 
            source_id : obj.responder_id
          };
          notifications[notification.id] = notification;
      default :
        break
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

    // load my information on page load
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
    
    // updating information in the profile page
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





    // provide me with a list of the network
    attendees : function(msg){
      // App.sendAlert(msg);
      msg=JSON.parse(msg);
      
      console.log("message from attendees event: ", msg);
      const profile = App.state.attendee
      console.log("profile wants: ", profile.wants)

      Object.keys(msg).map((id) => {
        const hp = msg[id].haves.filter(have => profile.wants.includes(have)).length
        const wp = msg[id].wants.filter(want => profile.haves.includes(want)).length        


        msg[id].metaData = {hp : hp, wp : wp, tp : (hp + wp)}
        console.log(msg[id])
        
      })
      

      
      const sorted = "I am a sorted list :) "
      App.setState({sortedAttendees : sorted})
      App.setState({attendees : msg})
    },





    // a person has joined the nework or has changed their tagline
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

    // a person on the network has updated their interests
    broadcast_interests : function(msg){
      const attendee = JSON.parse(msg);
      const attendees = App.state.attendees;
      if(attendees[attendee.id]){
        attendees[attendee.id].haves = attendee.haves;
        attendees[attendee.id].wants = attendee.wants;
      }
      App.setState({attendees : attendees})
    },

    // I have changed my interests
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

      const subCategoryMap = msg.subCategories.reduce(function(map, obj) {
        map[obj.id] = {name: obj.name, category_id: obj.category_id};
        return map;
      }, {});

      const categoryMap = msg.categories.reduce(function(map, obj) {
        map[obj.id] = {name: obj.name, event_id : obj.event_id};
        return map;
      }, {});

      App.setState({categories: msg.categories, subCategories: msg.subCategories,
        catMap: categoryMap, subCatMap: subCategoryMap});
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
        addNotification('CONNECTION', notification);
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
        addNotification('CONNECTED', {...(attendees[id]), connection_id : notification.id, isNotification : notification.isNotification});
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
        addNotification('CARD_RECEIVED', {...target, card_share_id : notification.id});
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