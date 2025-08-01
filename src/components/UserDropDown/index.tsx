import React from 'react';

import { User } from '../../types/user';

import SignIcon from '../../assets/images/avatar.png';

type Props = {
  user: User | null;
  onLogoutClick: () => void;
};

const UserDropdown: React.FC<Props> = ({ user, onLogoutClick }) => {
  const isUserAvailable = user?.name && user?.email;

  return (
    <div className="user-dropdown-wrapper">
      <img src={SignIcon} alt="menu" className="sign-img" />
      {isUserAvailable && (
        <div className="user-info-dropdown">
          <p className="icon-name">
            <strong>Name:</strong> {user?.name}
          </p>
          <p className="icon-name">
            <strong>Email:</strong> {user?.email}
          </p>
          <button className="logout-btn" onClick={onLogoutClick}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
