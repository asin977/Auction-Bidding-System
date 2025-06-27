type Bid = {
    user: string;
    amount: number;
    timestamp: string;
  };
  
  type State = {
    bids: Bid[];
    notifications: string[];
  };
  
  type Action =
    | { type: 'ADD_BID'; payload: { user: string; amount: number } }
    | { type: 'CLEAR_NOTIFICATIONS' };
  
  const initialState: State = {
    bids: [],
    notifications: [],
  };
  
  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'ADD_BID': {
        const timestamp = new Date().toLocaleTimeString();
        const newBid: Bid = {
          user: action.payload.user,
          amount: action.payload.amount,
          timestamp,
        };
        return {
          bids: [newBid, ...state.bids],
          notifications: [
            `🟢 ${action.payload.user} placed a bid of ₹${action.payload.amount}`,
            ...state.notifications,
          ],
        };
      }
      case 'CLEAR_NOTIFICATIONS':
        return { ...state, notifications: [] };
      default:
        return state;
    }
  };
  