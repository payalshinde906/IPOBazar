import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { radius, spacing, typography, type ThemeColors } from '../constants/theme';
import { useTheme } from '../theme/ThemeProvider';
import { withAlpha } from '../utils/color';

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeVariant = 'soft' | 'solid' | 'outline';

export interface BadgeProps {
  label: string;
  tone?: BadgeTone;
  /** `soft` = tinted fill (default), `solid` = filled, `outline` = bordered only. */
  variant?: BadgeVariant;
  /** Render a dashed border (used for ESTIMATED provenance). */
  dashed?: boolean;
  /** Overrides the visible label for assistive technology. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

function resolveTone(colors: ThemeColors, tone: BadgeTone): string {
  switch (tone) {
    case 'accent':
      return colors.accent;
    case 'success':
      return colors.success;
    case 'warning':
      return colors.warning;
    case 'danger':
      return colors.danger;
    case 'info':
      return colors.info;
    case 'neutral':
    default:
      return colors.textSecondary;
  }
}

/**
 * Compact pill for status and provenance labels. Colors come from the semantic
 * tokens so it adapts to light/dark automatically.
 */
export function Badge({
  label,
  tone = 'neutral',
  variant = 'soft',
  dashed = false,
  accessibilityLabel,
  style,
  testID,
}: BadgeProps) {
  const { colors } = useTheme();
  const toneColor = resolveTone(colors, tone);

  const backgroundColor =
    variant === 'solid' ? toneColor : variant === 'soft' ? withAlpha(toneColor, 0.14) : 'transparent';
  const textColor = variant === 'solid' ? '#FFFFFF' : toneColor;
  const borderColor = variant === 'outline' || dashed ? withAlpha(toneColor, 0.6) : 'transparent';

  return (
    <View
      testID={testID}
      accessible
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel ?? label}
      style={[
        styles.badge,
        { backgroundColor, borderColor },
        (variant === 'outline' || dashed) && styles.bordered,
        dashed && styles.dashed,
        style,
      ]}
    >
      <Text numberOfLines={1} style={[styles.text, { color: textColor }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
  },
  bordered: { borderWidth: 1 },
  dashed: { borderStyle: 'dashed' },
  text: {
    ...typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
