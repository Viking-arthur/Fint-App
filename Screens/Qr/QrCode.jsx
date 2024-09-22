import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import Background from '../../Components/Bg';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const QrCode = () => {
  const navigation = useNavigation();

  const [timer, setTimer] = useState(30); // Timer initial value
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else {
      setIsButtonEnabled(true); // Enable button when timer expires
    }
    return () => clearInterval(interval);
  }, [timer]);

  const regenerateQRCode = () => {
    // Logic to regenerate QR code
    console.log('Regenerate QR Code');
    // Reset timer after regenerating
    setTimer(30);
    setIsButtonEnabled(false);
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
        <Text style={styles.title}>Your QR Code</Text>
        <Image
          source={require('../../assets/qr3.png')} // Replace with your QR code image URL
          style={styles.qrCode}
        />
        <Text style={styles.timerText}>
          {timer > 0 ? `Remaining time: ${timer} sec` : 'You can now regenerate'}
        </Text>
        <TouchableOpacity
          style={[styles.button, { opacity: isButtonEnabled ? 1 : 0.5 }]}
          onPress={regenerateQRCode}
          disabled={!isButtonEnabled}
        >
          <Text style={styles.buttonText}>Re-generate</Text>
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
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  qrCode: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#fff',
  },
});

export default QrCode;
