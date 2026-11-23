import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { radius, spacing, typography } from '../constants/theme';
import { useTheme } from '../theme/ThemeProvider';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  /** Visible field label. */
  label?: string;
  /** Helper text shown below the field when there is no error. */
  helper?: string;
  /** Error message; when present the field is styled as invalid. */
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Labelled text field with focus, helper and error states. The border color
 * reflects state (error → danger, focused → accent, otherwise → border).
 */
export function Input({
  label,
  helper,
  error,
  containerStyle,
  testID,
  onFocus,
  onBlur,
  accessibilityLabel,
  accessibilityHint,
  ...rest
}: InputProps) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);
  const hasError = Boolean(error);

  const borderColor = hasError ? colors.danger : focused ? colors.accent : colors.border;

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text> : null}

      <TextInput
        {...rest}
        testID={testID}
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityHint={hasError ? error : accessibilityHint}
        placeholderTextColor={colors.textMuted}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        style={[
          styles.input,
          {
            backgroundColor: colors.surfaceAlt,
            borderColor,
            color: colors.textPrimary,
          },
        ]}
      />

      {hasError ? (
        <Text style={[styles.helper, { color: colors.danger }]}>{error}</Text>
      ) : helper ? (
        <Text style={[styles.helper, { color: colors.textMuted }]}>{helper}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.xxs },
  label: { ...typography.caption },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    ...typography.body,
  },
  helper: { ...typography.caption },
});
