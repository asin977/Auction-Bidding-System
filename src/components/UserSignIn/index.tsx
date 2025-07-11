import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { USERS } from '../../constants/common';
import { routes } from '../../routes/Routes';
import Button from '../Button';
import './styles.css';

const UserSignIn: React.FC = () => {
  const [formInputs, setForm] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...formInputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem(USERS) || '[]');

    const userMatch = storedUsers.find(
      (user: { email: string; password: string }) =>
        user.email === formInputs.email &&
        user.password === formInputs.password,
    );

    if (userMatch) {
      alert(`Welcome back, ${userMatch.name}!`);
      navigate(routes.home);
      return;
    }
    alert('Invalid email or password. Please try again.');
  };

  return (
    <div className="main-sign-container">
      <div className="sign-in-container">
        <h2>Welcome Back</h2>
      </div>

      <div className="sign-in-input-box-details">
        <h1 className="signin-title">Sign In</h1>

        <form onSubmit={handleSignIn} className="details-container">
          <input
            className="input-name-box"
            type="email"
            name="email"
            placeholder="Enter your email *"
            value={formInputs.email}
            onChange={handleInput}
            required
          />

          <input
            className="password-input-box"
            type="password"
            name="password"
            placeholder="Enter your password *"
            value={formInputs.password}
            onChange={handleInput}
            required
          />

          <Button>Sign In</Button>
        </form>

        <span className="forgot-password">Forgot password?</span>
        <p className="sign-account">
          New here?{' '}
          <Link to={routes.login} className="signup-link">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserSignIn;
