import React, { useReducer, useEffect, useState } from 'react';
import productDataJson from '../../data/products.json';
import userDataJson from '../../data/users.json';
import { ProductList } from '../../types/product';
import { User } from '../../types/product';
import Button from '../../components/button';
import CountdownTimer from '../../components/countdownTimer';
import './home.css';


type AuctionState = {
  bidInputs: Record<string, string>;
  bids: Record<string, { userId: string; amount: number }>;
  loadingBids: Record<string, boolean>;
  successBids: Record<string, boolean>;
  notifications: Record<string, string>;
};

type AuctionAction =
  | { type: 'SET_INPUT'; productId: string; value: string }
  | { type: 'START_BID'; productId: string }
  | { type: 'BID_SUCCESS'; productId: string; userId: string; amount: number }
  | { type: 'CLEAR_INPUT'; productId: string }
  | { type: 'SET_NOTIFICATION'; productId: string; message: string }
  | { type: 'CLEAR_NOTIFICATION'; productId: string }
  | { type: 'RESET_SUCCESS'; productId: string };

const auctionReducer = (state: AuctionState, action: AuctionAction): AuctionState => {
  switch (action.type) {
    case 'SET_INPUT':
      return { ...state, bidInputs: { ...state.bidInputs, [action.productId]: action.value } };
    case 'START_BID':
      return { ...state, loadingBids: { ...state.loadingBids, [action.productId]: true } };
    case 'BID_SUCCESS':
      return {
        ...state,
        bids: { ...state.bids, [action.productId]: { userId: action.userId, amount: action.amount } },
        successBids: { ...state.successBids, [action.productId]: true },
        loadingBids: { ...state.loadingBids, [action.productId]: false }
      };
    case 'CLEAR_INPUT':
      return { ...state, bidInputs: { ...state.bidInputs, [action.productId]: '' } };
    case 'SET_NOTIFICATION':
      return { ...state, notifications: { ...state.notifications, [action.productId]: action.message } };
    case 'CLEAR_NOTIFICATION':
      return { ...state, notifications: { ...state.notifications, [action.productId]: '' } };
    case 'RESET_SUCCESS':
      return { ...state, successBids: { ...state.successBids, [action.productId]: false } };
    default:
      return state;
  }
};

const initialAuctionState: AuctionState = {
  bidInputs: {},
  bids: {},
  loadingBids: {},
  successBids: {},
  notifications: {},
};



export const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>(userDataJson);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [state, dispatch] = useReducer(auctionReducer, initialAuctionState);

  const handlePlaceBid = (productId: string, productEndTime: string) => {
    const user = users.find(u => u.id === selectedUser);
    const rawInput = state.bidInputs[productId]?.trim();
    const amount = Number(rawInput);

    const now = Date.now();
    const endTime = new Date(productEndTime).getTime();
    const isExpired = now >= endTime;

    if (isExpired) {
      alert('Bidding has ended for this product.');
      return;
    }

    if (!user) {
      alert('Please select a user.');
      return;
    }

    if (!rawInput || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid bid amount.');
      return;
    }

    if (amount <= (state.bids[productId]?.amount || 0)) {
      alert('Bid must be higher than current bid.');
      return;
    }

    if (amount > user.balance) {
      alert('Insufficient balance.');
      return;
    }

    dispatch({ type: 'START_BID', productId });

    setTimeout(() => {
      // Deduct balance
      setUsers(prev =>
        prev.map(u =>
          u.id === user.id ? { ...u, balance: u.balance - amount } : u
        )
      );

      dispatch({ type: 'BID_SUCCESS', productId, userId: user.id, amount });
      dispatch({ type: 'CLEAR_INPUT', productId });

      setTimeout(() => {
        dispatch({ type: 'RESET_SUCCESS', productId });
      }, 2000);
    }, 1000);
  };

  
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    Object.entries(state.bids).forEach(([productId, bidData]) => {
      const userName = users.find(u => u.id === bidData.userId)?.name || 'Someone';
      dispatch({
        type: 'SET_NOTIFICATION',
        productId,
        message: `🚨 New bid of ₹${bidData.amount} by ${userName}`
      });

      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION', productId });
      }, 4000);

      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [state.bids, users]);

  return (
    <>
      <h3 className="auction-title">Auction Collection Bids</h3>

      <div className="product-container">
        {productDataJson.map((product: ProductList) => {
          const now = Date.now();
          const endTime = new Date(product.time).getTime();
          const isExpired = now >= endTime;
          const currentBid = state.bids[product.id];

          return (
            <div key={product.id} className="product-card">
              <p className="product-details">{product.imageDetails}</p>
              <img src={product.imageUrl} alt={product.name} className="product-image" />

              <h3 className="product-name">Name: {product.name}</h3>
              <p className="price">
                <span><strong>Price:</strong> ₹{product.price}</span>
                <span><strong>Starting Price:</strong> ₹{product.startingPrice}</span>
              </p>

              <CountdownTimer endTime={product.time} />

              <div className="bid-interaction">
                <select
                  value={selectedUser}
                  onChange={e => setSelectedUser(e.target.value)}
                  disabled={isExpired}
                >
                  <option value="">Select user</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} (₹{user.balance.toLocaleString()})
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Enter bid"
                  value={state.bidInputs[product.id] || ''}
                  onChange={e =>
                    dispatch({ type: 'SET_INPUT', productId: product.id, value: e.target.value })
                  }
                  disabled={isExpired}
                />

                <Button
                  onClick={() => handlePlaceBid(product.id, product.time)}
                  disabled={state.loadingBids[product.id] || isExpired}
                >
                  {isExpired
                    ? 'Bidding Closed'
                    : state.loadingBids[product.id]
                    ? 'Placing...'
                    : state.successBids[product.id]
                    ? '✅ Success!'
                    : 'Place Bid'}
                </Button>

                {currentBid && (
                  <p className="current-bid">
                    Highest Bid: ₹{currentBid.amount} by{' '}
                    {users.find(u => u.id === currentBid.userId)?.name}
                  </p>
                )}

                {state.notifications[product.id] && (
                  <p className="notification">{state.notifications[product.id]}</p>
                )}

                {isExpired && (
                  <p className="expired-message">⏱️ Bidding has ended for this item.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
