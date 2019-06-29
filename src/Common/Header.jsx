// import React, {Component} from 'react';
// import Col from 'react-bootstrap/Col'
// import { Navbar} from 'react-bootstrap';
// import LoginButton from './Partials/Oauth/LoginButton.jsx'


// class Header extends Component {

//   render(){
//     return (
//       <Navbar bg="light" sticky="top">

//           <Col xs={6} md={6}>
//             <p>Lighthouse Labs Demo Day</p>
//           </Col>
//           <Col xs={3} md={3}>
//             <span onClick={this.props.showNotifications} id="notification-button" className="fa-stack fa-2x has-badge" data-count="4">
//               <i className="fa fa-bell fa-stack-1x xfa-inverse" data-count="4b"></i>
//             </span>
//           </Col>
//           <Col xs={3} md={3}>
//             <LoginButton  socket={this.props.socket} event= {this.props.event}/>
//           </Col>

//       </Navbar>
//     );
//   }
// }

// export default Header;

import React, {Component} from 'react';
import LoginButton from './Partials/Oauth/LoginButton.jsx'
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "block"
  }

}));

function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Edit Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
    
  console.log(props.socket);
  
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>

          <Typography className={classes.title} variant="h6" noWrap>
            LHL Demo Day
          </Typography>

          <div className={classes.grow} />
          <IconButton aria-label="Show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary" onClick={props.showNotifications}>
              <i className="fa fa-bell fa-stack-1x xfa-inverse"></i>
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="Account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
              <i className="fas fa-user-circle"></i>
          </IconButton>
          <LoginButton  socket={props.socket} event= {props.event}/>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}

export default Header;