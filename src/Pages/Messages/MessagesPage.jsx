import React, {Component} from 'react';
import Conversation from './Conversation.jsx';

class MessagesPage extends Component {

  render(){
    const { profile, attendees, messages, actions} = this.props;
    console.log(messages)
    return (
      <div>
        <h4>Messages</h4>
        <Conversation/>
      </div>
    );
  }
}

export default MessagesPage;