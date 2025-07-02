import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { routes } from '../../Routes';

const generateId = () =>
  typeof crypto?.randomUUID === 'function'
    ? crypto.randomUUID()
    : Math.random().toString(36).substring(2, 10);

const Login: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isStrongPassword = (password: string): boolean => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!isStrongPassword(form.password)) {
      alert(
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
      );
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    const duplicate = storedUsers.find(
      (user: any) => user.email.toLowerCase() === form.email.toLowerCase()
    );
    if (duplicate) {
      alert('An account with this email already exists.');
      return;
    }

    const newUser = {
      id: generateId(),
      ...form,
    };

    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // ✅ Set user as logged in (optional if you want to log in right away)
    localStorage.setItem('LOGGED_IN_USER', JSON.stringify({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    }));

    console.log('✅ User registered:', newUser);
    alert(`Welcome, ${newUser.name}! Your account has been created.`);

    navigate(routes.signin); // redirect to login/sign-in route
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
            value={form.name}
            onChange={handleChange}
            required
          />
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
            className="name-container"
            type="password"
            name="password"
            placeholder="Create your password *"
            value={form.password}
            onChange={handleChange}
            required
          />
          <div className="button-container">
            <button className="sign-up" type="submit">
              Create Account
            </button>
            <button
              className="sign-up"
              type="button"
              onClick={() => navigate(routes.signin)}
            >
              Already have an account?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
