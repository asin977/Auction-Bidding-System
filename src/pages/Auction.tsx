import React from 'react';
import { useState, useEffect } from 'react';

import { ProductList } from '../types/product';
import Header from '../components/Header';
import productJsonData from '../data/products.json';

const Auction: React.FC = () => {
  return (
    <>
      <Header />
      <div className="action-title">
        <h3>Auction Collection Bids</h3>
      </div>
      <div className="product-list">
        {productJsonData.map((product: ProductList) => (
          <div key={product.id} className="product-item">
            <img src={product.imageUrl} alt={product.name} />
            <h4>{product.name}</h4>
            <p>Starting Price: ${product.startingPrice}</p>
            <p>Current Price: ${product.price}</p>
            <p>Time Left: {product.time}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Auction;
