import React, { useEffect, useReducer, useState } from 'react';
import Button from '../components/Button';
import CountdownTimer from '../components/CountDownTimer';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Modal from '../components/Modal';
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
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  useEffect(() => {
    const storedUser = localStorage.getItem('LOGGED_IN_USER');
    if (storedUser) {
      try {
        const existingUser = JSON.parse(storedUser);
        if (existingUser?.id && existingUser?.name && existingUser?.email) {
          setUser(existingUser);
        }
      } catch (err) {
        console.error('Error parsing user:', err);
      }
    }

    const storedNotifications = localStorage.getItem('BID_NOTIFICATIONS');
    if (storedNotifications) {
      const parsedNotifications = JSON.parse(storedNotifications);
      Object.entries(parsedNotifications).forEach(([productId, messages]) => {
        const latest = Array.isArray(messages)
          ? messages[messages.length - 1]?.message
          : messages;
        if (latest) {
          dispatch({
            type: 'SET_NOTIFICATION',
            productId,
            message: latest,
          });
        }
      });
    }
  }, []);

  const triggerModal = (msg: string) => {
    setModalMessage(msg);
    setShowModal(true);
  };
  const placeBid = (productId: string) => {
    if (!user) {
      triggerModal('You must be logged in to place a bid.');
      return;
    }

    const input = state.bidInputs[productId]?.trim();
    const bidAmount = Number(input);
    const product = productDataJson.find(p => p.id === productId);
    const now = Date.now();
    const endTime = new Date(product?.time || '').getTime();
    const isExpired = now >= endTime;

    if (!input || isNaN(bidAmount) || bidAmount <= 0) {
      triggerModal('Please enter a valid bid amount.');
      return;
    }

    if (!product) {
      triggerModal('Product not found.');
      return;
    }

    if (isExpired) {
      triggerModal('Bidding has ended for this product.');
      return;
    }

    if (bidAmount <= (state.bids[productId]?.amount || 0)) {
      triggerModal('Bid must be greater than the current bid.');
      return;
    }

    if (bidAmount <= product.startingPrice) {
      triggerModal('Bid must be higher than the starting price.');
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

    const message = `₹${bidAmount} bid placed by ${user.name} on "${product.name}"`;
    dispatch({ type: 'SET_NOTIFICATION', productId, message });

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

    const updatedBids = storedBids.filter(
      bid => !(bid.productId === productId && bid.userId === user.id),
    );

    localStorage.setItem('BIDS', JSON.stringify([...updatedBids, newBid]));

    const existingNotifications = JSON.parse(
      localStorage.getItem('BID_NOTIFICATIONS') || '{}',
    );

    const updatedNotifications = {
      ...existingNotifications,
      [productId]: [
        ...(existingNotifications[productId] || []),
        { message, timestamp: now },
      ],
    };

    localStorage.setItem(
      'BID_NOTIFICATIONS',
      JSON.stringify(updatedNotifications),
    );

    localStorage.setItem('LAST_BID_PRODUCT_ID', productId);

    setTimeout(() => {
      dispatch({ type: 'RESET_SUCCESS', productId });
    }, 2000);
  };
  return (
    <>
      <Header />
      <h3 className="auction-title">Auction Collection Bids</h3>

      {showModal && (
        <Modal message={modalMessage} onClose={() => setShowModal(false)} />
      )}

      <div className="product-container">
        {productDataJson.map((product: ProductList) => {
          const now = Date.now();
          const endTime = new Date(product.time).getTime();
          const isExpired = now >= endTime;

          const storedBids = JSON.parse(localStorage.getItem('BIDS') || '[]');
          const highestBid = storedBids
            .filter((bid: { productId: string; amount: number; userName: string }) => bid.productId === product.id)
            .sort((a: { amount: number }, b: { amount: number }) => b.amount - a.amount)[0];

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
                <strong>Starting Price:</strong> ₹{product.startingPrice}
              </p>

              {highestBid && (
                <p className="highest-bid-info">
                  🏆 Highest bid: ₹{highestBid.amount} by {highestBid.userName}
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

              {state.notifications[product.id] && (
                <p className="bid-notification">
                  📢 {state.notifications[product.id]}
                </p>
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
