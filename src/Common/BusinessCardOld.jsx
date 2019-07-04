import React, {Component} from 'react';
import CardActions from './Partials/CardActions.jsx';
// import CardIcons from './Partials/CardIcons.jsx';
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
          </Card.Header>
        ); 
      }
    }

    function cardImageAndInterests() {
      if (attendee.photo) {
        return (
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
        ); 
      } else {
        return (
          <Container>
            <CardInterests attendee={attendee} profile={profile} categories={categories} subCategories={subCategories} catMap={catMap} subCatMap={subCatMap}/>
        </Container>
        )
      }
    }


    function cardFooter(){
      if (!(attendee.id === profile.id)) {
        return (
          <Card.Footer>
            <CardActions actions={actions} attendee={attendee}/>
          </Card.Footer>
        ); 
      }
    }


    return (
      <Card id={id}>
        {cardHeader()}

        <Card.Body>
          {cardImageAndInterests()}
          <Card.Text>
            {attendee.tagline}
          </Card.Text>
          <CardContact attendee={attendee}/>
        </Card.Body>

        {cardFooter()}
      </Card>
    );
  }
}

export default BusinessCard;
