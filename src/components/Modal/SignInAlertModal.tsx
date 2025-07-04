import React from 'react';

type LoginAlertModalProps = {
  isOpen: boolean;
  messege: string;
  onClose: () => void;
};

const LoginAlertModal: React.FC<LoginAlertModalProps> = ({
  isOpen,
  messege,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-box">
          <p className="modal-message">{messege}</p>
          <div className="modal-actions">
            <button className="modal-btn cancel" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAlertModal;
