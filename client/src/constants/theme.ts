/**
 * IPOBazar design tokens (see docs/product/design_system.md).
 *
 * Colors are exposed through *semantic* token names so screens never hard-code
 * hex values. The same token names exist for the light and dark themes, so
 * components never need theme-specific logic.
 *
 * NOTE: Custom font families (Inter / Space Grotesk) are wired up in Phase 4
 * when the font assets are added; for now `fontFamily` is intentionally left to
 * the platform default so nothing renders with a missing font.
 */

/** The full set of semantic color tokens (identical keys in both themes). */
export interface ThemeColors {
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  primary: string;
  primaryPressed: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  overlay: string;
}

export type ThemeName = 'light' | 'dark';

export const palette: Record<ThemeName, ThemeColors> = {
  light: {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceAlt: '#F1F5F9',
    border: '#E2E8F0',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    primary: '#1D4ED8',
    primaryPressed: '#1E40AF',
    accent: '#0891B2',
    success: '#16A34A',
    warning: '#D97706',
    danger: '#DC2626',
    info: '#0891B2',
    overlay: 'rgba(15,23,42,0.45)',
  },
  dark: {
    background: '#0B1220',
    surface: '#131C2E',
    surfaceAlt: '#1B2740',
    border: '#263449',
    textPrimary: '#E7EDF6',
    textSecondary: '#9FB0C7',
    textMuted: '#64748B',
    primary: '#3B82F6',
    primaryPressed: '#2563EB',
    accent: '#22D3EE',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#22D3EE',
    overlay: 'rgba(0,0,0,0.6)',
  },
};

/** Return the color token set for the requested appearance. */
export function getTheme(isDark: boolean): ThemeColors {
  return isDark ? palette.dark : palette.light;
}

/** 4-pt spacing scale. */
export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
} as const;

/** Corner radius scale. */
export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  pill: 999,
} as const;

/** Type scale (sizes + weights). Family assignment happens in Phase 4. */
export const typography = {
  display: { fontSize: 34, lineHeight: 40, fontWeight: '700' },
  h1: { fontSize: 28, lineHeight: 34, fontWeight: '700' },
  h2: { fontSize: 22, lineHeight: 28, fontWeight: '600' },
  h3: { fontSize: 18, lineHeight: 24, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  bodyStrong: { fontSize: 16, lineHeight: 24, fontWeight: '600' },
  bodySm: { fontSize: 14, lineHeight: 20, fontWeight: '400' },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '500' },
} as const;
