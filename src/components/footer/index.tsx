import './index.css'
import { Link } from 'react-router-dom';

export const Footer = ()=>  (
  <div className='footer-container'>
    <div className='footer'>
      <p className='footer-content'>&copy; 2025 GravelGood. All rights reserved.</p>
      <p className='footer-description'>This is a real-time auction bidding system.Buit with JavaScript.</p>
      <div className="footer-links">
        <Link to='/about'>About</Link>
        <Link to='/features'>Features</Link>
        <Link to='/contact'>Contact</Link>
      </div>
    </div>
  </div>
)


