import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { routes } from '../../routes';
import LoginButton from '../loginButton';
import { isStrongPassword } from '../../utils/login-validators';

const generateId = () =>
  typeof crypto?.randomUUID === 'function'
    ? crypto.randomUUID()
    : Math.random().toString(36).substring(2, 10);

const Login: React.FC = () => {
  const [formInputs, setFormInputs] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();


    if (!isStrongPassword(formInputs.password)) {
      alert(
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.',
      );
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    const duplicate = storedUsers.find(
      (user: any) => user.email.toLowerCase() === formInputs.email.toLowerCase(),
    );
    if (duplicate) {
      alert('An account with this email already exists.');
      return;
    }

    const newUser = {
      id: generateId(),
      ...formInputs,
    };

    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    localStorage.setItem(
      'LOGGED_IN_USER',
      JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      }),
    );

    console.log('User registered:', newUser);
    alert(`Welcome, ${newUser.name}! Your account has been created.`);

    navigate(routes.signin); 
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
         <LoginButton />
        </form>
      </div>
    </div>
  );
};

export default Login;
