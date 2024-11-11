import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';  

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LibConnect</Text>
      <TouchableOpacity style={styles.button}>
        <Link href="/home" style={styles.buttonText}>
          Open
        </Link>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DAFFFB',
    padding: 20,
    // Gradient background
    // You can implement a gradient using libraries like expo-linear-gradient
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#1E90FF',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    elevation: 3, // Shadow effect for Android
    shadowColor: '#000', // Shadow effect for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
