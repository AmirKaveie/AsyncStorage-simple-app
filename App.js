import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [username, setUsername] = useState(null);
  const [savedUsername, setSavedUsername] = useState(null);

  // Function to save the username to AsyncStorage
  const saveUsername = async () => {
    try {
      await AsyncStorage.setItem('username', username);
      Alert.alert('Success', 'Username saved successfully!');
      setSavedUsername(username);
    } catch (error) {
      Alert.alert('Error', 'Failed to save the username');
    }
  };

  // Function to load username from AsyncStorage
  const loadUsername = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername !== null) {
        setSavedUsername(storedUsername);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load the username');
    }
  };

  // Load the username when the component mounts
  useEffect(() => {
    loadUsername();
  }, []);

  return (
    <SafeAreaView style = {styles.container}>
      <Text style = {styles.title}>Enter your username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder='Username'
      />
      <Button title="Save Username" onPress={saveUsername} />
      {savedUsername && (
        <Text style={styles.savedText}>Saved Username: {savedUsername}</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  savedText: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default App;