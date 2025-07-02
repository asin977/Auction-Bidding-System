import React, { useReducer, useEffect, useState } from 'react';

import userLogo from '../assets/images/multipleuserslogo.png';
import Button from '../components/button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CountdownTimer from '../components/CountDownTimer';

import productDataJson from '../data/products.json';
import userDataJson from '../data/users.json';

import { ProductList } from '../types/product';
import { User } from '../types/user';
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

const auctionReducer = (
  state: AuctionState,
  action: AuctionAction,
): AuctionState => {
  switch (action.type) {
    case 'SET_INPUT':
      return {
        ...state,
        bidInputs: { ...state.bidInputs, [action.productId]: action.value },
      };
    case 'START_BID':
      return {
        ...state,
        loadingBids: { ...state.loadingBids, [action.productId]: true },
      };
    case 'BID_SUCCESS':
      return {
        ...state,
        bids: {
          ...state.bids,
          [action.productId]: { userId: action.userId, amount: action.amount },
        },
        successBids: { ...state.successBids, [action.productId]: true },
        loadingBids: { ...state.loadingBids, [action.productId]: false },
      };
    case 'CLEAR_INPUT':
      return {
        ...state,
        bidInputs: { ...state.bidInputs, [action.productId]: '' },
      };
    case 'SET_NOTIFICATION':
      return {
        ...state,
        notifications: {
          ...state.notifications,
          [action.productId]: action.message,
        },
      };
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        notifications: { ...state.notifications, [action.productId]: '' },
      };
    case 'RESET_SUCCESS':
      return {
        ...state,
        successBids: { ...state.successBids, [action.productId]: false },
      };
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

  useEffect(() => {
    const storedNotifications: Record<string, string> = JSON.parse(
      localStorage.getItem('NOTIFICATIONS') || '{}',
    );
    Object.entries(storedNotifications).forEach(([productId, message]) => {
      dispatch({ type: 'SET_NOTIFICATION', productId, message });
    });
  }, []);

  const placeBid = (productId: string) => {
    const user = users.find(u => u.id === selectedUser);
    const rawInput = state.bidInputs[productId]?.trim();
    const amount = Number(rawInput);
    const product = productDataJson.find(p => p.id === productId);
    const endTime = new Date(product?.time || '').getTime();
    const now = Date.now();
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
      alert('Bid must be greater than the current bid.');
      return;
    }

    if (amount <= (product?.startingPrice ?? 0)) {
      alert('Bid must be higher than the starting price.');
      return;
    }

    dispatch({ type: 'START_BID', productId });
    dispatch({ type: 'BID_SUCCESS', productId, userId: user.id, amount });
    dispatch({ type: 'CLEAR_INPUT', productId });

    const storedBids = JSON.parse(localStorage.getItem('BIDS') || '[]');
    const newBid = {
      userId: user.id,
      productId,
      amount,
      timer: Date.now(),
    };
    localStorage.setItem('BIDS', JSON.stringify([...storedBids, newBid]));

    const message = `📣 ₹${amount} bid placed by ${user.name} on "${product?.name}"`;

    dispatch({ type: 'SET_NOTIFICATION', productId, message });

    const existingNotifs = JSON.parse(
      localStorage.getItem('NOTIFICATIONS') || '{}',
    );
    const updatedNotifs = { ...existingNotifs, [productId]: message };
    localStorage.setItem('NOTIFICATIONS', JSON.stringify(updatedNotifs));

    setTimeout(() => {
      dispatch({ type: 'RESET_SUCCESS', productId });
    }, 2000);

    setSelectedUser('');
  };

  return (
    <>
      <Header />
      <h3 className="auction-title">Auction Collection Bids</h3>

      <div className="registered-users-container">
        <h3 className="registerd-users">REGISTERED USERS</h3>
        <img src={userLogo} alt="logo" className="user-logo" />
        <ul className="user-list">
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>

      <div className="product-container">
        {productDataJson.map((product: ProductList) => {
          const now = Date.now();
          const endTime = new Date(product.time).getTime();
          const isExpired = now >= endTime;
          const currentBid = state.bids[product.id];

          return (
            <div key={product.id} className="product-card">
              <h3 className="product-name">{product.name}</h3>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
              />
              <p className="product-details">{product.imageDetails}</p>
              <p className="price">
                <span>
                  <strong>Price:</strong> ₹{product.price}
                </span>
                <span>
                  <strong>Starting Price:</strong> ₹{product.startingPrice}
                </span>
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
                      {user.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Enter bid"
                  className="bid-input"
                  value={state.bidInputs[product.id] || ''}
                  onChange={e =>
                    dispatch({
                      type: 'SET_INPUT',
                      productId: product.id,
                      value: e.target.value,
                    })
                  }
                  disabled={isExpired}
                />

                <div className="bid-buttons">
                  <Button
                    onClick={() => placeBid(product.id)}
                    className="bid-button"
                    disabled={state.loadingBids[product.id] || isExpired}
                  >
                    {isExpired
                      ? 'Bidding Closed'
                      : state.loadingBids[product.id]
                      ? 'Placing...'
                      : state.successBids[product.id]
                      ? 'Success!'
                      : 'Place Bid'}
                  </Button>
                </div>

                {currentBid && (
                  <p className="current-bid">
                    Highest Bid: ₹{currentBid.amount} by{' '}
                    {users.find(u => u.id === currentBid.userId)?.name}
                  </p>
                )}

                {state.notifications[product.id] && (
                  <p className="notification-on-product">
                   📣 {state.notifications[product.id]}
                  </p>
                )}

                {isExpired && (
                  <p className="expired-message">
                    Bidding has ended for this item.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Footer />
    </>
  );
};
