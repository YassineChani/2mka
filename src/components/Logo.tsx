'use client';

export default function Logo({ className = '', size = 'default' }: { className?: string; size?: 'small' | 'default' | 'large' }) {
  const dimensions = {
    small: { width: 40, height: 50 },
    default: { width: 60, height: 75 },
    large: { width: 120, height: 150 },
  };

  const { width, height } = dimensions[size];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg width={width} height={height} viewBox="0 0 120 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="45" stroke="#4A5568" strokeWidth="6" fill="none" />
        <path d="M68 10 L45 65 L60 65 L52 115 L85 50 L67 50 Z" fill="#F97316" />
        <text y="142" textAnchor="middle" fontFamily="Outfit, sans-serif" fontWeight="700" fontSize="28" letterSpacing="4">
          <tspan x="30" fill="#F97316">2</tspan>
          <tspan x="52" fill="#EAB308">M</tspan>
          <tspan x="78" fill="#60A5FA">K</tspan>
          <tspan x="102" fill="#94A3B8">A</tspan>
        </text>
      </svg>
    </div>
  );
}
