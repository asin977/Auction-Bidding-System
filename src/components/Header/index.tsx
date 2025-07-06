import React, { useEffect, useState } from 'react';

import MyImage from '../../assets/images/Logo.png';
import SignIcon from '../../assets/images/avatar.png';
import BellIcon from '../../assets/images/bell.png';
import Modal from '../Modal/homePage';
import { User } from '../../types/user';
import './styles.css';

type Notification = {
  userId: string;
  userName: string;
  amount: number;
  productName: string;
  timestamp?: number;
};

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [storedUser, setStoredUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userBids, setUserBids] = useState<Notification[]>([]);

  useEffect(() => {
    const parsedUser = JSON.parse(
      localStorage.getItem('LOGGED_IN_USER') || '{}'
    );

    if (parsedUser?.id && parsedUser?.name && parsedUser?.email) {
      setStoredUser(parsedUser);
      setNotifications([]);
      setUserBids([]);
    }
  }, []);

  useEffect(() => {
    if (!storedUser) return;

    const loadNotifications = () => {
      try {
        const allNotifications = JSON.parse(
          localStorage.getItem('BID_NOTIFICATIONS') || '{}'
        );

        const userBids: Notification[] = [];
        const otherBids: Notification[] = [];

        Object.values(allNotifications).forEach((messages: any) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg: any) => {
              const isValid =
                msg &&
                typeof msg.userId === 'string' &&
                typeof msg.userName === 'string' &&
                typeof msg.amount === 'number' &&
                typeof msg.productName === 'string' &&
                typeof msg.timestamp === 'number' &&
                !isNaN(msg.timestamp);

              if (!isValid) return;

              const bid: Notification = {
                userId: msg.userId,
                userName: msg.userName,
                amount: msg.amount,
                productName: msg.productName,
                timestamp: msg.timestamp,
              };

              if (bid.userId === storedUser.id) {
                userBids.push(bid);
              } else {
                otherBids.push(bid);
              }
            });
          }
        });

        const latestUserBidTime = userBids.reduce(
          (max, bid) => Math.max(max, bid.timestamp ?? 0),
          0
        );

        const filteredOtherBids =
        latestUserBidTime > 0
          ? otherBids
              .filter(bid => (bid.timestamp ?? 0) > latestUserBidTime)
              .sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0))
              .slice(0, 5)
          : []; // 
      
        const sortedUserBids = userBids
          .sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0))
          .slice(0, 5);

        setUserBids(sortedUserBids);
        setNotifications(filteredOtherBids);
      } catch (err) {
        console.error('Error loading notifications:', err);
      }
    };

    loadNotifications();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'BID_NOTIFICATIONS') {
        loadNotifications();
      }
    };

    const handleCustomUpdate = () => {
      loadNotifications();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('bidUpdate', handleCustomUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('bidUpdate', handleCustomUpdate);
    };
  }, [storedUser]);

  const isUserAvailable = storedUser?.name && storedUser?.email;

  const handleLogoutRequest = () => {
    setModalMessage('Are you sure you want to logout?');
    setShowModal(true);
  };

  const confirmLogout = () => {
    setStoredUser(null);
    setNotifications([]);
    setUserBids([]);
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
              <h4 className="latest-bid-title">🔔 Your Bids</h4>
              <div className="notification-messages">
                {userBids.length > 0 ? (
                  userBids.map((note, index) => (
                    <p key={`user-${index}`} className="notification-message">
                      🔔 You successfully placed the bid of ₹{note.amount} for "{note.productName}"
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
                {notifications.length > 0 ? (
                  notifications.map((note, index) => (
                    <p key={`other-${index}`} className="notification-message">
                      🔔 {note.userName} placed ₹{note.amount} for "{note.productName}"
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
