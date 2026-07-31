import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="detalle"
        options={{
          title: "Detalle del usuario",
          headerBackTitle: "(tabs)",
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTitleStyle: { fontWeight: 'bold', color: '#1F2937' },
          headerTintColor: '#2563EB',
        }}
      />
      <Stack.Screen
        name="actualizar"
        options={{
          title: "Actualizar Usuario",
          headerBackTitle: "Detalle del usuario",
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTitleStyle: { fontWeight: 'bold', color: '#1F2937' },
          headerTintColor: '#2563EB',
        }}
      />
    </Stack>
  );
}