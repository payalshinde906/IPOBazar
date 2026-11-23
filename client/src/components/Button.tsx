import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { radius, spacing, typography } from '../constants/theme';
import { useTheme } from '../theme/ThemeProvider';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  /** Text shown inside the button; also used as the accessibility label. */
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner and blocks presses. */
  loading?: boolean;
  disabled?: boolean;
  /** Stretch to the container width. */
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/** Text/icon color used on the filled (primary) variant. */
const ON_PRIMARY = '#FFFFFF';

const SIZES: Record<ButtonSize, { minHeight: number; paddingHorizontal: number; fontSize: number; lineHeight: number }> = {
  sm: { minHeight: 44, paddingHorizontal: spacing.md, fontSize: 14, lineHeight: 20 },
  md: { minHeight: 48, paddingHorizontal: spacing.md, fontSize: 16, lineHeight: 24 },
  lg: { minHeight: 56, paddingHorizontal: spacing.lg, fontSize: 16, lineHeight: 24 },
};

/**
 * Primary action control. Variants: `primary` (filled), `secondary`
 * (outlined surface) and `ghost` (text-only). Minimum height is always ≥ 44pt
 * to satisfy the accessibility touch-target rule.
 */
export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  testID,
}: ButtonProps) {
  const { colors } = useTheme();
  const isDisabled = disabled || loading;
  const dimensions = SIZES[size];

  const backgroundColorFor = (pressed: boolean): string => {
    switch (variant) {
      case 'secondary':
        return pressed ? colors.surfaceAlt : colors.surface;
      case 'ghost':
        return pressed ? colors.surfaceAlt : 'transparent';
      case 'primary':
      default:
        return pressed ? colors.primaryPressed : colors.primary;
    }
  };

  const labelColor =
    variant === 'primary' ? ON_PRIMARY : variant === 'ghost' ? colors.primary : colors.textPrimary;

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          minHeight: dimensions.minHeight,
          paddingHorizontal: dimensions.paddingHorizontal,
          backgroundColor: backgroundColorFor(pressed),
        },
        variant === 'secondary' && { borderWidth: 1, borderColor: colors.border },
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      <View style={styles.content}>
        {loading ? <ActivityIndicator size="small" color={labelColor} /> : null}
        <Text
          style={[
            styles.label,
            { fontSize: dimensions.fontSize, lineHeight: dimensions.lineHeight, color: labelColor },
          ]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: { alignSelf: 'stretch' },
  disabled: { opacity: 0.6 },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  label: {
    ...typography.bodyStrong,
    textAlign: 'center',
  },
});
