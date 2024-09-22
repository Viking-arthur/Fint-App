import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable, TouchableOpacity, Image } from 'react-native';
import Background from '../../Components/Bg';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Amt = () => {
  const [amount, setAmount] = useState('');
  const navigation = useNavigation();

  const handleGenerate = () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('Invalid Amount', 'Please enter a valid number.');
    } else {
      Alert.alert('Amount Entered', `Amount: ₹ ${amount}`);
    }
  };

  return (
    <Background>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Use goBack instead of navigate
      >
        <Icon name="arrow-back-circle-outline" size={34} color="#fff" />
      </Pressable>

      <View style={styles.container}>
        <Text style={styles.label}>Enter Amount</Text>
        
        {/* Image between text and input field */}
        <Image 
          source={require('../../assets/qr2.png')} // Replace with your image URL or local image source
          style={styles.image}
        />

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter amount"
          value={amount}
          onChangeText={setAmount}
        />
        
        <TouchableOpacity style={styles.generateButton} onPress={() => navigation.navigate('QrCode')}>
          <Text style={styles.generateText}>Generate</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Fixed typo
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 20,
    paddingTop: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  image: {
    width: 150, // Image width
    height: 150, // Image height
    marginBottom: 20, // Space between the image and input
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 18,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  generateButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  generateText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Amt;
