import React from 'react';

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
  separator?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  speed = 30,
  className = '',
  separator = '—',
}) => {
  const content = [...items, ...items, ...items];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee-scroll ${speed}s linear infinite`,
        }}
      >
        {content.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6 text-current">{item}</span>
            <span className="text-amber-400/40 select-none">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
};
