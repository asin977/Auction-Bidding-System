import React from "react";

import './styles.css';
; 

const Header = () => {
  return (
    <div className="header-main-container">
      <div className="header-inner-container">
        <div className="header-img-container">
          <span className="site-name">GravelGood</span>
          {/* <img src={MyImage} alt="GravelGood site logo" className="site-logo" /> */}
        </div>
        <div className="header-sign-icon">
          {/* <img src={SignIcon} alt="Sign-in icon" className="sign-img" /> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
