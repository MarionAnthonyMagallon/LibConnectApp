import { View, StyleSheet, Text, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';

const Notifications = () => {
  // State for the current date and time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Sample reserved and borrowed books
  const [reservations] = useState([
    { id: '1', title: '1984', author: 'George Orwell', status: 'reserved', availabilityDate: new Date(new Date().setDate(new Date().getDate() + 5)) },
    { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', status: 'reserved', availabilityDate: new Date(new Date().setDate(new Date().getDate() + 3)) },
  ]);

  const [borrowedBooks] = useState([
    { id: '3', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: 'borrowed', availabilityDate: new Date(new Date().setDate(new Date().getDate() + 7)) },
    { id: '4', title: 'The Catcher in the Rye', author: 'J.D. Salinger', status: 'borrowed', availabilityDate: new Date(new Date().setDate(new Date().getDate() + 14)) },
  ]);

  const renderNotification = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationTitle}>
        {item.title}
      </Text>
      {item.status === 'reserved' ? (
        <Text style={styles.notificationMessage}>
          Reserved and will be available on {item.availabilityDate.toLocaleDateString()}.
        </Text>
      ) : (
        <Text style={styles.notificationMessage}>
          Due back on {item.availabilityDate.toLocaleDateString()}.
        </Text>
      )}
    </View>
  );

  // Combine reserved and borrowed notifications
  const notifications = [
    ...reservations.map(reservation => ({
      ...reservation,
      status: 'reserved',
    })),
    ...borrowedBooks.map(book => ({
      ...book,
      status: 'borrowed',
    })),
  ];

  return (
    <View style={styles.container}>
      {/* Display current date and time */}
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {currentTime.toLocaleTimeString()}
        </Text>
        <Text style={styles.dateText}>
          {currentTime.toLocaleDateString()}
        </Text>
      </View>

      <Text style={styles.title}>Your Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        style={styles.list}
      />
    </View>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#DAFFFB', // Light, neutral background
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333', // Darker text for contrast
    textAlign: 'center',
    marginBottom: 20,
  },
  notificationItem: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3, // Subtle shadow for Android
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  list: {
    flex: 1,
  },
  timeContainer: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f1f1f1', // Soft, neutral background for the time container
  },
  timeText: {
    fontSize: 36,
    fontWeight: '600',
    color: '#333',
  },
  dateText: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
  },
});

export default Notifications;

