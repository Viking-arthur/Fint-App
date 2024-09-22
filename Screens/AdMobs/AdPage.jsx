import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Background from '../../Components/Bg'; // Ensure this path is correct
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const AdPage = () => {
  const navigation = useNavigation();
  const handleButtonPress = (buttonName) => {
    console.log(`${buttonName} button pressed`);
  };

  return (
    <Background>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Use goBack instead of navigate
      >
        <Icon name="arrow-back-circle-outline" size={30} color="#fff" />
      </Pressable>

      <View style={styles.container}>
        <Image
         source={require('../../assets/Fintlogo.jpg')} style={styles.logo}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Coupons')}>
            <View style={styles.overlay} />
            <Text style={styles.buttonText}>Coupons</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AdBanners')}>
            <View style={styles.overlay} />
            <Text style={styles.buttonText}>Ad Banners</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ComingSoon')}>
            <View style={styles.overlay} />
            <Text style={styles.buttonText}>Corporate Ads</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/add.png')} // Check path and file name
          style={styles.bottomImage}
        />
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
    padding: 20,
    paddingBottom: 60,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 20,
    paddingTop: 10,
  }, 
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    width: '100%',
    borderColor: '#fff',
    borderWidth: 2,
    padding: 15,
    backgroundColor: 'rgba(0, 123, 255, 0.3)', // Semi-transparent background color
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    position: 'relative', // Required for overlay positioning
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Cover the entire button
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white overlay
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff', // White text color
    fontSize: 16,
    zIndex: 1, // Ensure text is above overlay
  },
  topImage: {
    marginTop: 80,
    width: 150, // Use absolute dimensions for troubleshooting
    height: 150, // Adjust height as needed
    marginBottom: 20, // Space between the top image and buttons
  },
  bottomImage: {
    width: 300, // Use absolute dimensions for troubleshooting
    height: 300, // Adjust height as needed
    marginTop: 20, // Space between buttons and bottom image
  },
});

export default AdPage;
