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
  const [remainingTimeInMilliseconds, setRemainingTimeInMilliseconds] =
    useState<number>(0);

  useEffect(() => {
    const updateTimeDifference = () => {
      const target = new Date(endTime).getTime();
      const now = new Date().getTime();
      const diff = Math.max(target - now, 0);
      setRemainingTimeInMilliseconds(diff);
    };

    updateTimeDifference();
    const interval = setInterval(updateTimeDifference, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className="time-container">
      <span className="time-label">
        📅 {convertMillisecondsToDays(remainingTimeInMilliseconds)} Days ⏱{' '}
        {convertMillisecondsToHours(remainingTimeInMilliseconds)} Hrs ⏱{' '}
        {convertMillisecondsToMinutes(remainingTimeInMilliseconds)} Mins ⏱{' '}
        {convertMillisecondsToSeconds(remainingTimeInMilliseconds)} Secs
      </span>
    </div>
  );
};

export default CountDownTimer;
