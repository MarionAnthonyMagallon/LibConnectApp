import { View, StyleSheet, Text, TextInput, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';

// Sample book data
const sampleBooks = [
  { id: '1', title: '1984', author: 'George Orwell', status: 'available' },
  { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', status: 'available' },
  { id: '3', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: 'borrowed', borrowerName: 'John Doe', availabilityDate: new Date(new Date().setDate(new Date().getDate() + 14)) },
  { id: '4', title: 'Moby Dick', author: 'Herman Melville', status: 'available' },
  { id: '5', title: 'War and Peace', author: 'Leo Tolstoy', status: 'available' },
  { id: '6', title: 'Pride and Prejudice', author: 'Jane Austen', status: 'borrowed', borrowerName: 'Anna Smith', availabilityDate: new Date(new Date().setDate(new Date().getDate() + 10)) },
  { id: '7', title: 'The Catcher in the Rye', author: 'J.D. Salinger', status: 'available' },
  { id: '8', title: 'Fahrenheit 451', author: 'Ray Bradbury', status: 'borrowed', borrowerName: 'Mark Allen', availabilityDate: new Date(new Date().setDate(new Date().getDate() + 5)) },
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(sampleBooks);

  // Automatically filter books as the user types
  useEffect(() => {
    const results = sampleBooks.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(results);
  }, [searchQuery]);

  const handleBorrow = (book) => {
    if (book.status === 'available') {
      Alert.alert(`You have borrowed "${book.title}" by ${book.author}.`);
      setFilteredBooks((prev) =>
        prev.map(b => b.id === book.id ? { ...b, status: 'borrowed', borrowerName: 'Your Name', availabilityDate: new Date(new Date().setDate(new Date().getDate() + 14)) } : b)
      );
    } else {
      Alert.alert(`"${book.title}" is already borrowed by ${book.borrowerName}. It will be available on ${book.availabilityDate.toLocaleDateString()}.`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Books</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter book title"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredBooks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>{item.author}</Text>
            <Text style={[styles.bookStatus, item.status === 'available' ? styles.availableStatus : styles.borrowedStatus]}>
              {item.status === 'available' ? 'Available' : `Borrowed by ${item.borrowerName}`}
            </Text>
            {item.status === 'available' ? (
              <Text style={styles.borrowButton} onPress={() => handleBorrow(item)}>
                Borrow
              </Text>
            ) : (
              <Text style={styles.availabilityText}>
                Available on: {item.availabilityDate.toLocaleDateString()}
              </Text>
            )}
          </View>
        )}
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
    backgroundColor: '#DAFFFB',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
  list: {
    paddingBottom: 16,
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
  borrowButton: {
    marginTop: 8,
    color: '#FFD700',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default Search;
