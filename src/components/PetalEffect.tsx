import React from 'react';

interface PetalProps {
  count?: number;
}

export const PetalEffect: React.FC<PetalProps> = ({ count = 12 }) => {
  const petals = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${(i * 9 + 4) % 95}%`,
    animationDelay: `${(i * 1.3) % 8}s`,
    animationDuration: `${12 + (i % 6) * 2}s`,
    size: 14 + (i % 3) * 6,
    opacity: 0.35 + (i % 4) * 0.15,
    rotate: (i * 37) % 360,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="animate-petal"
          style={{
            left: petal.left,
            animationDelay: petal.animationDelay,
            animationDuration: petal.animationDuration,
            width: `${petal.size}px`,
            height: `${petal.size * 1.3}px`,
          }}
        >
          <svg
            viewBox="0 0 30 40"
            className="w-full h-full text-[#D9A6A6]"
            style={{ opacity: petal.opacity, transform: `rotate(${petal.rotate}deg)` }}
          >
            <path
              d="M15 0 C25 10 30 25 15 40 C0 25 5 10 15 0 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
