import React, { useState } from 'react'; 
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Pressable, Linking, Alert, Button } from 'react-native';
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

const AdBanners = () => {
  const [image, setImage] = useState(null);
  const [offerDetails, setOfferDetails] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState(''); // Error state for the checkbox
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

  const handleCreateAd = () => {
    if (!isChecked) {
      setCheckboxError('You must agree to the terms to proceed.'); // Set error message
    } else {
      setCheckboxError(''); // Clear error if checkbox is checked
      navigation.navigate('BannersPackage'); // Proceed to the next screen
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
        <Text style={styles.adTitle}>Ad Banners</Text>
        
        {/* Upload Image Section */}
        <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.uploadedImage} />
          ) : (
            <>
              <Icon name="add-outline" size={40} color="#000" />
              <Text style={styles.watermark}>FINT</Text>
            </>
          )}
        </TouchableOpacity>
        <Text style={styles.uploadText}>Upload image</Text>

        {/* Offer Input Fields */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Enter Details</Text>
          <TextInput
            style={styles.adDetailsInput}
            placeholder="Enter Ad details..."
            placeholderTextColor="#CCCCCC"
            value={offerDetails}
            onChangeText={setOfferDetails}
            multiline={true}
            textAlignVertical="top"
            numberOfLines={4}
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


{/* Create Ads Button */}
<Button 
  title="Create Ads" 
  onPress={handleCreateAd} 
  color={styles.createButton.backgroundColor}
/>

      </ScrollView>

    </Background>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 130,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 20,
    zIndex: 20,
    paddingTop: 40,
  },
  adTitle: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  uploadBox: {
    width: 300,
    height: 150,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'relative',
  },
  uploadedImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  watermark: {
    position: 'absolute',
    color: 'rgba(0, 0, 0, 0.3)',
    fontSize: 20,
    fontWeight: 'bold',
    bottom: 10,
    right: 10,
  },
  uploadText: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  adDetailsInput: {
    height: 150,
    backgroundColor: '#002D6F',
    padding: 15,
    color: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FA9746',
    textAlignVertical: 'top',
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
  agreementSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  linkText: {
    color: '#00BFFF',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
  createButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdBanners;
