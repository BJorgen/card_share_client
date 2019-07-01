import React from 'react';
import LoginButton from './Partials/Oauth/LoginButton.jsx'
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';

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
      <MenuItem onClick={handleMenuClose}>Close</MenuItem>
      <MenuItem onClick={handleMenuClose}>Close</MenuItem>
    </Menu>
  );
  
  return (
    <div className={classes.grow}>
      <AppBar color="primary" className={classes.colorPrimary}>
        <Toolbar>
          <IconButton
            edge="end"
            aria-label="Account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <MenuIcon className={classes.menuButton}/>
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap>
            LHL Demo Day
          </Typography>

          <div className={classes.grow} />
          <IconButton aria-label="Show 17 new notifications" color="inherit" onClick={props.showNotifications}>
            <Badge badgeContent={props.notifications.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <LoginButton  socket={props.socket} event={props.event}/>

        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}

export default Header;