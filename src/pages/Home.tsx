import React, { useState, useEffect } from 'react';
import productDataJson from '../data/products.json';
import userDataJson from '../data/users.json';
import { ProductList } from '../types/product';
import { User } from '../types/product'; 
import Button from '../components/button';
import CountdownTimer from '../components/countdownTimer';
import './home.css';

export const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>(userDataJson);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [bidInputs, setBidInputs] = useState<Record<string, string>>({});
  const [bids, setBids] = useState<Record<string, { userId: string; amount: number }>>({});
  const [notifications, setNotifications] = useState<Record<string, string>>({});
  const [loadingBids, setLoadingBids] = useState<Record<string, boolean>>({});
  const [successBids, setSuccessBids] = useState<Record<string, boolean>>({});

  const handlePlaceBid = (productId: string) => {
    const user = users.find(u => u.id === selectedUser);
    const rawInput = bidInputs[productId]?.trim();
    const amount = Number(rawInput);

    const now = Date.now();
    const endTime = new Date(productDataJson.find(p => p.id === productId)?.time || '').getTime();
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

    if (amount <= (bids[productId]?.amount || 0)) {
      alert('Bid must be higher than current bid.');
      return;
    }

    if (amount > user.balance) {
      alert('Insufficient balance.');
      return;
    }

    setLoadingBids(prev => ({ ...prev, [productId]: true }));

    setTimeout(() => {
      setUsers(prev =>
        prev.map(u =>
          u.id === user.id ? { ...u, balance: u.balance - amount } : u
        )
      );

      setBids(prev => ({
        ...prev,
        [productId]: { userId: user.id, amount }
      }));

      setBidInputs(prev => ({ ...prev, [productId]: '' }));
      setSuccessBids(prev => ({ ...prev, [productId]: true }));
      setLoadingBids(prev => ({ ...prev, [productId]: false }));

      setTimeout(() => {
        setSuccessBids(prev => ({ ...prev, [productId]: false }));
      }, 2000);
    }, 1000);
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    Object.entries(bids).forEach(([productId, bidData]) => {
      const userName = users.find(u => u.id === bidData.userId)?.name || 'Someone';
      setNotifications(prev => ({
        ...prev,
        [productId]: `🚨 New bid of ₹${bidData.amount} placed by ${userName}`
      }));

      const timer = setTimeout(() => {
        setNotifications(prev => ({ ...prev, [productId]: '' }));
      }, 4000);

      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [bids, users]);

  return (
    <>
      <h3 className="auction-title">Auction Collection Bids</h3>

      <h3 className="user-title">Registered Users</h3>
      <ul className="user-list">
        {users.map(user => (
          <li key={user.id}>
            👤 {user.name} — ₹{user.balance.toLocaleString()}
          </li>
        ))}
      </ul>

      <div className="product-container">
        {productDataJson.map((product: ProductList) => {
          const currentBid = bids[product.id];
          const now = Date.now();
          const endTime = new Date(product.time).getTime();
          const isExpired = now >= endTime;

          return (
            <div key={product.id} className="product-card">
              <p className="product-details">{product.imageDetails}</p>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
              />

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
                  value={bidInputs[product.id] || ''}
                  onChange={e =>
                    setBidInputs({ ...bidInputs, [product.id]: e.target.value })
                  }
                  disabled={isExpired}
                />

                <Button
                  onClick={() => handlePlaceBid(product.id)}
                  disabled={loadingBids[product.id] || isExpired}
                >
                  {isExpired
                    ? 'Bidding Closed'
                    : loadingBids[product.id]
                    ? 'Placing...'
                    : successBids[product.id]
                    ? '✅ Success!'
                    : 'Place Bid'}
                </Button>

                {currentBid && (
                  <p className="current-bid">
                    Highest Bid: ₹{currentBid.amount} by{' '}
                    {users.find(u => u.id === currentBid.userId)?.name}
                  </p>
                )}

                {notifications[product.id] && (
                  <p className="notification">{notifications[product.id]}</p>
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
