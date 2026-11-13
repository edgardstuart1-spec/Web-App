import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform, useWindowDimensions } from 'react-native';

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const isWide = Platform.OS === 'web' && width >= 768;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2563eb',
        headerShown: false,
        tabBarPosition: isWide ? 'top' : 'bottom',
        tabBarLabelPosition: isWide ? 'beside-icon' : 'below-icon',
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

      {/* Oculta de la barra, pero accesible desde el drawer */}
      <Tabs.Screen
        name="quienes-somos"
        options={{
          title: 'Quiénes Somos',
          tabBarItemStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
}