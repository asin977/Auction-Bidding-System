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

  if (!storedUser) {
    return { userBids: [], otherUserBids: [] };
  }

  const userBids: Notification[] = [];
  const otherUserBids: Notification[] = [];

  notifications.forEach(bid => {
    if (bid.userId === storedUser.id) {
      userBids.push(bid);
    } else {
      otherUserBids.push(bid);
    }
  });

  const sortedUserBids = userBids
    .sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0))
    .slice(0, 5);

  const userProductIds = new Set(userBids.map(bid => bid.productId));

  const latestOtherBidsMap = new Map<string, Notification>();

  otherUserBids.forEach(bid => {
    if (!userProductIds.has(bid.productId)) return;

    const existing = latestOtherBidsMap.get(bid.productId);
    const bidTimestamp = bid.timestamp ?? 0;
    const existingTimestamp = existing?.timestamp ?? 0;

    if (!existing || bidTimestamp > existingTimestamp) {
      latestOtherBidsMap.set(bid.productId, bid);
    }
  });

  const sortedOtherUserBids = Array.from(latestOtherBidsMap.values())
    .sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0))
    .slice(0, 5);

  return {
    userBids: sortedUserBids,
    otherUserBids: sortedOtherUserBids,
  };
};
