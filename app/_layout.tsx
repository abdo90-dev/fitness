import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      await AsyncStorage.removeItem('isAuthenticated'); // Force logout on app start
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
      window.frameworkReady?.();
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
        <ActivityIndicator size="large" color="#ff4757" />
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ 
        headerShown: false,
        animation: 'fade'
      }}>
        <Stack.Screen 
          name="login" 
          options={{ 
            gestureEnabled: false,
            animationTypeForReplace: isAuthenticated ? 'push' : 'pop'
          }} 
        />
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            gestureEnabled: false,
            animationTypeForReplace: isAuthenticated ? 'pop' : 'push'
          }} 
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
      {!isAuthenticated && <Redirect href="/login" />}
    </>
  );
}