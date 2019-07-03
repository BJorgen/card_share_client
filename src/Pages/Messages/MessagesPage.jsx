import React, {Component} from 'react';
import Conversation from './Conversation.jsx';

class MessagesPage extends Component {

  render(){

    const { profile, attendees, messages, actions} = this.props;

    if (!attendees) return null

    return (
      <div>
        <h4>Messages</h4>

        {Object.entries(messages).map(([conversation_key, value]) => {
        if (attendees[conversation_key]) {
          const conversation = messages[conversation_key]
          const attendee = attendees[conversation_key]
          return (
            <Conversation
            key={attendee.id}
            attendee={attendee}
            profile={profile}
            actions={actions}
            conversation={conversation} />
          )
        }})}

      </div>
    );
  }
}

export default MessagesPage;