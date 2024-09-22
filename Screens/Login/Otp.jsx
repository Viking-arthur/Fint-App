import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Background from '../../Components/Bg';
import Icon from 'react-native-vector-icons/Ionicons';

const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const navigation = useNavigation();

  // Handle input change
  const handleChange = (text, index) => {
    if (/^\d*$/.test(text)) {
      let newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Move focus to next field if a digit is entered
      if (text && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle key press to enable backspace navigation
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle OTP submission
  const handleSubmit = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      Alert.alert('OTP Submitted', `Entered OTP: ${otpValue}`);
    } else {
      Alert.alert('Invalid OTP', 'Please enter a 6-digit OTP.');
    }
  };

  return (
    <Background>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back-circle-outline" size={34} color="#fff" />
      </Pressable>
      
      <View style={styles.container}>
        <Text style={styles.label}>Enter OTP</Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpBox}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)} // Backspace handler
              ref={(ref) => (inputRefs.current[index] = ref)}
            />
          ))}
        </View>

        {/* Add Image */}
        <Image
          source={require('../../assets/otp.png')}
          style={styles.image}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
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
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  otpBox: {
    width: 40,
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'grey',
    marginHorizontal: 5,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Otp;
