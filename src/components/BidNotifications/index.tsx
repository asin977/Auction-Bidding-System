import { useEffect, useState } from 'react';

import { User } from '../../types/user';

export type Notification = {
  userId: string;
  userName: string;
  amount: number;
  productName: string;
  timestamp?: number;
};

type NotificationResult = {
  userBids: Notification[];
  otherUserBids: Notification[];
};

export const useBidNotifications = (
  storedUser: User | null,
): NotificationResult => {
  const [userBids, setUserBids] = useState<Notification[]>([]);
  const [otherUserBids, setOtherUserBids] = useState<Notification[]>([]);

  const loadNotifications = () => {
    if (!storedUser) return;

    try {
      const raw = localStorage.getItem('BID_NOTIFICATIONS') || '{}';
      const allNotifications = JSON.parse(raw);

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

      setUserBids(
        userBids
          .sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0))
          .slice(0, 5),
      );
      setOtherUserBids(
        otherBids
          .sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0))
          .slice(0, 5),
      );
    } catch (err) {
      console.error('Failed to parse BID_NOTIFICATIONS:', err);
    }
  };

  useEffect(() => {
    if (storedUser) loadNotifications();
  }, [storedUser]);

  useEffect(() => {
    const onStorageChange = (event: StorageEvent) => {
      if (event.key === 'BID_NOTIFICATIONS') {
        loadNotifications();
      }
    };

    const onCustomBidUpdate = () => {
      loadNotifications();
    };

    window.addEventListener('storage', onStorageChange);
    window.addEventListener('bidUpdate', onCustomBidUpdate);

    return () => {
      window.removeEventListener('storage', onStorageChange);
      window.removeEventListener('bidUpdate', onCustomBidUpdate);
    };
  }, [storedUser]);

  return { userBids, otherUserBids };
};

