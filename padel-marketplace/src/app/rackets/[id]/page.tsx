import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CONDITIONS, SHAPES } from "@/lib/validators";
import type { Metadata } from "next";

export const revalidate = 30;

interface Props {
  params: { id: string };
}

async function getRacket(id: string) {
  return prisma.racket.findUnique({ where: { id } });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const racket = await getRacket(id);
  if (!racket) return { title: "Racket Not Found" };
  return {
    title: `${racket.title} — €${racket.price}`,
    description: racket.description.slice(0, 160),
    openGraph: {
      title: racket.title,
      description: racket.description.slice(0, 160),
      images: racket.images[0] ? [racket.images[0]] : [],
    },
  };
}

export default async function RacketDetailPage({ params }: Props) {
  const { id } = await params;
  const racket = await getRacket(id);
  if (!racket) notFound();

  const conditionLabel =
    CONDITIONS[racket.condition as keyof typeof CONDITIONS] || racket.condition;
  const shapeLabel = racket.shape
    ? SHAPES[racket.shape as keyof typeof SHAPES]
    : null;

  const whatsappMsg = encodeURIComponent(
    `Hi! I'm interested in the ${racket.title} listed for €${racket.price} on PadelMarket.`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-surface-500">
        <Link href="/rackets" className="hover:text-brand-600 transition-colors">
          ← Back to Rackets
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div>
          <div className="relative aspect-square bg-surface-100 rounded-xl overflow-hidden mb-3">
            {racket.images.length > 0 ? (
              <Image
                src={racket.images[0]}
                alt={racket.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  className="w-32 h-32 text-surface-200"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={0.5}
                >
                  <ellipse cx="12" cy="12" rx="5" ry="8" />
                  <line x1="12" y1="4" x2="12" y2="20" />
                </svg>
              </div>
            )}
            {racket.sold && (
              <div className="absolute inset-0 bg-surface-900/60 flex items-center justify-center">
                <span className="bg-white text-surface-900 font-bold text-lg px-6 py-3 rounded-full uppercase tracking-wider">
                  Sold
                </span>
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {racket.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {racket.images.slice(1).map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square bg-surface-100 rounded-lg overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`${racket.title} ${i + 2}`}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-brand-600 font-medium text-sm uppercase tracking-wider mb-2">
            {racket.brand}
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-surface-900 mb-2">
            {racket.title}
          </h1>
          <p className="text-4xl font-bold text-surface-900 mb-6">
            €{racket.price.toFixed(0)}
          </p>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-surface-50 rounded-lg p-3">
              <p className="text-xs text-surface-500 mb-1">Condition</p>
              <span className={`badge badge-condition-${racket.condition}`}>
                {conditionLabel}
              </span>
            </div>
            <div className="bg-surface-50 rounded-lg p-3">
              <p className="text-xs text-surface-500 mb-1">Brand</p>
              <p className="font-semibold text-sm">{racket.brand}</p>
            </div>
            {racket.weight && (
              <div className="bg-surface-50 rounded-lg p-3">
                <p className="text-xs text-surface-500 mb-1">Weight</p>
                <p className="font-semibold text-sm">{racket.weight}</p>
              </div>
            )}
            {shapeLabel && (
              <div className="bg-surface-50 rounded-lg p-3">
                <p className="text-xs text-surface-500 mb-1">Shape</p>
                <p className="font-semibold text-sm">{shapeLabel}</p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="font-semibold text-surface-900 mb-2">Description</h2>
            <p className="text-surface-600 leading-relaxed whitespace-pre-line">
              {racket.description}
            </p>
          </div>

          {/* CTA */}
          {!racket.sold && (
            <div className="space-y-3">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || ""}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center py-4 text-base"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Contact via WhatsApp
              </a>
              <Link
                href={`/contact?racket=${racket.id}&title=${encodeURIComponent(racket.title)}`}
                className="btn-secondary w-full text-center py-4 text-base"
              >
                Send a Message
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
