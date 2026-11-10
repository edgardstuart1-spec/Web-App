import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function OracionScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Peticiones de Oración</Text>
      <Text style={styles.subtitle}>Envía tu petición de forma confidencial al equipo pastoral.</Text>

      <View style={styles.formCard}>
        <Text style={styles.label}>Tu Nombre (Opcional)</Text>
        <TextInput style={styles.input} placeholder="Ej. Juan Pérez" />

        <Text style={styles.label}>Petición o Motivo de Oración</Text>
        <TextInput style={[styles.input, styles.textArea]} placeholder="Escribe aquí tu motivo..." multiline numberOfLines={4} />

        <TouchableOpacity style={styles.button} onPress={() => alert('Petición enviada al equipo pastoral')}>
          <Text style={styles.buttonText}>Enviar Petición</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1e293b', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#64748b', marginBottom: 16 },
  formCard: { backgroundColor: '#ffffff', borderRadius: 12, padding: 16, elevation: 2 },
  label: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 6, marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 10, fontSize: 14, backgroundColor: '#f8fafc' },
  textArea: { height: 100, textAlignVertical: 'top' },
  button: { backgroundColor: '#2563eb', borderRadius: 8, padding: 12, alignItems: 'center', marginTop: 16 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' }
});