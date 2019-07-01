import React, {Component} from 'react';
import BusinessCard from '../../Common/BusinessCard.jsx';
// import BasicCard from '../../Common/Cards/BasicCard.jsx';
// import ConnectedCard from '../../Common/Cards/ConnectedCard.jsx';
// import SharedCard from '../../Common/Cards/SharedCard.jsx';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

class Profile extends Component {

  render(){
    const { categories, subCategories, profile, actions, catMap, subCatMap} = this.props;
    const basicProfile = profile;
    const connectedProfile = profile;

    return (
      <div>

        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="Basic">
            {/* <BasicCard profile={profile}/> */}
            <BusinessCard attendee={profile}
              categories={categories}
              subCategories={subCategories}
              profile={basicProfile}
              actions={actions}
              catMap={catMap}
              subCatMap={subCatMap}/>
              
          </Tab>


          <Tab eventKey="profile" title="Connected"> 
            {/* <ConnectedCard profile={profile}/> */}
            <BusinessCard attendee={profile}
              categories={categories}
              subCategories={subCategories}
              profile={connectedProfile}
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