import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'



function connectionActions(attendee_id, connection, actions) {
  if (!connection) {
    return (
      <Button onClick={() => actions.requestConnection(attendee_id)} variant="outline-success" size="sm">Connect</Button>
    );
  } else if(connection.status === 'CONNECTED') {
    return (<span>CONNECTED</span>);
  } else if(connection.status === 'DECLINED') {
    return (<span>DECLINED</span>);
  } else if(attendee_id === connection.sender) {
    return (
      <div>
        <Button onClick={() => actions.acceptConnection(attendee_id)} variant="outline-success" size="sm">Accept</Button>
        <Button onClick={() => actions.ignoreConnection(attendee_id)} variant="outline-danger" size="sm">Ignore</Button>
      </div>
    )
  } else {
    return (<span>PENDING CONNECTION</span>)
  }
}


function cardActionsSend(attendee_id, cards, actions) {
  if (!cards || cards.to !== 'SENT') {
    return (
      <Button onClick={() => actions.sendCard(attendee_id)} variant="outline-success" size="sm">Send Card</Button>
    );
    
  }
}

function cardActionsRecieved(attendee_id, cards, actions) {
  if (cards){
    const from = cards.from;
    if(from === 'PENDING') {
      return (
        <div>
          <Button onClick={() => actions.saveCard(attendee_id)} variant="outline-success" size="sm">Save</Button>
          <Button onClick={() => actions.deleteCard(attendee_id)} variant="outline-danger" size="sm">Delete</Button>
        </div>
      );
    } else if (cards.from === 'SAVED') {
      return (
        <Button onClick={() => actions.deleteCard(attendee_id)} variant="outline-success" size="sm">Delete</Button>
      )
    }
  }
}



class CardActions extends Component {

  render(){
    const attendee = this.props.attendee;
    const actions = this.props.actions;
    return (
      <div>
        <Button onClick={() => actions.sendMessage(attendee.id, 'Hi I think we should chat')}> Message </Button>
        {cardActionsSend(attendee.id, attendee.cards, actions)}
        {cardActionsRecieved(attendee.id, attendee.cards, actions)}
        {connectionActions(attendee.id, attendee.connection, actions)}
      </div>
    );
  }
}

export default CardActions;


