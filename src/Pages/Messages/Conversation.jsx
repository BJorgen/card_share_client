import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import SimpleExpansionPanel from '../../Common/Partials/SimpleExpansionPanel.jsx'
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

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
      <ListItem button>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={attendee.photo} />
        </ListItemAvatar>
        <ListItemText primary={this.props.attendee.first_name} />
      </ListItem>
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
