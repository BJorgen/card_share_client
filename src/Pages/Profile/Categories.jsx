import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Categories extends Component {

 constructor(props){
    super(props);
    this.state = {
      haves : props.profile.haves,
      wants : props.profile.wants
    }
  }
  
  render() {
    const { categories, subCategories } = this.props;


    function submitCategories(event) {
      event.preventDefault();
      console.log('event cought')
      //const company = event.target['company'].value
     /* const position = event.target['position'].value
      const phone_number = event.target['phone_number'].value
      const email_address = event.target['email_address'].value
      const tagline = event.target['tagline'].value
      const updatedProfile = {...profile, company, position, phone_number, email_address, tagline}*/
     // actions.updateProfile(updatedProfile)
    }

    function haveCategoryOnChange(id){
      console.log('Actions!!!')
    }

    console.log(categories);
    return (
      <Accordion>
        <Form onSubmit={submitCategories}>
        {categories.map((category) => (
        <Card>
          <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                {category.name}
              </Accordion.Toggle>          
          </Card.Header>

          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Row>
                  <Col xs={6} md={6}> 
                  </Col>
                  <Col xs={3} md={3}>
                    <Form.Text>Wants</Form.Text>
                  </Col>
                  <Col xs={3} md={3}>
                    <Form.Text>Haves</Form.Text>                     
                  </Col>
                </Row>
              {subCategories.filter((subCategory) => subCategory.category_id === category.id).map(subCategory => (             
                <Row>
                  <Col xs={6} md={6}>
                    {subCategory.name}
                  </Col>
                  <Col xs={3} md={3}>
                      <Form.Check type='checkbox' onClick={haveCategoryOnChange} inline id={`inline-${'checkbox'}-1`} />
                  </Col>
                  <Col xs={3} md={3}>
                      <Form.Check type='checkbox' disabled inline id={`inline-${'checkbox'}-2`} />                      
                  </Col>
                </Row>
              ))}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        ))}
                      <Button as="input" type="submit" value="Submit" size="sm"/>

        </Form>
      </Accordion>
    );
  }
}

export default Categories;