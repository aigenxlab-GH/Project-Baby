import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './client';

const builder = imageUrlBuilder(sanityClient);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sanityImage(source: any) {
  return builder.image(source);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sanityImageUrl(source: any, width = 600): string {
  if (!source) return '';
  return sanityImage(source).width(width).auto('format').url();
}
