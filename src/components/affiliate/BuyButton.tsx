import { ShoppingCart, ExternalLink } from 'lucide-react';
import { AffiliateLink } from './AffiliateLink';
import { getRetailerName } from '@/lib/affiliate';

interface Props {
  href: string;
  price?: string;
  productName?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export function BuyButton({ href, price, productName, variant = 'primary', size = 'md' }: Props) {
  const retailer = getRetailerName(href);

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variantClasses = {
    primary: 'bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-medium',
  };

  return (
    <AffiliateLink href={href} productName={productName} retailer={retailer}>
      <span
        className={`inline-flex items-center gap-2 rounded-full transition-colors cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]}`}
      >
        <ShoppingCart className="h-4 w-4" />
        <span>
          {price ? `Buy for ${price}` : `Buy on ${retailer}`}
        </span>
        <ExternalLink className="h-3 w-3 opacity-60" />
      </span>
    </AffiliateLink>
  );
}
