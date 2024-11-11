import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { useFonts } from 'expo-font' // Font loading hook
import { icons } from '../../constants'// Adjust path based on project structure

// TabIcon Component to render the tab icons
const TabIcon = ({ icon, color }) => (
  <View>
    <Image
      source={icon}
      resizeMode="contain"
      style={{ width: 24, height: 24, tintColor: color }} // Tab icon styling
    />
  </View>
);

// TabLayout functional component
const TabLayout = () => {
  // Font loading logic
  const [fontsLoaded, error] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'), // Adjust path based on your folder structure
    // Add more fonts if needed
  });

  // The return statement must be inside the function
  if (!fontsLoaded && !error) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator while fonts load
  }

  // Main return for rendering the Tabs once fonts are loaded
  return (
    <Tabs>
      {/* Home Tab */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabIcon icon={icons.home} color={color} />,
        }}
      />

      {/* Search Tab */}
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search Books',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabIcon icon={icons.search} color={color} />,
        }}
      />

      {/* Reservations Tab */}
      <Tabs.Screen
        name="reservations"
        options={{
          title: 'Reservations',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabIcon icon={icons.reservations} color={color} />,
        }}
      />

      {/* Notifications Tab */}
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabIcon icon={icons.notifications} color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;


