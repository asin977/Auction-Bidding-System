import React from 'react';

import productDataJson from '../data/products.json';
import { ProductList } from '../types/product';
import Button from '../components/button';
import './home.css';

export const Home: React.FC = () => (
  <>
    <h3 className="auction-title">Auction Collection Bids</h3>

    <div className="product-container">
      {(productDataJson || []).map((product: ProductList) => (
        <div key={product.id} className="product-card">
          <p className="product-details">{product.imageDetails}</p>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
          />
          <h3 className="product-name">Name: {product.name}</h3>
          <p className="price">
            <span>
              <strong>Price:</strong> ₹{product.price}
            </span>
            <span>
              <strong>Starting Price:</strong> ₹{product.startingPrice}
            </span>
          </p>

          <div className="button-container">
            <Button> Bid Now</Button>
            <Button>Active</Button>
          </div>
        </div>
      ))}
    </div>
  </>
);
