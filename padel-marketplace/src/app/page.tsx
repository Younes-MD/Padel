import Link from "next/link";
import { prisma } from "@/lib/prisma";
import RacketCard from "@/components/RacketCard";

export const revalidate = 60; // ISR: revalidate every 60 seconds

async function getFeaturedRackets() {
  return prisma.racket.findMany({
    where: { featured: true, sold: false },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}

async function getAnnouncement() {
  return prisma.announcement.findFirst({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });
}

export default async function HomePage() {
  const [rackets, announcement] = await Promise.all([
    getFeaturedRackets(),
    getAnnouncement(),
  ]);

  return (
    <>
      {/* Announcement banner */}
      {announcement && (
        <div className="bg-brand-600 text-white text-center py-2.5 px-4 text-sm font-medium">
          {announcement.content}
        </div>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-surface-900 via-surface-800 to-surface-900">
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-500/10 border border-brand-500/20 rounded-full text-brand-400 text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse" />
              Trusted by padel players
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
              Find Your Next
              <br />
              <span className="text-brand-400">Perfect Racket</span>
            </h1>
            <p className="text-surface-300 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
              Quality pre-owned padel rackets at honest prices. Every listing
              verified, every condition described transparently.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/rackets" className="btn-primary text-base px-8 py-3.5">
                Browse Rackets
              </Link>
              <Link
                href="/sell"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-surface-500 text-white rounded-lg hover:bg-surface-700 transition-colors font-medium"
              >
                Sell Yours
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="border-b border-surface-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: "✓", label: "Verified Listings", sub: "Every racket checked" },
              { icon: "€", label: "Fair Prices", sub: "No hidden fees" },
              { icon: "♻", label: "Sustainable", sub: "Give rackets new life" },
              { icon: "💬", label: "Direct Contact", sub: "Talk before you buy" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="font-semibold text-surface-900 text-sm">{item.label}</p>
                <p className="text-surface-500 text-xs mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rackets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-brand-600 font-medium text-sm uppercase tracking-wider mb-2">
              Featured
            </p>
            <h2 className="section-title">Top Picks</h2>
          </div>
          <Link
            href="/rackets"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            View all
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {rackets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rackets.map((racket) => (
              <RacketCard key={racket.id} {...racket} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-surface-500">
            <p className="text-lg">No featured rackets yet — check back soon!</p>
          </div>
        )}

        <div className="sm:hidden mt-8 text-center">
          <Link href="/rackets" className="btn-secondary">
            View All Rackets
          </Link>
        </div>
      </section>

      {/* Sell CTA */}
      <section className="bg-surface-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-4">
            Have a Racket to Sell?
          </h2>
          <p className="text-surface-300 max-w-md mx-auto mb-8">
            Submit your racket in minutes. We&apos;ll review it and list it for free.
            You set the price, we handle the rest.
          </p>
          <Link href="/sell" className="btn-primary text-base px-8 py-3.5">
            Submit Your Racket
          </Link>
        </div>
      </section>
    </>
  );
}
