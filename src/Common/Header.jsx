import React, {Component} from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Navbar} from 'react-bootstrap';
import LoginButton from './Partials/Oauth/LoginButton.jsx'


class Header extends Component {

  render(){
    return (
      <Navbar bg="light" sticky="top">

          <Col xs={6} md={6}>
            <p>Lighthouse Labs Demo Day</p>
          </Col>
          <Col xs={3} md={3}>
            <span onClick={this.props.showNotifications} id="notification-button" className="fa-stack fa-2x has-badge" data-count="4">
              <i className="fa fa-bell fa-stack-1x xfa-inverse" data-count="4b"></i>
            </span>
          </Col>
          <Col xs={3} md={3}>
            <LoginButton  socket={this.props.socket} event= {this.props.event}/>
          </Col>

      </Navbar>
    );
  }
}

export default Header;