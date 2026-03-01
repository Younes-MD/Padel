import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-surface-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-4 h-4 text-white"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <ellipse cx="12" cy="12" rx="5" ry="8" />
                  <line x1="12" y1="4" x2="12" y2="20" />
                </svg>
              </div>
              <span className="font-display text-lg text-white">
                Padel<span className="text-brand-400">Market</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-md">
              Your trusted marketplace for quality pre-owned padel rackets.
              Buy and sell with confidence — every racket is verified and
              described honestly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/rackets" className="hover:text-brand-400 transition-colors">
                  Browse Rackets
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-brand-400 transition-colors">
                  Sell Your Racket
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-2.5 text-sm">
              {process.env.NEXT_PUBLIC_CONTACT_EMAIL && (
                <li>
                  <a
                    href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                    className="hover:text-brand-400 transition-colors"
                  >
                    {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                  </a>
                </li>
              )}
              {process.env.NEXT_PUBLIC_CONTACT_PHONE && (
                <li>
                  <a
                    href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE}`}
                    className="hover:text-brand-400 transition-colors"
                  >
                    {process.env.NEXT_PUBLIC_CONTACT_PHONE}
                  </a>
                </li>
              )}
              {process.env.NEXT_PUBLIC_WHATSAPP && (
                <li>
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-400 transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-surface-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-surface-500">
          <p>© {new Date().getFullYear()} PadelMarket. All rights reserved.</p>
          <Link href="/admin/login" className="hover:text-surface-300 transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
