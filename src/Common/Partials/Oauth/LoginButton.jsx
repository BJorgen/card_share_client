import React from 'react';
import OAuth from './Oauth.jsx'


function LoginButton(props) {
  if(props.attendee){
    return (<div onClick={props.logOut}> LogOut </div>);
  }
  else if (props.socket){
    return (
      <OAuth
      option={props.option}
      provider='linkedin'
      socket={props.socket}
      event={props.event}
      endpoint={props.endpoint}
    />
    );
  }else{
    return( <div> Login </div>);
  }
}




export default LoginButton;