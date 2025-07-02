import React, { useEffect, useState } from 'react';

import {
  convertMillisecondsToDays,
  convertMillisecondsToHours,
  convertMillisecondsToMinutes,
  convertMillisecondsToSeconds,
} from '../../utils/date-time';
import './styles.css';

type CountdownProps = {
  endTime: string;
};

const CountDownTimer: React.FC<CountdownProps> = ({ endTime }) => {
  const [BidRemainingTime, setBidRemainingTime] = useState<number>(0);

  useEffect(() => {
    const updateTimeDifference = () => {
      const target = new Date(endTime).getTime();
      const now = new Date().getTime();
      const diff = Math.max(target - now, 0);
      setBidRemainingTime(diff);
    };

    updateTimeDifference();
    const interval = setInterval(updateTimeDifference, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className="time-container">
      <span className="date-label">📅
        <span className="date-value">{convertMillisecondsToDays(BidRemainingTime)} Days</span>
      </span>

      <span className="date-label"> ⏱ 
         <span className="date-value">{convertMillisecondsToHours(BidRemainingTime)} Hrs</span>
      </span>

      <span className="date-label"> ⏱ 
         <span className="date-value">{convertMillisecondsToMinutes(BidRemainingTime)} Mins</span>
      </span>

      <span className="date-label"> ⏱ 
        <span className="date-value">{convertMillisecondsToSeconds(BidRemainingTime)} Secs</span>
      </span>
    </div>
  );
};

export default CountDownTimer;
