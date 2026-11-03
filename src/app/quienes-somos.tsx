import { StyleSheet, View, Text, ScrollView } from 'react-native';

export default function QuienesSomosScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Nuestra Historia y Visión</Text>
        <Text style={styles.text}>
          Somos una comunidad de fe comprometida con llevar el mensaje de amor, esperanza y transformación a las familias de nuestra ciudad.
        </Text>
        <Text style={styles.subtitle}>Nuestros Pastores</Text>
        <Text style={styles.text}>
          Pastor Principal: Juan y María Pérez.{'\n'}
          Liderando con propósito y amor pastoral hacia la congregación.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  card: { backgroundColor: '#ffffff', borderRadius: 12, padding: 20, elevation: 2 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#2563eb', marginBottom: 12 },
  subtitle: { fontSize: 16, fontWeight: 'bold', color: '#1e293b', marginTop: 16, marginBottom: 8 },
  text: { fontSize: 14, color: '#475569', lineHeight: 22 },
});