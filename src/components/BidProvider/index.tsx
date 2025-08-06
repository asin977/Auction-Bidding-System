import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Notification } from '../../types/notification';

type BidContextType = {
  notifications: Notification[];
  addBidNotification: (bid: Notification) => void;
  loadNotifications: () => void;
};

const BID_NOTIFICATIONS = 'BID_NOTIFICATIONS';

const BidContext = createContext<BidContextType | undefined>(undefined);

const isValidBid = (bid: Notification) => {
  return (
    bid &&
    typeof bid.userId === 'string' &&
    typeof bid.userName === 'string' &&
    typeof bid.amount === 'number' &&
    typeof bid.productName === 'string' &&
    typeof bid.timestamp === 'number'
  );
};

export const BidProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const loadNotifications = useCallback(() => {
    const notifications = JSON.parse(
      localStorage.getItem(BID_NOTIFICATIONS) || '{}',
    );

    const allBids = Object.values(notifications)
      .filter(Array.isArray)
      .flat()
      .filter(isValidBid);

    const sorted = allBids.sort(
      (a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0),
    );
    setNotifications(sorted);
  }, []);

  const addBidNotification = (bid: Notification) => {
    try {
      const notifications = JSON.parse(
        localStorage.getItem(BID_NOTIFICATIONS) || '{}',
      );

      if (!Array.isArray(notifications[bid.productName])) {
        notifications[bid.productName] = [];
      }

      notifications[bid.productName].push(bid);
      localStorage.setItem(BID_NOTIFICATIONS, JSON.stringify(notifications));

      setNotifications(prev => {
        const updated = [...prev, bid];
        return updated.sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0));
      });
    } catch {}
  };

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  return (
    <BidContext.Provider
      value={{ notifications, addBidNotification, loadNotifications }}
    >
      {children}
    </BidContext.Provider>
  );
};

export const useBidContext = (): BidContextType => {
  const context = useContext(BidContext);
  return (
    context || {
      notifications: [],
      addBidNotification: () => {},
      loadNotifications: () => {},
    }
  );
};
