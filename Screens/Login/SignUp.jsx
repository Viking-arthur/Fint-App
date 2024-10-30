import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Linking, ScrollView, Platform, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Remove if not used elsewhere
import Background from '../../Components/Bg';
import axiosInstance from "../../axiosInstance";
import { z } from "zod";
import AsyncStorage from "@react-native-async-storage/async-storage";

const signUpSchema = z.object({
  fullName: z.string().nonempty("Full name is required"),
  phoneNumber: z
    .string()
    .nonempty("Phone number is required")
    .length(10, "Phone number must be 10 digits"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z
    .string()
    .min(8, "Confirm Password must be at least 8 characters long"),
});

const SignUp = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Single state for toggling password visibility for both fields
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    if (!isChecked) {
      Alert.alert("Error", "Please agree to the terms and conditions");
      return;
    }

    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const validationResult = signUpSchema.safeParse({
        fullName,
        phoneNumber,
        email,
        password,
        confirmPassword,
      });

      if (!validationResult.success) {
        const validationErrors = validationResult.error.format();
        setErrors({
          fullName: validationErrors.fullName?._errors[0],
          phoneNumber: validationErrors.phoneNumber?._errors[0],
          email: validationErrors.email?._errors[0],
          password: validationErrors.password?._errors[0],
          confirmPassword: validationErrors.confirmPassword?._errors[0],
        });
        return;
      }

      const response = await axiosInstance.post("/auth/register", {
        fullName,
        phoneNumber,
        email,
        password,
      });

      if (response.data?.token) {
        const { token } = response.data;

        // Store the token in AsyncStorage
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("userEmail", email);

        // Alert.alert("Success", "Account created successfully");
        navigation.navigate("Otp", { email }); // Navigate to the OTP page after signup
      } else {
        Alert.alert("Error", "Unexpected server response");
      }
    } catch (error) {
      console.error("Sign Up Error:", error);

      if (error.response) {
        if (error.response.status === 409) {
          Alert.alert(
            "Error",
            "User with this email or phone number already exists."
          );
        } else {
          Alert.alert(
            "Error",
              "Failed to sign up. Please try again."
          );
        }
      } else if (error.request) {
        Alert.alert("Error", "Network error. Please check your connection.");
      } else {
        Alert.alert("Error", "Failed to sign up. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTermsPress = () => {
    Linking.openURL("https://www.example.com/terms"); // Replace with your actual terms URL
  };

  return (
    <Background>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            {/* Logo Image */}
            <Image source={require('../../assets/Fintlogo.jpg')} style={styles.logoImage} />
            {/* Logo Text */}
            <Text style={styles.logoText}>FINT</Text>
          </View>

          {/* Create a box around the form elements */}
          <View style={styles.formContainer}>
            <Text style={styles.title}>Create New Account</Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />
            {errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Phone No"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            {errors.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            
            {/* Password Input */}
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {/* Confirm Password Input */}
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword}
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            {/* Show Password Checkbox */}
            <View style={styles.showPasswordContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword && (
                  <Ionicons name="checkmark" size={24} color="#0088FF" />
                )}
              </TouchableOpacity>
              <Text style={styles.showPasswordText}>
                Show Password
              </Text>
            </View>

            {/* Checkbox Section */}
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setIsChecked(!isChecked)}
              >
                {isChecked && (
                  <Ionicons name="checkmark" size={24} color="#0088FF" />
                )}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>
                I agree to the{" "}
                <Text style={styles.link} onPress={handleTermsPress}>
                  terms and conditions
                </Text>
              </Text>
            </View>

            {loading ? (
              <ActivityIndicator
                size="large"
                color="#0a66e1"
                style={styles.loading}
              />
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign-Up</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signInText}>Already have an account? Log-In</Text>
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
  },
  scrollContainer: {
    width: 400,
    marginTop: 100,
    paddingHorizontal: 0,
    paddingBottom: 150, // Ensure enough space for bottom content
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginVertical: 20,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  formContainer: {
    width: 350,
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    color: '#000',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  showPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  checkbox: {
    height: 24,
    width: 24,
    borderWidth: 2,
    borderColor: '#0088FF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  showPasswordText: {
    marginLeft: 10,
    color: 'gray',
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#000',
  },
  link: {
    color: '#0088FF',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#0a66e1',
    width: 200,
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signInText: {
    color: '#fff',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignUp;
