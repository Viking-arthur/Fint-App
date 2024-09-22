import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard'; // Clipboard API from Expo
import Icon from 'react-native-vector-icons/Ionicons';
import Background from '../Components/Bg';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();

  const handleCopyUPI = () => {
    const upiId = 'xyz@oksbi';
    Clipboard.setStringAsync(upiId); // Copy UPI ID to clipboard
    Alert.alert('Copied', 'UPI ID copied to clipboard');
  };

  return (
    <Background>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-circle-outline" size={34} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <View style={styles.container}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Icon name="person-circle-outline" size={100} color="#CCCCCC" />
          <Text style={styles.profileName}>Badri R</Text>

          {/* UPI ID Section */}
          <View style={styles.upiBox}>
            <Text style={styles.upiText}>UPI ID: xyz@oksbi</Text>
            <Pressable onPress={handleCopyUPI} style={styles.iconContainer}>
              <Icon name="copy-outline" size={24} color="#fff" />
            </Pressable>
          </View>

          <View style={styles.pincodeContainer}>
            <Text style={styles.pincodeLabel}>Pincode: </Text>
            <Text style={styles.pincode}>563122</Text>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Icon
              name="lock-open-outline"
              size={24}
              color="#fff"
              style={styles.iconMargin}
            />
            <Text style={styles.menuText}>Change password</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon
              name="language-outline"
              size={24}
              color="#fff"
              style={styles.iconMargin}
            />
            <Text style={styles.menuText}>Languages</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon
              name="home-outline"
              size={24}
              color="#fff"
              style={styles.iconMargin}
            />
            <Text style={styles.menuText}>Saved Address</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon
              name="information-circle-outline"
              size={24}
              color="#fff"
              style={styles.iconMargin}
            />
            <Text style={styles.menuText}>About</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.lastMenuItem]}>
            <Icon
              name="help-circle-outline"
              size={24}
              color="#fff"
              style={styles.iconMargin}
            />
            <Text style={styles.menuText}>Help & Feedback</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Fixed Log-out Container at the Bottom */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.logoutText}>Log-out</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: '90%',
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 40,
  },
  backButton: {
    top: 10,
    marginRight: 10,
    marginLeft: -180,
  },
  headerTitle: {
    top: 10,
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  upiBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B3B6F',
    paddingVertical: 12, // Increased vertical padding
    paddingHorizontal: 22, // Increased horizontal padding
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  upiText: {
    fontSize: 16,
    color: '#CCCCCC',
    marginRight: 10,
  },
  pincodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#1B3B6F',
    paddingVertical: 10, // Increased vertical padding
    paddingHorizontal: 22, // Increased horizontal padding
    borderRadius: 10,
  },
  pincode: {
    fontSize: 20,
    color: 'white',
    marginRight: 5,
  },
  pincodeLabel: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  menuSection: {
    backgroundColor: '#000',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 50, // Ensure there's space for the logout button
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1B3B6F',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuText: {
    paddingLeft: 10, // Increased padding to make space for icon
    fontSize: 18,
    color: 'white',
  },
  logoutButton: {
    backgroundColor: '#D9534F',
    padding: 15,
    alignItems: 'center',
    borderRadius: 20,
  },
  logoutText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  logoutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#D9534F',
  },
  iconContainer: {
    marginLeft: 'auto', // Pushes icon to the end
    marginRight: 10, // Space from right border
  },
  iconMargin: {
    marginRight: 10, // Space from text
  },
});

export default Profile;
