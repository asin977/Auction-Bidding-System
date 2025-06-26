import React from 'react';

import productDataJson from '../../data/products.json';
import { ProductData } from '../../types/types';
import ActiveButton from '../activebutton';
import HomeHeader from '../homeheader';
import './styles.css';
import AddBidButton from '../addbidButton';

export const AuctionProductData = () => {
  return (
    <>
    <HomeHeader />
    
    <div className="main-product-container">
      {(productDataJson as ProductData[]).map((product: ProductData) => (
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
            </div>

            <AddBidButton />
        </div>
      ))}
    </div>
    </>
    
  );
};

export default AuctionProductData;
