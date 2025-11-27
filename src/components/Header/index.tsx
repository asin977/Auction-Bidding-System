import { useEffect, useState } from 'react';

import { LOGGED_IN_USER } from '../../constants/common';
import { User } from '../../types/user';
import Modal from '../Modal/homePage';
import NotificationsDropdown from '../Notification';
import UserDropdown from '../UserDropDown';

import MyImage from '../../assets/images/Logo.png';

import './styles.css';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [storedUser, setStoredUser] = useState<User | null>(null);

  useEffect(() => {
    const parsedUser = JSON.parse(
      localStorage.getItem(LOGGED_IN_USER) || '{}',
    );
    if (parsedUser?.id && parsedUser?.name && parsedUser?.email) {
      setStoredUser(parsedUser);
    }
  }, []);

  const handleLogoutRequest = () => {
    setModalMessage('Are you sure you want to logout?');
    setShowModal(true);
  };

  const confirmLogout = () => {
    setStoredUser(null);
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
          <NotificationsDropdown storedUser={storedUser} />
          <UserDropdown user={storedUser} onLogoutClick={handleLogoutRequest} />
        </div>
      </div>
    </div>
  );
};

export default Header;
