import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup'

class CardInterests extends Component {
  render(){
    // const {categories , subCategories, attendee, profile, catMap, subCatMap} = this.props
    const {attendee, profile, catMap, subCatMap} = this.props
    let userInfo;

    if (attendee) {
      userInfo = attendee;
    } else if (profile) {
      userInfo = profile;
    }

    // TODO: Maybe find a way to remove
    if (!catMap || !subCatMap) return null

    const userHaves = userInfo.haves.map(have => subCatMap[have].name).join(", ")
    const userWants = userInfo.wants.map(want => subCatMap[want].name).join(", ")


    return (
      <Container>
        <ListGroup>
          <ListGroup.Item>Haves: {userHaves}</ListGroup.Item>
          <ListGroup.Item>Wants: {userWants}</ListGroup.Item>
          <ListGroup.Item>hp:{userInfo.metaData.hp}, wp: {userInfo.metaData.wp}, tp: {userInfo.metaData.hp+userInfo.metaData.wp}</ListGroup.Item>
        </ListGroup>
      </Container>
    );
  }
}

export default CardInterests;
