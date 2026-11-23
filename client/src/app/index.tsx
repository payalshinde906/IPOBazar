import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getTheme, radius, spacing, typography } from '../constants/theme';
import { API_BASE_URL, fetchHealth } from '../services/api';

type ConnectionStatus = 'idle' | 'loading' | 'connected' | 'error';

/**
 * Home screen (S1). For Phase 3 it also acts as a live connectivity check
 * against the backend `/health` endpoint.
 */
export default function HomeScreen() {
  const scheme = useColorScheme();
  const theme = getTheme(scheme === 'dark');
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [status, setStatus] = useState<ConnectionStatus>('idle');
  const [detail, setDetail] = useState<string>('');

  const checkConnection = useCallback(async () => {
    setStatus('loading');
    setDetail('');
    try {
      const health = await fetchHealth();
      setStatus('connected');
      setDetail(`service: ${health.service}`);
    } catch (error) {
      setStatus('error');
      setDetail(error instanceof Error ? error.message : 'Unknown error');
    }
  }, []);

  useEffect(() => {
    void checkConnection();
  }, [checkConnection]);

  const statusColor =
    status === 'connected'
      ? theme.success
      : status === 'error'
        ? theme.danger
        : theme.textMuted;

  const statusLabel =
    status === 'connected'
      ? 'Backend: connected'
      : status === 'error'
        ? 'Backend: unreachable'
        : status === 'loading'
          ? 'Checking backend…'
          : 'Not checked';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <View>
          <Text style={styles.brand}>IPOBazar</Text>
          <Text style={styles.tagline}>Indian IPO tracking & investment companion</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>System status</Text>

          <View style={styles.row}>
            <View style={[styles.dot, { backgroundColor: statusColor }]} />
            <Text style={[styles.statusText, { color: statusColor }]}>{statusLabel}</Text>
            {status === 'loading' ? <ActivityIndicator size="small" color={theme.primary} /> : null}
          </View>

          {detail ? <Text style={styles.detail}>{detail}</Text> : null}
          <Text style={styles.detail}>API: {API_BASE_URL}</Text>

          <Pressable
            onPress={checkConnection}
            disabled={status === 'loading'}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? theme.primaryPressed : theme.primary },
              status === 'loading' && styles.buttonDisabled,
            ]}
          >
            <Text style={styles.buttonLabel}>Re-check connection</Text>
          </Pressable>
        </View>

        <View style={styles.sampleBanner}>
          <Text style={styles.sampleText}>
            SAMPLE DATA — features are built phase by phase. No live IPO data is shown yet.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function createStyles(theme: ReturnType<typeof getTheme>) {
  return StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.background },
    container: {
      flex: 1,
      padding: spacing.md,
      justifyContent: 'space-between',
    },
    brand: {
      ...typography.h1,
      color: theme.textPrimary,
    },
    tagline: {
      ...typography.bodySm,
      color: theme.textSecondary,
      marginTop: spacing.xxs,
    },
    card: {
      backgroundColor: theme.surface,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: theme.border,
      padding: spacing.md,
      gap: spacing.sm,
    },
    cardTitle: {
      ...typography.h3,
      color: theme.textPrimary,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: radius.pill,
    },
    statusText: {
      ...typography.bodyStrong,
      flex: 1,
    },
    detail: {
      ...typography.bodySm,
      color: theme.textSecondary,
    },
    button: {
      marginTop: spacing.xs,
      borderRadius: radius.md,
      paddingVertical: spacing.sm,
      alignItems: 'center',
    },
    buttonDisabled: { opacity: 0.6 },
    buttonLabel: {
      ...typography.bodyStrong,
      color: '#FFFFFF',
    },
    sampleBanner: {
      backgroundColor: theme.surfaceAlt,
      borderRadius: radius.md,
      padding: spacing.sm,
    },
    sampleText: {
      ...typography.caption,
      color: theme.textSecondary,
      textAlign: 'center',
    },
  });
}
