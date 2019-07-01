import React, {Component} from 'react';
import CardActions from './Partials/CardActions.jsx';
import CardIcons from './Partials/CardIcons.jsx';
import CardInterests from './Partials/CardInterests.jsx';
import CardContact from './Partials/CardContact.jsx';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

class BusinessCard extends Component {

  render(){
    const {attendee, categories, subCategories, profile, actions, catMap, subCatMap } = this.props;
    const id = this.props.id || Math.random();    
    function cardHeader() {
      if (attendee.first_name) {
        return (
          <Card.Header>
            <Card.Title>
              {attendee.first_name} {attendee.last_name}
            </Card.Title>
            <CardIcons attendee={attendee}/>
          </Card.Header>
      ); 
      }
    }

    return (
      <Card id={id}>
        {cardHeader()}
        <Card.Body>
          <Container>
            <Row>
              <Col xs={4} md={4}>
                <Image src={attendee.photo} rounded width={120} height={120} alt="120x120"/>
              </Col>
              <Col xs={8} md={8}>
                <CardInterests attendee={attendee} profile={profile} categories={categories} subCategories={subCategories} catMap={catMap} subCatMap={subCatMap}/>
              </Col>
            </Row>
          </Container>

          <CardContact attendee={attendee}/>

          <Card.Text>
            {attendee.tagline}
          </Card.Text>

        </Card.Body>

        <Card.Footer>
          <CardActions actions={actions} attendee={attendee}/>
        </Card.Footer>
      </Card>
    );
  }
}

export default BusinessCard;


// "id":1000003
// "user_id":1000003
// "event_id":1000001
// "email_address":"gi@gmail.com"
// "first_name":"Gi"
// "last_name":"Gilast"
// "position":null
// "company":null
// "linkedin-link":"https://www.linkedin.com"
// "tagline":null

// "haves":["1000008","1000010","1000016","1000019","1000023"]
// "wants":["1000008","1000010","1000016","1000019","1000023"]
