// src/app/(drawer)/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing } from '../../constants/theme';

export default function DrawerLayout() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <Drawer
      drawerContent={(props) => (
        <SafeAreaView 
          style={[styles.safeArea, { backgroundColor: theme.background }]} 
          edges={['top', 'bottom', 'left']}
        >
          {/* Cabecera / Logo del Drawer */}
          <View style={[styles.drawerHeader, { backgroundColor: theme.backgroundElement }]}>
            <View style={[styles.logoContainer, { backgroundColor: theme.primary }]}>
              <Text style={styles.logoLetter}>P</Text>
            </View>
            <View>
              <Text style={[styles.drawerTitle, { color: theme.text }]}>Portal Institucional</Text>
              <Text style={[styles.drawerSubtitle, { color: theme.textSecondary }]}>Panel de Navegación</Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.backgroundSelected }]} />

          {/* Opciones del Menú Lateral (Sin 'Inicio' por ser redundante) */}
          <View style={{ flex: 1, paddingTop: Spacing.two }}>
            <Pressable
              onPress={() => {
                props.navigation.closeDrawer();
                router.navigate('/quienes-somos');
              }}
              style={({ pressed }) => [styles.menuItem, { opacity: pressed ? 0.6 : 1 }]}
            >
              <View style={styles.menuIcon}>
                <Ionicons name="information-circle-outline" size={22} color={theme.textSecondary} />
              </View>
              <Text style={[styles.menuText, { color: theme.text }]}>Quiénes Somos</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      )}
      screenOptions={{ 
        headerShown: false,
        drawerStyle: {
          backgroundColor: theme.background,
          width: 280,
          maxWidth: '80%',
          marginTop: insets.top,
          marginBottom: insets.bottom,
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: 'Portal',
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
  },
  logoContainer: {
    width: 42,
    height: 42,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.two,
  },
  logoLetter: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  drawerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  drawerSubtitle: {
    fontSize: 12,
  },
  divider: {
    height: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: Spacing.three,
  },
  menuIcon: {
    width: 24,
    alignItems: 'center',
    marginRight: Spacing.three,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '500',
  },
});