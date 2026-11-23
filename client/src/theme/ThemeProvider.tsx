import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { getTheme, type ThemeColors, type ThemeName } from '../constants/theme';

/**
 * App-wide theme provider.
 *
 * The design system defines a light theme as the default and a first-class dark
 * theme (docs/product/design_system.md). Screens and components read colors via
 * the `useTheme()` hook so no component ever hard-codes a hex value or needs
 * theme-specific logic.
 */
export type ThemeMode = 'system' | 'light' | 'dark';

export interface ThemeContextValue {
  /** The user's preference (defaults to following the OS). */
  mode: ThemeMode;
  /** The resolved theme name after applying the preference. */
  theme: ThemeName;
  isDark: boolean;
  /** Semantic color tokens for the resolved theme. */
  colors: ThemeColors;
  setMode: (mode: ThemeMode) => void;
  /** Flip between light and dark based on the currently resolved theme. */
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: ReactNode;
  /** Override the initial preference (mainly for tests). */
  initialMode?: ThemeMode;
}

export function ThemeProvider({ children, initialMode = 'system' }: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(initialMode);

  const isDark = mode === 'system' ? systemScheme === 'dark' : mode === 'dark';
  const theme: ThemeName = isDark ? 'dark' : 'light';

  const toggle = useCallback(() => {
    setMode((current) => {
      const currentIsDark = current === 'system' ? systemScheme === 'dark' : current === 'dark';
      return currentIsDark ? 'light' : 'dark';
    });
  }, [systemScheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      theme,
      isDark,
      colors: getTheme(isDark),
      setMode,
      toggle,
    }),
    [mode, theme, isDark, toggle],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/** Read the current theme. Must be called inside a `ThemeProvider`. */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
