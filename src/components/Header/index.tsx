import React, { useEffect, useState } from 'react';

import MyImage from '../../assets/images/Logo.png';
import SignIcon from '../../assets/images/avatar.png';
import BellIcon from '../../assets/images/bell.png';
import Modal from '../Modal/homePage';
import { User } from '../../types/user';
import './styles.css';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [storedUser, setStoredUser] = useState<User | null>(null);
  const [productMessages, setProductMessages] = useState<
    { message: string; timestamp?: number }[]
  >([]);

  useEffect(() => {
    try {
      const parsedUser = JSON.parse(
        localStorage.getItem('LOGGED_IN_USER') || '{}',
      );
      if (parsedUser?.id && parsedUser?.name && parsedUser?.email) {
        setStoredUser(parsedUser);
      }
    } catch (err) {
      console.error('Error parsing LOGGED_IN_USER:', err);
    }

    try {
      const lastProductId = localStorage.getItem('LAST_BID_PRODUCT_ID') || '';
      const notifications = JSON.parse(
        localStorage.getItem('BID_NOTIFICATIONS') || '{}',
      );

      const relevantMessages = Array.isArray(notifications[lastProductId])
        ? notifications[lastProductId]
        : notifications[lastProductId]
        ? [{ message: notifications[lastProductId] }]
        : [];

      setProductMessages(relevantMessages.slice(-5).reverse());
    } catch (err) {
      console.error('Error loading bid notifications:', err);
    }
  }, []);

  const isUserAvailable = storedUser?.name && storedUser?.email;

  const handleLogoutRequest = () => {
    setModalMessage('Are you sure you want to logout?');
    setShowModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('LOGGED_IN_USER');
    window.location.href = '/signin';
  };

  return (
    <div className="header-main-container">
      <div className="container">
        {showModal && (
          <Modal
            message={modalMessage}
            onClose={() => setShowModal(false)}
            onConfirm={confirmLogout}
          />
        )}

        <div className="img-container">
          <span className="site-name">GravelGood</span>
          <img src={MyImage} alt="logo" />
        </div>

        <div className="sign-icon">
          <div className="bell-notification-wrapper">
            <div className="bell-icon-container">
              <img src={BellIcon} alt="bell" className="bell-icon" />
            </div>
            <div className="notification-dropdown">
              <h4>🔔 Latest Bids</h4>
              <div className="notification-messages">
                {productMessages.length > 0 ? (
                  productMessages.map((note, index) => (
                    <p key={index} className="notification-message">
                      {note.message}
                    </p>
                  ))
                ) : (
                  <p className="no-notification-message">No notifications yet...</p>
                )}
              </div>
            </div>
          </div>

          <div className="user-dropdown-wrapper">
            <img src={SignIcon} alt="menu" className="sign-img" />
            {isUserAvailable && (
              <div className="user-info-dropdown">
                <p>
                  <strong>Name:</strong> {storedUser?.name}
                </p>
                <p>
                  <strong>Email:</strong> {storedUser?.email}
                </p>
                <button className="logout-btn" onClick={handleLogoutRequest}>
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
