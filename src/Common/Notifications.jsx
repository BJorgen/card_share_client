import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal'

class Notifications extends Component {
  render() {
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
          <p>
            Notifications 1
          </p>
        </Modal.Body>
      </Modal>
    );
  }
}

export default Notifications;

