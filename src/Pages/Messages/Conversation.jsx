import React, {Component} from 'react';


class Conversation extends Component {

  render(){
    const { profile, attendees, messages, actions} = this.props;
    console.log(messages)
    return (
      <div>
        this is a converation
      </div>
    );
  }
}

export default Conversation;