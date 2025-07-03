import React, { useState } from 'react';

import MyImage from '../../assets/images/Logo.png';
import SignIcon from '../../assets/images/avatar.png';
import BellIcon from '../../assets/images/bell.png';
import Modal from '../Modal';
import { User } from '../../types/user';
import './styles.css';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [storedUser, setStoredUser] = useState<User | null>(null);
  const [bidNotifications, setBidNotifications] = useState<
    Record<string, any[]>
  >({});

  // Parse user
  React.useEffect(() => {
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
      const parsedNotifications = JSON.parse(
        localStorage.getItem('BID_NOTIFICATIONS') || '{}',
      );
      if (
        typeof parsedNotifications === 'object' &&
        parsedNotifications !== null
      ) {
        setBidNotifications(parsedNotifications);
      }
    } catch (err) {
      console.error('Error parsing BID_NOTIFICATIONS:', err);
    }
  }, []);

  const isUserAvailable = storedUser?.name && storedUser?.email;
  const allMessages = Object.values(bidNotifications).flat();

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
          {/* 🔔 Notifications */}
          <div className="bell-notification-wrapper">
            <img src={BellIcon} alt="bell" className="bell-icon" />
            {allMessages.length > 0 && (
              <div className="notification-dropdown">
                <h4>🔔 Bid Activity</h4>
                <div className="notification-messages">
                  {allMessages.map((note: any, idx: number) => (
                    <p key={idx} className="notification-message">
                      {note.message}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 👤 User Info */}
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
