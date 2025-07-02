import React, { useEffect, useReducer, useState } from 'react';
import Button from '../components/Button';
import CountdownTimer from '../components/CountDownTimer';
import Footer from '../components/Footer';
import Header from '../components/Header';
import productDataJson from '../data/products.json';
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
  | { type: 'RESET_SUCCESS'; productId: string };

const initialAuctionState: AuctionState = {
  bidInputs: {},
  bids: {},
  loadingBids: {},
  successBids: {},
  notifications: {},
};

const auctionReducer = (state: AuctionState, action: AuctionAction): AuctionState => {
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
        notifications: { ...state.notifications, [action.productId]: action.message },
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

export const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [state, dispatch] = useReducer(auctionReducer, initialAuctionState);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('LOGGED_IN_USER');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.id && parsedUser?.name && parsedUser?.email) {
          setUser(parsedUser);
        }
      }
    } catch (err) {
      console.error('Could not parse LOGGED_IN_USER:', err);
    }

    // Optional: clear all bids on first load
    // localStorage.removeItem('BIDS');
  }, []);

  const placeBid = (productId: string) => {
    if (!user) {
      alert('You must be logged in to place a bid.');
      return;
    }

    const input = state.bidInputs[productId]?.trim();
    const bidAmount = Number(input);
    const product = productDataJson.find(p => p.id === productId);
    const now = Date.now();
    const endTime = new Date(product?.time || '').getTime();
    const isExpired = now >= endTime;

    if (!input || isNaN(bidAmount) || bidAmount <= 0) {
      alert('Please enter a valid bid amount.');
      return;
    }

    if (!product) {
      alert('Product not found.');
      return;
    }

    if (isExpired) {
      alert('Bidding has ended for this product.');
      return;
    }

    if (bidAmount <= (state.bids[productId]?.amount || 0)) {
      alert('Bid must be greater than the current bid.');
      return;
    }

    if (bidAmount <= product.startingPrice) {
      alert('Bid must be higher than the starting price.');
      return;
    }

    dispatch({ type: 'START_BID', productId });
    dispatch({ type: 'BID_SUCCESS', productId, userId: user.id, amount: bidAmount });
    dispatch({ type: 'CLEAR_INPUT', productId });

    const storedBids = JSON.parse(localStorage.getItem('BIDS') || '[]') as {
      productId: string;
      userId: string;
      amount: number;
      userName: string;
      timer: number;
    }[];

    const newBid = {
      productId,
      userId: user.id,
      userName: user.name,
      amount: bidAmount,
      timer: now,
    };

    // Remove user's previous bid on the same product
    const updatedBids = storedBids.filter(
      (bid) => !(bid.productId === productId && bid.userId === user.id)
    );

    localStorage.setItem('BIDS', JSON.stringify([...updatedBids, newBid]));

    const message = `₹${bidAmount} bid placed by ${user.name} on "${product.name}"`;
    dispatch({ type: 'SET_NOTIFICATION', productId, message });

    setTimeout(() => {
      dispatch({ type: 'RESET_SUCCESS', productId });
    }, 2000);
  };

  return (
    <>
      <Header />
      <h3 className="auction-title">Auction Collection Bids</h3>

      {user ? (
        <div className="welcome-message">
          👋 Welcome, <strong>{user.name}</strong><br />
          📧 Your email: <em>{user.email}</em>
        </div>
      ) : (
        <div className="login-warning">
          ⚠️ Please <a href="/signin">sign in</a> to place bids.
        </div>
      )}

      <div className="product-container">
        {productDataJson.map((product: ProductList) => {
          const now = Date.now();
          const endTime = new Date(product.time).getTime();
          const isExpired = now >= endTime;

          return (
            <div key={product.id} className="product-card">
              <h3 className="product-name">{product.name}</h3>
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <p className="product-details">{product.imageDetails}</p>
              <p className="price">
                <strong>Price:</strong> ₹{product.price} | <strong>Starting Price:</strong> ₹{product.startingPrice}
              </p>

              <CountdownTimer endTime={product.time} />

              <input
                type="number"
                placeholder="Enter bid amount"
                className="bid-input"
                value={state.bidInputs[product.id] || ''}
                onChange={(e) =>
                  dispatch({ type: 'SET_INPUT', productId: product.id, value: e.target.value })
                }
                disabled={!user || isExpired}
              />

              <div className="bid-buttons">
                <Button
                  onClick={() => placeBid(product.id)}
                  className="bid-button"
                  disabled={state.loadingBids[product.id] || isExpired || !user}
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

              {state.notifications[product.id] && (
                <p className="notification-on-product">📣 {state.notifications[product.id]}</p>
              )}

              {isExpired && (
                <p className="expired-message">⏱️ Bidding has ended for this item.</p>
              )}
            </div>
          );
        })}
      </div>

      <Footer />
    </>
  );
};
