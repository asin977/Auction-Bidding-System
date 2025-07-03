import React from 'react';

import Button from '../components/Button';
import CountDownTimer from '../components/CountDownTimer';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductDetails from '../components/ProductDetails';
import productDataJson from '../data/products.json';
import { ProductList } from '../types/product';
import './home.css';

export const Home: React.FC = () => (
  <>
    <Header />
    <h3 className="auction-title">Auction Collection Bids</h3>

    <div className="product-container">
      {(productDataJson || []).map((product: ProductList) => (
        <div key={product.id} className="product-card">
          <h3 className="product-title">{product.name}</h3>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
          />

          <ProductDetails />

          <CountDownTimer endTime={product.time} />
          <input
            type="number"
            placeholder="Enter bid amount"
            className="bid-input"
          />

          <Button>Place the Bid</Button>
        </div>
      ))}
    </div>
    <Footer />
  </>
);
