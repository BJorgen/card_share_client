import React, {Component} from 'react';
import LoginButton from  './../../Common/Partials/Oauth/LoginButton.jsx'
import Container from '@material-ui/core/Container';
import dogPhoto from '../../../public/lhl-dog.jpg';
import lhlLogo from '../../../public/lhl-logo.png';

class Home extends Component {

  render(){
    return (
      <Container>
        <div>
          <img src={lhlLogo} alt='' style={{width:"50%", paddingLeft:5}}/>
          <h2>Demo Day</h2>
          <h5>July 4, 2019</h5>
          <img src={dogPhoto} alt='' style={{width:"100%", paddingTop:20, paddingBottom: 20}}/>
          <div style={{display: 'flex'}}>
            <h6 style={{paddingRight:10, paddingTop: 3}}>Login with LinkedIn: </h6> 
            <LoginButton option='login' attendee={this.props.attendee}  socket={this.props.socket} event={this.props.event} endpoint={this.props.endpoint}/>
          </div>

        </div>
      </Container>
    );
  }
}

export default Home;