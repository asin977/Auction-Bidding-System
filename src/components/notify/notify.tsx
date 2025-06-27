import React, { useReducer } from 'react';

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
          `🟢 ${action.payload.user} placed ₹${action.payload.amount} at ${timestamp}`,
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


const BidSystem: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handlePlaceBid = (user: string, amount: number) => {
    if (!amount || isNaN(amount)) return;
    dispatch({ type: 'ADD_BID', payload: { user, amount } });
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h2>🏷️ Live Bidding</h2>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => handlePlaceBid('Alice', 5500)}>Alice bids ₹5500</button>{' '}
        <button onClick={() => handlePlaceBid('Bob', 7200)}>Bob bids ₹7200</button>{' '}
        <button onClick={() => handlePlaceBid('Charlie', 8800)}>Charlie bids ₹8800</button>
      </div>

      <h3>🔔 Notifications</h3>
      {state.notifications.length > 0 ? (
        <ul>
          {state.notifications.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
      ) : (
        <p>No new notifications.</p>
      )}
      <button onClick={() => dispatch({ type: 'CLEAR_NOTIFICATIONS' })}>
        Clear Notifications
      </button>

      <h3>📋 All Bids</h3>
      {state.bids.length > 0 ? (
        <ul>
          {state.bids.map((bid, i) => (
            <li key={i}>
              {bid.user} bid ₹{bid.amount} at {bid.timestamp}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bids yet. Be the first!</p>
      )}
    </div>
  );
};

export default BidSystem;
