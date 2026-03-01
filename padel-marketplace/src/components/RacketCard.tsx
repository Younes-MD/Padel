import Link from "next/link";
import Image from "next/image";
import { CONDITIONS } from "@/lib/validators";

interface RacketCardProps {
  id: string;
  title: string;
  brand: string;
  condition: string;
  price: number;
  images: string[];
  sold?: boolean;
}

export default function RacketCard({
  id,
  title,
  brand,
  condition,
  price,
  images,
  sold,
}: RacketCardProps) {
  const conditionLabel = CONDITIONS[condition as keyof typeof CONDITIONS] || condition;
  const placeholder = "/placeholder-racket.svg";

  return (
    <Link href={`/rackets/${id}`} className="card group block">
      {/* Image */}
      <div className="relative aspect-square bg-surface-50 overflow-hidden">
        {images.length > 0 ? (
          <Image
            src={images[0]}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-20 h-20 text-surface-200"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
            >
              <ellipse cx="12" cy="12" rx="5" ry="8" />
              <line x1="12" y1="4" x2="12" y2="20" />
              <line x1="7.5" y1="8" x2="16.5" y2="8" />
              <line x1="7.5" y1="16" x2="16.5" y2="16" />
            </svg>
          </div>
        )}

        {sold && (
          <div className="absolute inset-0 bg-surface-900/60 flex items-center justify-center">
            <span className="bg-white text-surface-900 font-bold text-sm px-4 py-2 rounded-full uppercase tracking-wider">
              Sold
            </span>
          </div>
        )}

        {/* Condition badge */}
        <div className="absolute top-3 left-3">
          <span className={`badge badge-condition-${condition}`}>
            {conditionLabel}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs font-medium text-brand-600 uppercase tracking-wider mb-1">
          {brand}
        </p>
        <h3 className="font-semibold text-surface-900 group-hover:text-brand-700 transition-colors line-clamp-1">
          {title}
        </h3>
        <p className="mt-2 text-xl font-bold text-surface-900">
          €{price.toFixed(0)}
        </p>
      </div>
    </Link>
  );
}
