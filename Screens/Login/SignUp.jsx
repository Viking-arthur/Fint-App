import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Linking, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Background from '../../Components/Bg';

const SignUp = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleSignUp = () => {
    if (!isChecked) {
      alert('Please agree to the terms and conditions');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    setPasswordError('');

    // Handle the sign-up logic here
    console.log('User Info:', {
      name,
      phoneNo,
      password,
    });
  };

  const handleTermsPress = () => {
    Linking.openURL('https://www.example.com/terms'); // Replace with your actual terms URL
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
            <Text style={styles.logo}>FINT</Text>
          </View>

          {/* Create a box around the form elements */}
          <View style={styles.formContainer}>
            <Text style={styles.title}>Create New Account</Text>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone No"
              value={phoneNo}
              onChangeText={setPhoneNo}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

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
                I agree to the{' '}
                <Text style={styles.link} onPress={handleTermsPress}>
                  terms and conditions
                </Text>
              </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign-Up</Text>
            </TouchableOpacity>
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
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 20,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
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
