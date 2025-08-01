import { useMemo } from 'react';

import { Notification, useBidContext } from '../../components/BidContext';
import { User } from '../../types/user';

type NotificationResult = {
  userBids: Notification[];
  otherUserBids: Notification[];
};

export const useBidNotifications = (
  storedUser: User | null,
): NotificationResult => {
  const { notifications } = useBidContext();

  const { userBids, otherUserBids } = useMemo(() => {
    if (!storedUser) return { userBids: [], otherUserBids: [] };

    const userBids: Notification[] = [];
    const otherBids: Notification[] = [];

    notifications.forEach(bid => {
      if (bid.userId === storedUser.id) {
        userBids.push(bid);
      } else {
        otherBids.push(bid);
      }
    });

    const sortedUserBids = userBids
      .sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0))
      .slice(0, 5);

    const sortedOtherUserBids = otherBids
      .sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0))
      .slice(0, 5);

    return {
      userBids: sortedUserBids,
      otherUserBids: sortedOtherUserBids,
    };
  }, [notifications, storedUser]);

  return { userBids, otherUserBids };
};
