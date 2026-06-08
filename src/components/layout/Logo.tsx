import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  href?: string;
}

export function LogoIcon({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Background gradient - warm pink */}
        <linearGradient id="bgGrad" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fdf2f8" />
          <stop offset="100%" stopColor="#fce7f3" />
        </linearGradient>
        {/* Left leaf gradient - light green */}
        <linearGradient id="leafLeft" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
        {/* Right leaf gradient - deeper green */}
        <linearGradient id="leafRight" x1="1" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        {/* Heart gradient - pink */}
        <linearGradient id="heartGrad" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#f9a8d4" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        {/* Drop shadow filter */}
        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#f9a8d4" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Background rounded square with soft shadow */}
      <rect
        x="2" y="2" width="40" height="40" rx="13"
        fill="url(#bgGrad)"
        stroke="#f9a8d4"
        strokeWidth="1.2"
        filter="url(#softShadow)"
      />

      {/* Inner shine top-left */}
      <ellipse cx="14" cy="12" rx="7" ry="4" fill="white" opacity="0.4" transform="rotate(-20 14 12)" />

      {/* SPROUT */}

      {/* Main stem - elegant slight curve */}
      <path
        d="M 22 36 C 22 30 21.5 25 22 17"
        stroke="#15803d"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Left leaf - teardrop curving left */}
      <path
        d="M 22 27 C 18 25 11 20 12 13 C 15 10 21 15 22 23 Z"
        fill="url(#leafLeft)"
        opacity="0.95"
      />

      {/* Right leaf - teardrop curving right */}
      <path
        d="M 22 23 C 23 15 29 10 32 13 C 33 20 26 25 22 27 Z"
        fill="url(#leafRight)"
        opacity="0.95"
      />

      {/* Leaf vein left - subtle */}
      <path
        d="M 22 25 C 18 22 14 17 13 14"
        stroke="white"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.5"
        fill="none"
      />
      {/* Leaf vein right - subtle */}
      <path
        d="M 22 25 C 26 22 30 17 31 14"
        stroke="white"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.5"
        fill="none"
      />

      {/* Heart bud at top of stem */}
      <g transform="translate(22, 15) scale(0.85)">
        <path
          d="M 0 0 C 0 -2.5 -3.5 -4 -4.5 -1.5 C -5 0 -3 2.5 0 5 C 3 2.5 5 0 4.5 -1.5 C 3.5 -4 0 -2.5 0 0 Z"
          fill="url(#heartGrad)"
        />
      </g>

      {/* Small sparkle top-right */}
      <g transform="translate(33, 8)">
        <circle cx="0" cy="0" r="1.2" fill="#f472b6" opacity="0.7" />
        <circle cx="4" cy="-2" r="0.7" fill="#ec4899" opacity="0.5" />
        <circle cx="2" cy="3" r="0.5" fill="#f9a8d4" opacity="0.6" />
      </g>
    </svg>
  );
}

export function Logo({ size = 'md', variant = 'light', href = '/' }: LogoProps) {
  const textSizes = {
    sm: { pregnancy: 'text-xs', sprout: 'text-sm', icon: 28 },
    md: { pregnancy: 'text-sm', sprout: 'text-lg', icon: 36 },
    lg: { pregnancy: 'text-base', sprout: 'text-2xl', icon: 48 },
  };

  const t = textSizes[size];

  const pregnancyColor = variant === 'dark' ? 'text-gray-200' : 'text-gray-500 dark:text-gray-200';

  return (
    <Link href={href} className="flex items-center gap-2.5 group select-none">
      {/* Animated icon on hover */}
      <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
        <LogoIcon size={t.icon} />
      </div>

      {/* Two-tone wordmark */}
      <div className="flex flex-col leading-none">
        <span
          className={`${t.pregnancy} ${pregnancyColor} font-bold tracking-widest uppercase`}
          style={{ letterSpacing: '0.18em' }}
        >
          Pregnancy
        </span>
        <span
          className={`${t.sprout} font-bold tracking-tight`}
          style={{
            background: 'linear-gradient(135deg, #16a34a 0%, #4ade80 45%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.1,
          }}
        >
          Sprout
        </span>
      </div>
    </Link>
  );
}

/* Compact single-line version for tight spaces */
export function LogoCompact({ variant: _variant = 'light' }: { variant?: 'light' | 'dark' }) {
  return (
    <Link href="/" className="flex items-center gap-2 group select-none">
      <div className="transition-transform duration-300 group-hover:scale-110">
        <LogoIcon size={28} />
      </div>
      <span
        className="font-bold text-lg tracking-tight"
        style={{
          background: 'linear-gradient(135deg, #16a34a 0%, #4ade80 50%, #ec4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Pregnancy<span style={{ WebkitTextFillColor: 'transparent' }}>Sprout</span>
      </span>
    </Link>
  );
}
