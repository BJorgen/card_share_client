import React, {Component} from 'react';
import BusinessCard from '../../Common/BusinessCard.jsx';
import CardDeck from 'react-bootstrap/CardDeck'

class NetworkPage extends Component {
  constructor() {
    super();
    this.state = {
      sortFilter: 'wp'
    };
  }

  render(){
    const { attendees , categories, subCategories, profile, actions, catMap, subCatMap, pointsAttendees} = this.props;

    if (!attendees || typeof attendees !== 'object' || !pointsAttendees) return null

    const sortLogic = { 
      'hp': (a, b) => (b.hp - a.hp), 
      'wp': (a, b) => (b.wp - a.wp), 
      'tp': (a, b) => (b.hp + b.wp) - (a.hp + a.wp)
    }

    // this.setState({sortFilter: 'wp'})
    const sorted = pointsAttendees.sort(sortLogic[this.state.sortFilter]).map(item => item.id)


    return (
      <div>
        <h4>Event Network</h4>
        <CardDeck>

          {sorted.map((attendee_key) => {
            if (!attendees[attendee_key]) return null
            return(
              <BusinessCard
              attendee={attendees[attendee_key]}
              key={attendees[attendee_key].id}
              categories={categories}
              subCategories={subCategories}
              profile={profile}
              actions={actions}
              catMap={catMap}
              subCatMap={subCatMap}/>
            )
          })}

          {/* {Object.keys(attendees).map((attendee_key) => (
            <BusinessCard
            attendee={attendees[attendee_key]}
            key={attendees[attendee_key].id}
            categories={categories}
            subCategories={subCategories}
            profile={profile}
            actions={actions}
            catMap={catMap}
            subCatMap={subCatMap}/>
          ))} */}




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