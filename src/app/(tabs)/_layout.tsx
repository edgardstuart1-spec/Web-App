import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function TabLayout() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Si está renderizando en el servidor, devolvemos un contenedor vacío para evitar el mismatch
  if (!isClient) {
    return <View style={{ flex: 1, backgroundColor: '#ffffff' }} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2563eb',
        headerShown: false,
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
    </Tabs>
  );
}