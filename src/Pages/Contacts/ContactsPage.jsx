import React, {Component} from 'react';
import BusinessCard from '../../Common/BusinessCard.jsx';
import CardDeck from 'react-bootstrap/CardDeck'

class ContactsPage extends Component {
  constructor() {
    super();
  }

  render(){
    const { attendees , categories, subCategories, profile, actions, catMap, subCatMap} = this.props;
    console.log("Attendees: ", attendees);

    if (!attendees || typeof attendees !== 'object') return null

    // Returns an object with array of connected cards and 
    function filterSharedNetwork(shared){
      console.log("shared: ", shared);
      const sharedCards = []
      {Object.keys(shared).map((attendee_key) => {
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
      })}
      return sharedCards
    }
    filterSharedNetwork(attendees)


    return (
      <div>
        <h4>Saved Contacts</h4>
        
        <CardDeck>
          {filterSharedNetwork(attendees)}
        </CardDeck>

      </div>
    );
  }
}

export default ContactsPage;