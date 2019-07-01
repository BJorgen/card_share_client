import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Categories from './Categories.jsx';
import Profile from './Profile.jsx';
import ProfileForm from './ProfileForm.jsx';

class ProfilePage extends Component {
  render(){
    const { profile, categories, subCategories, actions, catMap, subCatMap} = this.props;

    if (!profile.tagline){
      return (
        <ProfileForm profile={profile} categories={categories} subCategories={subCategories} actions={actions}/>
      );
    } else if(!(profile.wants.length || profile.wants.haves)){
      return (
        <Categories categories={categories} subCategories={subCategories} profile={profile} actions={actions}/>
      );
    } else {
      return (
        <div>
          <h4>Attendee Profile</h4>
  
          <Profile profile={profile} 
          categories={categories} 
          subCategories={subCategories} 
          actions={actions} 
          catMap={catMap} 
          subCatMap={subCatMap}/>
  
          <div>
            <Button href="/editprofile">
              Edit Profile
            </Button>
          </div>
          <div>
            <Button href="/categoryselector">
              Select Topics
            </Button>
          </div>
  
        </div>
      );
    }
  }
}

export default ProfilePage;