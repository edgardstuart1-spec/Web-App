import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function ReflexionesScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Reflexiones Pastorales</Text>

      <TouchableOpacity 
        style={styles.card}
        onPress={() => router.push('/articulo-detalle')}
      >
        <Text style={styles.title}>El perdón de los pecados y nuestra libertad en Cristo</Text>
        <Text style={styles.snippet}>Una lectura edificante sobre cómo caminar sin cargas espirituales...</Text>
        <Text style={styles.readMore}>Leer artículo completo →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#1e293b', marginBottom: 16 },
  card: { backgroundColor: '#ffffff', borderRadius: 12, padding: 16, marginBottom: 12, elevation: 2 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#2563eb', marginBottom: 6 },
  snippet: { fontSize: 14, color: '#475569', marginBottom: 10 },
  readMore: { fontSize: 14, fontWeight: '600', color: '#2563eb' }
});