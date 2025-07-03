import React from 'react';

import MyImage from '../../assets/images/Logo.png';
import SignIcon from '../../assets/images/avatar.png';
import BellIcon from '../../assets/images/bell.png';
import './styles.css';

const Header = () => (
  <div className="header-main-container">
    <div className="container">
      <div className="img-container">
        <span className="site-name">GravelGood</span>
        <img src={MyImage} alt="logo" />
      </div>
      <div className="sign-icon">
        <img src={BellIcon} alt="bell" className="bell-icon" />
        <img src={SignIcon} alt="menu" className="sign-img" />
      </div>
    </div>
  </div>
);

export default Header;
