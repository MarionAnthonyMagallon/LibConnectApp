import { View, StyleSheet, Text, Button, FlatList, Alert } from 'react-native';
import React, { useState } from 'react';

// Sample book data
const sampleBooks = [
  { id: '1', title: '1984', author: 'George Orwell', status: 'available' },
  { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', status: 'available' },
  { id: '3', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: 'borrowed', borrowerName: 'John Doe', availabilityDate: new Date(new Date().setDate(new Date().getDate() + 14)) },
  { id: '4', title: 'Pride and Prejudice', author: 'Jane Austen', status: 'available' },
  { id: '5', title: 'Moby Dick', author: 'Herman Melville', status: 'borrowed', borrowerName: 'Alice Smith', availabilityDate: new Date(new Date().setDate(new Date().getDate() + 7)) },
  { id: '6', title: 'War and Peace', author: 'Leo Tolstoy', status: 'available' },
  { id: '7', title: 'The Catcher in the Rye', author: 'J.D. Salinger', status: 'available' },
  { id: '8', title: 'The Hobbit', author: 'J.R.R. Tolkien', status: 'borrowed', borrowerName: 'Mike Johnson', availabilityDate: new Date(new Date().setDate(new Date().getDate() + 10)) },
  { id: '9', title: 'The Alchemist', author: 'Paulo Coelho', status: 'available' },
  { id: '10', title: 'Fahrenheit 451', author: 'Ray Bradbury', status: 'available' },
];

const Home = () => {
  const [books, setBooks] = useState(sampleBooks);
  const [reservations, setReservations] = useState([]);

  const handleBorrow = (book) => {
    if (book.status === 'available') {
      Alert.alert(`You have borrowed "${book.title}" by ${book.author}.`);
      setBooks((prev) =>
        prev.map(b => b.id === book.id ? { ...b, status: 'borrowed', borrowerName: 'Your Name', availabilityDate: new Date(new Date().setDate(new Date().getDate() + 14)) } : b)
      );
    } else {
      Alert.alert(`"${book.title}" is already borrowed by ${book.borrowerName}.`);
    }
  };

  const handleReserve = (book) => {
    if (book.status === 'borrowed') {
      const alreadyReserved = reservations.find(reservedBook => reservedBook.id === book.id);

      if (!alreadyReserved) {
        setReservations([...reservations, { ...book, reservedBy: 'Your Name' }]);
        Alert.alert(`You have reserved "${book.title}". It will be available on ${book.availabilityDate.toLocaleDateString()}.`);
      } else {
        Alert.alert(`You have already reserved "${book.title}".`);
      }
    } else {
      Alert.alert(`"${book.title}" is available and doesn't need a reservation.`);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.bookItem}>
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
        <Text style={[styles.bookStatus, item.status === 'available' ? styles.availableStatus : styles.borrowedStatus]}>
          {item.status === 'available' ? 'Available' : `Borrowed by ${item.borrowerName}`}
        </Text>
        {item.status === 'available' ? (
          <Button
            title="Borrow"
            onPress={() => handleBorrow(item)}
            color="#FFD700"
          />
        ) : (
          <>
            <Text style={styles.availabilityText}>
              Available on: {item.availabilityDate.toLocaleDateString()}
            </Text>
            <Button
              title="Reserve"
              onPress={() => handleReserve(item)}
              color="#1E90FF"
            />
          </>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Books</Text>
      <FlatList
        data={books}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#DAFFFB',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  bookItem: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookDetails: {
    justifyContent: 'space-between',
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
  availableStatus: {
    color: '#32CD32', // Green for available
  },
  borrowedStatus: {
    color: '#FF6347', // Red for borrowed
  },
  availabilityText: {
    color: '#FF6347',
    fontStyle: 'italic',
    marginTop: 8,
  },
  list: { 
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default Home;
