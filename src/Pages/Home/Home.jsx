import React, {Component} from 'react';
import LoginButton from  './../../Common/Partials/Oauth/LoginButton.jsx'


class Home extends Component {

  render(){
    return (
      <div>
        <h1> Lighthouse Labs Demo Day 04.07.2019</h1>
        <h2> Please log in to participate in the event </h2>
        <LoginButton attendee={this.props.attendee}  socket={this.props.socket} event={this.props.event} endpoint={this.props.endpoint}/>
      </div>
    );
  }
}

export default Home;