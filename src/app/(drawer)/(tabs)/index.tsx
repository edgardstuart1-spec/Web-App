import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Un lugar para crecer en familia</Text>
      <Text style={styles.subtitle}>Bienvenidos a nuestra comunidad de fe</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Horarios de Servicios</Text>
        <Text style={styles.cardText}>• Domingo - 10:00 AM (Culto General)</Text>
        <Text style={styles.cardText}>• Miércoles - 7:00 PM (Estudio Bíblico)</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Versículo del Día</Text>
        <Text style={styles.quote}>
          "Lámpara es a mis pies tu palabra, y lumbrera a mi camino." - Salmos 119:105
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: '#1e293b', marginTop: 10 },
  subtitle: { fontSize: 14, textAlign: 'center', color: '#64748b', marginBottom: 20 },
  card: { backgroundColor: '#ffffff', borderRadius: 12, padding: 16, marginBottom: 16, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#2563eb', marginBottom: 8 },
  cardText: { fontSize: 14, color: '#334155', marginVertical: 2 },
  quote: { fontSize: 14, fontStyle: 'italic', color: '#475569', textAlign: 'center', marginVertical: 8 },
});