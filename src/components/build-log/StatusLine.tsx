import { useEffect, useState } from 'react';

const formatter = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Asia/Kolkata',
});

/** Live Pune local time + availability — a factual personality touch, ticks every minute. */
const StatusLine = () => {
  const [time, setTime] = useState(() => formatter.format(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(formatter.format(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="font-mono text-xs text-muted-foreground flex flex-wrap items-center gap-x-2.5 gap-y-1">
      <span className="inline-flex items-center gap-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
        </span>
        Available for Cloud &amp; AI Engineering roles
      </span>
      <span className="text-border">·</span>
      <span>{time} local, Pune</span>
    </p>
  );
};

export default StatusLine;
