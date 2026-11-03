import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

export default function ComunidadScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Comunidad y Ofrendas</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Generosidad y Mayordomía</Text>
        <Text style={styles.verse}>"Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre." - 2 Corintios 9:7</Text>

        <Text style={styles.bankInfo}>Banco: Banco Nacional</Text>
        <Text style={styles.bankInfo}>Cuenta Corriente: 1234-5678-90</Text>
        <Text style={styles.bankInfo}>CBU / IBAN: AR000000000000000000</Text>

        <Text style={styles.instruction}>Realiza tu transferencia y envíanos el comprobante por WhatsApp para llevar un registro transparente.</Text>

        <TouchableOpacity style={styles.whatsappButton} onPress={() => alert('Abriendo chat de WhatsApp con Tesorería...')}>
          <Text style={styles.whatsappText}>Enviar comprobante por WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1e293b', marginBottom: 16 },
  card: { backgroundColor: '#ffffff', borderRadius: 12, padding: 16, marginBottom: 16, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#2563eb', marginBottom: 10 },
  verse: { fontSize: 14, fontStyle: 'italic', color: '#475569', marginBottom: 14 },
  bankInfo: { fontSize: 15, color: '#1e293b', fontWeight: '500', marginBottom: 4 },
  instruction: { fontSize: 13, color: '#64748b', marginVertical: 12 },
  whatsappButton: { backgroundColor: '#16a34a', borderRadius: 8, padding: 12, alignItems: 'center', marginTop: 8 },
  whatsappText: { color: '#ffffff', fontSize: 15, fontWeight: 'bold' }
});