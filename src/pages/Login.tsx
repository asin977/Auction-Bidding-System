import React, { useState } from 'react';

import {
  isStrongPassword,
  USERS,
  VALID_EMAIL_REGEX,
} from '../components/constants/Common';
import LoginButton from '../components/loginButton';
import './styles.css';

const Login: React.FC = () => {
  const [formInputs, setFormInputs] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!VALID_EMAIL_REGEX(formInputs.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!isStrongPassword(formInputs.password)) {
      alert(
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
      );
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem(USERS) || '[]');

    const duplicate = storedUsers.find(
      (user: any) => user.email === formInputs.email,
    );

    if (duplicate) {
      alert('An account with this email already exists.');
      return;
    }

    const updatedUsers = [...storedUsers, formInputs];
    localStorage.setItem(USERS, JSON.stringify(updatedUsers));

    alert(
      `Welcome, ${formInputs.name}! Your account has been created and your password is ${formInputs.password}. Keep it safe for future reference.`,
    );
  };

  return (
    <div className="main-login-container">
      <div className="login-container">
        <h1 className="welcome-title">Welcome New User</h1>

        <form onSubmit={handleSubmit} className="details-container">
          <input
            className="name-container"
            type="text"
            name="name"
            placeholder="Enter your full name *"
            value={formInputs.name}
            onChange={handleChange}
            required
          />

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
            className="name-container"
            type="password"
            name="password"
            placeholder="Create your password *"
            value={formInputs.password}
            onChange={handleChange}
            required
          />

          <div className="button-container">
            <LoginButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
