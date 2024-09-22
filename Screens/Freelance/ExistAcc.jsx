import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  Pressable,
} from 'react-native';
import Background from '../../Components/Bg';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';



const ExistAcc = () => {
 const navigation = useNavigation();
  const handleSubmit = () => {
    // Handle form submission logic here
    Alert.alert('Login Submitted');
  };

  return (
    <Background>
    <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()} // Use goBack instead of navigate
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
          source={require('../../assets/Fintlogo.jpg')} // Replace with the path to your logo
          style={styles.logo}
        />
        <Text style={styles.label}>Login into the Existing Account</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.formContainer}>
        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#888"
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.button}onPress={() => navigation.navigate('WorkHomePage')}>
          <Text style={styles.buttonText}>Submit</Text>
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
    paddingBottom: 210, // Ensure enough space for bottom content
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
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light blur effect
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    alignSelf: 'center',
    width: '50%',
    marginTop: 20,
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExistAcc;
