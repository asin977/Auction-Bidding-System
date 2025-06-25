import React, { useState, useEffect } from 'react';

import './styles.css';

const CountdownTimer = () => {
  const [timeDisplay, getTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const getTargetTime = new Date("2025-06-30T23:59:59");

    const interval = setInterval(() => {
      const getNow = new Date();
      const getDifference = getTargetTime.getTime() - getNow.getTime();

      const getDay = Math.floor(getDifference / (1000 * 60 * 60 * 24));
      setDays(getDay);

      const getHours = Math.floor(
        (getDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      setHours(getHours);

      const getMinutes = Math.floor(
        (getDifference % (1000 * 60 * 60)) / (1000 * 60),
      );
      setMinutes(getMinutes);

      const getSeconds = Math.floor((getDifference % (1000 * 60)) / 1000);
      setSeconds(getSeconds);

      if (getDay <= 0 && getHours <= 0 && getMinutes <= 0 && getSeconds <= 0) {
        getTime(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h3 className='time-left'>Time Left:</h3>
      <div className='time-container'>
        <span className='date'>Day:</span>
        <span className='value'>{days}</span>

        <span className='date'>Hours:</span>
        <span className='value'>{hours}hrs</span>

        <span className='date'>Minutes:</span>
        <span className='value'>{minutes}mins</span>

        <span className='date'>Seconds:</span>
        <span className='value'>{seconds}secs</span>
      </div>
    </div>
  );
};
export default CountdownTimer;
