'use client';

import registryData from '@/data/registry-checklist.json';
import { ChecklistTool, type ChecklistItem } from '@/components/tools/ChecklistTool';

const CATEGORY_LABELS: Record<string, string> = {
  nursery: '🛏️ Nursery',
  feeding: '🍼 Feeding',
  travel: '🚗 Travel & On the Go',
  'health-safety': '🏥 Health & Safety',
  bathing: '🛁 Bathing',
  clothing: '👕 Clothing',
  'play-development': '🧸 Play & Development',
};

export function RegistryChecklist() {
  return (
    <ChecklistTool
      items={registryData as ChecklistItem[]}
      categoryLabels={CATEGORY_LABELS}
      progressLabel="Registry Progress"
      trackingSource="registry_checklist"
    />
  );
}
