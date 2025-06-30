import React, { useEffect, useState } from 'react';

import {
  getDateDifferenceInDays,
  convertMillisecondsToHours,
  convertMillisecondsToMinutes,
  convertMillisecondsToSeconds,
} from '../../utils/date-time';

type CountdownProps = {
  endTime: string | number;
};

const CountdownTimer: React.FC<CountdownProps> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const updateTimeDifference = () => {
      const target = new Date(endTime).getTime();
      const now = new Date().getTime();
      const diff = Math.max(target - now, 0);
      setTimeLeft(diff);
    };

    updateTimeDifference();
    const interval = setInterval(updateTimeDifference, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className="time-container">
      <span className="date">Day:</span>
      <span className="value">{getDateDifferenceInDays(timeLeft)}</span>

      <span className="date">Hours:</span>
      <span className="value">{convertMillisecondsToHours(timeLeft)}Hrs</span>

      <span className="date">Minutes:</span>
      <span className="value">{convertMillisecondsToMinutes(timeLeft)}Mins</span>

      <span className="date">Seconds:</span>
      <span className="value">{convertMillisecondsToSeconds(timeLeft)}Secs</span>
    </div>
  );
};

export default CountdownTimer;
