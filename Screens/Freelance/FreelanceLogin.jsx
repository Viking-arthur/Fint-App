import React, { useState } from 'react'; 
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Pressable, Linking, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Background from '../../Components/Bg';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const CustomCheckBox = ({ isChecked, onValueChange }) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={() => onValueChange(!isChecked)}>
      <View style={[styles.checkbox, isChecked && styles.checked]} />
    </TouchableOpacity>
  );
};

const FreelanceLogin = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [skills, setSkills] = useState(''); // New state for Skills
  const navigation = useNavigation();
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const handleJoin = () => {
    if (!isChecked) {
      setCheckboxError('You must agree to the Fint Ad Mob to proceed.');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setCheckboxError('');
    setEmailError('');
    navigation.navigate('Username');
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
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#CCCCCC"
            value={email}
            onChangeText={setEmail}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#CCCCCC" secureTextEntry />
          
          {/* New Skills Input */}
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

{/* Join Button */}
<Button 
  title="Join"
  onPress={handleJoin}
  color="#007BFF" // You can customize the button color like this
/>


        {/* Footer */}
        <Text style={styles.footerText}>
          Already have an account? <Text style={styles.footerLink} onPress={() => navigation.navigate('ExistAcc')}>Log in</Text>
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    color: '#fff',
  },
  footerLink: {
    color: '#00BFFF',
  },
});

export default FreelanceLogin;
