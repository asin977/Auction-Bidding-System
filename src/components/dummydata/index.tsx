import React from 'react';
import productDataJson from '../../data/products.json';
import { ProductData } from '../../types/types';

export function AuctionProductData() {
  const products: ProductData[] = Array.isArray(productDataJson)
    ? productDataJson.map(item => ({
        ...(item as any),
        price: Number(item.price),
        startingPrice: Number(item.startingPrice) || 0
      }))
    : [];

  return (
    <div className="main-product-container">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <div className="button">
            <button className="active">Active</button>
          </div>
          <p className="product-details">{product.imageDetails}</p>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
          />
          <div className="product-name">
            <h3>{product.name}</h3>
            <p>
              <strong>Starting Price:</strong> ₹{product.startingPrice}
            </p>
            <h4 className="time-left">Time Left:</h4>
          </div>
          <div className="buttons">
            <button>Add your Bid</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AuctionProductData;
