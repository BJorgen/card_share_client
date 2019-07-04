import React, {Component} from 'react';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from 'react-router-dom';

const messageIcon = (<i className="fas fa-comment-alt"></i>);

const addContactIcon = (<i className="fas fa-user-plus"></i>);
const acceptContactIcon = (<i style={{color: "Green"}} className="fas fa-user-plus"></i>);
const minusContactIcon = (<i className="fas fa-user-times"></i>);
const pendingContactIcon = (<i style={{color: "Orange"}} className="fas fa-link"></i>);
const declinedContactIcon = (<i style={{color: "#FF4500"}} className="fas un-fa-link"></i>);
const linkIcon = (<i style={{color: "#4CAF50"}} className="fas fa-link"></i>);


const saveCardIcon = (<i className="fas fa-id-card"></i>);
const sendCardIcon = (<i className="fas fa-share-square"></i>);
const deleteIcon = (<i className="fas fa-trash-alt"></i>);


function connectionActions(attendee_id, connection, actions) {
  if (!connection) {
    return (
      <Tooltip title="Request Connection">
        <IconButton size="small" onClick={() => actions.requestConnection(attendee_id)}>{addContactIcon}</IconButton>
      </Tooltip>
    );
  } else if(connection.status === 'CONNECTED') {
    return <Tooltip title="Connected"><IconButton size="small">{linkIcon}</IconButton></Tooltip>
  } else if(connection.status === 'DECLINED') {
    return (<Tooltip title="Declined Connection"><IconButton size="small">{declinedContactIcon}</IconButton></Tooltip>);
  } else if(attendee_id === connection.sender) {
    return (
      <div>
        <Tooltip title="Accept Connection">
          <IconButton size="small" onClick={() => actions.acceptConnection(attendee_id)}>{acceptContactIcon}</IconButton>
        </Tooltip>
        <Tooltip title="Decline Connection">
          <IconButton size="small" onClick={() => actions.ignoreConnection(attendee_id)}>{minusContactIcon}</IconButton>
        </Tooltip>
      </div>
    )
  } else {
    return (<Tooltip title="Pending Connection"><IconButton size="small">{pendingContactIcon}</IconButton></Tooltip>)
  }
}


function cardActionsSend(attendee_id, cards, actions) {
  if (!cards || cards.to !== 'SENT') {
    return (
      <Tooltip title="Send Card">
        <IconButton size="small" onClick={() => actions.sendCard(attendee_id)}>{sendCardIcon}</IconButton>
      </Tooltip>
    );
    
  }
}

function cardActionsRecieved(attendee_id, cards, actions) {
  if (cards){
    const from = cards.from;
    if(from === 'PENDING') {
      return (
        <div>
          <Tooltip title="Save Card">
            <IconButton size="small" onClick={() => actions.saveCard(attendee_id)}>{saveCardIcon}</IconButton>
          </Tooltip>
          <Tooltip title="Delete Card">
            <IconButton size="small" onClick={() => actions.deleteCard(attendee_id)}>{deleteIcon}</IconButton>
          </Tooltip>
        </div>
      );
    } 
  }
}


function messageAction(attendee, actions) {
  if (attendee){
    if(attendee && attendee.connection && attendee.connection.status === 'CONNECTED') {
      return (
          <Tooltip title="Message">
            <Link 
                                 onClick={() => actions.initMessageIfNotExist(attendee.id)}
                                 to={{
                                  pathname:`/messages`,
                                }}
                              >
<IconButton size="small">{messageIcon}</IconButton>
                              </Link>
            
          </Tooltip>
      );
    } 
  }
}


class CardActions extends Component {

  render(){
    const attendee = this.props.attendee;
    const actions = this.props.actions;
    return (
      <div>
        {connectionActions(attendee.id, attendee.connection, actions)}
        {cardActionsSend(attendee.id, attendee.cards, actions)}
        {cardActionsRecieved(attendee.id, attendee.cards, actions)}
        {messageAction(attendee,  actions)}
      </div>
    );
  }
}

export default CardActions;


