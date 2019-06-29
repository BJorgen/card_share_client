import React from 'react';
import Button from '@material-ui/core/Button';
import OAuth from './Oauth.jsx'


function LoginButton(props) {
  if(props.user){
    return (<Button onClick={props.logOut}> LogOut </Button>);
  }
  else if (props.socket){
    return (
      <OAuth
      provider='linkedin'
      socket={props.socket}
      event= {props.event}
    />
    );
  }else{
    return( <Button> Login </Button>);
  }
}




export default LoginButton;