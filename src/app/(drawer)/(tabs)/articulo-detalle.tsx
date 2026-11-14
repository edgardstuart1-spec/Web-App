// src/app/(drawer)/(tabs)/articulo-detalle.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Colors, Layout, Spacing } from '../../../constants/theme';

export default function ArticuloDetalleScreen() {
  const { titulo, contenido } = useLocalSearchParams();
  const router = useRouter();
  
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.contentWrapper}>
        {/* Botón para regresar fácilmente a la lista */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.push('/(drawer)/(tabs)/reflexiones')}
        >
          <Text style={[styles.backText, { color: theme.primary }]}>← Volver a reflexiones</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.text }]}>
          {titulo || 'Reflexión Pastoral'}
        </Text>
        
        <View style={[styles.card, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <Text style={[styles.content, { color: theme.text }]}>
            {contenido || 'No hay contenido disponible para este artículo.'}
          </Text>
        </View>
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
  backButton: {
    marginBottom: Spacing.two,
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: Spacing.three,
    lineHeight: 30,
  },
  card: {
    padding: Spacing.three,
    borderRadius: Layout.radius,
    borderWidth: 1,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});