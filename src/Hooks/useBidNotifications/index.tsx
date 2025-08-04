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

  const relevantOtherUserBids = otherUserBids.filter(bid =>
    userProductIds.has(bid.productId),
  );

  const sortedOtherUserBids = relevantOtherUserBids
    .sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0))
    .slice(0, 5);

  return {
    userBids: sortedUserBids,
    otherUserBids: sortedOtherUserBids,
  };
};
