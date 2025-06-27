import React, { useState } from 'react';
import './styles.css';

const Login: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!isStrongPassword(form.password)) {
      alert(
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
      );
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    const duplicate = storedUsers.find(
      (user: any) => user.email === form.email,
    );
    if (duplicate) {
      alert('An account with this email already exists.');
      return;
    }

    const updatedUsers = [...storedUsers, form];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert(`Welcome, ${form.name}! Your account has been created.`);
  };

  return (
    <div className="main-sign-container">
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
          <div className='button-container'>
            <button className="sign-up" type="submit">
              Create Account
            </button>
            <button className="sign-up" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
