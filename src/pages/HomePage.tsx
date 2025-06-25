import React from 'react';
import ProductCard from '../components/products';
import { products } from '../data/products';

export const HomePage = () => {
  return (
    <div className="main-product-container">
      {products.map(data => (
        <ProductCard key={data.id} {...data} />
      ))}
    </div>
  );
};

export default HomePage;
