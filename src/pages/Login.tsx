import React, { useState } from 'react';

import LoginButton from '../components/loginButton';
import { USERS } from '../constants/common';
import { User } from '../types/user';
import { isStrongPassword, isValidEmail } from '../utils/login-validators';
import './login.css';

export const Login: React.FC = () => {
  const [formInputs, setFormInputs] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValidEmail(formInputs.email)) {
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

    const existingUser = storedUsers.find(
      (USER: User) => USER.email === formInputs.email,
    );

    if (existingUser) {
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
      <h1 className="welcome-title">Welcome New User</h1>

      <form onSubmit={handleSubmit} className="details-container">
        <input
          className="details-input-box"
          type="text"
          name="name"
          placeholder="Enter your full name *"
          value={formInputs.name}
          onChange={handleInput}
          required
        />

        <input
          className="details-input-box"
          type="email"
          name="email"
          placeholder="Enter your email *"
          value={formInputs.email}
          onChange={handleInput}
          required
        />

        <input
          className="details-input-box"
          type="password"
          name="password"
          placeholder="Create your password *"
          value={formInputs.password}
          onChange={handleInput}
          required
        />
      </form>

      <div className="button-container">
        <LoginButton />
      </div>
    </div>
  );
};

