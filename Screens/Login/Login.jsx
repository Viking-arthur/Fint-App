import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image, ActivityIndicator } from 'react-native';
import Background from '../../Components/Bg';
import axiosInstance from "../../axiosInstance";
import { z } from "zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import an icon library (optional)

const loginSchema = z.object({
  phoneNumber: z
    .string()
    .nonempty("Phone number is required")
    .length(10, "Phone number must be 10 digits"),
  password: z.string().nonempty("Password is required"),
});

const Login = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false); // Track password visibility

  const handleLogin = async () => {
    // Validate form data
    const validationResult = loginSchema.safeParse({
      phoneNumber,
      password,
    });

    if (!validationResult.success) {
      const validationErrors = validationResult.error.format();
      setPhoneNumberError(validationErrors.phoneNumber?._errors[0]);
      return;
    }

    // Reset error if validation is successful
    setPhoneNumberError("");

    setLoading(true); // Start loading

    try {
      // Perform API request
      const response = await axiosInstance.post("/auth/login", {
        phoneNumber,
        password,
      });

      console.log("Login Response:", response.data);

      // Check for successful response
      if (response.data && response.data.token) {
        const { token } = response.data;

        // Store the token in AsyncStorage
        try {
          await AsyncStorage.setItem("token", token);
          console.log("Token stored successfully");

          Alert.alert("Login Success", "Please Proceed", [
            {
              text: "OK",
              onPress: () => {
                setLoading(false); // Stop loading
                navigation.navigate("Home");
              },
            },
          ]);
        } catch (error) {
          console.error("Failed to store token in AsyncStorage:", error);
          Alert.alert("Storage Error", "Failed to store token. Please try again.");
        }
      } else {
        Alert.alert("Error", "Unexpected server response");
        setLoading(false); // Stop loading
      }
    } catch (error) {
      console.error("Login Error:", error);
      setLoading(false); // Stop loading
      if (error.response) {
        Alert.alert(
          "Error",
          error.response.data?.message || "Failed to login. Please try again."
        );
      } else if (error.request) {
        Alert.alert("Error", "Network error. Please check your connection.");
      } else {
        Alert.alert("Error", "Failed to login. Please try again.");
      }
    }
  };

  return (
    <Background>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/Fintlogo.jpg')} style={styles.logo} />
            <Text style={styles.logoText}>FINT</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <Text style={styles.title}>Login</Text>

            <TextInput
              style={[styles.input, phoneNumberError && { borderColor: "red" }]}
              placeholder="Phone Number"
              placeholderTextColor="#ccc"
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text);
                if (phoneNumberError) setPhoneNumberError(""); // Reset error on input change
              }}
              keyboardType="phone-pad"
            />

            {phoneNumberError ? (
              <Text style={styles.errorText}>{phoneNumberError}</Text>
            ) : null}

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#ccc"
                secureTextEntry={!showPassword} // Toggle password visibility
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Icon
                  name={showPassword ? 'visibility' : 'visibility-off'}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            {/* Forgot Password link */}
            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Sign Up link */}
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.signInText}>
                Don't have an account? Sign-up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    width: 400,
    marginTop: 150,
    paddingHorizontal: 0,
    paddingBottom: 150, // Ensure enough space for bottom content
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#f0f0f0',
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    padding: 0,
    paddingBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotPasswordText: {
    color: '#007bff',
    textDecorationLine: 'underline',
    marginBottom: 15,
  },
  signInText: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
});

export default Login;
