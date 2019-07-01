import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import ProfilePage from './Pages/Profile/ProfilePage.jsx';
import NetworkPage from './Pages/Network/NetworkPage.jsx';
import MessagePage from './Pages/Messages/MessagesPage.jsx';
import ContactsPage from './Pages/Contacts/ContactsPage.jsx';
import Home from './Pages/Home/Home.jsx';
import ProfileForm from './Pages/Profile/ProfileForm.jsx';
import Categories from './Pages/Profile/Categories.jsx';
import Loading from './Common/Loading.jsx'

class Main extends Component {
  render(){
    const { profile, categories, subCategories, actions, attendees, event, socket, catMap, subCatMap, sortedAttendees} = this.props;
    let isProfileSetUp = profile && profile.tagline && ((profile.wants && profile.wants.length) || (profile.haves && profile.haves.length));

    if(profile && categories && !isProfileSetUp){
      return (
        <Switch>
        <Route path="/" render={(routeProps) => (
          <ProfilePage {...routeProps} profile={profile} categories={categories} subCategories={subCategories} actions={actions} attendees={attendees} catMap={catMap} subCatMap={subCatMap} />
        )}/>
        </Switch>
      )
    } else if(profile && categories && catMap && subCatMap){     

    return (
      <main style={{ minHeight: '70vh' }}>  
        <Switch>
          <Route path="/profile" render={(routeProps) => (
            <ProfilePage {...routeProps} profile={profile} categories={categories} subCategories={subCategories} actions={actions} attendees={attendees} catMap={catMap}
            subCatMap={subCatMap} />
          )}/>
          <Route path="/network" render={(routeProps) => (
            <NetworkPage {...routeProps} profile={profile} categories={categories} subCategories={subCategories} actions={actions} attendees={attendees} catMap={catMap}
            subCatMap={subCatMap} sortedAttendees={sortedAttendees}/>
          )}/>
          <Route path="/messages" render={(routeProps) => (
            <MessagePage {...routeProps} categories={categories} subCategories={subCategories} profile={profile} catMap={catMap}
            subCatMap={subCatMap} />
          )}/>
          <Route path="/contacts" render={(routeProps) => (
            <ContactsPage {...routeProps} actions={actions} attendees={attendees} catMap={catMap}
            subCatMap={subCatMap} />
          )}/>
          <Route path="/editprofile" render={(routeProps) => (
            <ProfileForm {...routeProps} profile={profile} categories={categories} subCategories={subCategories} actions={actions} catMap={catMap}
            subCatMap={subCatMap} />
          )}/>
          <Route path="/categoryselector" render={(routeProps) => (
            <Categories {...routeProps} profile={profile} categories={categories} subCategories={subCategories} actions={actions} catMap={catMap}
            subCatMap={subCatMap} />
          )}/>

          <Route exact path="/" render={(routeProps) => (
            <NetworkPage {...routeProps} profile={profile} categories={categories} subCategories={subCategories} actions={actions} attendees={attendees} catMap={catMap}
            subCatMap={subCatMap} />
          )}/>
        </Switch>
      </main>
    );
  }else if(this.props.loggedIn){
    //TODO return 'loading...' page
    return(
      <Switch>
        <Route path="/" render={(routeProps) => (
          <Loading {...routeProps}/>
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