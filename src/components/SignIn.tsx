import React from 'react'
import '../styles/signIn.css';

export const SignIn =() =>{
  return (
      <div className='main-sign-container'>
        <div className='sub-container'>
          <h2>Welcome Back</h2>
        </div>
        <div className='sign-container'>
          <h1 className='head'>Sign In</h1>
          <div>
            <form className='details-container'>
                <input className='name-container'
                type="text"
                name='email'
                placeholder='Enter your email *'
                required
              />
                <input className='details-container'
                type='text'
                name='password'
                placeholder='Enter your Password *'
                /> 
            </form>
            <span className='forgot-password'>forgot password</span>
          </div>
          <button className='sign-up'>Sign In</button>
          <p>New here?Create an Account</p>
        </div>
      </div>
    
  )
}

