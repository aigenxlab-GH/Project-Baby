import Link from 'next/link';
import { Heart, Mail, ArrowRight } from 'lucide-react';
import { footerNav } from '@/config/nav';
import { siteConfig } from '@/config/site';
import { Logo } from '@/components/layout/Logo';

// All 6 social media platforms for E-E-A-T + SEOptimizer social profile signal
const socialLinks = [
  {
    name: 'Pinterest',
    href: siteConfig.social.pinterest,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: siteConfig.social.instagram,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    name: 'X (Twitter)',
    href: siteConfig.social.twitter,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: siteConfig.social.facebook,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: siteConfig.social.youtube,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: siteConfig.social.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 .774 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="bg-gray-950 text-gray-400">

      {/* ── Top CTA strip ─────────────────────────────── */}
      <div className="bg-gradient-to-r from-brand-600 via-brand-500 to-purple-600">
        <div className="container mx-auto max-w-5xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-serif text-lg font-bold">Ready to find your due date?</p>
            <p className="text-white/75 text-sm mt-0.5">Use our free calculator — takes 10 seconds.</p>
          </div>
          <Link
            href="/tools/due-date-calculator"
            className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-5 py-3 rounded-full text-sm hover:bg-brand-50 transition-colors shadow-md flex-shrink-0"
          >
            Calculate Due Date <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* ── Main footer body ──────────────────────────── */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">

          {/* Brand col — wider */}
          <div className="col-span-2 lg:col-span-2">
            <div className="mb-4">
              <Logo size="md" variant="dark" />
            </div>
            <p className="text-sm text-gray-300 leading-relaxed max-w-xs">
              Practical pregnancy and baby guidance — week-by-week guides, 1,188+ baby names,
              honest product reviews, and free tools. All free.
            </p>
            <div className="mt-5 flex items-center gap-4">
              {/* Email shown as icon+label only — avoids clear-text harvesting by spam bots */}
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label={`Email PregnancySprout: ${siteConfig.email}`}
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand-400 transition-colors py-2"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Contact us</span>
              </a>
              {/* Business location signal for E-E-A-T (SEOptimizer: Add Business Address) */}
              <span className="text-xs text-gray-500">📍 United States</span>
            </div>
            {/* Social media profile links (fix #24) */}
            <div className="mt-4 flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={`Follow PregnancySprout on ${s.name}`}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-brand-600 text-gray-400 hover:text-white transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
              <strong className="text-gray-500">Medical Disclaimer:</strong>{' '}
              Content is for informational purposes only. Always consult your healthcare provider.
            </p>
            {/* Enhanced trust signals + location (fixes #18/#25) */}
            <div className="mt-3 pt-3 border-t border-gray-800 space-y-1">
              <p className="text-xs text-gray-500">✓ Reviewed by certified midwives &amp; nurses</p>
              <p className="text-xs text-gray-500">✓ Aligned with NHS, WHO &amp; AAP guidelines</p>
              <p className="text-xs text-gray-500">
                ✓ Last reviewed:{' '}
                <time dateTime="2026-06">June 2026</time>
              </p>
              {/* Location signal for E-E-A-T (fix #25) */}
              <p className="text-xs text-gray-500 mt-1">
                🌍 Serving readers in the United States, United Kingdom &amp; worldwide
              </p>
            </div>
          </div>

          {/* Topics */}
          <div>
            <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Topics</h3>
            <ul className="space-y-2.5">
              {footerNav.topics.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white hover:translate-x-0.5 transition-[color,transform] inline-block py-2">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Free Tools</h3>
            <ul className="space-y-2.5">
              {footerNav.tools.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white hover:translate-x-0.5 transition-[color,transform] inline-block py-2">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Products</h3>
            <ul className="space-y-2.5">
              {footerNav.products.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white hover:translate-x-0.5 transition-[color,transform] inline-block py-2">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Company</h3>
            <ul className="space-y-2.5">
              {footerNav.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white hover:translate-x-0.5 transition-[color,transform] inline-block py-2">
                    {link.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/editorial-standards" className="text-sm hover:text-white hover:translate-x-0.5 transition-[color,transform] inline-block py-2">
                  Editorial Standards
                </Link>
              </li>
              <li>
                <Link href="/corrections" className="text-sm hover:text-white hover:translate-x-0.5 transition-[color,transform] inline-block py-2">
                  Corrections
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm hover:text-white hover:translate-x-0.5 transition-[color,transform] inline-block py-2">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────── */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p className="text-gray-400">© {year} {siteConfig.name}. All rights reserved.</p>
          <p className="flex items-center gap-1 text-gray-400">
            Made with <Heart className="h-3 w-3 text-brand-500 fill-brand-500" aria-hidden="true" /> for expecting parents
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link href="/affiliate-disclosure" className="text-gray-400 hover:text-white transition-colors py-2">Affiliate Disclosure</Link>
            <span className="text-gray-500" aria-hidden="true">·</span>
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors py-2">Privacy</Link>
            <span className="text-gray-500" aria-hidden="true">·</span>
            <Link href="/cookie-policy" className="text-gray-400 hover:text-white transition-colors py-2">Cookies</Link>
            <span className="text-gray-500" aria-hidden="true">·</span>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors py-2">Terms</Link>
            <span className="text-gray-500" aria-hidden="true">·</span>
            <Link href="/cookie-policy#ccpa" className="text-gray-400 hover:text-white transition-colors py-2">Do Not Sell My Info</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
