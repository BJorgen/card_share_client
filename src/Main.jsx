import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import ProfilePage from './Pages/Profile/ProfilePage.jsx';
import NetworkPage from './Pages/Network/NetworkPage.jsx';
import MessagePage from './Pages/Messages/MessagesPage.jsx';
import ContactsPage from './Pages/Contacts/ContactsPage.jsx';
import Home from './Pages/Home/Home.jsx';
import ProfileForm from './Pages/Profile/ProfileForm.jsx';

class Main extends Component {
  render(){
    const { profile, categories, subCategories, actions, attendees, event, socket } = this.props;
    const isProfileSetUp = profile && profile.tagline && (profile.want || profile.have);
    console.log("from main:", profile);

    if(profile && categories && !isProfileSetUp){
      return (
        <Switch>
        <Route path="/" render={(routeProps) => (
          <ProfileForm {...routeProps} profile={profile} categories={categories} subCategories={subCategories} actions={actions}/>
        )}/>
        </Switch>
      )
    } else if(profile && categories){
    return (
      <main style={{ minHeight: '70vh' }}>        
        <Switch>
          <Route path="/profile" render={(routeProps) => (
            <ProfilePage {...routeProps} categories={categories} subCategories={subCategories} profile={profile}/>
          )}/>
          <Route path="/network" render={(routeProps) => (
            <NetworkPage {...routeProps} actions={actions} attendees={attendees}/>
          )}/>
          <Route path="/messages" render={(routeProps) => (
            <MessagePage {...routeProps} categories={categories} subCategories={subCategories} profile={profile}/>
          )}/>
          <Route path="/contacts" render={(routeProps) => (
            <ContactsPage {...routeProps} actions={actions} attendees={attendees}/>
          )}/>

          <Route exact path="/" render={(routeProps) => (
            <NetworkPage {...routeProps} actions={actions} attendees={attendees}/>
          )}/>
        </Switch>
      </main>
    );
  }else if(this.props.loggedIn){
    //TODO return 'loading...' page
    return(
      <Switch>
        <Route path="/" render={(routeProps) => (
          <Home {...routeProps} event={event} socket={socket}/>
        )}/>
      </Switch>
    );
  }else{
     //TODO return event  specific page
    return(
      <Switch>
        <Route path="/" render={(routeProps) => (
              <Home {...routeProps} event={event} socket={socket}/>
            )}/>
      </Switch>
    );
  }
  }
}

export default Main;