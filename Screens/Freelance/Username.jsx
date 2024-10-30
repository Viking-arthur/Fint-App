import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Pressable,
} from 'react-native';
import Background from '../../Components/Bg';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from "@react-navigation/native";
import axiosInstance from "../../axiosInstance";


const Username = () => {
  const [username, setUsername] = useState("");
  const navigation = useNavigation();
  const router = useRoute();
  const { userId } = router.params

  
  // Extract data passed from FlLogin screen
  const { email, fullName, phoneNumber, password, skills } = router.params;

  const handleNext = async () => {
    try {
      // Define your backend endpoint

      // Sending data using axios
      const response = await axiosInstance.post("/freelance/signup", {
        email,
        fullName,
        phoneNumber,
        password,
        skills,
        username,
      });
      

      // Handling the response
      if (response.status === 200) {
        Alert.alert("Success", "Registration successful!");
        navigation.navigate("WorkProfile", { userId });
      } else {
        Alert.alert("Error","Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert(
        "Error","Something went wrong. Please try again."
      );
    }
  };
 
  return (
    <Background>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Use goBack instead of navigate
      >
        <Icon name="arrow-back-circle-outline" size={34} color="#fff" />
      </Pressable>

      <View style={styles.container}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/Fintlogo.jpg')} // Replace with the path to your logo
            style={styles.logo}
          />
          <Text style={styles.label}>Enter a Username</Text>
        </View>

        {/* Alert Text with Icon */}
        <View style={styles.alertContainer}>
          <Icon name="alert-circle-outline" size={24} color="#ffcc00" />
          <Text style={styles.alertText}>
            Please note that a username cannot be changed once entered
          </Text>
        </View>

        {/* Input Field */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        </View>
      </View>

      
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
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 20,
    paddingTop: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
  alertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  alertText: {
    fontSize: 14,
    color: '#ffcc00',
    marginLeft: 10,
    flexShrink: 1,
  },
  formContainer: {
    width: '80%',
  },
  inputContainer: {
    marginBottom: 20,
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

export default Username;
