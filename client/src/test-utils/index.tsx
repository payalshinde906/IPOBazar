import { render as rtlRender, type RenderOptions } from '@testing-library/react-native';
import type { ReactElement } from 'react';

import { ThemeProvider, type ThemeMode } from '../theme';

export interface AppRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  /** Theme mode to render with. Defaults to `light` for deterministic tests. */
  mode?: ThemeMode;
}

/**
 * Test renderer that wraps the UI in a `ThemeProvider` (components call
 * `useTheme()` and would otherwise throw). Defaults to the light theme so tests
 * don't depend on the host machine's colour scheme.
 *
 * NOTE: re-export below is explicit (not `export *`) so this `render` is not
 * overwritten by the library's own `render`.
 */
export function render(ui: ReactElement, { mode = 'light', ...options }: AppRenderOptions = {}) {
  return rtlRender(<ThemeProvider initialMode={mode}>{ui}</ThemeProvider>, options);
}

export { act, cleanup, fireEvent, screen, waitFor, within } from '@testing-library/react-native';
