import { useEffect, useState } from 'react';
import './AnnouncementBar.css';

function getTimeUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diff = midnight.getTime() - now.getTime();
  return {
    h: Math.floor(diff / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

const AnnouncementBar = () => {
  const [time, setTime] = useState(getTimeUntilMidnight);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeUntilMidnight()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="ab-bar" role="note" aria-label="Erbjudande">
      <div className="ab-inner">
        <span className="ab-text">Rea avslutas om:</span>
        <div className="ab-countdown">
          <div className="ab-unit">
            <span className="ab-num">{pad(time.h)}</span>
            <span className="ab-label">H</span>
          </div>
          <span className="ab-sep">:</span>
          <div className="ab-unit">
            <span className="ab-num">{pad(time.m)}</span>
            <span className="ab-label">M</span>
          </div>
          <span className="ab-sep">:</span>
          <div className="ab-unit">
            <span className="ab-num">{pad(time.s)}</span>
            <span className="ab-label">S</span>
          </div>
        </div>
        <span className="ab-divider">·</span>
        <span className="ab-text">Fri frakt på alla beställningar</span>
        <span className="ab-divider">·</span>
        <span className="ab-text">30 dagars garanti</span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
