import React, {Component} from 'react';
import BusinessCard from '../../Common/BusinessCard.jsx';
import BasicCard from '../../Common/Cards/BasicCard.jsx';
import ConnectedCard from '../../Common/Cards/ConnectedCard.jsx';
import SharedCard from '../../Common/Cards/SharedCard.jsx';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Categories from './Categories.jsx';

class ProfilePage extends Component {

  render(){
    console.log("From profile: ", this.props.profile.last_name);
    const profile = this.props.profile;
    const basicProfile = profile;
    const connectedProfile = profile;

    return (
      <div>
        Hello from the ProfilePage!!

        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="Basic">
            <BasicCard profile={profile}/>
            {/* <BusinessCard profile={profile}/> */}
          </Tab>


          <Tab eventKey="profile" title="Connected"> 
            <ConnectedCard profile={profile}/>
            {/* <BusinessCard profile={connectedProfile}/> */}
          </Tab>


          <Tab eventKey="topics" title="Shared">
            <SharedCard profile={profile}/>
            <BusinessCard attendee={profile}/>
          </Tab>
        </Tabs>

        <div>
          <Categories categories={this.props.categories} subCategories={this.props.subCategories} />
        </div>
      </div>
    );
  }
}

export default ProfilePage;