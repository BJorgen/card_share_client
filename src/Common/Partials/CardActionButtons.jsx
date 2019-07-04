import React, {Component} from 'react';
import IconButton from "@material-ui/core/IconButton";


const messageIcon = (<i className="fas fa-comment-alt"></i>);

const addContactIcon = (<i className="fas fa-user-plus"></i>);
const acceptContactIcon = (<i style={{color: "Green"}} className="fas fa-user-plus"></i>);
const minusContactIcon = (<i className="fas fa-user-times"></i>);
const pendingContactIcon = (<i style={{color: "Orange"}} className="fas fa-link"></i>);
const declineContactIcon = (<i style={{color: "#FF4500"}} className="fas un-fa-link"></i>);
const linkIcon = (<i style={{color: "#4CAF50"}} className="fas fa-link"></i>);


const saveCardIcon = (<i className="fas fa-id-card"></i>);
const sendCardIcon = (<i className="fas fa-share-square"></i>);
const deleteIcon = (<i className="fas fa-trash-alt"></i>);


function connectionActions(attendee_id, connection, actions) {
  if (!connection) {
    return (
      <IconButton onClick={() => actions.requestConnection(attendee_id)} variant="outline-success" size="sm">{addContactIcon}</IconButton>
    );
  } else if(connection.status === 'CONNECTED') {
    return <IconButton>{linkIcon}</IconButton>
  } else if(connection.status === 'DECLINED') {
    return (<span>DECLINED</span>);
  } else if(attendee_id === connection.sender) {
    return (
      <div>
        <IconButton onClick={() => actions.acceptConnection(attendee_id)} variant="outline-success" size="sm">{acceptContactIcon}</IconButton>
        <IconButton onClick={() => actions.ignoreConnection(attendee_id)} variant="outline-danger" size="sm">{minusContactIcon}</IconButton>
      </div>
    )
  } else {
    return (<IconButton>{pendingContactIcon}</IconButton>)
  }
}


function cardActionsSend(attendee_id, cards, actions) {
  if (!cards || cards.to !== 'SENT') {
    return (
      <IconButton onClick={() => actions.sendCard(attendee_id)} variant="outline-success" size="sm">{sendCardIcon}</IconButton>
    );
    
  }
}

function cardActionsRecieved(attendee_id, cards, actions) {
  if (cards){
    const from = cards.from;
    if(from === 'PENDING') {
      return (
        <div>
          <IconButton onClick={() => actions.saveCard(attendee_id)} variant="outline-success" size="sm">{saveCardIcon}</IconButton>
          <IconButton onClick={() => actions.deleteCard(attendee_id)} variant="outline-danger" size="sm">{deleteIcon}</IconButton>
        </div>
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
        <IconButton onClick={() => actions.sendMessage(attendee.id, 'Hi I think we should chat')}> {messageIcon}</IconButton>
      </div>
    );
  }
}

export default CardActions;


