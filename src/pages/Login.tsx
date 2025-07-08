import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginButton from '../components/loginButton';
import { USERS } from '../constants/common';
import { User } from '../types/user';
import { isStrongPassword, isValidEmail } from '../utils/login-validators';
import { routes } from '../Routes';
import './login.css';

const generateId = () =>
  typeof crypto?.randomUUID === 'function'
    ? crypto.randomUUID()
    : Math.random().toString(36).substring(2, 10);

export const Login: React.FC = () => {
  const [formInputs, setFormInputs] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

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
      (USER: User) => USER.email === formInputs.email.toLowerCase(),
    );

    if (existingUser) {
      alert('An account with this email already exists.');
      return;
    }

    const newUser = {
      id: generateId(),
      ...formInputs,
    };

    localStorage.setItem(
      'LOGGED_IN_USER',
      JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      }),
    );

    alert(`Welcome ${newUser.name}! Your account has been created.`);
    navigate(routes.home);
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
