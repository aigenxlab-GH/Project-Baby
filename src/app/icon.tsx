import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 9,
          background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
          border: '1.5px solid #f9a8d4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Inner glow top-left */}
        <div
          style={{
            position: 'absolute',
            top: 2,
            left: 2,
            width: 12,
            height: 7,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.55)',
            transform: 'rotate(-20deg)',
          }}
        />

        {/* Sprout icon rendered as styled divs */}
        <div style={{ position: 'relative', display: 'flex', width: 18, height: 22 }}>

          {/* Stem */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 2.5,
              height: 14,
              background: '#15803d',
              borderRadius: 4,
            }}
          />

          {/* Left leaf */}
          <div
            style={{
              position: 'absolute',
              bottom: 7,
              left: 0,
              width: 8,
              height: 10,
              background: '#4ade80',
              borderRadius: '80% 10% 80% 10%',
              transform: 'rotate(-35deg)',
            }}
          />

          {/* Right leaf */}
          <div
            style={{
              position: 'absolute',
              bottom: 7,
              right: 0,
              width: 8,
              height: 10,
              background: '#22c55e',
              borderRadius: '10% 80% 10% 80%',
              transform: 'rotate(35deg)',
            }}
          />

          {/* Pink heart bud at top */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 6,
              height: 6,
              background: '#ec4899',
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
