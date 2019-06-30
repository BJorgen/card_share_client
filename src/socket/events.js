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
  return {

    user : function(msg){
      // App.sendAlert(msg);
      msg=JSON.parse(msg);
      App.setState({user : msg})
    },

    attendee : function(msg){
      let attendee=JSON.parse(msg);
      if( !attendee.error){
        attendee.wants = !attendee.wants[0] === 'null' ? attendee.wants : [];
        attendee.haves = !attendee.wants[0] === 'null' ? attendee.wants : [];
        App.setState({attendee : attendee})
      }else{
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
      console.log(App.state.attendees)
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
    }
  }
}



// ----------------------------------------------
//              Exports Module
// ----------------------------------------------

module.exports = eventHandlers