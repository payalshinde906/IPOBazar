import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { spacing, typography } from '../constants/theme';
import { useTheme } from '../theme/ThemeProvider';
import { Badge, type BadgeTone } from './Badge';

/**
 * How a displayed financial value was obtained. Mandatory on every figure
 * (see docs/product/design_system.md §7).
 *
 * - `official`  — from an authorised source, shown with a timestamp.
 * - `estimated` — derived/anticipated; dashed border.
 * - `sample`    — development placeholder data.
 */
export type DataProvenance = 'official' | 'estimated' | 'sample';

export interface ProvenanceBadgeProps {
  provenance: DataProvenance;
  /** Source of an OFFICIAL value (exposed to assistive tech). */
  source?: string;
  /** Human-readable "last updated" timestamp for OFFICIAL values. */
  updatedAt?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const CONFIG: Record<DataProvenance, { label: string; tone: BadgeTone; dashed: boolean }> = {
  official: { label: 'OFFICIAL', tone: 'success', dashed: false },
  estimated: { label: 'ESTIMATED', tone: 'warning', dashed: true },
  sample: { label: 'SAMPLE DATA', tone: 'neutral', dashed: false },
};

/**
 * Data-provenance badge. Prefer `Unavailable` (plain text) over inventing a
 * value; this component only ever renders a truthful classification.
 */
export function ProvenanceBadge({
  provenance,
  source,
  updatedAt,
  style,
  testID,
}: ProvenanceBadgeProps) {
  const { colors } = useTheme();
  const config = CONFIG[provenance];
  const accessibilityLabel = source ? `${config.label} — source: ${source}` : config.label;

  return (
    <View style={[styles.row, style]} testID={testID}>
      <Badge
        label={config.label}
        tone={config.tone}
        dashed={config.dashed}
        accessibilityLabel={accessibilityLabel}
      />
      {provenance === 'official' && updatedAt ? (
        <Text style={[styles.timestamp, { color: colors.textMuted }]}>Updated {updatedAt}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  timestamp: {
    ...typography.caption,
  },
});
