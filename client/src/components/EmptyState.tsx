import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { spacing, typography } from '../constants/theme';
import { useTheme } from '../theme/ThemeProvider';
import { Button } from './Button';

export interface EmptyStateProps {
  /** Short, human title, e.g. "No IPOs yet". */
  title: string;
  /** Optional supporting sentence explaining what will appear here. */
  message?: string;
  /** Optional emoji/glyph shown above the title. */
  icon?: string;
  /** Optional call-to-action, e.g. "Refresh". */
  actionLabel?: string;
  onActionPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Standard empty state (no data yet). Always offers a clear next step when an
 * action is provided.
 */
export function EmptyState({
  title,
  message,
  icon,
  actionLabel,
  onActionPress,
  style,
  testID,
}: EmptyStateProps) {
  const { colors } = useTheme();

  return (
    <View testID={testID} style={[styles.container, style]}>
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      {message ? <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text> : null}
      {actionLabel && onActionPress ? (
        <Button label={actionLabel} onPress={onActionPress} variant="secondary" size="sm" style={styles.action} />
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
