// src/app/(drawer)/(tabs)/quienes-somos.tsx
import { ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Colors, Layout, Spacing } from '../../../constants/theme';

export default function QuienesSomosScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.contentWrapper}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Quiénes Somos</Text>

        <View style={[styles.card, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <Text style={[styles.title, { color: theme.primary }]}>Nuestra Historia y Visión</Text>
          <Text style={[styles.text, { color: theme.textSecondary }]}>
            Somos una comunidad de fe comprometida con llevar el mensaje de amor, esperanza y transformación a las familias de nuestra ciudad.
          </Text>

          <Text style={[styles.subtitle, { color: theme.text }]}>Nuestros Pastores</Text>
          <Text style={[styles.text, { color: theme.textSecondary }]}>
            Pastor Principal: Juan y María Pérez{'\n'}
            Liderando con propósito y amor pastoral hacia la congregación.
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Spacing.three,
  },
  card: {
    padding: Spacing.three,
    borderRadius: Layout.radius,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: Spacing.two,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: Spacing.three,
    marginBottom: Spacing.one,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
  },
});