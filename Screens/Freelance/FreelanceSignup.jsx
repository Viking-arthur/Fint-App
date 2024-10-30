import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, Image, TouchableOpacity, 
  ScrollView, Pressable, Linking, ActivityIndicator, Alert 
} from 'react-native';
import Background from '../../Components/Bg';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import axiosInstance from '../../axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomCheckBox = ({ isChecked, onValueChange }) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={() => onValueChange(!isChecked)}>
      <View style={[styles.checkbox, isChecked && styles.checked]} />
    </TouchableOpacity>
  );
};

const FreelanceSignup = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);  // State for toggling password visibility
  const [skills, setSkills] = useState("");  // Treat skills as a string instead of an array
  const [isChecked, setIsChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false); // State for activity indicator
  const navigation = useNavigation(); 

  const handleJoin = async () => {
    if (!isChecked) {
      setCheckboxError("You must agree to the terms to proceed.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setCheckboxError("");
    setEmailError("");
    setLoading(true);

    try {
      // Make a POST request to the signup endpoint
      const response = await axiosInstance.post("/freelance/signup", {
        email,
        fullName,
        phoneNumber,
        password,
        skills,  
      });

      const userId=response.data.id
      const { token } = response.data;

      // Store the token in AsyncStorage
      await AsyncStorage.setItem('token', token);

      // Navigate to sign-in page
      navigation.navigate('FreelanceLogin',userId);

      setLoading(false);
    } catch (error) {
      console.error(error.message);
      Alert.alert("Signup Failed", "There was an error signing up. Please try again later.");
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        {/* Logo */}
        <Image source={require('../../assets/Fintlogo.jpg')} style={styles.logo} />

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          {/* Full Name Input */}
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#CCCCCC"
            value={fullName}
            onChangeText={setFullName}
          />

          {/* Phone Number Input */}
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#CCCCCC"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          
          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#CCCCCC"
            value={email}
            onChangeText={setEmail}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          {/* Password Input with Show/Hide Toggle */}
          <View style={styles.passwordContainer}>
            <TextInput 
              style={styles.passwordInput} 
              placeholder="Password" 
              placeholderTextColor="#CCCCCC" 
              secureTextEntry={!showPassword}  // Toggle password visibility
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.showPasswordIcon}>
              <Icon 
                name={showPassword ? "eye-off-outline" : "eye-outline"} 
                size={24} 
                color="#CCCCCC" 
              />
            </TouchableOpacity>
          </View>
          
          {/* Skills Input */}
          <TextInput
            style={styles.input}
            placeholder="Skills"
            placeholderTextColor="#CCCCCC"
            value={skills}
            onChangeText={setSkills}
          />
        </View>

        {/* Agreement Section */}
        <View style={styles.agreementSection}>
          <CustomCheckBox isChecked={isChecked} onValueChange={setIsChecked} />
          <Text style={styles.agreementText}>I agree to the Fint Ad Mob </Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.example.com/user-agreement')}>
            <Text style={styles.linkText}>User Agreement</Text>
          </TouchableOpacity>
          <Text style={styles.agreementText}> and </Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.example.com/privacy-policy')}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>

        {/* Display Checkbox Error */}
        {checkboxError ? <Text style={styles.errorText}>{checkboxError}</Text> : null}

        {/* Join Button with Activity Indicator */}
        <TouchableOpacity 
          style={styles.joinButton} 
          onPress={handleJoin} 
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.joinButtonText}>Join</Text>
          )}
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footerText}>
          Already have an account? <Text style={styles.footerLink} onPress={() => navigation.navigate('FreelanceLogin')}>Log in</Text>
        </Text>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 50,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    paddingTop: 60,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#002D6F',
    padding: 15,
    borderRadius: 10,
    color: 'white',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FA9746',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#002D6F',
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FA9746',
  },
  passwordInput: {
    flex: 1,
    color: 'white',
    padding: 15,
  },
  showPasswordIcon: {
    paddingRight: 15,
  },
  agreementSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkbox: {
    width: 12,
    height: 12,
  },
  checked: {
    backgroundColor: '#fff',
  },
  agreementText: {
    fontSize: 16,
    color: '#fff',
  },
  linkText: {
    color: '#00BFFF',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
  joinButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
  footerLink: {
    color: '#00BFFF',
    fontWeight: 'bold',
  },
});

export default FreelanceSignup;
