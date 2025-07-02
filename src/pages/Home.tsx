import React from 'react';

import Button from '../components/Button';
import ProductDetails from '../components/ProductDetails';
import CountDownTimer from '../components/CountDownTimer'; 
import productDataJson from '../data/products.json';
import { ProductList } from '../types/product';
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

          <ProductDetails />


          <CountDownTimer endTime={product.time} />

          <div className="button-container">
            <Button>Bid Now</Button>
            <Button>Active</Button>
          </div>
        </div>
      ))}
    </div>
  </>
);
