import React, { useState } from 'react'; 
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Pressable, Linking, Button} from 'react-native';
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

const Coupons = () => {
    const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [offers, setOffers] = useState('');
  const [offerDetails, setOfferDetails] = useState('');
  const [terms, setTerms] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState(''); // State for error message

  
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

  const handleCreateCoupon = () => {
    if (!isChecked) {
      setCheckboxError('You must agree to the terms to proceed.');
    } else {
      setCheckboxError(''); // Clear the error if checkbox is checked
      navigation.navigate('CouponsPackage'); // Proceed with navigation
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
        {/* Upload Image Section */}
        <Text style={styles.couponTitle}>Coupons</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.uploadedImage} />
          ) : (
            <>
              <Icon name="add-outline" size={40} color="#000" />
              {/* Watermark text */}
              <Text style={[styles.watermark, { fontFamily: 'Roboto' }]}>FINT</Text>
            </>
          )}
        </TouchableOpacity>
        <Text style={styles.uploadText}>Upload image</Text>

        {/* Offer Input Fields with Labels */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Enter Offers</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter offers e.g., buy 1 get 1 free...."
            placeholderTextColor="#CCCCCC"
            value={offers}
            onChangeText={setOffers}
            multiline={true}
            textAlignVertical="top"
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Offer Details</Text>
          <TextInput
            style={styles.offerDetailsInput}
            placeholder="Enter offer details..."
            placeholderTextColor="#CCCCCC"
            value={offerDetails}
            onChangeText={setOfferDetails}
            multiline={true}
            textAlignVertical="top"
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Terms & Conditions</Text>
          <TextInput
            style={styles.termsInput}
            placeholder="Enter terms & conditions..."
            placeholderTextColor="#CCCCCC"
            value={terms}
            onChangeText={setTerms}
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
        
        {/* Checkbox Error Message */}
        {checkboxError ? <Text style={styles.errorText}>{checkboxError}</Text> : null}
      

{/* Create Ads Button */}
<Button 
  title="Create Coupons" 
  onPress={handleCreateCoupon} 
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
  couponTitle: {
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
    position: 'relative', // Make it relative for watermark positioning
  },
  uploadedImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  watermark: {
    position: 'absolute',
    color: 'rgba(0, 0, 0, 0.3)', // Light watermark
    fontSize: 20, // Increased font size
    fontWeight: 'bold',
    bottom: 10, // Position at the bottom
    right: 10, // Position at the right
    fontFamily: 'Roboto-Medium', // Apply the custom font
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
  input: {
    height: 50,
    backgroundColor: '#002D6F',
    padding: 15,
    color: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  offerDetailsInput: {
    height: 150, 
    backgroundColor: '#002D6F',
    padding: 15,
    color: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FA9746',
    textAlignVertical: 'top',
  },
  termsInput: {
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Coupons;

