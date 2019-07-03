import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import Slide from "@material-ui/core/Slide";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import Box from '@material-ui/core/Box';


const useStyles = makeStyles(theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  messageSent: {
    right: theme.spacing(1),
    flex: 1
  },
  messageRecieved: {
    left: theme.spacing(1),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const { profile, attendee, conversation, actions} = props;

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  let textFieldValue = '';

  function sendThisMessage() {
    console.log('button cliecked')
    actions.sendMessage(attendee.id, textFieldValue);
    textFieldValue =''
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function textChange(event){
    textFieldValue = event.target.value;
  }

  function renderMessage(){
    /*const side;
    return (
      <Box display="flex" justifyContent="flex-start" pr={3} pt={1} bgcolor="background.paper">
      <Box p={1} bgcolor="grey.300" borderRadius={10}>
        <Typography variant="body2" color="textSecondary" component="p">
          This is a bunch of content that I want to have so that I scan scroll through it in the page.
        </Typography>
      </Box>
    </Box>
    )
    */
  }

  return (
    <div>

      <Card>
      <CardActionArea onClick={handleClickOpen}>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                alt={attendee.first_name + (attendee.family_name || '')}
                src={attendee.photo}
              />
            </ListItemAvatar>
            <ListItemText>
              <Typography gutterBottom variant="h6" component="h2">
                {attendee.first_name + (attendee.family_name || '')}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                4h ago (11)
              </Typography>
            </ListItemText>
          </ListItem>
      </CardActionArea>
    </Card>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>
        <ListItem>
            <ListItemAvatar>
              <Avatar
                alt={attendee.first_name + (attendee.family_name || '')}
                src={attendee.photo}
              />
            </ListItemAvatar>
            <ListItemText>
              <Typography gutterBottom variant="h6">
              {attendee.first_name + (attendee.family_name || '')}
              </Typography>
            </ListItemText>
          </ListItem>

          <IconButton
            aria-label="Close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent display="flex" dividers={scroll === "paper"}>
          {conversation.map(message => {
            const side = attendee.id === message.sender_id ? "flex-start" : "flex-end";
            return (
              <Box key={message.id} display="flex" justifyContent={side} pr={3} pt={1} bgcolor="background.paper">
                <Box p={1} bgcolor="grey.300" borderRadius={10}>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {message.content}
                  </Typography>
                </Box>
              </Box>
            )
          })}

        </DialogContent>

        <DialogActions>
          <TextField
            onChange={textChange}
            multiline={true}
            autoFocus={true}
            fullWidth={true}
            label="Message"
            variant="outlined"
            defaultValue={textFieldValue}
          />

          <Button onClick={() => sendThisMessage()} color="primary">Send</Button>
        </DialogActions>
      </Dialog>




    </div>
  );
}
