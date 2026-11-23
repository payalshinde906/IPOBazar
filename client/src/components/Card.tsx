import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { radius, spacing } from '../constants/theme';
import { useTheme } from '../theme/ThemeProvider';

export interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Surface container with the design-system radius, hairline border and a subtle
 * elevation. Used to group related content.
 */
export function Card({ children, style, testID }: CardProps) {
  const { colors } = useTheme();

  return (
    <View
      testID={testID}
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }, style]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
});
