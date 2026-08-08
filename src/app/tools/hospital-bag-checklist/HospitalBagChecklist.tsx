'use client';

import hospitalBagData from '@/data/hospital-bag-checklist.json';
import { ChecklistTool, type ChecklistItem } from '@/components/tools/ChecklistTool';

const CATEGORY_LABELS: Record<string, string> = {
  'for-mom': '🤰 For You',
  'for-baby': '👶 For Baby',
  'for-partner': '🧑‍🤝‍🧑 For Your Partner/Support Person',
  'documents-comfort': '📄 Documents & Essentials',
  'postpartum-recovery': '💗 Postpartum Recovery',
};

export function HospitalBagChecklist() {
  return (
    <ChecklistTool
      items={hospitalBagData as ChecklistItem[]}
      categoryLabels={CATEGORY_LABELS}
      progressLabel="Packing Progress"
      trackingSource="hospital_bag_checklist"
    />
  );
}
