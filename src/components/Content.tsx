import React from 'react'
import '../styles/content.css';
import  MyImage from '../images/search (1).png'

export const Content = () => {
    
  return (
    <div className='content-container'>
       <h3 className='heading'>Auction lots</h3>
       <p className='sub-content'>Browse our collections and select the items you wish to bid on...</p>
       <div className='search-box-container'>
            <input type="text"
             placeholder='Search items...' className='search-input'/>
            <img src={MyImage} alt="search-bar" className='search-icon'/>
       </div>
    </div>
  )
}

export default Content
