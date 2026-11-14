// src/app/(drawer)/(tabs)/quienes-somos.tsx
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Colors, Layout, Spacing } from '../../../constants/theme';

export default function QuienesSomosScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const [config, setConfig] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwl8cKeSWN9HhS4IYkWvWSHJhIMeoC-vBEeMtWJp2rn6CQLE7XBBW_FQ-AXPLQ4UPY/exec';

  useEffect(() => {
    fetch(`${SCRIPT_URL}?accion=config`)
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const formatText = (text?: string) => {
    if (!text) return '';
    return text.replace(/<br>/g, '\n').replace(/\\n/g, '\n');
  };

  if (loading) {
    return (
      <View style={[styles.loaderContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.contentWrapper}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Quiénes Somos</Text>

        <View style={[styles.card, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <Text style={[styles.title, { color: theme.primary }]}>
            {config.vision_titulo || 'Nuestra Historia y Visión'}
          </Text>
          <Text style={[styles.text, { color: theme.textSecondary }]}>
            {formatText(config.vision_detalle) || 'Somos una comunidad de fe comprometida...'}
          </Text>

          <Text style={[styles.subtitle, { color: theme.text }]}>
            {config.pastores_titulo || 'Nuestros Pastores'}
          </Text>
          <Text style={[styles.text, { color: theme.textSecondary }]}>
            {formatText(config.pastores_detalle)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  contentWrapper: { maxWidth: Layout.maxContentWidth, width: '100%', alignSelf: 'center', padding: Spacing.three },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: Spacing.three },
  card: { padding: Spacing.three, borderRadius: Layout.radius, borderWidth: 1, marginBottom: Spacing.three, elevation: 2 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: Spacing.two },
  subtitle: { fontSize: 16, fontWeight: 'bold', marginTop: Spacing.three, marginBottom: Spacing.one },
  text: { fontSize: 14, lineHeight: 22 },
});