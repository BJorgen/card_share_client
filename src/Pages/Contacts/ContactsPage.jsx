import React, {Component} from 'react';
import BusinessCard from '../../Common/BusinessCard.jsx';
import Container from '@material-ui/core/Container';

class ContactsPage extends Component {

  render(){
    const { attendees , categories, subCategories, profile, actions, catMap, subCatMap} = this.props;

    if (!attendees || typeof attendees !== 'object') return null

    // Returns an object with array of connected cards and 
    function filterSharedNetwork(shared){
      const sharedCards = []
      Object.keys(shared).forEach((attendee_key) => {
        if (attendees[attendee_key]) {
          const attendee = attendees[attendee_key]
          const isShared = attendee.connection && attendee.cards && (attendee.cards.from === 'SAVED')
          const card = 
            <BusinessCard
            attendee={attendee}
            key={attendee.id}
            categories={categories}
            subCategories={subCategories}
            profile={profile}
            actions={actions}
            catMap={catMap}
            subCatMap={subCatMap}/>
      
          if(isShared) {sharedCards.push(card)}
        }
      });
      return sharedCards
    }
    filterSharedNetwork(attendees)


    return (
      <div>
        <Container>
          <h4>Saved Contacts</h4>
          
            {filterSharedNetwork(attendees)}

        </Container>

      </div>
    );
  }
}

export default ContactsPage;