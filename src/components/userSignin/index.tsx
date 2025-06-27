import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


import { routes } from '../../Routes';
import './styles.css';

const UserSignIn: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users") || '[]');

    const match = storedUsers.find(
      (user: any) =>
        user.email === form.email && user.password === form.password
    );

    if (match) {
      alert(`Welcome back, ${match.name}!`);
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
        <h1 className="head">Sign In</h1>
        <form onSubmit={handleSignIn} className="details-container">
          <input
            className="name-container"
            type="email"
            name="email"
            placeholder="Enter your email *"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="details-container"
            type="password"
            name="password"
            placeholder="Enter your password *"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="sign-up">
            Sign In
          </button>
        </form>
        <span className="forgot-password">Forgot password?</span>
        <p className="sign-account">
          New here?{' '}
          <Link to={routes.signup} className="signup-link">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserSignIn;
