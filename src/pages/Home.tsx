import React, { useReducer, useState } from 'react';

import userLogo from '../assets/images/multipleuserslogo.png';
import Button from '../components/button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import productDataJson from '../data/products.json';
import userDataJson from '../data/uers.json';
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

export type AuctionAction =
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
          [action.productId]: {
            userId: action.userId,
            amount: action.amount,
          },
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

  const placeBid = () => (productId: string) => {
    const user = users.find(user => user.id === selectedUser);
    const rawInput = state.bidInputs[productId]?.trim();
    const amount = Number(rawInput);

    if (!user) {
      alert('Please select a user..');
      return;
    }

    if (!rawInput || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid bid amount..');
      return;
    }

    if (amount <= (state.bids[productId]?.amount || 0)) {
      alert('Bid must be greater than the current bid.');
      return;
    }
    if (
      amount <
      (productDataJson.find(product => product.id === productId)
        ?.startingPrice ?? 0)
    ) {
      alert('Bid must be greater than the starting price');
      return;
    }
    dispatch({ type: 'START_BID', productId });
    dispatch({
      type: 'BID_SUCCESS',
      productId,
      userId: user.id,
      amount: amount,
    });
    dispatch({ type: 'CLEAR_INPUT', productId });
    setTimeout(() => {
      dispatch({ type: 'RESET_SUCCESS', productId });
    });

    dispatch({
      type: 'SET_NOTIFICATION',
      productId,
      message: `Bid of ₹${amount} placed by ${user.name} for product ${
        productDataJson.find(product => product.id === productId)?.name
      }.`,
    });
    setSelectedUser('');
  };
  return (
    <>
      <Header />
      <h3 className="auction-title">Auction Collection Bids</h3>

      <div className="product-container">
        {productDataJson.map((product: ProductList) => {
          const now = Date.now();
          const endTime = new Date(product.time).getTime();
          const isExpired = now >= endTime;
          const currentBid = state.bids[product.id];

          return (
            <div key={product.id} className="product-card">
              <h3 className="product-name"> {product.name}</h3>
              <p className="product-details">{product.imageDetails}</p>
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

              <div className="bid-interaction">
                <select
                  value={selectedUser}
                  onChange={e => setSelectedUser(e.target.value)}
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
                  placeholder="Enter bid" className='bid-input'
                  value={state.bidInputs[product.id] || ''}
                  onChange={e =>
                    dispatch({
                      type: 'SET_INPUT',
                      productId: product.id,
                      value: e.target.value,
                    })
                  }
                />

                {currentBid && (
                  <p className="current-bid">
                    Highest Bid: ₹{currentBid.amount} by{' '}
                    {users.find(u => u.id === currentBid.userId)?.name}
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
