import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ListGroup from 'react-bootstrap/ListGroup';
import Star from '@material-ui/icons/Star';
import orange from '@material-ui/core/colors/orange';
import { flexbox } from '@material-ui/system';
import Card from "@material-ui/core/Card";


class CardInterests extends Component {

  generateRatings(offer, requests){
    var divStyle = {
      padding: '0px',
      fontSize: '50%',
      fontWeight : 'bold',
      textAlign : 'center',
    }
    let icon;
    if(requests.includes(String(offer.id))){
      
      icon =  <Star htmlColor={orange[500]} />
    }else{
      icon =  <Star />
    }
    return (
    <Col style={divStyle}> 
      {icon}
      <br/>
      {offer.name}
    </Col>

    )
  }


  generateRatingsWOLabel(offer, requests){
    var divStyle = {
      padding: '0px',
      fontSize: '50%',
      fontWeight : 'bold',
      textAlign : 'center',
    }
    let type = requests.includes(String(offer.id)) ? "text-warning fa fa-star" : "fa fa-star"
    return (
    <Col style={divStyle}> 
      <span class="float-right"><i title={offer.name} class={type}></i></span>   
    </Col>

    )
  }

  render(){
    // const {categories , subCategories, attendee, profile, catMap, subCatMap} = this.props
    const {attendee, profile, catMap, subCatMap} = this.props
    const showString = !(attendee && attendee.first_name)
    let userInfo;

    if (attendee) {
      userInfo = attendee;
    } else if (profile) {
      userInfo = profile;
    }

    if (attendee.id === profile.id) {
      userInfo.metaData = {hp: userInfo.haves.length, wp:userInfo.wants.length}
    }

    // TODO: Maybe find a way to remove
    if (!catMap || !subCatMap) return null
    let userHaves;
    let userWants;
    if(showString){
      userHaves = userInfo.haves.map(have => {return {id: have, name: subCatMap[have].name}}).map(have => {return this.generateRatings(have, profile.wants)})//.join(", ")
      userWants = userInfo.wants.map(want => {return {id: want, name: subCatMap[want].name}}).map(want => {return this.generateRatings(want, profile.haves)})//.join(", ")
//              <Col style={{padding:'0px', fontSize:'50%'}}>H: </Col>
    }else{
      
      userHaves = userInfo.haves.map(have => {return {id: have, name: subCatMap[have].name}}).map(have => {return this.generateRatingsWOLabel(have, profile.wants, true)})//.join(", ")
      userWants = userInfo.wants.map(want => {return {id: want, name: subCatMap[want].name}}).map(want => {return this.generateRatingsWOLabel(want, profile.haves, true)})
    }
    return (

<Container style={{marginLeft:'0px', marginRight:'0px', padding : '0px', transform: [{ rotate: '90deg'}], transformOrigin: [{leftTop : 0}]}}>
        <ListGroup>
          <ListGroup.Item>  
            <Row>
            H : {userHaves}
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              W :
             {userWants}
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Container>
    );
  }
}

export default CardInterests;
