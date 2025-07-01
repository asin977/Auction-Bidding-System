import React, { useState } from 'react';

import userLogo from '../assets/images/multipleuserslogo.png';
import Button from '../components/Button';
import productDataJson from '../data/products.json';
import userDataJson from '../data/uers.json';
import { ProductList } from '../types/product';
import { User } from '../types/user';
import './home.css';

export const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>(userDataJson);

  return (
    <>
      <h3 className="auction-title">Auction Collection Bids</h3>
      <div className="registered-users-container">
        <h3 className="registerd-users">REGISTERED USERS</h3>
        <img src={userLogo} alt="logo" className="user-logo" />
        <ul className="user-list">
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
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
              <Button>Add your lot</Button>
              <Button>Active</Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
