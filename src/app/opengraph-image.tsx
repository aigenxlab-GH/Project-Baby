import { ImageResponse } from 'next/og';

// Edge runtime: compatible with Cloudflare Pages Workers
export const runtime = 'edge';
export const alt = 'PregnancySprout — Your Complete Pregnancy & Baby Guide';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(140deg, #4a0020 0%, #831843 35%, #9d174d 65%, #c41e6e 100%)',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* ── Decorative background elements ── */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'rgba(249,168,212,0.07)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: -140, left: -80, width: 420, height: 420, borderRadius: '50%', background: 'rgba(249,168,212,0.05)', display: 'flex' }} />
        <div style={{ position: 'absolute', top: 180, right: 80, width: 200, height: 200, borderRadius: '50%', background: 'rgba(134,239,172,0.06)', display: 'flex' }} />

        {/* Dot texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1.5px, transparent 1.5px)',
          backgroundSize: '36px 36px',
          display: 'flex',
        }} />

        {/* Left accent bar */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: 'linear-gradient(180deg, #f9a8d4 0%, #ec4899 50%, #86efac 100%)', display: 'flex' }} />

        {/* ── Main Content ── */}
        <div style={{ display: 'flex', flexDirection: 'column', padding: '56px 80px 56px 86px', flex: 1, justifyContent: 'space-between' }}>

          {/* Top: Logo mark + wordmark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            {/* Logo box */}
            <div style={{
              width: 68, height: 68, borderRadius: 18,
              background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
              border: '2px solid rgba(249,168,212,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            }}>
              <div style={{ position: 'relative', display: 'flex', width: 38, height: 44, alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', bottom: 1, left: '50%', transform: 'translateX(-50%)', width: 4.5, height: 25, background: '#15803d', borderRadius: 4 }} />
                <div style={{ position: 'absolute', bottom: 11, left: 1, width: 16, height: 20, background: 'linear-gradient(135deg, #86efac, #4ade80)', borderRadius: '80% 10% 80% 10%', transform: 'rotate(-35deg)' }} />
                <div style={{ position: 'absolute', bottom: 11, right: 1, width: 16, height: 20, background: 'linear-gradient(135deg, #4ade80, #16a34a)', borderRadius: '10% 80% 10% 80%', transform: 'rotate(35deg)' }} />
                <div style={{ position: 'absolute', top: 3, left: '50%', transform: 'translateX(-50%)', width: 12, height: 12, background: 'linear-gradient(135deg, #f9a8d4, #ec4899)', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }} />
              </div>
            </div>

            {/* Wordmark */}
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontSize: 16, fontWeight: 300, color: 'rgba(249,168,212,0.75)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                Pregnancy
              </span>
              <span style={{ fontSize: 32, fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em', marginTop: 2 }}>
                Sprout
              </span>
            </div>

            {/* Divider + tagline */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginLeft: 10 }}>
              <div style={{ width: 1, height: 42, background: 'rgba(249,168,212,0.3)', display: 'flex' }} />
              <span style={{ fontSize: 16, color: 'rgba(249,168,212,0.6)', maxWidth: 200, lineHeight: 1.4 }}>
                Free · Expert · Trusted
              </span>
            </div>
          </div>

          {/* Centre: Headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1, justifyContent: 'center', paddingTop: 16 }}>
            <div style={{ fontSize: 68, fontWeight: 800, color: '#ffffff', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Your Complete
            </div>
            <div style={{
              fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.025em',
              background: 'linear-gradient(90deg, #f9a8d4 0%, #fde68a 55%, #86efac 100%)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}>
              Pregnancy & Baby Guide
            </div>
            <div style={{ fontSize: 24, color: 'rgba(249,168,212,0.7)', marginTop: 8, lineHeight: 1.5, fontWeight: 400 }}>
              Week-by-week guides · 1,188+ baby names · honest product reviews · free tools
            </div>
          </div>

          {/* Bottom: Stats + URL */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { n: '40', label: 'Pregnancy\nWeeks' },
                { n: '6', label: 'Free\nTools' },
                { n: '1,188+', label: 'Baby\nNames' },
                { n: '72+', label: 'Expert\nArticles' },
              ].map((s) => (
                <div key={s.n} style={{
                  display: 'flex', flexDirection: 'column',
                  background: 'rgba(255,255,255,0.09)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 14, padding: '10px 16px', minWidth: 90,
                }}>
                  <span style={{ fontSize: 26, fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>{s.n}</span>
                  <span style={{ fontSize: 12, color: 'rgba(249,168,212,0.7)', lineHeight: 1.3, marginTop: 4, whiteSpace: 'pre-line' }}>{s.label}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 30, padding: '8px 20px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#86efac', display: 'flex' }} />
                <span style={{ fontSize: 14, color: '#86efac', fontWeight: 600, letterSpacing: '0.04em' }}>FREE · NO SIGN-UP</span>
              </div>
              <span style={{ fontSize: 20, color: 'rgba(249,168,212,0.55)', letterSpacing: '0.03em' }}>pregnancysprout.com</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
