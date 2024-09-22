import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Background from '../../Components/Bg';
import Icon from 'react-native-vector-icons/Ionicons';

const Email = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleGetOTP = () => {
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    // If email is valid, navigate to OTP screen
    navigation.navigate('Otp');
  };

  return (
    <Background>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Use goBack instead of navigate
      >
        <Icon name="arrow-back-circle-outline" size={34} color="#fff" />
      </Pressable>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Enter your E-mail ID</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="your-email@example.com"
              placeholderTextColor="#fff"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none" // Ensure no automatic capitalization
            />
          </View>

          <Image source={require('../../assets/emailotp.png')} style={styles.centerImage} />

          <TouchableOpacity style={styles.button} onPress={handleGetOTP}>
            <Text style={styles.buttonText}>Get OTP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  scrollContainer: {
    width: 400,
    marginTop: 150,
    paddingHorizontal: 0,
    paddingBottom: 150, // Ensure enough space for bottom content
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 20,
    paddingTop: 10,
  },

  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    color: '#000',
  },
  centerImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#0a66e1',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Email;
