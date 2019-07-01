import React, {Component} from 'react';
import BusinessCard from '../../Common/BusinessCard.jsx';
import CardDeck from 'react-bootstrap/CardDeck'

class NetworkPage extends Component {

  render(){
    const { attendees , categories, subCategories, profile, actions, catMap, subCatMap, pointsAttendees} = this.props;

    if (!attendees || typeof attendees !== 'object' || !pointsAttendees) return null

    console.log("from the network, points ", pointsAttendees);

    let sorted = {}
    sorted.hp = pointsAttendees.sort((a, b) => (b.hp - a.hp))
    sorted.wp = pointsAttendees.sort((a, b) => (b.wp - a.wp))
    sorted.tp = pointsAttendees.sort((a, b) => ((b.hp + b.wp) - (a.hp + a.wp)))


    return (
      <div>
        <h4>Event Network</h4>
        <CardDeck>

          {Object.keys(attendees).map((attendee_key) => (
            <BusinessCard
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