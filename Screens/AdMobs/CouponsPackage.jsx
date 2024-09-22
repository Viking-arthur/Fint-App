import React from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Image } from 'react-native';
import Background from '../../Components/Bg';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const CouponsPackage = () => {
  const navigation = useNavigation();

  return (
    <Background>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back-circle-outline" size={34} color="#fff" />
      </Pressable>

      <View style={styles.container}>
        {/* Label for Coupon Packages */}
        <Text style={styles.label}>
          Coupon Packages
        </Text>

        {/* Image Buttons for Bronze, Silver, and Gold Packages */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('CouponBronze')} style={styles.imageButton}>
            <View style={styles.imageLabelContainer}>
              <Image source={require('../../assets/bronze.png')} style={styles.packageImage} />
              <Text style={styles.buttonText}>Bronze</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('CouponSilver')} style={styles.imageButton}>
            <View style={styles.imageLabelContainer}>
              <Image source={require('../../assets/silver.png')} style={styles.packageImage} />
              <Text style={styles.buttonText}>Silver</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('CouponGold')} style={styles.imageButton}>
            <View style={styles.imageLabelContainer}>
              <Image source={require('../../assets/gold.png')} style={styles.packageImage} />
              <Text style={styles.buttonText}>Gold</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 20,
    paddingTop: 10,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#fff',
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 0, // Space between buttons
    width: '80%', // Adjust the button width
    alignItems: 'center',
  },
  imageButton: {
    alignItems: 'center',
  },
  imageLabelContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  packageImage: {
    width: 320,
    height: 120,
    resizeMode: 'contain',
  },
  buttonText: {
    position: 'absolute',
    color: '#fff',
    fontSize: 20,
    fontWeight: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Optional shadow effect
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default CouponsPackage;
