import React from 'react';
import { useNavigate } from 'react-router-dom';

import './styles.css';

const LoginButton = () => {
  const navigate = useNavigate();
  return (
    <div className="button-container">
      <button className="create-account-button" type="submit">
        Create Account
      </button>
    </div>
  );
};

export default LoginButton;
