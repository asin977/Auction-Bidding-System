import React, { useMemo, useRef, useState } from 'react';

import { User } from '../../types/user';
import Button from '../Button';

import UserIcon from '../../assets/images/avatar.png';

import './styles.css';

type Props = {
  user: User | null;
  onLogoutClick: () => void;
};

const UserDropdown: React.FC<Props> = ({ user, onLogoutClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isUserAvailable = !!user?.name && !!user?.email;

  const displayedUserName = useMemo(() => {
    if (user?.firstName || user?.lastName) {
      return `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
    }
    return user?.name || 'User';
  }, [user]);

  if (!isUserAvailable) return null;

  return (
    <div
      className="user-dropdown-container"
      style={{ position: 'relative' }}
      ref={dropdownRef}
    >
      <img
        src={UserIcon}
        alt="User Avatar"
        style={{
          width: 35,
          height: 35,
          borderRadius: '50%',
          cursor: 'pointer',
        }}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="user-dropdown-wrapper">
          <p>
            <strong>Name:</strong> {displayedUserName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <Button
            onClick={() => {
              setIsOpen(false);
              onLogoutClick();
            }}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
