import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import ProfileForm from '../Profile/ProfileForm.jsx';

class MessagesPage extends Component {

  render(){
    return (
      <div>
        Hello from the MessagesPage!!

        Temp Storage for Login Form!
        <Container>
          <ProfileForm categories={this.props.categories} subCategories={this.props.subCategories} profile={this.props.profile}/>
        </Container>
      </div>
    );
  }
}

export default MessagesPage;