import Image from 'next/image';
import Link from 'next/link';
import { Star, CheckCircle, XCircle, Award } from 'lucide-react';
import { BuyButton } from './BuyButton';
import type { ProductReview } from '@/types/product';

interface Props {
  product: ProductReview;
  variant?: 'card' | 'featured';
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 dark:text-gray-600'}`}
        />
      ))}
      <span className="ml-1.5 text-sm text-gray-500 dark:text-gray-400">{rating.toFixed(1)}</span>
    </div>
  );
}

export function ProductCard({ product, variant = 'card' }: Props) {
  const primaryLink = product.affiliateLinks?.[0];
  const productUrl = `/products/${product.category}/${product.slug}`;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden ${variant === 'featured' ? 'lg:flex' : ''}`}>
      {/* Image — featured: fixed height on mobile, fixed width on desktop */}
      <div className={`relative bg-gray-50 dark:bg-gray-700 ${variant === 'featured' ? 'h-52 lg:h-auto lg:w-64 lg:flex-shrink-0' : 'aspect-video'}`}>
        <Link href={productUrl}>
          <Image
            src={product.image || '/images/product-placeholder.jpg'}
            alt={product.imageAlt || product.productName}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </Link>
        {/* Score Badge */}
        <div className="absolute top-3 right-3 bg-brand-600 text-white rounded-full px-2.5 py-1 text-xs font-bold flex items-center gap-1">
          <Award className="h-3 w-3" />
          {product.ourScore}/10
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">{product.brand}</p>
          <Link href={productUrl} className="font-serif text-lg font-bold text-gray-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 leading-snug">
            {product.productName}
          </Link>
          <div className="mt-1.5">
            <StarRating rating={product.starRating} />
          </div>
        </div>

        {/* Pros & Cons */}
        <ul className="space-y-1">
          {product.pros.slice(0, 3).map((pro) => (
            <li key={pro} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              {pro}
            </li>
          ))}
          {product.cons.slice(0, 1).map((con) => (
            <li key={con} className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
              <XCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
              {con}
            </li>
          ))}
        </ul>

        {/* Bottom Line */}
        <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 rounded-lg px-3 py-2 italic">
          &ldquo;{product.bottomLine}&rdquo;
        </p>

        {/* CTA */}
        <div className="flex items-center gap-3 mt-auto pt-2">
          {primaryLink && (
            <BuyButton
              href={primaryLink.url}
              price={primaryLink.price}
              productName={product.productName}
            />
          )}
          <Link href={productUrl} className="text-sm text-brand-600 dark:text-brand-400 hover:underline">
            Full review →
          </Link>
        </div>
      </div>
    </div>
  );
}
