import React, { useState } from 'react';

import { USERS } from '../components/constants/Common';
import { isStrongPassword, isValidEmail } from '../utils/valiadators';
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
        <h1 className="head">Welcome New User</h1>

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
            <button className="sign-up" type="submit">
              Create Account
            </button>
            <button className="sign-up" type="button">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
