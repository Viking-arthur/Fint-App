import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Background from '../../Components/Bg'; // Custom background component
import Icon from 'react-native-vector-icons/Ionicons';
import axiosInstance from "../../axiosInstance";

const ForgotPassword = () => {
  const [email, setEmail] = useState(''); // State to hold the user's email
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Regular expression for validating the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    } else if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    setLoading(true);
    axiosInstance
      .post("/auth/reset-password", {
        email,
      })
      .then((response) => {
        alert("Reset link sent to your email!");
        const { resetToken } = response.data;
        navigation.navigate("ResetPassword", { resetToken });
      })
      .catch((error) => {
        alert("Failed to send reset link!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Background>
      {/* Back button to go to the previous screen */}
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back-circle-outline" size={34} color="#fff" />
      </Pressable>

      {/* Scrollable container to handle smaller screens */}
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Title text */}
          <Text style={styles.title}>Enter your E-mail ID</Text>

          {/* Email input field */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="your-email@example.com"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none" // No automatic capitalization
            />
          </View>

          {/* Center image */}
          <Image source={require('../../assets/emailotp.png')} style={styles.centerImage} />

          <TouchableOpacity
            style={[styles.button, loading && { backgroundColor: "gray" }]}
            onPress={handleResetPassword}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Reset Password</Text>
            )}
          </TouchableOpacity> 

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Remember your password?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginLink}>Login here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
};

// Styles for the Forgot Password screen
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
  loginContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    textAlign: "center",
  },
  loginLink: {
    fontSize: 16,
    color: "#ffcc00",
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default ForgotPassword;
