// src/app/(drawer)/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DrawerLayout() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <Drawer
      drawerContent={(props) => (
        <View style={{ flex: 1, backgroundColor: '#ffffff', paddingTop: 16 }}>

          {/* Quiénes Somos */}
          <Pressable
            onPress={() => {
              props.navigation.closeDrawer();
              router.navigate('/quienes-somos');
            }}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 14,
              paddingHorizontal: 16,
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <View style={{ width: 24, alignItems: 'center', marginRight: 32 }}>
              <Ionicons name="information-circle-outline" size={24} color="#475569" />
            </View>
            <Text style={{ fontWeight: '500', color: '#475569', fontSize: 14 }}>
              Quiénes Somos
            </Text>
          </Pressable>
        </View>
      )}
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          backgroundColor: '#ffffff',
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
          title: 'Mi Iglesia',
          headerShown: true,
        }}
      />
    </Drawer>
  );
}