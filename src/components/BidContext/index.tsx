import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

type Notification = {
  userId: string;
  userName: string;
  amount: number;
  productName: string;
  timestamp?: number;
};

type BidContextType = {
  notifications: Notification[];
  addBidNotification: (bid: Notification) => void;
  loadNotifications: () => void;
};

const BidContext = createContext<BidContextType | undefined>(undefined);

export const BidProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const loadNotifications = () => {
    try {
      const raw = localStorage.getItem('BID_NOTIFICATIONS') || '{}';
      const allNotifications = JSON.parse(raw);
      const result: Notification[] = [];

      for (const key in allNotifications) {
        const bids = allNotifications[key];
        if (Array.isArray(bids)) {
          for (const bid of bids) {
            const isValid =
              bid &&
              typeof bid.userId === 'string' &&
              typeof bid.userName === 'string' &&
              typeof bid.amount === 'number' &&
              typeof bid.productName === 'string' &&
              typeof bid.timestamp === 'number';

            if (isValid) {
              result.push(bid);
            }
          }
        }
      }

      setNotifications(
        result.sort((a, b) => (a.timestamp ?? 0) - (b.timestamp ?? 0)),
      );
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  };

  const addBidNotification = (bid: Notification) => {
    const stored = localStorage.getItem('BID_NOTIFICATIONS') || '{}';
    const all = JSON.parse(stored);

    if (!Array.isArray(all[bid.productName])) {
      all[bid.productName] = [];
    }

    all[bid.productName].push(bid);
    localStorage.setItem('BID_NOTIFICATIONS', JSON.stringify(all));

    setNotifications(prev => {
      const updated = [...prev, bid];
      return updated.sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0));
    });

    const bidUpdateEvent = new Event('bidUpdate');
    window.dispatchEvent(bidUpdateEvent);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

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
  if (!context) {
    throw new Error('useBidContext must be used within a BidProvider');
  }
  return context;
};
