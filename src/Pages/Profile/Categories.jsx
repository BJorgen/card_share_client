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
    const component = this;

    function submitCategories(event) {
      event.preventDefault();
      //const company = event.target['company'].value
     /* const position = event.target['position'].value
      const phone_number = event.target['phone_number'].value
      const email_address = event.target['email_address'].value
      const tagline = event.target['tagline'].value
      const updatedProfile = {...profile, company, position, phone_number, email_address, tagline}*/
     // actions.updateProfile(updatedProfile)
    }
    
    function getCheckboxButton(id, action){
      const checked = component.state.haves.includes(id)
      if(component.state.haves.length > 4 && !checked){
        return <Form.Check  name={id} type='checkbox' disabled onClick={action} inline />
      }else{
        return <Form.Check  name={id} type='checkbox' onClick={action} inline />
      }
    }

    function haveCategoryOnChange(event){
      const id = event.target.name;
      let haves = component.state.haves;
      if(event.target.checked){
        haves.push(id);
      }else{
        haves = haves.filter(item => item !== id);
      }
      component.setState({haves : haves}, () => console.log('haves from  cb', component.state.haves));
    }

    function wantCategoryOnChange(event){
      let wants = component.state.wants;
      const id = event.target.name;
      if(event.target.checked){
        wants.push(id);
      }else{
        wants = wants.filter(item => item !== id);
      }
      component.setState({wants : wants}, () => console.log('wants from  cb', component.state.wants));
    }

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
              {subCategories.filter(subCategory => subCategory.category_id === category.id).map((subCategory,component) => (             
                <Row>
                  <Col xs={6} md={6}>
                    {subCategory.name}
                  </Col>
                  <Col xs={3} md={3}>
                  {getCheckboxButton(subCategory.id, haveCategoryOnChange)}
                      <Form.Check className="disabled" name={subCategory.id} type='checkbox' onClick={haveCategoryOnChange} inline />
                  </Col>
                  <Col xs={3} md={3}>
                      <Form.Check name={subCategory.id}  type='checkbox' onClick={wantCategoryOnChange} inline/>                      
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