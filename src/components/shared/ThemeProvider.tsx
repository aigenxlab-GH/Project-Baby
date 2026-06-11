'use client';

/**
 * Custom theme provider — replaces next-themes to avoid the __name esbuild bug.
 *
 * Root cause: next-themes v0.4.6 generates its theme-init <script> by calling
 * I.toString(), serialising the compiled function. OpenNext's esbuild adds
 * __name() helper calls to named functions inside I; those references end up in
 * the injected inline script where __name is undefined → ReferenceError.
 *
 * Fix: use a plain string constant for the init script (esbuild never touches
 * string literals) and a minimal React context for theme state.
 */

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

const STORAGE_KEY = 'pregnancysprout-theme';

type Theme = 'light' | 'dark';

interface ThemeCtx {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const Ctx = createContext<ThemeCtx>({ theme: 'dark', setTheme: () => {} });

/** Drop-in replacement for next-themes useTheme */
export function useTheme(): ThemeCtx {
  return useContext(Ctx);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');

  // Sync React state with whatever the inline script already set on <html>
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored === 'light' || stored === 'dark') {
        setThemeState(stored);
      } else {
        // No stored preference — read current class from <html>
        setThemeState(
          document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        );
      }
    } catch {
      /* localStorage blocked (private mode etc.) */
    }
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* noop */
    }
    document.documentElement.classList.toggle('dark', t === 'dark');
  };

  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
}
