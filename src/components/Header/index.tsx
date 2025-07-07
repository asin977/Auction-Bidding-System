import { useState, useEffect } from 'react';

import MyImage from '../../assets/images/Logo.png';
import SignIcon from '../../assets/images/avatar.png';
import { User } from '../../types/user';
import './styles.css';

const Header = () => {
  const [storedUser, setStoredUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userBids, setUserBids] = useState<Notification[]>([]);

  useEffect(() => {
    const parsedUser = JSON.parse(
      localStorage.getItem('LOGGED_IN_USER') || '{}',
    );

    if (parsedUser?.id && parsedUser?.name && parsedUser?.email) {
      setStoredUser(parsedUser);
      setNotifications([]);
      setUserBids([]);
    }
  }, []);

  const isUserAvailable = storedUser?.name && storedUser?.email;

  return (
    <div className="header-main-container">
      <div className="container">
        <div className="img-container">
          <span className="site-name">GravelGood</span>
          <img src={MyImage} alt="logo" />
        </div>
        <div className="user-dropdown-wrapper">
          <img src={SignIcon} alt="menu" className="sign-icon" />
          {isUserAvailable && (
            <div className="user-info-dropdown">
              <p>
                <strong>Name:</strong> {storedUser?.name}
              </p>
              <p>
                <strong>Email:</strong> {storedUser?.email}
              </p>
              <button className="logout-btn">Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
