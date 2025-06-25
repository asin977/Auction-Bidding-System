import React from 'react';
import {CollectionCard} from '../../components/FeatureCard'
import { collections } from '../../data/Collections';

export const CollectionDisplay = () => (
    <div>
      <h2 className='feature-heading'>Featured Collections</h2>
      <div className='feature-main-container'>
        {collections.map((data) => (
        <CollectionCard key={data.id} {...data} />
      ))}
      </div>
    </div>
)


