import Link from 'next/link';
import { Heart, Mail, ArrowRight } from 'lucide-react';
import { footerNav } from '@/config/nav';
import { siteConfig } from '@/config/site';
import { Logo } from '@/components/layout/Logo';

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
            className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-brand-50 transition-colors shadow-md flex-shrink-0"
          >
            Calculate Due Date <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* ── Main footer body ──────────────────────────── */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">

          {/* Brand col — wider */}
          <div className="col-span-2 lg:col-span-2">
            <div className="mb-4">
              <Logo size="md" variant="dark" />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Practical pregnancy and baby guidance — week-by-week guides, 1,188+ baby names,
              honest product reviews, and free tools. All free.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand-400 transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                {siteConfig.email}
              </a>
            </div>
            <p className="text-xs text-gray-600 mt-4 leading-relaxed">
              <strong className="text-gray-500">Medical Disclaimer:</strong>{' '}
              Content is for informational purposes only. Always consult your healthcare provider.
            </p>
            <div className="mt-3 pt-3 border-t border-gray-800">
              <p className="text-xs text-gray-500">
                ✓ Fact-checked against NHS, WHO, and NICE guidelines
              </p>
              <p className="text-xs text-gray-500 mt-1">
                ✓ Last site update: June 2026
              </p>
            </div>
          </div>

          {/* Topics */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Topics</h4>
            <ul className="space-y-2.5">
              {footerNav.topics.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white hover:translate-x-0.5 transition-all inline-block">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Free Tools</h4>
            <ul className="space-y-2.5">
              {footerNav.tools.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white hover:translate-x-0.5 transition-all inline-block">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerNav.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white hover:translate-x-0.5 transition-all inline-block">
                    {link.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/editorial-standards" className="text-sm hover:text-white hover:translate-x-0.5 transition-all inline-block">
                  Editorial Standards
                </Link>
              </li>
              <li>
                <Link href="/corrections" className="text-sm hover:text-white hover:translate-x-0.5 transition-all inline-block">
                  Corrections
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm hover:text-white hover:translate-x-0.5 transition-all inline-block">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────── */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-brand-500 fill-brand-500" /> for expecting parents
          </p>
          <div className="flex items-center gap-3">
            <Link href="/affiliate-disclosure" className="hover:text-gray-400 transition-colors">Affiliate Disclosure</Link>
            <span className="text-gray-700">·</span>
            <Link href="/privacy-policy" className="hover:text-gray-400 transition-colors">Privacy</Link>
            <span className="text-gray-700">·</span>
            <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
