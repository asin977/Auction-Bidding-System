import React, { useEffect, useReducer, useState } from 'react';

import Button from '../components/Button';
import CountDownTimer from '../components/CountDownTimer';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductDetails from '../components/ProductDetails';
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
      const userData = localStorage.getItem('LOGGED_IN_USER');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, []);

  const placeBid = (productId: string) => {
    if (!user) {
      alert('You must be logged in to place a bid.');
      return;
    }
    const input = state.bidInputs[productId]?.trim();
    const bidAmount = Number(input);
    const product = productDataJson.find(product => product.id === productId);
    const now = new Date().getTime();
    const endTime = new Date(product?.time || '').getTime();
    const isExpired = now >= endTime;

    if (input || isNaN(bidAmount) || bidAmount <= 0) {
      alert('Please enter a valid bid amount..');
      return;
    }

    if (!product) {
      alert('Product not found.');
      return;
    }

    if (isExpired) {
      alert('Bidding has ended for this product..');
      return;
    }

    if (bidAmount <= (state.bids[productId]?.amount || 0)) {
      alert('Your bid must be higher than the current bid.');
      return;
    }
    if (bidAmount <= product.startingPrice) {
      alert('Your bid must be higher than the starting price.');
      return;
    }
    dispatch({ type: 'START_BID', productId });
    dispatch({
      type: 'BID_SUCCESS',
      productId,
      userId: user.id,
      amount: bidAmount,
    });
    dispatch({ type: 'CLEAR_INPUT', productId });

    const message = `Bid of ${bidAmount} placed successfully for ${product.name}.`;
    dispatch({ type: 'SET_NOTIFICATION', productId, message });

    const storedBids = JSON.parse(localStorage.getItem('bids') || '[]') as {
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
  };

  return (
    <>
      <Header />

      <h3 className="auction-title">Auction Collection Bids</h3>
      <div className="log-out-button">
        <Button>Logout</Button>
      </div>

      {user ? (
        <div className="user-details">
          <p className="user-name">
            Welcome, <strong>{user.name}!</strong>
          </p>
          email: <strong>{user.email}</strong>
        </div>
      ) : (
        <p className="user-name-nill">
          Please log in to participate in the auction.
        </p>
      )}

      <div className="product-container">
        {(productDataJson || []).map((product: ProductList) => {
          const now = new Date().getTime();
          const endTime = new Date(product.time || '').getTime();
          const isExpired = now >= endTime;

          return (
            <div key={product.id} className="product-card">
              <h3 className="product-title">{product.name}</h3>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
              />

              <ProductDetails />

              <CountDownTimer endTime={product.time} />
              <input
                type="number"
                placeholder="Enter bid amount"
                className="bid-input"
                value={state.bidInputs[product.id] || ''}
                onChange={event =>
                  dispatch({
                    type: 'SET_INPUT',
                    productId: product.id,
                    value: event.target.value,
                  })
                }
                disabled={!user || isExpired}
              />
              <div className='bid-buttons'></div>
              <Button
              onClick={() => placeBid(product.id)}
              className='bid-button'
              disabled = {state.loadingBids[product.id] || isExpired || !user}
            >
              {isExpired
                 ? 'Bidding Ended'
                 : state.loadingBids[product.id]
                 ? 'Placing...'
                 :state.successBids[product.id]
                 ?'Success!'
                 :'Place Bid'
              }
              </Button>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};
