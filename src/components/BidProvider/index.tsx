import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { BIDS } from '../../constants/common';
import { Notification } from '../../types/notification';
import { User } from '../../types/user';

type BidContextType = {
  bids: Notification[];
  addNewBid: (bid: Notification) => void;
  loadBids: () => void;
};

const BidContext = createContext<BidContextType | undefined>(undefined);

export const BidProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [bids, setBids] = useState<Notification[]>([]);

  const loadBids = useCallback(() => {
    try {
      const stored = localStorage.getItem(BIDS);
      const parsed = stored ? JSON.parse(stored) : [];

      if (Array.isArray(parsed)) {
        setBids(parsed as Notification[]);
      } else {
        setBids([]);
      }
    } catch (error) {
      setBids([]);
    }
  }, []);

  const addNewBid = (bid: Notification) => {
    try {
      const timestampedBid = {
        ...bid,
        timestamp: bid.timestamp ?? Date.now(),
      };

      const stored = localStorage.getItem(BIDS);
      const existing = stored ? JSON.parse(stored) : [];

      const updated = Array.isArray(existing)
        ? [...existing, timestampedBid]
        : [timestampedBid];

      localStorage.setItem(BIDS, JSON.stringify(updated));

      setBids(prev =>
        [...prev, timestampedBid].sort(
          (a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0),
        ),
      );
    } catch (error) {}
  };

  useEffect(() => {
    loadBids();
  }, [loadBids]);

  return (
    <BidContext.Provider value={{ bids, addNewBid, loadBids }}>
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

type NotificationResult = {
  userBids: Notification[];
  otherUserBids: Notification[];
};

export const useBidNotifications = (
  storedUser: User | null,
): NotificationResult => {
  const { bids } = useBidContext();

  if (!storedUser) {
    return { userBids: [], otherUserBids: [] };
  }

  const groupedBids: Record<string, Notification[]> = {};
  bids.forEach(bid => {
    if (!groupedBids[bid.productId]) {
      groupedBids[bid.productId] = [];
    }
    groupedBids[bid.productId].push(bid);
  });

  const userBids: Notification[] = [];
  const otherUserBids: Notification[] = [];

  Object.entries(groupedBids).forEach(([productId, productBids]) => {
    const latestBidByUser: Record<string, Notification> = {};

    productBids.forEach(bid => {
      const existing = latestBidByUser[bid.userId];
      const bidTime = bid.timestamp ?? 0;
      const existingTime = existing?.timestamp ?? 0;

      if (!existing || bidTime > existingTime) {
        latestBidByUser[bid.userId] = bid;
      }
    });

    const userLatestBid = latestBidByUser[storedUser.id];
    if (!userLatestBid) {
      return;
    }

    const userLatestTimestamp = userLatestBid.timestamp ?? 0;

    userBids.push(userLatestBid);

    Object.entries(latestBidByUser).forEach(([userId, bid]) => {
      if (userId !== storedUser.id) {
        const bidTimestamp = bid.timestamp ?? 0;
        if (bidTimestamp > userLatestTimestamp) {
          otherUserBids.push(bid);
        }
      }
    });
  });

  userBids.sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0));
  otherUserBids.sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0));

  const limitedOtherUserBids = otherUserBids;

  return {
    userBids,
    otherUserBids: limitedOtherUserBids,
  };
};
