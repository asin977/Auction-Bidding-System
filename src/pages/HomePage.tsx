import React from 'react'
import ProductCard from '../components/ProductCard'
import { products } from '../Data/products';


export const HomePage = () => {
  return (
    <div>
      {products.map((data)=> (
        <ProductCard key={data.id} {...data}/>
      ))}
    </div>
  )
}

export default HomePage
