import React, {Component} from 'react';

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";




import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'




import CardActionButtons from './Partials/CardActionButtons.jsx';
import CardInterests from './Partials/CardInterests.jsx';
import CardContact from './Partials/CardContact.jsx';


class BusinessCard extends Component {

  render(){
    const {attendee, categories, subCategories, profile, actions, catMap, subCatMap } = this.props;
    const id = this.props.id || Math.random();    
    
    function cardHeader() {
      if (attendee.last_name) {
        return (
          <CardHeader title={attendee.first_name +" "+ attendee.last_name}/>
        ); 
      } else if (attendee.last_name){
        return (
          <CardHeader title={attendee.first_name}/>
        ); 
      }
    }


    function cardImageAndInterests() {
      if (attendee.photo) {
        return (
          <Container style={{marginLeft:'0px', marginRight:'0px', padding : '0px'}}>
            <Row>
              <Col xs={4} md={4}>
                <Image src={attendee.photo} rounded width={120} height={120} alt="120x120"/>
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





    return (
      <Card id={id} style={{marginTop: 20}}>
        {cardHeader()}

        <CardContent>
          {cardImageAndInterests()}
          <Typography variant="body2" color="textSecondary" component="p">
            {attendee.tagline}
          </Typography>
        </CardContent>

        <CardContact attendee={attendee}/>

        {cardActionButtons()}

      </Card>

    );
  }
}

export default BusinessCard;
