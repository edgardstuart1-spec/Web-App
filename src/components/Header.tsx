// src/components/Header.tsx
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { Platform, Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Layout, Spacing } from '../constants/theme';

interface HeaderProps {
  onOpenDrawer?: () => void;
}

export default function Header({ onOpenDrawer }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Reflexiones', path: '/reflexiones' },
    { name: 'Oración', path: '/oracion' },
    { name: 'Comunidad', path: '/comunidad' },
  ];

  return (
    <View 
      style={[
        styles.headerContainer, 
        { 
          backgroundColor: theme.primary, 
          borderBottomColor: theme.border,
          paddingTop: Platform.OS === 'android' ? insets.top : 0,
          height: Layout.headerHeight + (Platform.OS === 'android' ? insets.top : 0)
        }
      ]}
    >
      <View style={styles.leftSection}>
        <Pressable 
          onPress={onOpenDrawer}
          style={({ pressed }) => [styles.iconButton, { opacity: pressed ? 0.7 : 1 }]}
          accessibilityLabel="Abrir menú lateral"
        >
          <Ionicons name="menu" size={24} color={theme.textOnPrimary} />
        </Pressable>

        <Pressable onPress={() => router.navigate('/')} style={styles.brandContainer}>
          {/* Logo corporativo limpio y neutral (reemplaza el cuadrado naranja por un diseño adaptable) */}
          <View style={[styles.logoIcon, { backgroundColor: 'rgba(255, 255, 255, 0.15)' }]}>
            <Text style={styles.logoLetter}>P</Text>
          </View>
          <Text style={[styles.brandText, { color: theme.textOnPrimary }]}>
            Portal Institucional
          </Text>
        </Pressable>
      </View>

      {Platform.OS === 'web' && (
        <View style={styles.navLinks}>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Pressable
                key={item.path}
                onPress={() => router.navigate(item.path as any)}
                style={[
                  styles.navItem, 
                  isActive && { backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: Layout.radius }
                ]}
              >
                <Text style={[styles.navText, { color: theme.textOnPrimary }, isActive && styles.navTextActive]}>
                  {item.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}

      <View style={styles.rightSection}>
        <Pressable 
          onPress={() => console.log('Buscar')}
          style={({ pressed }) => [styles.iconButton, { opacity: pressed ? 0.7 : 1 }]}
        >
          <Ionicons name="search" size={20} color={theme.textOnPrimary} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 100,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: Spacing.two,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Spacing.one,
  },
  logoIcon: {
    width: 34,
    height: 34,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.two,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoLetter: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  brandText: {
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  navItem: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  navText: {
    fontSize: 15, // Aumentado para mejor legibilidad en web
    fontWeight: '500',
    opacity: 0.85,
  },
  navTextActive: {
    opacity: 1,
    fontWeight: '700',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});