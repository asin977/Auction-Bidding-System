import React from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from '../../routes';
import './styles.css';

const LoginButton = () => {
  const navigate = useNavigate();
  return (
    <div className="button-container">
      <button className="create-account-button" type="submit">
        Create Account
      </button>
      <button
        className="login-button"
        type="button"
        onClick={() => navigate(routes.home)}
      >
        Login
      </button>
    </div>
  );
};

export default LoginButton;
