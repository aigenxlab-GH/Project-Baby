import { NextRequest, NextResponse } from 'next/server';
import { searchNames } from '@/lib/baby-names';
import type { NameFilters } from '@/types/baby-name';


export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const filters: NameFilters = {
    query: searchParams.get('q') || undefined,
    gender: (searchParams.get('gender') as NameFilters['gender']) || 'all',
    startingLetter: searchParams.get('letter') || undefined,
    origin: searchParams.get('origin') || undefined,
    syllables: searchParams.get('syllables') ? parseInt(searchParams.get('syllables')!) : undefined,
    tag: searchParams.get('tag') || undefined,
  };

  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('limit') || '48');

  const result = searchNames(filters, page, pageSize);

  return NextResponse.json(result, {
    headers: {
      // Cache at Cloudflare CDN edge for 5 min; serve stale for 10 min while revalidating.
      // Repeated searches (same params) never reach the Worker.
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
