import React from 'react';
import { useNavigate } from 'react-router-dom';

import './styles.css';

const LoginButton = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/home');
  };
  return (
    <div className="button-container">
      <button
        className="create-account-button"
        type="submit"
        onClick={handleSignUp}
      >
        Sign Up
      </button>
    </div>
  );
};

export default LoginButton;
