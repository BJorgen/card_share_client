import React, {Component} from 'react';
import SimpleExpansionPanel from '../../Common/Partials/SimpleExpansionPanel.jsx'

class Conversation extends Component {

  render(){
    const { profile, attendee, conversation, actions} = this.props;
  
    if (!actions || !conversation || !attendee || !profile) return null

    function sendThisMessage(event) {
      event.preventDefault();
      const message = event.target['message'].value
      event.target['message'].value = '';
      actions.sendMessage(attendee.id, message)
    }

    const messageForm = (
      <form onSubmit={sendThisMessage}>
        <label>
          Message:
          <input type="text" name="message" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );

    const convoHeader = (
      <div>
        <h5>{this.props.attendee.first_name}</h5>
      </div>
    )
    

    const convoMessages = []
    conversation.forEach(message => {
      convoMessages.unshift(
        <li key={message.id}>
          <p>from: {profile.id === message.sender_id ? profile.first_name : attendee.first_name}</p>
          <p>content: {message.content}</p>
          <p>timestamp {message.created_at}</p>
        </li>
      )
    })

    return (
      <div id={`conversation_${attendee.id}`}>
        <SimpleExpansionPanel header={convoHeader}>
        <div>
        {messageForm}

        </div>
          <ul>
            {convoMessages}
          </ul>
        
        </SimpleExpansionPanel>
      </div>
    );
  }
}

export default Conversation;
