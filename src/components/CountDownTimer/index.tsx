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
  const [BidTimeDuration, setBidTimeDuration] = useState<number>(0);

  useEffect(() => {
    const updateTimeDifference = () => {
      const target = new Date(endTime).getTime();
      const now = new Date().getTime();
      const diff = Math.max(target - now, 0);
      setBidTimeDuration(diff);
    };

    updateTimeDifference();
    const interval = setInterval(updateTimeDifference, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className="time-container">
      <span className="date">Day:</span>
      <span className="value">{convertMillisecondsToDays(BidTimeDuration)}</span>

      <span className="date">Hours:</span>
      <span className="value">{convertMillisecondsToHours(BidTimeDuration)}Hrs</span>

      <span className="date">Minutes:</span>
      <span className="value">{convertMillisecondsToMinutes(BidTimeDuration)}Mins</span>

      <span className="date">Seconds:</span>
      <span className="value">{convertMillisecondsToSeconds(BidTimeDuration)}Secs</span>
    </div>
  );
};

export default CountDownTimer;
