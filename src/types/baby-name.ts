export interface BabyName {
  id: string;
  name: string;
  gender: 'girl' | 'boy' | 'neutral';
  origin: string[];
  meaning: string;
  popularityRank?: number;
  popularityTrend: 'rising' | 'stable' | 'falling';
  syllables: number;
  startingLetter: string;
  tags: string[];
  relatedNames?: string[];
  famousNamebearers?: string[];
  nicknames?: string[];
}

export interface NameFilters {
  gender?: 'girl' | 'boy' | 'neutral' | 'all';
  startingLetter?: string;
  origin?: string;
  syllables?: number;
  tag?: string;
  query?: string;
}
