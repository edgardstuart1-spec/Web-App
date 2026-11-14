// src/app/(drawer)/(tabs)/index.tsx
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Colors, Layout, Spacing } from '../../../constants/theme';

export default function IndexScreen() {
  const [versiculo, setVersiculo] = useState({ cita: 'Cargando...', texto: 'Buscando la lectura del día...' });
  const [config, setConfig] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwl8cKeSWN9HhS4IYkWvWSHJhIMeoC-vBEeMtWJp2rn6CQLE7XBBW_FQ-AXPLQ4UPY/exec';

  useEffect(() => {
    // Cargar versículo y configuración en paralelo
    Promise.all([
      fetch(SCRIPT_URL).then((res) => res.json()),
      fetch(`${SCRIPT_URL}?accion=config`).then((res) => res.json())
    ])
      .then(([versiculoData, configData]) => {
        setVersiculo(versiculoData);
        setConfig(configData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setVersiculo({ cita: 'Salmos 119:105', texto: 'Lámpara es a mis pies tu palabra, y lumbrera a mi camino.' });
        setLoading(false);
      });
  }, []);

  const formatText = (text?: string) => {
    if (!text) return '';
    return text.replace(/<br>/g, '\n').replace(/\\n/g, '\n');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.contentWrapper}>
        <Text style={[styles.title, { color: theme.text }]}>Un lugar para crecer en familia</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Bienvenidos a nuestra comunidad de fe
        </Text>

        {/* Tarjeta de Horarios Dinámica */}
        <View style={[styles.card, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <Text style={[styles.cardTitle, { color: theme.primary }]}>
            {config.horarios_titulo || 'Horarios de Servicios'}
          </Text>
          <Text style={[styles.cardText, { color: theme.text }]}>
            {formatText(config.horarios_detalle) || 'Domingo - 10:00 AM (Culto General)\nMiércoles - 7:00 PM (Estudio Bíblico)'}
          </Text>
        </View>

        {/* Tarjeta de Versículo para Meditar */}
        <View style={[styles.card, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <Text style={[styles.cardTitle, { color: theme.primary }]}>Versículo para Meditar</Text>
          {loading ? (
            <ActivityIndicator color={theme.primary} style={{ marginVertical: Spacing.two }} />
          ) : (
            <>
              <Text style={[styles.quote, { color: theme.text }]}>"{versiculo.texto}"</Text>
              <Text style={[styles.cite, { color: theme.primary }]}>— {versiculo.cita}</Text>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentWrapper: { maxWidth: Layout.maxContentWidth, width: '100%', alignSelf: 'center', padding: Spacing.three },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: Spacing.one },
  subtitle: { fontSize: 14, textAlign: 'center', marginBottom: Spacing.three },
  card: { padding: Spacing.three, borderRadius: Layout.radius, borderWidth: 1, marginBottom: Spacing.three },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: Spacing.two },
  cardText: { fontSize: 14, marginVertical: 2, lineHeight: 20 },
  quote: { fontSize: 14, fontStyle: 'italic', textAlign: 'center', marginVertical: Spacing.two, lineHeight: 20 },
  cite: { fontSize: 13, fontWeight: '600', textAlign: 'right', marginTop: Spacing.one },
});