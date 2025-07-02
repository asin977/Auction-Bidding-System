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
      <span className="date-label">Day:</span>
      <span className="value">{convertMillisecondsToDays(BidRemainingTime)}</span>

      <span className="date-label">Hours:</span>
      <span className="value">{convertMillisecondsToHours(BidRemainingTime)}Hrs</span>

      <span className="date-label">Minutes:</span>
      <span className="value">{convertMillisecondsToMinutes(BidRemainingTime)}Mins</span>

      <span className="date-label">Seconds:</span>
      <span className="value">{convertMillisecondsToSeconds(BidRemainingTime)}Secs</span>
    </div>
  );
};

export default CountDownTimer;
