import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import ProfilePage from './Pages/Profile/ProfilePage.jsx';
import NetworkPage from './Pages/Network/NetworkPage.jsx';
import MessagePage from './Pages/Messages/MessagesPage.jsx';
import ContactsPage from './Pages/Contacts/ContactsPage.jsx';
import Home         from './Pages/Home/Home.jsx'

class Main extends Component {
  render(){
    if(this.props.profile && this.props.categories){
    return (
      <main style={{ minHeight: '70vh' }}>        
        <Switch>
          <Route path="/profile" render={(routeProps) => (
            <ProfilePage {...routeProps} categories={this.props.categories} subCategories={this.props.subCategories} profile={this.props.profile}/>
          )}/>
          <Route path="/network" render={(routeProps) => (
            <NetworkPage {...routeProps} actions={this.props.actions} attendees={this.props.attendees}/>
          )}/>
          <Route path="/messages" render={(routeProps) => (
            <MessagePage {...routeProps} categories={this.props.categories} subCategories={this.props.subCategories} profile={this.props.profile}/>
          )}/>
          <Route path="/contacts" render={(routeProps) => (
            <ContactsPage {...routeProps} actions={this.props.actions} attendees={this.props.attendees}/>
          )}/>

          <Route exact path="/" render={(routeProps) => (
            <NetworkPage {...routeProps} actions={this.props.actions} attendees={this.props.attendees}/>
          )}/>
        </Switch>
      </main>
    );
  }else if(this.props.loggedIn){
    //TODO return 'loading...' page
    return(
      <Switch>
        <Route path="/" render={(routeProps) => (
          <Home {...routeProps} event={this.props.event} socket={this.props.socket}/>
        )}/>
      </Switch>
    );
  }else{
     //TODO return event  specific page
    return(
      <Switch>
        <Route path="/" render={(routeProps) => (
              <Home {...routeProps} event={this.props.event} socket={this.props.socket}/>
            )}/>
      </Switch>
    );
  }
  }
}

export default Main;