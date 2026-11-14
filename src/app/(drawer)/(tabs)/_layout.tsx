// src/app/(drawer)/(tabs)/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { Tabs, useNavigation } from 'expo-router';
import { Platform, useColorScheme, useWindowDimensions } from 'react-native';
import Header from '../../../components/Header';
import { Colors } from '../../../constants/theme';

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const isWide = Platform.OS === 'web' && width >= 768;
  const navigation = useNavigation();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <Tabs
      screenOptions={{
        header: () => <Header onOpenDrawer={() => (navigation as any).openDrawer()} />,
        tabBarActiveTintColor: theme.primary,
        headerShown: true,
        tabBarPosition: isWide ? 'top' : 'bottom',
        tabBarLabelPosition: isWide ? 'beside-icon' : 'below-icon',
        tabBarStyle: Platform.OS === 'web' ? { display: 'none' } : {
          backgroundColor: theme.background,
          borderTopColor: theme.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size || 24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="reflexiones"
        options={{
          title: 'Reflexiones',
          tabBarIcon: ({ color, size }) => <Ionicons name="book" size={size || 24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="oracion"
        options={{
          title: 'Oración',
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size || 24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="comunidad"
        options={{
          title: 'Comunidad',
          tabBarIcon: ({ color, size }) => <Ionicons name="people" size={size || 24} color={color} />,
        }}
      />

      {/* Pantalla auxiliar oculta del menú inferior pero accesible por navegación */}
      <Tabs.Screen
        name="quienes-somos"
        options={{
          title: 'Quiénes Somos',
          tabBarItemStyle: { display: 'none' },
        }}
      />

      {/* NUEVO: Registramos el detalle del artículo para que no de error de ruta */}
      <Tabs.Screen
        name="articulo-detalle"
        options={{
          title: 'Detalle del Artículo',
          tabBarItemStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
}