// src/app/(drawer)/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
// Importamos TODO (incluido el constructor de contenido) desde expo-router/drawer
import { Drawer, DrawerContentScrollView, DrawerItemList } from 'expo-router/drawer';
import { Pressable, Text, View } from 'react-native';

export default function DrawerLayout() {
  const router = useRouter();

  return (
    <Drawer
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          {/* Esta lista es provista nativamente por Expo Router */}
          <DrawerItemList {...props} /> 
          
          {/* Tu botón personalizado que salta al Stack Raíz */}
          <Pressable
            onPress={() => {
              // Cerramos el drawer usando la navegación nativa integrada
              props.navigation.closeDrawer();
              // Empujamos al stack raíz para que gane la flecha de regreso automáticamente
              router.push('/quienes-somos'); 
            }}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 14,
              paddingHorizontal: 16,
              opacity: pressed ? 0.6 : 1,
              backgroundColor: 'transparent'
            })}
          >
            <View style={{ width: 24, alignItems: 'center', marginRight: 32 }}>
              <Ionicons name="information-circle-outline" size={24} color="#475569" />
            </View>
            <Text style={{ fontWeight: '500', color: '#475569', fontSize: 14 }}>
              Quiénes Somos
            </Text>
          </Pressable>
        </DrawerContentScrollView>
      )}
      screenOptions={{
        headerShown: true,
      }}
    >
      <Drawer.Screen 
        name="(tabs)" 
        options={{ 
          drawerLabel: 'Inicio / Pestañas',
          title: 'Mi Iglesia',
        }} 
      />
    </Drawer>
  );
}