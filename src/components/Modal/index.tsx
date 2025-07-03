import React from 'react';
import './styles.css'; 

export interface ModalProps {
  message: string;
  onClose: () => void;
  onConfirm?: () => void; 
}

const Modal: React.FC<ModalProps> = ({ message, onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          {onConfirm && (
            <button className="modal-btn confirm" onClick={onConfirm}>
              Confirm
            </button>
          )}
          <button className="modal-btn cancel" onClick={onClose}>
            {onConfirm ? 'Cancel' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
