import React from 'react';
import CollectionCard from './collectionCard';
import { collections } from '../data/Collections';

const CollectionDisplay = () => {
  return (
    <div>
      <h2 className='feature-heading'>Featured Collections</h2>
      <div className='feature-main-container'>
         {collections.map((data) => (
        <CollectionCard key={data.id} {...data} />
      ))}
      </div>
    </div>
    
  );
}

export default CollectionDisplay;
