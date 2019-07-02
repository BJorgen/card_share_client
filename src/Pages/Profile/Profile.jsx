import React, {Component} from 'react';
import BusinessCard from '../../Common/BusinessCard.jsx';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

class Profile extends Component {

  render(){
    const { categories, subCategories, profile, actions, catMap, subCatMap} = this.props;
    const {tagline, haves, wants, id, first_name, photo} = profile
    const basicProfile = {tagline, haves, wants, id};
    const connectedProfile = {tagline, haves, wants, id, first_name, photo};

    return (
      <div>

        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="Basic">
            <BusinessCard attendee={basicProfile}
              categories={categories}
              subCategories={subCategories}
              profile={profile}
              actions={actions}
              catMap={catMap}
              subCatMap={subCatMap}/>
              
          </Tab>


          <Tab eventKey="profile" title="Connected"> 
            <BusinessCard attendee={connectedProfile}
              categories={categories}
              subCategories={subCategories}
              profile={profile}
              actions={actions}
              catMap={catMap}
              subCatMap={subCatMap}/>
          </Tab>


          <Tab eventKey="topics" title="Shared">
            <BusinessCard attendee={profile}
              categories={categories}
              subCategories={subCategories}
              profile={profile}
              actions={actions}
              catMap={catMap}
              subCatMap={subCatMap}/>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Profile;
