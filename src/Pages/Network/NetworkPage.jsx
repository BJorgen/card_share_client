import React, {Component} from 'react';
import BusinessCard from '../../Common/BusinessCard.jsx';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
import SimpleExpansionPanel from '../../Common/Partials/SimpleExpansionPanel.jsx'

class NetworkPage extends Component {
  constructor() {
    super();
    this.state = {
      sortFilter: 'tp',
      showNetwork: 'allNetwork'
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

    const sorted = pointsAttendees.sort(sortLogic[this.state.sortFilter]).map(item => item.id)

    // Returns an object with array of connected cards and 
    function splitConnectedNetwork(sorted){
      const connected = []
      const notConnected = []
      const allNetwork =[]
      {sorted.map((attendee_key) => {
        if (attendees[attendee_key]) {
          const attendee = attendees[attendee_key]
          const isConnected = attendee.connection && (attendee.connection.status === 'CONNECTED')
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
            
            allNetwork.push(card)
            if(isConnected) {connected.push(card)} else {notConnected.push(card)}
        }
      })}
      return {connected, notConnected, allNetwork}
    }


    return (
      <div>
        <Container>
          <h4>Event Network</h4>


          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ButtonGroup fullWidth aria-label="Full width outlined button group" variant="contained" >

                <Button onClick={() => this.setState({showNetwork: 'connected'})}>Connected</Button>
                <Button onClick={() => this.setState({showNetwork: 'notConnected'})}>Other</Button>
                <Button onClick={() => this.setState({showNetwork: 'allNetwork'})}>All</Button>
              </ButtonGroup>
            </Grid>
          </Grid>


          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ButtonGroup fullWidth aria-label="Full width outlined button group" variant="contained" >
                <Button onClick={() => this.setState({sortFilter: 'tp'})}>Both</Button>
                <Button onClick={() => this.setState({sortFilter: 'hp'})}>Haves</Button>
                <Button onClick={() => this.setState({sortFilter: 'wp'})}>Wants</Button>
              </ButtonGroup>
            </Grid>
          </Grid>


        </Container>

        <Container>
          {splitConnectedNetwork(sorted)[this.state.showNetwork]}
        </Container>


      </div>
    );
  }
}

export default NetworkPage;
