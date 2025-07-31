import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import CountdownTimer from '../components/CountDownTimer';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Modal from '../components/Modal/homePage';
import productDataJson from '../data/products.json';
import { routes } from '../routes';
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
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('LOGGED_IN_USER');

    if (!userData) {
      setTimeout(() => navigate(routes.signin), 0);
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser?.id && parsedUser?.name && parsedUser?.email) {
        setUser(parsedUser);
      }
    } catch (err) {
      console.error('Error parsing user:', err);
    }

    const storedNotifications = localStorage.getItem('BID_NOTIFICATIONS');
    if (storedNotifications) {
      const parsed = JSON.parse(storedNotifications);
      Object.entries(parsed).forEach(([productId, messages]) => {
        const latest = Array.isArray(messages)
          ? messages[messages.length - 1]?.message
          : messages;
        if (latest) {
          dispatch({ type: 'SET_NOTIFICATION', productId, message: latest });
        }
      });
    }
  }, [navigate]);

  const triggerModal = (msg: string) => {
    setModalMessage(msg);
    setShowModal(true);
  };

  const placeBid = (productId: string) => {
    if (!user) return triggerModal('You must be logged in to place a bid.');

    const input = state.bidInputs[productId]?.trim();
    const bidAmount = Number(input);
    const product = productDataJson.find(p => p.id === productId);
    const now = Date.now();

    if (!input || isNaN(bidAmount) || bidAmount <= 0)
      return triggerModal('Please enter a valid bid amount.');
    if (!product) return triggerModal('Product not found.');

    const isExpired = now >= new Date(product.time).getTime();
    if (isExpired) return triggerModal('Bidding has ended for this product.');

    const currentBid = state.bids[productId]?.amount || 0;
    if (bidAmount <= currentBid)
      return triggerModal(
        `Bid must be greater than the current bid of ₹${currentBid}.`,
      );
    if (bidAmount < product.startingPrice)
      return triggerModal(
        `Bid must be at least the starting price of ₹${product.startingPrice}.`,
      );

    dispatch({ type: 'START_BID', productId });

    setTimeout(() => {
      dispatch({
        type: 'BID_SUCCESS',
        productId,
        userId: user.id,
        amount: bidAmount,
      });
      dispatch({ type: 'CLEAR_INPUT', productId });

      const storedBids = JSON.parse(localStorage.getItem('BIDS') || '[]');
      const updatedBids = [
        ...storedBids,
        { productId, amount: bidAmount, userName: user.name },
      ];
      localStorage.setItem('BIDS', JSON.stringify(updatedBids));

      const storedMessages = JSON.parse(
        localStorage.getItem('BID_NOTIFICATIONS') || '{}',
      );
      const newMessage = {
        userId: user.id,
        userName: user.name,
        amount: bidAmount,
        productName: product.name,
        timestamp: now,
      };
      storedMessages[productId] = [
        ...(storedMessages[productId] || []),
        newMessage,
      ];
      localStorage.setItem('BID_NOTIFICATIONS', JSON.stringify(storedMessages));
      localStorage.setItem('LAST_BID_PRODUCT_ID', productId);

      window.dispatchEvent(new Event('bidUpdate'));

      setTimeout(() => dispatch({ type: 'RESET_SUCCESS', productId }), 2000);
    }, 1000);
  };

  const getHighestBid = (productId: string) => {
    const bids = JSON.parse(localStorage.getItem('BIDS') || '[]');
    return bids
      .filter((bid: any) => bid.productId === productId)
      .sort((a: any, b: any) => b.amount - a.amount)[0];
  };

  return (
    <>
      <Header />
      <h3 className="auction-title">Auction Collection Bids</h3>

      {showModal && (
        <Modal message={modalMessage} onClose={() => setShowModal(false)} />
      )}

      <div className="product-container">
        {productDataJson.map(product => {
          const isExpired = Date.now() >= new Date(product.time).getTime();
          const topBid = getHighestBid(product.id);

          return (
            <div key={product.id} className="product-card">
              <h3 className="product-title">{product.name}</h3>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
              />
              <p className="product-details">{product.imageDetails}</p>
              <p className="product-price">
                <strong>Starting Price:</strong> ₹{product.startingPrice}
              </p>

              {topBid && (
                <p className="highest-bid-info">
                  Highest bid: ₹{topBid.amount} by {topBid.userName}
                </p>
              )}

              <CountdownTimer endTime={product.time} />

              <input
                type="number"
                placeholder="Enter bid amount"
                className="bid-input"
                value={state.bidInputs[product.id] || ''}
                onChange={e =>
                  dispatch({
                    type: 'SET_INPUT',
                    productId: product.id,
                    value: e.target.value,
                  })
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

              {state.successBids[product.id] && (
                <p className="success-message">Your bid was successful!</p>
              )}
              {isExpired && (
                <p className="expired-message">
                  ⏱️ Bidding has ended for this item.
                </p>
              )}
            </div>
          );
        })}
      </div>

      <Footer />
    </>
  );
};
