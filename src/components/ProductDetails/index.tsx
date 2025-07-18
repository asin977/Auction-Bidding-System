import React from 'react';

import productDataJson from '../../data/products.json';

const ProductDetails: React.FC = () => {
  const product = productDataJson[0];

  return (
    <>
      <h3 className="product-title">{product.name}</h3>
      <p className="product-price">
        <span>
          <strong>Price:</strong> ₹{product.price}
        </span>
        <span>
          <strong>Starting Price:</strong> ₹{product.startingPrice}
        </span>
      </p>
    </>
  );
};

export default ProductDetails;
