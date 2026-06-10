'use client';

import { useEffect } from 'react';
import { adsConfig } from '@/config/ads';

interface Props {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdSlot({ slot, format = 'auto', responsive = true, className }: Props) {
  const publisherId = adsConfig.publisherId;
  // Both publisherId AND the specific slot must be real (no XXXX placeholder).
  // Without this double-check, setting a real publisher ID but leaving slot IDs
  // as placeholders causes AdSense to throw TagError in the browser console.
  const isConfigured =
    publisherId && !publisherId.includes('XXXX') &&
    slot && !slot.includes('XXXX');

  useEffect(() => {
    if (!isConfigured) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense script not yet loaded — safe to ignore
    }
  }, [isConfigured]);

  if (!isConfigured) {
    return null;
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
