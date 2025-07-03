import React from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from '../../Routes';
import './styles.css';


const LoginButton = () => {
  const navigate = useNavigate()
  return (
    <>
    <button className="create-account" type="button">
      Create Account
    </button>
    
    <button
      className="login-button"
      type="button"
      onClick={() => navigate(routes.home)}
    >
    Login
    </button>
  </>
  )
  
}

export default LoginButton;
