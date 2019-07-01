import React from 'react';
import OAuth from './Oauth.jsx'


function LoginButton(props) {
  if(props.user){
    return (<div onClick={props.logOut}> LogOut </div>);
  }
  else if (props.socket){
    return (
      <OAuth
      provider='linkedin'
      socket={props.socket}
      event={props.event}
    />
    );
  }else{
    return( <div> Login </div>);
  }
}




export default LoginButton;