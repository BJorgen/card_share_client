import React, {Component} from 'react';
import socketIOClient from "socket.io-client";
import Footer from './Common/Footer.jsx';
import Header from './Common/Header.jsx';
import Main from './Main.jsx';
import Notifications from './Common/Notifications.jsx';
const socketEvents = require('./socket/events');
const socketActions = require('./socket/actions');

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://127.0.0.1:8081",
      modalShow: false,
      connection: null,
      user : null,
      attendee : null,
      attendees: null,
      event : {id : 1000001},
      notifications : {},
      messages : {},
      loggedIn : false
    };
    let actions = socketActions(this)
    for(let action in actions){
      this[action]=actions[action].bind(this)
    }
    this.actions = actions;
  }


  sendAlert(msg){
    alert(msg);
  }

  componentDidMount() {
    this.connect();
  }

  connect(){
    const App = this;
    let connection = socketIOClient(this.state.endpoint);
    // Import and assign socket event handlers
    const eventHandlers = socketEvents(App);
    for (var key in eventHandlers) {
      connection.on(key, eventHandlers[key]);
    }
    this.setState({connection : connection});
    // try to fech data from the server, but give a connection 0.5 to be initialized
    setTimeout(App.loadDataIfLoggedIn, 1000);

  }


  render(){
    let modalClose = () => this.setState({ modalShow: false });
    return (
      <div>
        <Header showNotifications={this.showNotifications} notifications={this.state.notifications} socket={this.state.connection} user={this.state.user} logOut={() =>this.logOut()} event={this.state.event}/>
        <div className="footer-fantom"></div>
        {/* <button onClick={() => this.initData() } > Get ALL </button> */}

        <Notifications
          show={this.state.modalShow}
          notifications={this.state.notifications}
          onHide={modalClose}
          deleteNotification={this.actions.deleteNotification}
        />
        <Main loggedIn={this.state.loggedIn} actions={this.actions} categories={this.state.categories}
          subCategories={this.state.subCategories}  profile={this.state.attendee} attendees={this.state.attendees}
          user={this.state.user} event={this.state.event} socket={this.state.connection}/>
        <div className="footer-fantom"></div>
        <Footer/>
      </div>
    );
  }

  getNextNotificationId = function(){
    let next = 1;
    const getNextNotificationId = function(){
      return next++;
    } 
    return getNextNotificationId;
  }()
}

export default App;