import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
          border: '4px solid #f9a8d4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Inner shine */}
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            width: 65,
            height: 35,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.5)',
            transform: 'rotate(-20deg)',
          }}
        />

        {/* Sprout */}
        <div style={{ position: 'relative', display: 'flex', width: 100, height: 120 }}>

          {/* Stem */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 12,
              height: 75,
              background: 'linear-gradient(to top, #15803d, #22c55e)',
              borderRadius: 8,
            }}
          />

          {/* Left leaf */}
          <div
            style={{
              position: 'absolute',
              bottom: 38,
              left: 4,
              width: 42,
              height: 52,
              background: 'linear-gradient(135deg, #86efac, #4ade80)',
              borderRadius: '80% 10% 80% 10%',
              transform: 'rotate(-35deg)',
              boxShadow: 'inset -2px -2px 6px rgba(0,0,0,0.08)',
            }}
          />

          {/* Right leaf */}
          <div
            style={{
              position: 'absolute',
              bottom: 38,
              right: 4,
              width: 42,
              height: 52,
              background: 'linear-gradient(135deg, #4ade80, #16a34a)',
              borderRadius: '10% 80% 10% 80%',
              transform: 'rotate(35deg)',
              boxShadow: 'inset 2px -2px 6px rgba(0,0,0,0.08)',
            }}
          />

          {/* Pink heart bud */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 28,
              height: 28,
              background: 'linear-gradient(135deg, #f9a8d4, #ec4899)',
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              boxShadow: '0 2px 8px rgba(236,72,153,0.4)',
            }}
          />

          {/* Sparkle dots */}
          <div style={{ position: 'absolute', top: 8, right: 6, width: 6, height: 6, borderRadius: '50%', background: '#f472b6', opacity: 0.7 }} />
          <div style={{ position: 'absolute', top: 18, right: 0, width: 4, height: 4, borderRadius: '50%', background: '#ec4899', opacity: 0.5 }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
