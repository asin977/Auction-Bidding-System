import React from 'react'
import { Collection } from '../../data/Collections';
import './index.css'

export const CollectionCard: React.FC<Collection> = (props) => (
  <div className='feature-container'>
    <div className="feature-card">
      <img src={props.imageUrl} alt={props.name} className='feature-image'/>
      <h3 className='feature-name'>{props.name}</h3>
    </div>
  </div>
)



