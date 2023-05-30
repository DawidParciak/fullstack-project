import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ seconds, onComplete }) => {
  const [countdown, setCountdown] = useState(seconds);

  useEffect(() => {
    if (countdown > 0) {
      const countdownInterval = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);

      return () => {
        clearInterval(countdownInterval);
      };
    } else {
      onComplete();
    }
  }, [countdown, onComplete]);

  return <p>Redirecting to home page in {countdown} seconds...</p>;
};

export default CountdownTimer;
