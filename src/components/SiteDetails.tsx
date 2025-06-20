import React from 'react';
import '../styles/siteDetails.css';

export const SiteDetails = () => {
  return (
    <div className='main-site-container'>
      <div className='site-container'>
        <h1 className='name'>GravelGood-<span className='sub-head'> Your Real Time Auction Hub</span></h1>
        <p className='site-explanation'><strong>GravelGood</strong> is a real-time auction bidding platform designed to enable multiple users to participate in live auctions seamlessly.The system allows users to view auction items,place competitive bids,and receive instant updates on the highest bids.With a clean interface,fast bid handling,and real-time synchronisation,<strong>GravelGood</strong> ensures a smooth and engaging bidding experience for buyers and sellers alike.</p>
      </div>
    </div>
    
  )
}

