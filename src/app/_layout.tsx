// src/app/_layout.tsx
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Esto le indica a Expo Router (sobre todo en Web) por dónde arrancar el árbol de navegación
export const unstable_settings = {
  initialRouteName: '(drawer)',
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        {/* Ocultamos el header del Stack para el drawer, ya que él maneja sus propios encabezados */}
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        
        {/* Pantalla fuera del drawer: al estar en el Stack raíz, Expo Router le genera su flecha de retroceso nativa */}
        <Stack.Screen name="quienes-somos" options={{ title: 'Quiénes Somos' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}