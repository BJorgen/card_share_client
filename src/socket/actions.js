module.exports = function(App) {
  const event_id = App.state.event.id;

  return {

    initData(){
      this.getAttendee();
      this.getCategories();
      this.getAttendees();
      this.loadMessages();
    },

    getUser(){
      App.state.connection.emit('get_user','1000001');
    },

    getAttendee(){
      App.state.connection.emit('get_attendee','');
    },
  
    connectWith(user_id){
      App.state.connection.emit('request_connection',user_id);
    },
  
    getCategories(){
      App.state.connection.emit('get_categories','1000001');
    },
  
    getAttendees(){
      App.state.connection.emit('get_attendees',1000001);
    },
  
    loadMessages(){
      App.state.connection.emit('load_messages','');
    },

    requestConnection(attendee_id){
      App.state.connection.emit('request_connection', attendee_id);
    },
    
    acceptConnection(attendee_id){
      App.state.connection.emit('accept_connection',attendee_id);
    },
  
    ignoreConnection(attendee_id){
      App.state.connection.emit('ignore_connection', attendee_id);
    },
  
    sendCard(attendee_id){
      App.state.connection.emit('send_card', attendee_id);
    },
    
    saveCard(attendee_id){
      App.state.connection.emit('save_card', attendee_id);
    },
  
    deleteCard(attendee_id){
      const attendees = App.state.attendees;
      if(attendees[attendee_id]){
        const attendee = attendees[attendee_id];
        delete attendee.email_address
        delete attendee.last_name
        delete attendee.phone_number
        delete attendee.position
        delete attendee.company
        if( ! (attendee.connection && attendee.connection.status === "CONNECTED") ){
          delete attendee.first_name
          delete attendee.photo
        }
      }
      App.setState({attendees});
      App.state.connection.emit('delete_card', attendee_id);
    },
  
    sendMessage(receiver_id, content){
      console.log('sending message', receiver_id, content)
      App.state.connection.emit('send_message', JSON.stringify({receiver_id, content, event_id}));
    },

    logOut(){
      this.state.connection.emit('log_out','');
    },
  
    showNotifications(){
      this.setState({ modalShow: true });
    },


    updateProfile(updatedProfile){
      App.state.connection.emit('update_profile', JSON.stringify(updatedProfile));
    },

    updateInterests(interests){
      App.state.connection.emit('update_interests', JSON.stringify(interests));
    },

    loadDataIfLoggedIn(){
      if(! (App.state.connection && App.state.loggedIn)){
        return;
      }
      if(! App.state.user){
        App.getUser();
      }
      if(! App.state.attendee){
        App.getAttendee();
      }
      if(! (this.state.categories && this.state.subCategories) ){
        App.getCategories();
      }
      if(! App.state.attendees){
        App.getAttendees();
      }
      App.loadMessages();
    },
    // TODO not a socket action
    deleteNotification(id){
      const notifications = App.state.notifications;
      delete notifications[id];
      App.setState({notifications});
    }
  }
}