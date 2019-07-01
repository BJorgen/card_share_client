import React, {Component} from 'react';
import BusinessCard from '../../Common/BusinessCard.jsx';
import CardDeck from 'react-bootstrap/CardDeck'

class NetworkPage extends Component {

  render(){
    const { attendees , categories, subCategories, profile, actions, catMap, subCatMap, sortedAttendees} = this.props;

    if (!attendees || typeof attendees !== 'object' || !sortedAttendees) return null

    console.log(sortedAttendees);


    return (
      <div>
        <h4>Event Network</h4>
        <CardDeck>

          {Object.keys(attendees).map((attendee_key) => (
            <BusinessCard
            id={`network_${attendees[attendee_key].id}`}
            attendee={attendees[attendee_key]}
            key={ attendees[attendee_key].id }
            categories={categories}
            subCategories={subCategories}
            profile={profile}
            actions={actions}
            catMap={catMap}
            subCatMap={subCatMap}/>
          ))}

        </CardDeck>
      </div>
    );
  }
}

export default NetworkPage;


// {this.props.attendees.map((attendee) =>
//   <BusinessCard
//     attendee={attendee}
//     key={ attendee.id }/>
// )}