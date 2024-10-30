import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  ScrollView,
  Animated,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Background from '../../Components/Bg';
import { useNavigation } from '@react-navigation/native';
import NavBarWork from '../../Components/NavBarWork';
import axiosInstance from '../../axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const WorkHomePage = () => {

  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNavButton, setSelectedNavButton] = useState(1); 
  const [isKeyboardVisible, setKeyboardVisible] = useState(false); 
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true); 

  const navBarAnimation = new Animated.Value(width / 3);

  const handleNavButtonPress = (index) => {
    setSelectedNavButton(index);

    Animated.spring(navBarAnimation, {
      toValue: index * (width / 3), 
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const response = await axiosInstance.get('/freelance/ALL');
        setProfiles(response.data); // Assume response.data is an array of profiles
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancers();

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true); 
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false); 
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const filteredProfiles = profiles.filter(profile =>
    profile.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  // Simple hash function for demonstration
  const hashProfileName = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      const char = name.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash); // Return positive hash
  };

  const handleFlashIconPress = async (profileId, flashClicked) => {
    try {
      const endpoint = flashClicked ? `/engage/unstrike/${profileId}` : `/engage/strike/${profileId}`; 
      const response = await axiosInstance.post(endpoint);
      const { engagementCount } = response.data;
  
      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile._id === profileId
            ? {
                ...profile,
                engagementCount: engagementCount,
                flashClicked: !flashClicked,
              }
            : profile
        )
      );
    } catch (error) {
      console.error('Error toggling flash icon:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Background>
      <Pressable style={styles.backButton} onPress={() => navigation.navigate('AccType')}>
        <Icon name="arrow-back-circle-outline" size={34} color="#fff" />
      </Pressable>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Icon
          name="notifications"
          size={34}
          color="#fff"
          style={styles.notificationIcon}
        />
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={styles.loadingIndicator} />
        ) : (
          <ScrollView
            contentContainerStyle={styles.profilesContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((profile) => (
                <View key={profile._id} style={styles.profileCard}>
                  <Pressable
                    onPress={() =>
                      profile._id === '66f3e3a42ed609fa50790f8d'
                        ? navigation.navigate('HiringProfile1')
                        : navigation.navigate('HiringProfile2')
                    }
                  >
                    <View style={styles.profileHeader}>
                      <Text style={styles.profileName}>
                        {`Profile #${hashProfileName(profile.fullName)}`} {/* Display hashed profile name */}
                      </Text>
                    </View>
                    <Text style={styles.profileLabel}>{profile.skills.join(', ')}</Text>
                  </Pressable>

                  <View style={styles.profileFooter}>
                    <Pressable
                      onPress={() => handleFlashIconPress(profile._id, profile.flashClicked)}
                      style={styles.engagementSection}
                    >
                      <Icon
                        name={profile.flashClicked ? 'flash' : 'flash-outline'}
                        size={24}
                        color={profile.flashClicked ? '#FFC107' : '#FFC107'}
                      />
                      <Text style={styles.engagementCount}>
                        {profile.engagementCount || 0}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noResultsText}>No profiles match your search.</Text>
            )}
          </ScrollView>
        )}

        {!isKeyboardVisible && <NavBarWork />}
      </KeyboardAvoidingView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 15 },
  backButton: { position: 'absolute', top: 40, left: 20, zIndex: 20, paddingTop: 10 },
  searchContainer: { padding: 20, paddingTop: 40, width: '100%', marginTop: 50 },
  searchInputContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(225, 225, 255, 0.2)',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fff',
    height: 40,
  },
  searchInput: { flex: 1, height: '100%', paddingHorizontal: 10, fontSize: 16, color: '#fff' },
  searchIcon: { marginHorizontal: 10 },
  profilesContainer: { padding: 15 },
  profileCard: {
    backgroundColor: 'rgba(225, 225, 255, 0.2)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 15,
    marginBottom: 20,
    elevation: 3,
  },
  profileHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  profileName: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  profileLabel: { fontSize: 14, color: '#fff', marginTop: 5 },
  profileFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  engagementSection: { flexDirection: 'row', alignItems: 'center' },
  engagementCount: { marginLeft: 8, fontSize: 14, color: '#888' },
  notificationIcon: { position: 'absolute', top: 50, right: 15 },
  noResultsText: { fontSize: 18, color: '#ed1b1b', textAlign: 'center', marginVertical: 20 },
  loadingIndicator: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default WorkHomePage;
