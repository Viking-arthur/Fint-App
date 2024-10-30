import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Icon from 'react-native-vector-icons/Ionicons';
import Background from '../Components/Bg';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../axiosInstance";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log("Token:", token);

        if (!token) {
          alert("Login Failed");
          navigation.navigate("Login");
          return;
        }

        // Fetch user profile using the token, no need for userId
        const response = await axiosInstance.get(`/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("User data response:", response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data", error.message);
        alert("Failed to fetch user data, please try again");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigation]);

  const handleCopyUPI = () => {
    const upiId = 'xyz@oksbi';
    Clipboard.setStringAsync(upiId);
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
          <Text style={styles.profileName}>{userData?.fullName}</Text>
          
          {/* Email Section */}
          <View style={styles.emailContainer}>
            <Text style={styles.email}>{userData?.email}</Text>
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

      {/* Log-out Container */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={async () => {
            await AsyncStorage.removeItem("authToken");
            navigation.navigate("Login");
          }}>
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
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    backgroundColor: '#1B3B6F',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  email: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  menuSection: {
    backgroundColor: '#000',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 50,
    marginTop: 60,
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
    paddingLeft: 10,
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
    marginLeft: 'auto',
    marginRight: 10,
  },
  iconMargin: {
    marginRight: 10,
  },
});

export default Profile;
