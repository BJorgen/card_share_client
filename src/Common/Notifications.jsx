import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

class Notifications extends Component {
  render() {
    const {notifications, deleteNotification,  ...rest} = this.props;

    const onNotificationClick = function(notification_id, onHide){
      onHide();
      deleteNotification(notification_id);
    }

    return (
      <Modal
        {...rest}
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
          {Object.entries(notifications).map(entry => 
                            <div key={`notif_${entry[0]}`}>
                              <Link 
                                onClick={() => onNotificationClick(entry[0], this.props.onHide)}
                                to={{
                                  pathname:`/${entry[1].link}`,
                                  hash:`#${entry[1].link}_${entry[1].source_id}`,
                                }}
                              >
                                {entry[1].content}
                              </Link>
                              <Button onClick={() => deleteNotification(entry[0])}>Delete</Button> 
                            </div>
          )}
        </Modal.Body>
      </Modal>
    );
  }
}
// 1000003 ${entry[1].source_id}
export default Notifications;

