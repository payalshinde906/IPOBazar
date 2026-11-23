/**
 * Small color helpers for the design system.
 */

/**
 * Convert a `#RGB` / `#RRGGBB` hex color into an `rgba()` string with the given
 * alpha (0–1). Used to derive tinted backgrounds (e.g. badge fills) from the
 * semantic color tokens without introducing extra hex values.
 */
export function withAlpha(hex: string, alpha: number): string {
  const normalized = hex.replace('#', '');
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => char + char)
          .join('')
      : normalized;

  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
