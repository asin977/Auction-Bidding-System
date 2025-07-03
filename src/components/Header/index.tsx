import React from 'react';

import MyImage from '../../assets/images/Logo.png';
import SignIcon from '../../assets/images/avatar.png';
import BellIcon from '../../assets/images/bell.png';
import './styles.css';

const Header = () => {
  const storedUser = JSON.parse(localStorage.getItem('LOGGED_IN_USER') || '{}');
  const isUserAvailable = storedUser?.name && storedUser?.email;

  const handleLogout = () => {
    localStorage.removeItem('LOGGED_IN_USER');
    window.location.href = '/signin';
  };

  const bidNotifications = JSON.parse(
    localStorage.getItem('BID_NOTIFICATIONS') || '{}',
  );

  return (
    <div className="header-main-container">
      <div className="container">
        <div className="img-container">
          <span className="site-name">GravelGood</span>
          <img src={MyImage} alt="logo" />
        </div>

        <div className="sign-icon">
          <div className="bell-notification-wrapper">
            <img src={BellIcon} alt="bell" className="bell-icon" />
            {Object.values(bidNotifications).length > 0 && (
              <div className="notification-dropdown">
                <h4>🔔 Bid Activity</h4>
                <ul className="notification-list">
                  {Object.entries(bidNotifications).map(
                    ([productId, message]) => (
                      <li key={productId}>{String(message)}</li>
                    ),
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Profile icon + hover user info */}
          <div className="user-dropdown-wrapper">
            <img src={SignIcon} alt="menu" className="sign-img" />
            {isUserAvailable && (
              <div className="user-info-dropdown">
                <p>
                  <strong>Name:</strong> {storedUser.name}
                </p>
                <p>
                  <strong>Email:</strong> {storedUser.email}
                </p>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
