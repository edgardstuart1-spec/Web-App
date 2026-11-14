// src/app/(drawer)/(tabs)/reflexiones.tsx
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Colors, Layout, Spacing } from '../../../constants/theme';

interface Reflexion {
  id: string;
  titulo: string;
  resumen: string;
  contenido: string;
}

export default function ReflexionesScreen() {
  const router = useRouter();

  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const [reflexiones, setReflexiones] = useState<Reflexion[]>([]);
  const [cargando, setCargando] = useState(true);

  // PEGA AQUÍ TU URL DE GOOGLE APPS SCRIPT (la misma que usas en el index o oracion, agregando ?accion=reflexiones)
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwl8cKeSWN9HhS4IYkWvWSHJhIMeoC-vBEeMtWJp2rn6CQLE7XBBW_FQ-AXPLQ4UPY/exec?accion=reflexiones';

  useEffect(() => {
    fetch(GOOGLE_SCRIPT_URL)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReflexiones(data);
        } else {
          // Fallback por si la hoja está vacía o retorna un objeto de error
          setReflexiones([
            {
              id: '1',
              titulo: 'El perdón de los pecados y nuestra libertad en Cristo',
              resumen: 'Una lectura edificante sobre cómo caminar sin cargas espirituales...',
              contenido: 'Contenido completo de la reflexión pastoral...'
            }
          ]);
        }
        setCargando(false);
      })
      .catch((err) => {
        console.error(err);
        setCargando(false);
      });
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.contentWrapper}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Reflexiones Pastorales</Text>

        {cargando ? (
          <ActivityIndicator color={theme.primary} style={{ marginTop: Spacing.three }} />
        ) : (
          reflexiones.map((item) => (
            <TouchableOpacity 
              key={item.id}
              style={[
                styles.card, 
                { backgroundColor: theme.backgroundElement, borderColor: theme.border }
              ]}
              onPress={() => router.push({
                pathname: '/articulo-detalle',
                params: { titulo: item.titulo, contenido: item.contenido }
              })}
              activeOpacity={0.7}
            >
              <Text style={[styles.title, { color: theme.primary }]}>
                {item.titulo}
              </Text>
              <Text style={[styles.resumen, { color: theme.textSecondary }]}>
                {item.resumen}
              </Text>
              <Text style={[styles.readMore, { color: theme.primary }]}>
                Leer artículo completo →
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    maxWidth: Layout.maxContentWidth,
    width: '100%',
    alignSelf: 'center',
    padding: Spacing.three,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Spacing.three,
  },
  card: {
    padding: Spacing.three,
    borderRadius: Layout.radius,
    borderWidth: 1,
    marginBottom: Spacing.three,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: Spacing.one,
  },
  resumen: {
    fontSize: 14,
    marginBottom: Spacing.two,
    lineHeight: 20,
  },
  readMore: {
    fontSize: 14,
    fontWeight: '600',
  },
});