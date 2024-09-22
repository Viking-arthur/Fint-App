import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, Pressable } from 'react-native';
import Background from '../../Components/Bg';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const BannerSilver = () => {
  const navigation = useNavigation();

  const handlePayPress = () => {
    Alert.alert('Payment', 'Pay button pressed!');
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
        {/* Menu Section */}
        <View style={styles.menuContainer}>
          <View style={styles.menuSection}>
            <Image 
              source={require('../../assets/profile.png')} // Update the path to your icon image
              style={styles.menuIcon}
            />
            <Text style={styles.menuLabel}>{'Silver Package:'}</Text>
            <Text style={styles.menuLabel}>{'the user is provided with the features and payment option, which are exclusive only for Silver packege users '}
            </Text>
            <View style={styles.footer}>
              <TouchableOpacity style={styles.payButton} onPress={handlePayPress}>
                <Text style={styles.payButtonText}>Pay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </View>
        
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%', 
    height: '100%',
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
  menuContainer: {
    width: '90%',
    alignItems: 'center',
  },
  menuSection: {
    width: '100%',
    height: '70%',
    marginTop: 100,
    backgroundColor: '#1E201E',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    paddingTop: 50, // Space for image
    position: 'relative', // Relative positioning for child absolute elements
    justifyContent: 'space-between', // Pushes the button to the end
  },
  menuIcon: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: -50, // Adjust this to control how much the image overlaps the border
    zIndex: 10,
  },
  menuLabel: {
    paddingTop: 30,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10, // Padding for better readability
  },
  footer: {
    marginTop: 'auto', // Pushes the Pay button to the bottom
  },
  payButton: {
    backgroundColor: '#28a745', // Green color for Pay button
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  payButtonText: {
    color: '#fff', // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BannerSilver;
