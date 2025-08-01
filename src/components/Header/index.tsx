import { useEffect, useState } from 'react';

import { User } from '../../types/user';
import { useBidNotifications } from '../BidNotifications';
import Modal from '../Modal/homePage';

import './styles.css';

import MyImage from '../../assets/images/Logo.png';
import SignIcon from '../../assets/images/avatar.png';
import BellIcon from '../../assets/images/bell.png';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [storedUser, setStoredUser] = useState<User | null>(null);

  useEffect(() => {
    const parsedUser = JSON.parse(
      localStorage.getItem('LOGGED_IN_USER') || '{}',
    );
    if (parsedUser?.id && parsedUser?.name && parsedUser?.email) {
      setStoredUser(parsedUser);
    }
  }, []);

  const { userBids, otherUserBids } = useBidNotifications(storedUser);

  const handleLogoutRequest = () => {
    setModalMessage('Are you sure you want to logout?');
    setShowModal(true);
  };

  const confirmLogout = () => {
    setStoredUser(null);
    window.location.href = '/signin';
  };

  const isUserAvailable = storedUser?.name && storedUser?.email;

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
              <h4 className="latest-bid-title">🔔 Your Bids</h4>
              <div className="notification-messages">
                {userBids.length > 0 ? (
                  userBids.map((note, index) => (
                    <p key={`user-${index}`} className="notification-message">
                      🔔 You have successfully placed the bid of ₹{note.amount} for "
                      {note.productName}"
                    </p>
                  ))
                ) : (
                  <p className="no-notification-message">
                    No bids placed yet...
                  </p>
                )}
              </div>

              <h4 className="latest-bid-title">👥 Other Users' Bids</h4>
              <div className="notification-messages">
                {otherUserBids.length > 0 ? (
                  otherUserBids.map((note, index) => (
                    <p key={`other-${index}`} className="notification-message">
                      🔔 {note.userName} placed ₹{note.amount} for "
                      {note.productName}"
                    </p>
                  ))
                ) : (
                  <p className="no-notification-message">
                    No new bids from others...
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="user-dropdown-wrapper">
            <img src={SignIcon} alt="menu" className="sign-img" />
            {isUserAvailable && (
              <div className="user-info-dropdown">
                <p className="icon-name">
                  <strong>Name:</strong> {storedUser?.name}
                </p>
                <p className="icon-name">
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
