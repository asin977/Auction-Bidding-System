import React from "react";

import './index.css';
import MyImage from "../images/Logo.png";
import SignIcon from "../images/avatar.png";

const Header = () => (
    <div className="header-main-container">
      <div className="container">
        <div className="img-container">
          <span className="site-name">GravelGood</span>
          <img src={MyImage} alt="logo" />
        </div>
        <div className="sign-icon">
          <img src={SignIcon} alt="menu" className="sign-img" />
        </div>
      </div>
    </div>
)

export default Header;
