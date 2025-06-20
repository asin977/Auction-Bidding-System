import React from 'react'
import '../styles/Footer.css';

export const Footer = ()=>  {
  return (
    <div className='footer-container'>
          <div className='footer'>
            <p className='footer-content'>&copy; 2025 GravelGood. All rights reserved.</p>
            <p className='footer-description'>This is a real-time auction bidding system.Buit with JavaScript.</p>
            <div className="footer-links">
                <a href="#about" className='link'>About</a> 
                <a href="#features" className='link'>Features</a> 
                <a href="#contact" className='link'>Contact</a>
            </div>
          </div>
    </div>
    
  )
}

