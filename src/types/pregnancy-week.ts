export interface PregnancyWeek {
  week: number;
  trimester: 1 | 2 | 3;
  babySize: {
    comparison: string;
    lengthCm: number;
    weightGrams: number;
  };
  babyDevelopment: string[];
  momSymptoms: string[];
  momTips: string[];
  keyMilestone?: string;
  checklistItems?: string[];
  slug: string;
}
