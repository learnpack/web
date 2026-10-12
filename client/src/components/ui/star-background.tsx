import { useMemo } from 'react';

interface StarBackgroundProps {
  starCount?: number;
  className?: string;
}

export function StarBackground({ starCount = 40, className = '' }: StarBackgroundProps) {
  const stars = useMemo(
    () =>
      Array.from({ length: starCount }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 12}s`,
        duration: `${5 + Math.random() * 7}s`,
        size: Math.random() > 0.7 ? 2.5 : Math.random() > 0.4 ? 1.5 : 1,
      })),
    [starCount]
  );

  return (
    <div className={`star-field ${className}`} aria-hidden="true">
      {stars.map((star, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `starTwinkleUnified ${star.duration} ease-in-out ${star.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
