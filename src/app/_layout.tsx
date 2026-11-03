import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <View style={{ flex: 1, backgroundColor: '#ffffff' }} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerActiveTintColor: '#2563eb',
          headerShown: true, // 1️⃣ Activamos la cabecera para que aparezca el botón de hamburguesa nativo
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#1e293b',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: 'Inicio / Pestañas',
            title: 'Mi Iglesia',
            drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size || 24} color={color} />,
          }}
        />
        <Drawer.Screen
          name="quienes-somos"
          options={{
            drawerLabel: 'Quiénes Somos',
            title: 'Quiénes Somos',
            drawerIcon: ({ color, size }) => <Ionicons name="information-circle-outline" size={size || 24} color={color} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}