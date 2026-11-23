import { ActivityIndicator, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { spacing, typography } from '../constants/theme';
import { useTheme } from '../theme/ThemeProvider';

export interface LoadingStateProps {
  message?: string;
  /** Fill and centre vertically within the parent (full-screen loading). */
  fullscreen?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/** Standard loading state (spinner + optional message). */
export function LoadingState({
  message = 'Loading…',
  fullscreen = false,
  style,
  testID,
}: LoadingStateProps) {
  const { colors } = useTheme();

  return (
    <View
      testID={testID}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={message}
      style={[styles.container, fullscreen && styles.fullscreen, style]}
    >
      <ActivityIndicator size="large" color={colors.primary} />
      {message ? <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  fullscreen: {
    flex: 1,
  },
  message: {
    ...typography.bodySm,
    textAlign: 'center',
  },
});
