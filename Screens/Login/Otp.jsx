import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Background from '../../Components/Bg';
import Icon from 'react-native-vector-icons/Ionicons';
import axiosInstance from "../../axiosInstance";


const Otp = ({ route }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [resendVisible, setResendVisible] = useState(false);
  const inputRefs = useRef([]);
  const navigation = useNavigation();

  
  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      setResendVisible(true);
    }
  }, [timer]);


  const handleChange = (text, index) => {
    if (/^\d*$/.test(text)) {
      let newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (text && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length === 4) {
      setLoading(true);
      try {
        const response = await axiosInstance.post(`/otp/verify-otp/${email}`, {
          otp: otpValue,
        });
        if (response.status === 200) {
          Alert.alert("Success", response.data.message);
          navigation.navigate("Home");
        } else {
          Alert.alert("Error", response.data.message || "Invalid OTP");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";
        Alert.alert("Error", errorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert("Invalid OTP", "Please enter a 4-digit OTP.");
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/otp/resend-otp`, { email });
      if (response.status === 200) {
        Alert.alert("Success", "OTP has been resent to your email.");
        setTimer(30);
        setResendVisible(false);
      } else {
        Alert.alert("Error", response.data.message || "Failed to resend OTP");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
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

        
        <Text style={styles.timer}>
          {timer > 0 ? `Time left: ${timer} sec` : "Time is up!"}
        </Text>

        {resendVisible && (
          <TouchableOpacity
            style={styles.resendButton}
            onPress={handleResendOtp}
            disabled={loading}
          >
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.submitButton, loading && { backgroundColor: "gray" }]}
          onPress={handleSubmit}
          disabled={loading || otp.some((d) => d === "")}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Submit</Text>
          )}
        </TouchableOpacity>
        
        <Image source={require("../../assets/otp.png")} style={styles.image} />
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
  timer: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  resendButton: {
    backgroundColor: "#41c0f9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  resendText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
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
