import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Slot, Stack } from 'expo-router';
import { useFonts } from 'expo-font'; // Correct import here
import { SplashScreen } from 'expo-router';


const Mainlayout = () => {
  // Prevent the splash screen from auto-hiding
  SplashScreen.preventAutoHideAsync();

  // Load fonts inside the component
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  // useEffect to hide the splash screen when fonts are loaded
  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  // Render null (or a loading spinner) until fonts are loaded
  if (!fontsLoaded && !error) {
    return null; // or <ActivityIndicator size="large" />
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Mainlayout;
