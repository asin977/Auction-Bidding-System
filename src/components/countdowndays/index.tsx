import React, { useEffect, useState } from 'react';

import {
  getDateDifferenceInDays,
  getDateDifferenceInHours,
  getDateDifferenceInMinutes,
  getDateDifferenceInSeconds,
} from '../../utils/Utils';

type CountdownProps = {
  endTime: string | number;
};

const CountdownTimer: React.FC<CountdownProps> = ({ endTime }) => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const target = new Date(endTime);
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  const days = getDateDifferenceInDays(target, now);
  const hours = getDateDifferenceInHours(diff);
  const minutes = getDateDifferenceInMinutes(diff);
  const seconds = getDateDifferenceInSeconds(diff);

  return (
    <div className="time-container">
      <span className="date">Day:</span>
      <span className="value">{Math.max(days, 0)}</span>

      <span className="date">Hours:</span>
      <span className="value">{Math.max(hours, 0)}</span>

      <span className="date">Minutes:</span>
      <span className="value">{Math.max(minutes, 0)}</span>

      <span className="date">Seconds:</span>
      <span className="value">{Math.max(seconds, 0)}</span>
    </div>
  );
};

export default CountdownTimer;
