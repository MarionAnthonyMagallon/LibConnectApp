import { View, StyleSheet, Text, FlatList, Button, Alert } from 'react-native';
import React, { useState } from 'react';

// Sample reserved book data (expanded)
const sampleReservations = [
  { id: '1', title: '1984', author: 'George Orwell', status: 'reserved' },
  { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', status: 'reserved' },
  { id: '3', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: 'reserved' },
  { id: '4', title: 'Moby Dick', author: 'Herman Melville', status: 'reserved' },
  { id: '5', title: 'War and Peace', author: 'Leo Tolstoy', status: 'reserved' },
  { id: '6', title: 'Pride and Prejudice', author: 'Jane Austen', status: 'reserved' },
  { id: '7', title: 'The Catcher in the Rye', author: 'J.D. Salinger', status: 'reserved' },
  { id: '8', title: 'Fahrenheit 451', author: 'Ray Bradbury', status: 'reserved' },
];

const Reservations = () => {
  const [reservations, setReservations] = useState(sampleReservations);

  const handleEditReservation = (id, action) => {
    setReservations(prevReservations =>
      prevReservations.map(reservation => {
        if (reservation.id === id) {
          if (action === 'cancel') {
            Alert.alert(
              'Cancelled',
              `You have cancelled your reservation for "${reservation.title}".`
            );
            return { ...reservation, status: 'cancelled' };
          } else if (action === 'borrow') {
            Alert.alert(
              'Borrowed',
              `You have borrowed "${reservation.title}".`
            );
            return { ...reservation, status: 'borrowed' };
          }
        }
        return reservation;
      })
    );
  };

  const renderReservationItem = ({ item }) => (
    <View style={styles.reservationItem}>
      <Text style={styles.bookTitle}>{item.title}</Text>
      <Text style={styles.bookAuthor}>{item.author}</Text>
      <Text style={[styles.bookStatus, item.status === 'reserved' ? styles.reservedStatus : styles.cancelledStatus]}>
        {item.status}
      </Text>
      {item.status === 'reserved' && (
        <View style={styles.buttonContainer}>
          <Button
            title="Cancel Reservation"
            onPress={() => handleEditReservation(item.id, 'cancel')}
            color="#FF6347" // Soft red for cancel
          />
          <Button
            title="Borrow"
            onPress={() => handleEditReservation(item.id, 'borrow')}
            color="#32CD32" // Light green for borrow
          />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Reservations</Text>
      <FlatList
        data={reservations}
        keyExtractor={item => item.id}
        renderItem={renderReservationItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#DAFFFB', // Light background for aesthetics
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333', // Darker text for contrast
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 16, // Ensure there is space below the list
  },
  reservationItem: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DDD', // Subtle border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Subtle shadow for Android
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  bookStatus: {
    fontSize: 14,
    marginTop: 6,
    fontWeight: '600',
  },
  reservedStatus: {
    color: '#32CD32', // Green for reserved
  },
  cancelledStatus: {
    color: '#FF6347', // Red for cancelled
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default Reservations;
