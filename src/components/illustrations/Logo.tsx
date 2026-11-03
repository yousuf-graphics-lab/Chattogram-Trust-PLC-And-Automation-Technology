import { useState } from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  /** Use the animated glow-sweep version of the emblem (brand showcases). */
  animated?: boolean;
}

/**
 * Official brand emblem of Chattogram Trust PLC & Automation Technology:
 * a circular engineering seal (curved company name, gears, circuit traces and
 * the Trust monogram) with a cyan glow sweep. Rendered with a soft pulsing glow
 * so it reads as "live" industrial branding on both themes.
 */
export function Logo({ size = 38, className = '', animated = false }: LogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    // Compact vector fallback if the emblem asset ever fails to load.
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        className={className}
        role="img"
        aria-label="Chattogram Trust PLC & Automation Technology logo"
      >
        <circle cx="32" cy="32" r="29" fill="#0B1220" stroke="#22D3EE" strokeWidth="2.5" />
        <circle cx="32" cy="32" r="20" fill="none" stroke="#1E3A5F" strokeWidth="1.5" />
        <path
          d="M36.5 14 21.5 35h8.6L27.5 50 42.5 29.5h-8.6L36.5 14Z"
          fill="#F97316"
          stroke="#FDBA74"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <img
      src={animated ? '/images/brand/emblem-animated.webp' : '/images/brand/emblem.webp'}
      width={size}
      height={size}
      alt="Chattogram Trust PLC & Automation Technology emblem"
      loading={animated ? 'lazy' : undefined}
      onError={() => setFailed(true)}
      className={`logo-glow rounded-full object-cover ${className}`}
    />
  );
}
