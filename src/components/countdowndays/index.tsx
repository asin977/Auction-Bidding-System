import React from 'react'

import {getDateDifferenceInDays} from '../../utils/Utils';
import './styles.css';

export type CountdownProps = {
  endTime: string | number;
};

const CountdownTimer: React.FC<CountdownProps> = ({ endTime }) => {
  
    const startDate = new Date('2025-06-27');
    const endDate = new Date('2025-06-31');

    const daysDifference = getDateDifferenceInDays(endDate, startDate);

    return (
      <div>
        <p>Start Date: {startDate.toDateString()}</p>
        <p>End Date: {endDate.toDateString()}</p>
        <p>Difference in Days: {daysDifference}</p>
        <p></p>
      </div>
    );
  };


export default CountdownTimer;

  

  