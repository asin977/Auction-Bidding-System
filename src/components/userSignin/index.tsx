import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { USER } from '../../constants/common';
import { routes } from '../../routes/Routes';
import './styles.css';

const SignIn: React.FC = () => {
  const [formInputs, setForm] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...formInputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem(USER) || '[]');

    const Usermatch = storedUsers.find(
      (user: any) =>
        user.email === formInputs.email &&
        user.password === formInputs.password,
    );

    if (Usermatch) {
      alert(`Welcome back, ${Usermatch.name}!`);
      navigate(routes.home);
    } else {
      alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="main-sign-container">
      <div className="sub-container">
        <div className="welcome-back">
          <h2>Welcome Back</h2>
        </div>
      </div>

      <div className="sign-container">
        <h1 className="signin-title">Sign In</h1>
        <form onSubmit={handleSignIn} className="details-container">
          <input
            className="name-container"
            type="email"
            name="email"
            placeholder="Enter your email *"
            value={formInputs.email}
            onChange={handleChange}
            required
          />

          <input
            className="details-container"
            type="password"
            name="password"
            placeholder="Enter your password *"
            value={formInputs.password}
            onChange={handleChange}
            required
          />
          <div className="button-signIn">
            <button type="submit" className="sign-in">
              Sign In
            </button>
          </div>
        </form>
        <span className="forgot-password">Forgot password?</span>
        <p className="sign-account">
          New here?
          <Link to={routes.login} className="signup-link">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
