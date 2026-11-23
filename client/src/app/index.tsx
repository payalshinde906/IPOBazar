import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Card, ErrorState, LoadingState, ProvenanceBadge } from '../components';
import { spacing, typography } from '../constants/theme';
import { API_BASE_URL, fetchHealth } from '../services/api';
import { useTheme } from '../theme';

type ConnectionStatus = 'loading' | 'connected' | 'error';

/**
 * Home screen (S1). For Phase 3 it also acts as a live connectivity check
 * against the backend `/health` endpoint, now rendered with the Phase 4
 * design-system components.
 */
export default function HomeScreen() {
  const { colors } = useTheme();

  const [status, setStatus] = useState<ConnectionStatus>('loading');
  const [detail, setDetail] = useState<string>('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;
    fetchHealth()
      .then((health) => {
        if (!active) return;
        setStatus('connected');
        setDetail(`service: ${health.service}`);
      })
      .catch((error: unknown) => {
        if (!active) return;
        setStatus('error');
        setDetail(error instanceof Error ? error.message : 'Unknown error');
      });
    return () => {
      active = false;
    };
  }, [refreshKey]);

  const handleRecheck = useCallback(() => {
    setStatus('loading');
    setDetail('');
    setRefreshKey((key) => key + 1);
  }, []);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <View>
          <Text style={[styles.brand, { color: colors.textPrimary }]}>IPOBazar</Text>
          <Text style={[styles.tagline, { color: colors.textSecondary }]}>
            Indian IPO tracking & investment companion
          </Text>
        </View>

        <Card>
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>System status</Text>

          {status === 'loading' ? <LoadingState message="Checking backend…" /> : null}

          {status === 'error' ? (
            <ErrorState title="Backend unreachable" message={detail} onRetry={handleRecheck} />
          ) : null}

          {status === 'connected' ? (
            <View style={styles.connected}>
              <Text style={[styles.statusText, { color: colors.success }]}>Backend: connected</Text>
              <Text style={[styles.detail, { color: colors.textSecondary }]}>{detail}</Text>
              <Text style={[styles.detail, { color: colors.textSecondary }]}>API: {API_BASE_URL}</Text>
              <Button label="Re-check connection" onPress={handleRecheck} variant="secondary" size="sm" />
            </View>
          ) : null}
        </Card>

        <View style={[styles.sampleBanner, { backgroundColor: colors.surfaceAlt }]}>
          <ProvenanceBadge provenance="sample" />
          <Text style={[styles.sampleText, { color: colors.textSecondary }]}>
            Features are built phase by phase. No live IPO data is shown yet.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  brand: {
    ...typography.h1,
  },
  tagline: {
    ...typography.bodySm,
    marginTop: spacing.xxs,
  },
  cardTitle: {
    ...typography.h3,
    marginBottom: spacing.sm,
  },
  connected: { gap: spacing.xs },
  statusText: {
    ...typography.bodyStrong,
  },
  detail: {
    ...typography.bodySm,
  },
  sampleBanner: {
    alignItems: 'center',
    borderRadius: 10,
    padding: spacing.sm,
    gap: spacing.xxs,
  },
  sampleText: {
    ...typography.caption,
    textAlign: 'center',
  },
});
