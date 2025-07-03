import React from 'react';
import './styles.css';

type ModalProps = {
  message: string;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <p className="modal-message">{message}</p>
        <button className="modal-close" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
