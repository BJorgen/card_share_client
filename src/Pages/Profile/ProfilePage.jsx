import React, {Component} from 'react';
import BusinessCard from '../../Common/BusinessCard.jsx';
import BasicCard from '../../Common/Cards/BasicCard.jsx';
import ConnectedCard from '../../Common/Cards/ConnectedCard.jsx';
import SharedCard from '../../Common/Cards/SharedCard.jsx';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from '@material-ui/core/Button';
import Categories from './Categories.jsx';
import Profile from './Profile.jsx';

class ProfilePage extends Component {

  render(){
    const { profile, categories, subCategories, actions } = this.props;
    return (
      <div>
        <h4>Attendee Profile</h4>

        <Profile profile={profile} categories={categories} subCategories={subCategories} actions={actions}/>

        <div>
          <Button href="/editprofile">
            Edit Profile
          </Button>
        </div>

      </div>
    );
  }
}

export default ProfilePage;