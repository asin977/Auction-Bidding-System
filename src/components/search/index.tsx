import React from "react";

import "./styles.css";
import MyImage from '../../images/search.png';

export const SearchIcon = () => (
  <div className="content-container">
    <h3 className="heading">Auction lots</h3>
    <p className="sub-content">
      Browse our collections and select the items you wish to bid on...
    </p>
    <div className="search-box-container">
      <input
        type="text"
        placeholder="Search items..."
        className="search-input"
      />
      <img src={MyImage} alt="search-bar" className="search-icon" />
    </div>
</div>
)
 
export default SearchIcon;
