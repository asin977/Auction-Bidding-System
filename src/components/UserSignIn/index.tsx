import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { LOGGED_IN_USER, USERS } from '../../constants/common';
import { routes } from '../../routes';

import './styles.css';

export const UserSignIn: React.FC = () => {
  const [formInputs, setFormInputs] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem(USERS) || '[]');
    const matchedUser = storedUsers.find(
      (user: any) =>
        user.email.toLowerCase() === formInputs.email.toLowerCase() &&
        user.password === formInputs.password,
    );

    if (!matchedUser) {
      alert('Incorrect email or password.');
      return;
    }

    localStorage.setItem(
      LOGGED_IN_USER,
      JSON.stringify({
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email,
      }),
    );

    alert(`Welcome back, ${matchedUser.name}!`);
    navigate(routes.home);
  };

  return (
    <div className="main-sign-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
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
        <button type="submit">Sign In</button>
      </form>
      <p className='register_link'>
        New user? <Link to={routes.login}>Create an account</Link>
      </p>
    </div>
  );
};
