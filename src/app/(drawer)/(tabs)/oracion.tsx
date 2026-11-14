// src/app/(drawer)/(tabs)/oracion.tsx
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View
} from 'react-native';
import { Colors, Layout, Spacing } from '../../../constants/theme';

export default function OracionScreen() {
  const [nombre, setNombre] = useState('');
  const [peticion, setPeticion] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Estado para manejar alertas visuales limpias dentro de la app
  const [mensajeFeedback, setMensajeFeedback] = useState<{ tipo: 'success' | 'error'; texto: string } | null>(null);

  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const GOOGLE_SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbwl8cKeSWN9HhS4IYkWvWSHJhIMeoC-vBEeMtWJp2rn6CQLE7XBBW_FQ-AXPLQ4UPY/exec';

  const enviarPeticion = async () => {
    if (!peticion.trim()) {
      setMensajeFeedback({ tipo: 'error', texto: 'Por favor escribe tu petición de oración.' });
      return;
    }

    setLoading(true);
    setMensajeFeedback(null);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          nombre: nombre.trim(),
          peticion: peticion.trim(),
        }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setMensajeFeedback({ tipo: 'success', texto: '¡Tu petición de oración ha sido registrada con éxito!' });
        setNombre('');
        setPeticion('');
      } else {
        setMensajeFeedback({ tipo: 'error', texto: 'No se pudo registrar la petición. Inténtalo de nuevo.' });
      }
    } catch (error) {
      console.error(error);
      setMensajeFeedback({ tipo: 'error', texto: 'Error de conexión. Verifica tu internet.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.contentWrapper}>
        <Text style={[styles.title, { color: theme.text }]}>Peticiones de Oración</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Estamos aquí para apoyarte en fe y oración. Déjanos tu petición.
        </Text>

        {/* Alerta Visual Integrada (Reemplaza el alert feo del sistema) */}
        {mensajeFeedback && (
          <View 
            style={[
              styles.feedbackBanner, 
              { 
                backgroundColor: mensajeFeedback.tipo === 'success' ? '#d1fae5' : '#fee2e2',
                borderColor: mensajeFeedback.tipo === 'success' ? '#10b981' : '#ef4444'
              }
            ]}
          >
            <Ionicons 
              name={mensajeFeedback.tipo === 'success' ? 'checkmark-circle' : 'alert-circle'} 
              size={20} 
              color={mensajeFeedback.tipo === 'success' ? '#065f46' : '#991b1b'} 
              style={{ marginRight: 8 }}
            />
            <Text 
              style={[
                styles.feedbackText, 
                { color: mensajeFeedback.tipo === 'success' ? '#065f46' : '#991b1b' }
              ]}
            >
              {mensajeFeedback.texto}
            </Text>
          </View>
        )}

        <View
          style={[
            styles.card,
            { backgroundColor: theme.backgroundElement, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.label, { color: theme.text }]}>Tu Nombre (Opcional)</Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: theme.background, color: theme.text, borderColor: theme.border },
            ]}
            placeholder="Ej. Juan Pérez"
            placeholderTextColor={theme.textSecondary}
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={[styles.label, { color: theme.text }]}>Tu Petición</Text>
          <TextInput
            style={[
              styles.textArea,
              { backgroundColor: theme.background, color: theme.text, borderColor: theme.border },
            ]}
            placeholder="Escribe tu mensaje aquí..."
            placeholderTextColor={theme.textSecondary}
            multiline
            numberOfLines={4}
            value={peticion}
            onChangeText={setPeticion}
          />

          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: theme.primary, opacity: pressed || loading ? 0.8 : 1 },
            ]}
            onPress={enviarPeticion}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>Enviar Petición</Text>
            )}
          </Pressable>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Spacing.one,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: Spacing.three,
  },
  feedbackBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.two + 4,
    borderRadius: Layout.radius,
    borderWidth: 1,
    marginBottom: Spacing.three,
  },
  feedbackText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  card: {
    padding: Spacing.three,
    borderRadius: Layout.radius,
    borderWidth: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: Spacing.one,
  },
  input: {
    borderWidth: 1,
    borderRadius: Layout.radius,
    padding: Spacing.two,
    fontSize: 14,
    marginBottom: Spacing.three,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: Layout.radius,
    padding: Spacing.two,
    fontSize: 14,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: Spacing.three,
  },
  button: {
    padding: Spacing.two + 4,
    borderRadius: Layout.radius,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});