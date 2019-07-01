import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class Notifications extends Component {
  
  render() {
    const {notifications} = this.props;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Notifications
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Object.entries(notifications).map(entry => <div key={`notif_${entry[0]}`}>{entry[1].content} <Button>Delete</Button> </div>)}
        </Modal.Body>
      </Modal>
    );
  }
}

export default Notifications;

