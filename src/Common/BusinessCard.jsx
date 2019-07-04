import React from 'react';

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box"



import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'




import CardActionButtons from './Partials/CardActionButtons.jsx';
import CardInterests from './Partials/CardInterests.jsx';
import CardContact from './Partials/CardContact.jsx';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 300,
    minWidth: 100
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));





export default function BusinessCard(props) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  const {attendee, categories, subCategories, profile, actions, catMap, subCatMap } = props;
  const id = props.id || Math.random();    
  
  function cardHeader() {
    if (attendee.last_name) {
      return (
        <CardHeader style={{paddingBottom: 0}} title={attendee.first_name +" "+ attendee.last_name}/>
      ); 
    } else if (attendee.first_name){
      return (
        <CardHeader style={{paddingBottom: 0}} title={attendee.first_name}/>
      ); 
    }
  }


  function cardImageAndInterests() {
    if (attendee.photo) {
      return (
        <Container style={{marginLeft:'0px', marginRight:'0px', padding : '0px'}}>
          <Row>
            <Col xs={4} md={4}>
              <Image src={attendee.photo} rounded width={100} height={100} alt="120x120"/>
            </Col>
            <Col xs={8} md={8}>
              <CardInterests attendee={attendee} profile={profile} categories={categories} subCategories={subCategories} catMap={catMap} subCatMap={subCatMap}/>
            </Col>
          </Row>
        </Container>
      ); 
    } else {
      return (
        <Container style={{marginLeft:'0px', marginRight:'0px', padding : '0px'}}>
          <CardInterests attendee={attendee} profile={profile} categories={categories} subCategories={subCategories} catMap={catMap} subCatMap={subCatMap}/>
      </Container>
      )
    }
  }


  function cardActionButtons(){
    if (!(attendee.id === profile.id)) {
      return (
          <CardActionButtons actions={actions} attendee={attendee}/>
      ); 
    }
  }


  function contactInformation(){
    if (attendee.last_name) {
      return (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {attendee.position}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {attendee.company}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {attendee.email_address}
            </Typography>
          </CardContent>
        </Collapse>

      ); 
    }
  }

  function showContactButton(){
    if (attendee.last_name) {
      return (
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      ); 
    }
  }



  return (
    <Card id={id} style={{marginTop: 10, marginBottom: 10}}>
      {cardHeader()}

      <CardContent style={{paddingBottom: 0}} >
        {cardImageAndInterests()}

        <Box fontStyle="oblique" m={0} color="primary" align="center" >
          <Typography style={{marginTop: 15}} color="primary" align="center" component="p">
            {attendee.tagline}
          </Typography>
        </Box>
 
      </CardContent>


      <CardActions style={{paddingTop: 0}}>
        {cardActionButtons()}
        {showContactButton()}
      </CardActions>

      {contactInformation()}

    </Card>

  );
}

