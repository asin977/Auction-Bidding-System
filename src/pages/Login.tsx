import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LOGGED_IN_USER, USERS } from '../constants/common';
import { routes } from '../routes';
import { User } from '../types/user';
import { isStrongPassword, isValidEmail } from '../utils/login-validators';

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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(formInputs.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!isStrongPassword(formInputs.password)) {
      alert(
        'Password must be at least 8 characters, include uppercase, lowercase, number & special char.',
      );
      return;
    }

    let storedUsers: User[] = [];
    try {
      storedUsers = JSON.parse(localStorage.getItem(USERS) || '[]');
    } catch {
      storedUsers = [];
    }

    if (
      storedUsers.find(
        u => u.email.toLowerCase() === formInputs.email.toLowerCase(),
      )
    ) {
      alert('User with this email already exists.');
      return;
    }

    const newUser: User = {
      id: generateId(),
      name: formInputs.name,
      email: formInputs.email,
      password: formInputs.password,
      firstName: '',
      lastName: ''
    };

    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem(USERS, JSON.stringify(updatedUsers));

    localStorage.setItem(
      LOGGED_IN_USER,
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
      <h1>Register New User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formInputs.name}
          onChange={handleInput}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formInputs.email}
          onChange={handleInput}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formInputs.password}
          onChange={handleInput}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
