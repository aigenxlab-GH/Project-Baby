'use client';

import { useState } from 'react';
import { AlertTriangle, CheckCircle, Eye, Phone } from 'lucide-react';

interface Symptom {
  id: string;
  label: string;
  urgency: 'normal' | 'monitor' | 'call-doctor';
  explanation: string;
  tip?: string;
}

const SYMPTOMS: Symptom[] = [
  { id: 'nausea', label: 'Nausea / Morning Sickness', urgency: 'normal', explanation: 'Nausea is one of the most common pregnancy symptoms, especially in the first trimester. It\'s caused by rising hCG and estrogen levels.', tip: 'Try ginger tea, eating small frequent meals, and vitamin B6 supplements (consult your OB).' },
  { id: 'fatigue', label: 'Extreme Fatigue', urgency: 'normal', explanation: 'Fatigue is very common in the first and third trimesters due to hormonal changes and increased blood production. Rest as much as you can.', tip: 'Listen to your body and rest when needed. Gentle exercise like walking can actually boost energy.' },
  { id: 'spotting', label: 'Light Spotting / Brown Discharge', urgency: 'monitor', explanation: 'Light spotting or brown discharge can be normal (implantation bleeding, cervical sensitivity). However, any bleeding should be reported to your OB.', tip: 'Note the color, amount, and whether it\'s accompanied by cramping. Call your OB to report it.' },
  { id: 'cramping', label: 'Mild Cramping', urgency: 'monitor', explanation: 'Mild cramping without bleeding can be normal as your uterus stretches. However, cramping with bleeding or severe cramping warrants immediate contact with your provider.', tip: 'Rest, drink water, and use a warm (not hot) compress on your lower back.' },
  { id: 'heavy-bleeding', label: 'Heavy Bleeding', urgency: 'call-doctor', explanation: 'Heavy vaginal bleeding during pregnancy always requires immediate medical attention. It could indicate miscarriage, placenta previa, or placental abruption.', tip: 'Call your OB or go to the ER immediately. Do not drive yourself.' },
  { id: 'severe-pain', label: 'Severe Abdominal Pain', urgency: 'call-doctor', explanation: 'Severe or persistent abdominal pain can indicate ectopic pregnancy, placental abruption, appendicitis, or preterm labor. Seek immediate care.', tip: 'Call 911 or go to the emergency room immediately.' },
  { id: 'headache', label: 'Severe Headache', urgency: 'call-doctor', explanation: 'A severe headache, especially in the second or third trimester, can be a sign of preeclampsia (high blood pressure in pregnancy). This requires urgent evaluation.', tip: 'Call your OB immediately. Do not take NSAIDs — use acetaminophen (Tylenol) only.' },
  { id: 'swelling', label: 'Sudden Swelling of Face/Hands', urgency: 'call-doctor', explanation: 'Sudden, severe swelling of the face, hands, or feet — especially with headache or vision changes — can indicate preeclampsia. Call your OB immediately.', tip: 'This is a medical emergency. Call your OB or go to the hospital.' },
  { id: 'vision', label: 'Vision Changes', urgency: 'call-doctor', explanation: 'Blurred vision, seeing spots, or sudden vision loss during pregnancy can be signs of preeclampsia or gestational hypertension.', tip: 'Call your OB immediately. Do not wait for your next appointment.' },
  { id: 'no-movement', label: 'Decreased Fetal Movement', urgency: 'call-doctor', explanation: 'After 28 weeks, you should feel at least 10 movements in 2 hours. A significant decrease in baby\'s movements always warrants immediate contact with your provider.', tip: 'Try lying on your left side and drinking cold water. If you still don\'t feel 10 movements in 2 hours, call your OB.' },
  { id: 'back-pain', label: 'Back Pain', urgency: 'monitor', explanation: 'Lower back pain is extremely common in pregnancy due to weight gain and postural changes. Severe, persistent back pain may indicate preterm labor or kidney infection.', tip: 'Prenatal massage, a pregnancy support belt, and prenatal yoga can help. Alert your OB if pain is severe or comes in waves.' },
  { id: 'heartburn', label: 'Heartburn / Acid Reflux', urgency: 'normal', explanation: 'Heartburn is caused by progesterone relaxing the valve between your stomach and esophagus. It\'s very common throughout pregnancy, especially in the third trimester.', tip: 'Eat small meals, avoid spicy/acidic foods, and sleep with your head elevated. Tums is generally safe — check with your OB.' },
  { id: 'frequent-urination', label: 'Frequent Urination', urgency: 'normal', explanation: 'Frequent urination is normal throughout pregnancy due to increased blood volume and, later, the baby pressing on the bladder.', tip: 'Stay hydrated but reduce fluids before bed. Alert your OB if you have burning or pain when urinating (UTI symptoms).' },
  { id: 'contractions', label: 'Regular Contractions (before 37 weeks)', urgency: 'call-doctor', explanation: 'Regular contractions before 37 weeks may indicate preterm labor and require immediate medical evaluation.', tip: 'Time your contractions. If they are regular and getting closer together, call your OB or go to labor and delivery.' },
];

const URGENCY_CONFIG = {
  normal: { label: '✅ Normal in Pregnancy', color: 'bg-green-50 border-green-200 text-green-900', icon: CheckCircle, iconColor: 'text-green-500' },
  monitor: { label: '👀 Monitor & Report to Doctor', color: 'bg-amber-50 border-amber-200 text-amber-900', icon: Eye, iconColor: 'text-amber-500' },
  'call-doctor': { label: '🚨 Call Your Doctor Immediately', color: 'bg-red-50 border-red-200 text-red-900', icon: Phone, iconColor: 'text-red-500' },
};

export function SymptomChecker() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const selectedSymptoms = SYMPTOMS.filter((s) => selected.has(s.id));
  const hasUrgent = selectedSymptoms.some((s) => s.urgency === 'call-doctor');

  return (
    <div className="space-y-6">
      {/* Symptom Selection */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Select your symptoms:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SYMPTOMS.map((s) => {
            const isSelected = selected.has(s.id);
            return (
              <button
                key={s.id}
                onClick={() => toggle(s.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${isSelected ? (s.urgency === 'call-doctor' ? 'border-red-300 bg-red-50' : s.urgency === 'monitor' ? 'border-amber-300 bg-amber-50' : 'border-green-300 bg-green-50') : 'border-gray-100 hover:border-brand-200 hover:bg-brand-50'}`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${isSelected ? 'bg-brand-600 border-brand-600' : 'border-gray-300'}`} />
                <span className="text-sm font-medium text-gray-700">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Urgent Alert */}
      {hasUrgent && (
        <div className="bg-red-50 border border-red-300 rounded-2xl p-5 flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-red-900 text-lg">⚠️ Call Your Doctor or Go to the ER</p>
            <p className="text-red-800 text-sm mt-1">You have selected one or more symptoms that require immediate medical attention.</p>
          </div>
        </div>
      )}

      {/* Results */}
      {selectedSymptoms.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-gray-900">Your Symptom Information</h2>
          {selectedSymptoms.map((s) => {
            const config = URGENCY_CONFIG[s.urgency];
            const Icon = config.icon;
            return (
              <div key={s.id} className={`rounded-2xl border p-5 ${config.color}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`h-5 w-5 ${config.iconColor} flex-shrink-0`} />
                  <p className="font-semibold">{s.label}</p>
                  <span className="text-xs font-medium ml-auto">{config.label}</span>
                </div>
                <p className="text-sm leading-relaxed mb-3">{s.explanation}</p>
                {s.tip && (
                  <div className="bg-white bg-opacity-60 rounded-xl px-4 py-2.5">
                    <p className="text-xs font-medium">💡 Tip: {s.tip}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {selected.size === 0 && (
        <div className="text-center py-8 text-gray-400">
          <p>Select one or more symptoms above to see information</p>
        </div>
      )}
    </div>
  );
}
