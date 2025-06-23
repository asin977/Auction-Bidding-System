import React from 'react'
import { Product } from '../Data/products'
import { Link } from 'react-router-dom';
import '../styles/products.css'

export const ProductCard: React.FC<Product> = (props) => {
  <Link to='/home' />
  return (
        <div className='product-container'>
          <div className="product-card">
                <div className='button'>
                  <button className='active'>Active</button>
                </div>
                <p className='product-details'>{props.imageDetails}</p>
                <img src={props.imageUrl} alt={props.name} className="product-image" />
                <h3 className='product-name'>{props.name}</h3>
                <p><strong>Price:</strong> ₹{props.price.toLocaleString()}</p>
                <p><strong>Starting Price:</strong>₹{props.startingPrice.toLocaleString()}</p>
                <p><strong>Agreed Price:</strong> ₹{props.agreedPrice.toLocaleString()}</p>
                <div className='buttons'>
                  <button>View Lot</button>
                </div>
          </div>
      </div>
    )
}

export default ProductCard;