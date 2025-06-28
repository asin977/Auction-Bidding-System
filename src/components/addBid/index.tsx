import React, { useState } from 'react';
import './styles.css'; 

const BidInput: React.FC = () => {
  const [showInput, setShowInput] = useState(false);
  const [bidAmount, setBidAmount] = useState('');

  const handleBidSubmit = () => {
    if (!bidAmount || isNaN(Number(bidAmount))) {
      alert('Please enter a valid number.');
      return;
    }
    alert(`You placed a bid of ₹${bidAmount}`);
    setBidAmount('');
    setShowInput(false);
  };

  return (
    <div className="bid-lot-container">
      <button className="lot-button" onClick={() => setShowInput(true)}>
        Add Your Lot
      </button>

      {showInput && (
        <div className="bid-entry">
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            placeholder="Enter your bid amount"
          />
          <button onClick={handleBidSubmit}>Submit Bid</button>
        </div>
      )}
    </div>
  );
};

export default BidInput;
