'use client';

import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { Timer, Pause, Play, Trash2, AlertTriangle } from 'lucide-react';

interface Contraction {
  startTime: number;
  endTime?: number;
  duration?: number;
}

export function ContractionTimer() {
  const [contractions, setContractions] = useState<Contraction[]>([]);
  const [active, setActive] = useState<Contraction | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (active) {
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - active.startTime);
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setElapsed(0);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active]);

  function startContraction() {
    setActive({ startTime: Date.now() });
  }

  function stopContraction() {
    if (!active) return;
    const endTime = Date.now();
    const duration = endTime - active.startTime;
    const finished: Contraction = { ...active, endTime, duration };
    setContractions((prev) => [finished, ...prev]);
    setActive(null);
  }

  function clear() {
    setContractions([]);
    setActive(null);
  }

  function formatMs(ms: number) {
    const seconds = Math.floor(ms / 1000);
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  }

  const lastFew = contractions.slice(0, 6);
  const avgFrequency = contractions.length >= 2
    ? Math.round((contractions[0].startTime - contractions[contractions.length - 1].startTime) / (contractions.length - 1) / 1000 / 60 * 10) / 10
    : null;
  const avgDuration = contractions.length > 0
    ? Math.round(contractions.reduce((s, c) => s + (c.duration ?? 0), 0) / contractions.length / 1000)
    : null;

  const show511Alert = avgFrequency !== null && avgFrequency <= 5 && avgDuration !== null && avgDuration >= 60 && contractions.length >= 12;

  return (
    <div className="space-y-5">
      {show511Alert && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-red-900">511 Rule Met — Consider Going to the Hospital</p>
            <p className="text-red-700 text-sm mt-1">
              Contractions are approximately {avgFrequency} min apart and {avgDuration}s long. Contact your care provider.
            </p>
          </div>
        </div>
      )}

      {/* Main Button */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
        {active ? (
          <div className="mb-6">
            <div className="text-6xl font-bold font-mono text-brand-600 mb-2">
              {formatMs(elapsed)}
            </div>
            <p className="text-gray-500 text-sm">Contraction in progress...</p>
          </div>
        ) : (
          <div className="mb-6">
            <Timer className="h-12 w-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">Press Start when a contraction begins</p>
          </div>
        )}

        <button
          onClick={active ? stopContraction : startContraction}
          className={`w-full py-5 rounded-2xl text-xl font-bold transition-all active:scale-95 ${active
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-brand-600 hover:bg-brand-700 text-white'
          }`}
        >
          {active ? (
            <span className="flex items-center justify-center gap-2">
              <Pause className="h-6 w-6" /> Stop Contraction
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Play className="h-6 w-6" /> Start Contraction
            </span>
          )}
        </button>
      </div>

      {/* Stats */}
      {contractions.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Count</p>
            <p className="text-2xl font-bold text-gray-900">{contractions.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Avg Frequency</p>
            <p className="text-2xl font-bold text-gray-900">
              {avgFrequency !== null ? `${avgFrequency}m` : '—'}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Avg Duration</p>
            <p className="text-2xl font-bold text-gray-900">
              {avgDuration !== null ? `${avgDuration}s` : '—'}
            </p>
          </div>
        </div>
      )}

      {/* History */}
      {contractions.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Contraction History</h3>
            <button onClick={clear} className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1">
              <Trash2 className="h-4 w-4" /> Clear
            </button>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-2 text-xs text-gray-500 font-medium">#</th>
                <th className="text-left px-5 py-2 text-xs text-gray-500 font-medium">Time</th>
                <th className="text-left px-5 py-2 text-xs text-gray-500 font-medium">Duration</th>
                <th className="text-left px-5 py-2 text-xs text-gray-500 font-medium">Frequency</th>
              </tr>
            </thead>
            <tbody>
              {lastFew.map((c, i) => {
                const prev = lastFew[i + 1];
                const freq = prev && c.endTime
                  ? Math.round((c.startTime - prev.startTime) / 1000 / 60 * 10) / 10
                  : null;
                return (
                  <tr key={c.startTime} className="border-t border-gray-50">
                    <td className="px-5 py-3 text-gray-500">{contractions.length - i}</td>
                    <td className="px-5 py-3 text-gray-700">{format(new Date(c.startTime), 'h:mm:ss a')}</td>
                    <td className="px-5 py-3 font-medium text-gray-900">
                      {c.duration ? formatMs(c.duration) : '—'}
                    </td>
                    <td className="px-5 py-3 text-gray-600">
                      {freq !== null ? `${freq} min apart` : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
