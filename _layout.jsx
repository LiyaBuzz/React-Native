import { Stack } from 'expo-router';
import React from 'react';
import { CartProvider } from '../components/CartContext';
import { AuthProvider } from '../components/AuthContext';
import HeaderAuthButton from '../components/HeaderAuthButton';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
      <Stack
        screenOptions={{
          headerTitleStyle: { fontWeight: 'bold' },
          headerStyle: { backgroundColor: '#F9F9F9' },
          headerRight: () => <HeaderAuthButton />,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="contact" options={{ headerShown: true, headerTitle: "Contact Us" }} />
      </Stack>
      </CartProvider>
    </AuthProvider>
  );
}
