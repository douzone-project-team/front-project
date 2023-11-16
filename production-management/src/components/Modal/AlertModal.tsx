// AlertModal.js

import React from 'react';
import './../../assets/css/Alert.css';

type AlertModalProps = {
  message: string;
  onClose: () => void;
};

class AlertModal extends React.Component<AlertModalProps> {
  render() {
    const { message, onClose } = this.props;

    return (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <p>{message}</p>
          </div>
        </div>
    );
  }
}

export default AlertModal;
