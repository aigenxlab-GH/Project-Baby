import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'PregnancySprout — Your Complete Pregnancy & Baby Guide';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 40%, #ede9fe 100%)',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Logo area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ec4899, #a855f7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 48,
            }}
          >
            🌱
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#9d174d', letterSpacing: 4, textTransform: 'uppercase' }}>PREGNANCY</span>
            <span style={{ fontSize: 48, fontWeight: 800, color: '#ec4899', lineHeight: 1 }}>Sprout</span>
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#1f2937',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.3,
            marginBottom: 24,
          }}
        >
          Your Complete Pregnancy &amp; Baby Guide
        </div>

        {/* Sub text */}
        <div
          style={{
            fontSize: 22,
            color: '#6b7280',
            textAlign: 'center',
            maxWidth: 700,
          }}
        >
          Week-by-week guides · Baby names · Product reviews · Free tools
        </div>

        {/* Pills */}
        <div style={{ display: 'flex', gap: 16, marginTop: 40 }}>
          {['🤰 Pregnancy', '👶 Parenting', '⭐ Products', '✨ Baby Names'].map((item) => (
            <div
              key={item}
              style={{
                background: 'white',
                borderRadius: 40,
                padding: '10px 24px',
                fontSize: 18,
                color: '#374151',
                fontWeight: 600,
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div style={{ position: 'absolute', bottom: 32, fontSize: 18, color: '#9ca3af' }}>
          pregnancysprout.com
        </div>
      </div>
    ),
    { ...size }
  );
}
