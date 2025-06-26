import React, { useEffect, useState } from 'react';

import { CountdownProps } from '../../types/types'; 
import './styles.css';

const CountdownTimer: React.FC<CountdownProps> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const getTarget = new Date(endTime).getTime();

    const interval = setInterval(() => {
      const getNow = Date.now();
      const getDifference = getTarget - getNow;

      if (getDifference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(getDifference/ (1000 * 60 * 60 * 24)),
        hours: Math.floor((getDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((getDifference / (1000 * 60)) % 60),
        seconds: Math.floor((getDifference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className="time-container">
      <span className="date">Day:</span>
      <span className="value">{timeLeft.days}</span>

      <span className="date">Hours:</span>
      <span className="value">{timeLeft.hours}</span>

      <span className="date">Minutes:</span>
      <span className="value">{timeLeft.minutes}</span>

      <span className="date">Seconds:</span>
      <span className="value">{timeLeft.seconds}</span>
    </div>
  );
};

export default CountdownTimer;
