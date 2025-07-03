import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

import { routes } from '../../Routes';
import { USERS } from '../../constants/common';

import './styles.css';

const UserSignIn : React.FC = () => {
  const [formInputs,setformInputs] = useState({
    email:'',
    password:''
  });

  const navigate = useNavigate();
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>)=> {
    setformInputs({...formInputs,[event.target.name]:event.target.value});
  };

  const handleSubmit = (event:React.FormEvent) => {
    event.preventDefault();

    const {email,password} = formInputs;
    const storedUsers = JSON.parse(localStorage.getItem(USERS) || '[]');

    const matchedUser = storedUsers.find(
      (USER:{email:string;password:string;
        id:string;name:string}) =>
          USER.email.toLowerCase() === email.toLowerCase() && 
          USER.password === password
        )
        if(matchedUser) {
          localStorage.setItem('currentUser', JSON.stringify(matchedUser));
          navigate(routes.home);
        }
        alert('Invalid password or email,Please try again..')
    }
    
  
  return <>
    <div className="main-sign-container">
      <div className="sub-container">
        <div className="welcome-back">
          <h2>Welcome Back</h2>
        </div>
      </div>
      <div className="sign-container">
        <h1 className="head">Sign In</h1>
        <div>
          <form className="details-container">
            <input
              className="name-container"
              type="text"
              name="email"
              placeholder="Enter your email *"
              required />
            <input
              className="details-container"
              type="text"
              name="password"
              placeholder="Enter your Password *" />
          </form>
          <span className="forgot-password">forgot password</span>
        </div>
        <button className="sign-up">Sign In</button>
        <p className="sign-account">New here?Create an Account</p>
      </div>
    </div>
  </>;
}

export default UserSignIn;