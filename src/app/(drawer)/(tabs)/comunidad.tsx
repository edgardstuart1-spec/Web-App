// src/app/(drawer)/(tabs)/comunidad.tsx
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import { Colors, Layout, Spacing } from '../../../constants/theme';

export default function ComunidadScreen() {
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');
  const [tipoAporte, setTipoAporte] = useState('Diezmo / Ofrenda');
  const [mensajeFeedback, setMensajeFeedback] = useState<string | null>(null);
  const [config, setConfig] = useState<any>({});

  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwl8cKeSWN9HhS4IYkWvWSHJhIMeoC-vBEeMtWJp2rn6CQLE7XBBW_FQ-AXPLQ4UPY/exec';

  useEffect(() => {
    fetch(`${SCRIPT_URL}?accion=config`)
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch((err) => console.error(err));
  }, []);

  const formatText = (text?: string) => {
    if (!text) return '';
    return text.replace(/<br>/g, '\n').replace(/\\n/g, '\n');
  };

  const enviarAWhatsApp = () => {
    if (!monto.trim()) {
      setMensajeFeedback('Por favor ingresa el monto de la donación.');
      return;
    }

    setMensajeFeedback(null);

    const textoMensaje = 
      `Hola, buen día. Deseo reportar un aporte/donación:\n\n` +
      `• *Nombre:* ${nombre.trim() || 'Anónimo'}\n` +
      `• *Tipo:* ${tipoAporte}\n` +
      `• *Monto:* $${monto.trim()}\n\n` +
      `Adjunto mi comprobante de transferencia. ¡Bendiciones!`;

    // Número por defecto de respaldo si la hoja no lo carga aún
    const whatsappDestino = config.whatsapp_numero || '+50235217001';
    const numeroLimpio = whatsappDestino.replace(/\D/g, '');
    const urlWhatsApp = `https://wa.me/${numeroLimpio}?text=${encodeURIComponent(textoMensaje)}`;

    Linking.openURL(urlWhatsApp).catch((err) => {
      console.error('No se pudo abrir WhatsApp', err);
      if (Platform.OS === 'web') {
        window.alert('No se pudo abrir WhatsApp. Verifica que tengas WhatsApp Web o la aplicación instalada.');
      }
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.contentWrapper}>
        <Text style={[styles.title, { color: theme.text }]}>Comunidad y Donaciones</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Tu generosidad apoya la continuidad y crecimiento de nuestra labor.
        </Text>

        {/* Tarjeta de Información Bancaria Dinámica */}
        <View style={[styles.card, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="wallet-outline" size={24} color={theme.primary} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              {config.banco_titulo || 'Cuentas Bancarias Oficiales'}
            </Text>
          </View>
          
          <Text style={[styles.bankDetails, { color: theme.textSecondary }]}>
            Puedes realizar tu transferencia o depósito a las siguientes cuentas y luego reportar tu boleta aquí abajo:
          </Text>

          <View style={[styles.bankBox, { backgroundColor: theme.background, borderColor: theme.border }]}>
            <Text style={[styles.bankText, { color: theme.text, lineHeight: 20 }]}>
              {formatText(config.banco_detalle) || '🏦 Banco Nacional\nCuenta Corriente: 1234-5678-9012\nTitular: Portal Institucional / Iglesia'}
            </Text>
          </View>
        </View>

        {/* Formulario de Reporte de Comprobante */}
        <View style={[styles.card, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <Text style={[styles.cardTitle, { color: theme.text, marginBottom: Spacing.two }]}>
            Reportar Comprobante por WhatsApp
          </Text>

          {mensajeFeedback && (
            <View style={styles.errorBanner}>
              <Ionicons name="alert-circle" size={18} color="#991b1b" style={{ marginRight: 6 }} />
              <Text style={styles.errorText}>{mensajeFeedback}</Text>
            </View>
          )}

          <Text style={[styles.label, { color: theme.text }]}>Tu Nombre / Familia</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]}
            placeholder="Ej. Familia Pérez Gómez"
            placeholderTextColor={theme.textSecondary}
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={[styles.label, { color: theme.text }]}>Monto del Aporte ($)</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]}
            placeholder="Ej. 50.00"
            placeholderTextColor={theme.textSecondary}
            keyboardType="numeric"
            value={monto}
            onChangeText={setMonto}
          />

          <Pressable
            style={({ pressed }) => [styles.whatsappButton, { opacity: pressed ? 0.85 : 1 }]}
            onPress={enviarAWhatsApp}
          >
            <Ionicons name="logo-whatsapp" size={20} color="#ffffff" style={{ marginRight: 8 }} />
            <Text style={styles.whatsappButtonText}>Enviar Comprobante por WhatsApp</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentWrapper: { maxWidth: Layout.maxContentWidth, width: '100%', alignSelf: 'center', padding: Spacing.three },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: Spacing.one },
  subtitle: { fontSize: 14, marginBottom: Spacing.three },
  card: { padding: Spacing.three, borderRadius: Layout.radius, borderWidth: 1, marginBottom: Spacing.three },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.two },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: Spacing.two },
  bankDetails: { fontSize: 14, marginBottom: Spacing.two },
  bankBox: { padding: Spacing.two, borderRadius: Layout.radius, borderWidth: 1 },
  bankText: { fontSize: 13 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: Spacing.one },
  input: { borderWidth: 1, borderRadius: Layout.radius, padding: Spacing.two, fontSize: 14, marginBottom: Spacing.three },
  whatsappButton: { backgroundColor: '#25D366', flexDirection: 'row', padding: Spacing.two + 4, borderRadius: Layout.radius, alignItems: 'center', justifyContent: 'center', height: 48, marginTop: Spacing.one },
  whatsappButtonText: { color: '#ffffff', fontSize: 15, fontWeight: 'bold' },
  errorBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fee2e2', borderColor: '#ef4444', borderWidth: 1, padding: Spacing.two, borderRadius: Layout.radius, marginBottom: Spacing.three },
  errorText: { color: '#991b1b', fontSize: 13, fontWeight: '500' },
});