import React from 'react';

import { User } from '../../types/user';
import { useBidNotifications } from '../../Hooks/BidNotifications';

import BellIcon from '../../assets/images/bell.png';

type Props = {
  storedUser: User | null;
};

const NotificationsDropdown: React.FC<Props> = ({ storedUser }) => {
  const { userBids, otherUserBids } = useBidNotifications(storedUser);

  return (
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
            <p className="no-notification-message">No bids placed yet...</p>
          )}
        </div>

        <h4 className="latest-bid-title">👥 Other Users' Bids</h4>
        <div className="notification-messages">
          {otherUserBids.length > 0 ? (
            otherUserBids.map((note, index) => (
              <p key={`other-${index}`} className="notification-message">
                🔔 {note.userName} placed ₹{note.amount} for "{note.productName}
                "
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
  );
};

export default NotificationsDropdown;
