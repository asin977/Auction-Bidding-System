import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { routes } from '../../Routes';

const SignIn: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { email, password } = form;
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    const matchedUser = storedUsers.find(
      (user: any) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );

    if (!matchedUser) {
      alert('Incorrect email or password.');
      return;
    }

  
    localStorage.setItem(
      'LOGGED_IN_USER',
      JSON.stringify({
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email,
      })
    );

    alert(`Welcome back, ${matchedUser.name}!`);
    navigate(routes.home); 
  };

  return (
    <div className="main-login-container">
      <div className="login-container">
        <h1 className="head">Sign In</h1>
        <form onSubmit={handleSubmit} className="details-container">
          <input
            className="name-container"
            type="email"
            name="email"
            placeholder="Email *"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="name-container"
            type="password"
            name="password"
            placeholder="Password *"
            value={form.password}
            onChange={handleChange}
            required
          />
          <div className="button-container">
            <button className="sign-up" type="submit">
              Sign In
            </button>
            <button
              className="sign-up"
              type="button"
              onClick={() => navigate(routes.signup)}
            >
              Need to create an account?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
