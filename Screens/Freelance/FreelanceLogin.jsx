import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Background from '../../Components/Bg';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { z } from "zod";
import axiosInstance from "../../axiosInstance";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export const freelancerLoginSchema = z.object({
  phoneNumber: z
    .string()
    .length(10, "Phone Number must be exactly 10 digits")
    .regex(/^\d{10}$/, "Phone Number must only contain digits"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const FreelanceLogin = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    try {
      freelancerLoginSchema.parse(formData);
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        const errorMessages = e.errors.reduce((acc, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {});
        setErrors(errorMessages);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true); 

    try {
      const response = await axiosInstance.post("/freelance/signin", {
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      });

      console.log("API Response:", response.data);
      if (response.status === 200) {
        const { user, token } = response.data;
        const userId = user?._id;
        console.log("UserID:", userId);

        if (!userId) {
          console.error("User ID is undefined");
          return;
        }

        // Store the token in AsyncStorage
        await AsyncStorage.setItem('token', token);

        navigation.navigate("WorkProfile", { userId });
        
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setErrors({
        server: error.response
          ? error.response.data.message ||
            "An error occurred during login. Please try again."
          : "An unexpected error occurred.",
      });
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

      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/Fintlogo.jpg')}
              style={styles.logo}
            />
            <Text style={styles.label}>Login to Your Account</Text>
          </View>

          {/* Input Fields */}
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="numeric"
              placeholderTextColor="#999"
              onChangeText={(text) => handleInputChange("phoneNumber", text)}
              value={formData.phoneNumber}
              accessible={true}
              accessibilityLabel="Phone Number"
            />
            {errors.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                secureTextEntry={!showPassword}
                placeholderTextColor="#999"
                onChangeText={(text) => handleInputChange("password", text)}
                value={formData.password}
                accessible={true}
                accessibilityLabel="Password"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Icon
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {errors.server && <Text style={styles.errorText}>{errors.server}</Text>}

            {/* Button with Activity Indicator */}
            <TouchableOpacity
              style={[styles.button, loading ? styles.buttonDisabled : {}]}
              onPress={handleSubmit}
              disabled={loading}
              accessible={true}
              accessibilityLabel="Login Button"
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Don't have an account?{" "}
              <Text
                style={styles.footerLink}
                onPress={() => navigation.navigate('FreelanceSignup')}
              >
                Sign Up
              </Text>
            </Text>
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
    paddingBottom: 210,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 20,
    paddingTop: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#fff',
  },
  formContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    color: '#333',
  },
  eyeIcon: {
    padding: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingIndicator: {
    marginLeft: 10,
  },
  footerText: {
    textAlign: 'center',
    color: '#fff',
    marginTop: 20,
  },
  footerLink: {
    color: '#00BFFF',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default FreelanceLogin;
