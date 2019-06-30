import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Categories from './Categories.jsx';

class ProfileForm extends Component {

  render(){
    const {profile, actions, categories, subCategories} = this.props;

    function submitProfile(event) {
      event.preventDefault();
      const company = event.target['company'].value
      const position = event.target['position'].value
      const phone_number = event.target['phone_number'].value
      const email_address = event.target['email_address'].value
      const tagline = event.target['tagline'].value
      const updatedProfile = {...profile, company, position, phone_number, email_address, tagline}
      actions.updateProfile(updatedProfile)
    }

    return (

      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">

        <Tab eventKey="profile" title="Login Profile"> 
          <Card>

            <Card.Header>
              <Row>
                <Col xs={9} md={9}>
                  <Card.Title>
                    {profile.first_name} {profile.last_name}
                  </Card.Title>
                </Col>
              </Row>
            </Card.Header>

            <Card.Body>



              <Form onSubmit={submitProfile}>
              <Container>
                <Row>
                  <Col xs={5} md={5}>
                    <Image src={profile.photo} rounded width={100} height={100} alt="100x100"/>
                  </Col>
                  <Col xs={7} md={7}>

                    <Form.Group as={Row} controlId="Information">
                        <Form.Control name="company" placeholder="Company" defaultValue={profile.company}/>
                        <Form.Control name="position" placeholder="Position" defaultValue={profile.position}/>
                        <Form.Control name="phone_number" placeholder="Phone Number" defaultValue={profile.phone_number}/>
                        <Form.Control name="email_address" placeholder="Email" defaultValue={profile.email_address}/>
                    </Form.Group>

                  </Col>
                </Row>
              </Container>

              <Form.Group as={Row} controlId="Tagline">
                <Form.Control name="tagline" placeholder="Enter Tagline Here!" defaultValue={profile.tagline}/>
              </Form.Group>

              <Button as="input" type="submit" value="Submit" size="sm"/>
              </Form>
              
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="topics" title="Topic Selector">
          Select Some Topics of Interest Here!
          <Categories categories={categories} subCategories={subCategories} profile={profile} actions={actions}/>
        </Tab>
      </Tabs>
    );
  }
}

export default ProfileForm;




// Show profile
// image
// "email_address":"gi@gmail.com"
// "first_name":"Gi"
// "last_name":"Gilast"

// "linkedin-link":"https://www.linkedin.com"

// Prompt profile for:

// "tagline":null
// "haves":["1000008","1000010","1000016","1000019","1000023"]
// "wants":["1000008","1000010","1000016","1000019","1000023"]
