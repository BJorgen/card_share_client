import React, {Component} from 'react';
import BusinessCard from '../../Common/BusinessCard.jsx';
import CardDeck from 'react-bootstrap/CardDeck'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

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
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
          </Grid>
          <Grid item xs={12}>
            <ButtonGroup fullWidth aria-label="Full width outlined button group" variant="contained" >
              <Button onClick={() => this.setState({sortFilter: 'tp'})}>All</Button>
              <Button onClick={() => this.setState({sortFilter: 'hp'})}>Haves</Button>
              <Button onClick={() => this.setState({sortFilter: 'wp'})}>Wants</Button>
            </ButtonGroup>
          </Grid>
        </Grid>

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
            id={`network_${attendees[attendee_key].id}`}
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