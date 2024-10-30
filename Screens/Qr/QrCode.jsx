import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import Background from '../../Components/Bg';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axiosInstance from "../../axiosInstance";

const QrCode = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { amount } = route.params; // Get the amount passed from Amt screen
  const [timer, setTimer] = useState(30);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [qrCode, setQrCode] = useState(null); // Store the QR code after first generation
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generateQrCode = async () => {
      if (!qrCode) {
        // Only generate QR code if it hasn't been generated yet
        try {
          setLoading(true);
          const response = await axiosInstance.post("/auth/QrScreen", {
            amount,
          });
          setQrCode(response.data.qrCodeData); // Store the QR code
          setError(null);
        } catch (error) {
          console.error("Failed to generate QR code:", error);
          setError("Failed to generate QR code. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

     
    generateQrCode();
  }, []);

  
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsButtonEnabled(true); // Enable regeneration when timer reaches 0
    }
    return () => clearInterval(interval);
  }, [timer]);

  const regenerateQRCode = () => {
    setTimer(30);
    setIsButtonEnabled(false);
    setQrCode(null); // Clear QR code to allow re-generation

    const generateQrCode = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.post("/auth/QrScreen", {
          amount,
        });
        setQrCode(response.data.qrCodeData);
        setError(null);
      } catch (error) {
        console.error("Failed to regenerate QR code:", error);
        setError("Failed to regenerate QR code. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    generateQrCode();
  };

  return (
    <Background>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-circle-outline" size={34} color="#fff" />
      </Pressable>

      <View style={styles.container}>
        <Text style={styles.title}>Your QR Code</Text>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : qrCode ? (
          <>
            <Image source={{ uri: qrCode }} style={styles.qrCode} />
            <Text style={styles.timerText}>
              {timer > 0
                ? `Remaining time: ${timer} sec`
                : "QR code expired. You can regenerate it."}
            </Text>
          </>
        ) : (
          <Text style={styles.loadingText}>Generating QR code...</Text>
        )}

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
