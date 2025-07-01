import React, { useEffect, useState } from 'react';

import {
  convertMillisecondsToDays,
  convertMillisecondsToHours,
  convertMillisecondsToMinutes,
  convertMillisecondsToSeconds,
} from '../../utils/date-time';

type CountdownProps = {
  endTime: string;
};

const CountDownTimer: React.FC<CountdownProps> = ({ endTime }) => {
  const [bidTime, setbidTime] = useState<number>(0);

  useEffect(() => {
    const updateTimeDifference = () => {
      const target = new Date(endTime).getTime();
      const now = new Date().getTime();
      const diff = Math.max(target - now, 0);
      setbidTime(diff);
    };

    updateTimeDifference();
    const interval = setInterval(updateTimeDifference, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className="time-container">
      <span className="date">Day:</span>
      <span className="value">{convertMillisecondsToDays(bidTime)}</span>

      <span className="date">Hours:</span>
      <span className="value">{convertMillisecondsToHours(bidTime)}Hrs</span>

      <span className="date">Minutes:</span>
      <span className="value">{convertMillisecondsToMinutes(bidTime)}Mins</span>

      <span className="date">Seconds:</span>
      <span className="value">{convertMillisecondsToSeconds(bidTime)}Secs</span>
    </div>
  );
};

export default CountDownTimer;
