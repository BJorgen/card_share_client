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
        const id = App.getNextNotificationId();
        notification = {
          id : id,
          content : `You have a new message ${getDisplayNameWFrom(App.state.attendees[obj.sender_id])}`,
          source_id : obj.sender_id,
          link : 'messages'
        }
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
          source_id : obj.requester_id,
          link : 'network'
        };
        notifications[notification.id] = notification;
        break;
      case 'CONNECTED' :
        if( obj.isNotification){ 
          notification = {
            id : App.getNextNotificationId(),
            content : `You are now connected with ${getDisplayName(obj)}`,
            source_id : obj.responder_id,
            link : 'network'
          };
          notifications[notification.id] = notification;
        }
        break;
      case 'CARD_RECEIVED' :
          notification = {
            id : App.getNextNotificationId(),
            content : `You have received a card from ${obj.first_name} ${obj.last_name}`,
            source_id : obj.responder_id,
            link : 'network'
          };
          notifications[notification.id] = notification;
          break;
      default :
        break
    }
    App.setState({notifications})
  }

  const addMessage = function(attendee_id, message){
    const messages = App.state.messages;
    const messageObj = messages[attendee_id] ? messages[attendee_id].concat(message) : [message]
    messages[attendee_id] = messageObj;
    App.setState({messages}); 
  }

  function getAttendeePoints(attendee, profile) {
    if(! (profile.haves && profile.wants)){
      return {hp : 0, wp : 0}
    }
    const hp = attendee.haves.filter(have => profile.wants.includes(have)).length;
    const wp = attendee.wants.filter(want => profile.haves.includes(want)).length;
    const points = {hp : hp, wp : wp};
    return points;
  }

  const calcAllTheStuff = function(profile, attendees){
    let pointsAttendees = []
    Object.keys(attendees).map((id) => {
      attendees[id].metaData = getAttendeePoints(attendees[id], profile)
      pointsAttendees.push({...attendees[id].metaData, id : id})      
    })
    return {pointsAttendees, attendees}
  }

  /***************************************************
   *               Event Handlers
   ***************************************************/
  return {

    error_message : function(msg){
    },

    user : function(msg){
      // App.sendAlert(msg);
      msg=JSON.parse(msg);
      App.setState({user : msg})
    },

    // load my information on page load
    attendee : function(msg){
      let attendee=JSON.parse(msg);

      // NEED TO ADD POINTS I hope we do not need it here
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
        App.setState({attendee});
      }else {
        App.sendAlert(msg);
      }
    },

    // provide me with a list of the network
    attendees : function(msg){


      // App.sendAlert(msg);
      msg=JSON.parse(msg);

      const {pointsAttendees} = calcAllTheStuff(App.state.attendee, msg);
      App.setState({pointsAttendees})
      App.setState({attendees : msg})
    },

    // a person has joined the nework or has changed their tagline
    broadcast_attendee : function(msg){
      const attendee = JSON.parse(msg);
      const attendees = App.state.attendees;

      // NEED TO ADD POINTS DONE
      if(attendees[attendee.id]){
        attendees[attendee.id].id = attendee.id;
        attendees[attendee.id].tagline = attendee.tagline;
      }else{
        attendees[attendee.id] = attendee;
        attendees[attendee.id].metaData =  {hp : 0, wp : 0}
      }
      App.setState({attendees : attendees})
    },

    messages_load : function(msg){
      const messages = {};
      JSON.parse(msg).forEach(message => {
        const attendee_id = getOtherAttendeeId(message.sender_id, message.receiver_id, App.state.attendee.id);
        const messageObj = messages[attendee_id] ? messages[attendee_id].concat(message) : [message]
        messages[attendee_id] = messageObj;
      });
      App.setState({messages});
    },

    // a person on the network has updated their interests
    broadcast_interests : function(msg){
      const attendee = JSON.parse(msg);
      const attendees = App.state.attendees;
      const pointsAttendees = App.state.pointsAttendees;
      // NEED TO ADD POINTS DONE
      if(attendees[attendee.id]){
        attendees[attendee.id].haves = attendee.haves.map(num => num.toString());
        attendees[attendee.id].wants = attendee.wants.map(num => num.toString());
        attendees[attendee.id].metaData = getAttendeePoints(attendees[attendee.id], App.state.attendee);
        let found = false;
        pointsAttendees.forEach(pointObj => {
          if(pointObj.id === attendee.id){
            found = true;
            pointObj.hp = attendees[attendee.id].metaData.hp;
            pointObj.wp = attendees[attendee.id].metaData.wp;
          }
        });
        if(! found){
          pointsAttendees.push({id : attendee.id, hp : attendees[attendee.id].metaData.hp, wp : attendees[attendee.id].metaData.wp})
        }
      }
      App.setState({attendees, pointsAttendees})
    },

    // I have changed my interests
    attendee_interests : function(msg){
      msg=JSON.parse(msg);
      const attendee = App.state.attendee;

      // NEED TO ADD POINTS DONE
      attendee.haves = msg.haves;
      attendee.wants = msg.wants;
      const {pointsAttendees, attendees} = calcAllTheStuff(attendee, App.state.attendees);
      App.setState({attendee, pointsAttendees, attendees});
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