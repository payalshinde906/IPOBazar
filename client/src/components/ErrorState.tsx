import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { spacing, typography } from '../constants/theme';
import { useTheme } from '../theme/ThemeProvider';
import { Button } from './Button';

export interface ErrorStateProps {
  /** Short title, e.g. "Couldn't load IPOs". */
  title?: string;
  /** Optional detail (e.g. the error message). */
  message?: string;
  /** Label for the retry button. Pass `retryLabel` + `onRetry` to show it. */
  retryLabel?: string;
  onRetry?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Standard error state with an optional retry action. Rendered in the danger
 * accent so failures are never mistaken for empty data.
 */
export function ErrorState({
  title = 'Something went wrong',
  message,
  retryLabel = 'Try again',
  onRetry,
  style,
  testID,
}: ErrorStateProps) {
  const { colors } = useTheme();

  return (
    <View testID={testID} style={[styles.container, style]}>
      <Text style={styles.icon}>⚠️</Text>
      <Text accessibilityRole="alert" style={[styles.title, { color: colors.danger }]}>
        {title}
      </Text>
      {message ? <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text> : null}
      {onRetry ? (
        <Button label={retryLabel} onPress={onRetry} variant="secondary" size="sm" style={styles.action} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  icon: { fontSize: 40, lineHeight: 48 },
  title: {
    ...typography.h3,
    textAlign: 'center',
  },
  message: {
    ...typography.bodySm,
    textAlign: 'center',
  },
  action: { marginTop: spacing.sm },
});
