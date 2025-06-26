import React from 'react';

import productDataJson from '../../data/products.json';
import { ProductData } from '../../types/types';
import AddBidButton from '../addbidbutton';
import ActiveButton from '../activebutton';
import HomeHeader from '../homeheader';
import './styles.css';

export const AuctionProductData = () => {
  const products: ProductData[] = Array.isArray(productDataJson)
    ? productDataJson.map(item => ({
        ...(item as any),
        price: Number(item.price),
        startingPrice: Number(item.startingPrice),
      }))
    : [];

  return (
    <>
      <HomeHeader />
      <div className="main-product-container">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <ActiveButton />

            <p className="product-details">{product.imageDetails}</p>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-image"
            />
            <div className="product-name">
              <h3>{product.name}</h3>
              <p className="price">
                <strong>Price:</strong> ₹{product.price}
              </p>
              <p className="price">
                <strong>Starting Price:</strong> ₹{product.startingPrice}
              </p>
              <h4 className="time-left">Time Left:</h4>
            </div>

            <AddBidButton />
          </div>
        ))}
      </div>
    </>
  );
};

export default AuctionProductData;
