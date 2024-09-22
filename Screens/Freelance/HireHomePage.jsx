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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Background from '../../Components/Bg';
import { useNavigation } from '@react-navigation/native'; // For navigation
import NavBarHire from '../../Components/NavBarHire';

const { width } = Dimensions.get('window');

const HireHomePage = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [setSelectedNavButton] = useState(1); // Set the home icon as the default selected button
  const [isKeyboardVisible, setKeyboardVisible] = useState(false); // State to track keyboard visibility

  const navBarAnimation = new Animated.Value(width / 3);

  const handleNavButtonPress = (index) => {
    setSelectedNavButton(index);

    Animated.spring(navBarAnimation, {
      toValue: index * (width / 3), // Adjust position based on index
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // Hide navbar when keyboard is visible
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // Show navbar when keyboard is hidden
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: 'Rahul',
      label: 'Developer',
      achievementImage: require('../../assets/entrepreneur.png'),
      engagementCount: 1300,
      flashClicked: false, // Track if flash icon has been clicked
    },
    {
      id: 2,
      name: 'Viswas',
      label: 'Tech Lead',
      achievementImage: require('../../assets/team.png'),
      engagementCount: 1300,
      flashClicked: false, // Track if flash icon has been clicked
    },
  ]);

  // Filter profiles based on search query
  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFlashIconPress = (profileId) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id === profileId
          ? {
              ...profile,
              engagementCount: profile.flashClicked ? profile.engagementCount : profile.engagementCount + 1,
              flashClicked: true, // Mark as clicked
            }
          : profile
      )
    );
  };

  return (
    <Background>
      <Pressable style={styles.backButton} onPress={() => navigation.navigate('AccType')}>
        <Icon name="arrow-back-circle-outline" size={34} color="#fff" />
      </Pressable>

      {/* KeyboardAvoidingView ensures the UI moves up when the keyboard is visible */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // iOS uses padding, Android uses height
      >
        <Icon
          name="notifications"
          size={34}
          color="#fff"
          style={styles.notificationIcon}
        />
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Icon
              name="search"
              size={20}
              color="#888"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
        <ScrollView
          contentContainerStyle={styles.profilesContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" // Ensure the keyboard dismisses on tap
        >
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile) => (
              <View key={profile.id} style={styles.profileCard}>
                <Pressable
                  onPress={() =>
                    profile.id === 1
                      ? navigation.navigate('HiringProfile1') // Navigate to 'H1' for first profile
                      : navigation.navigate('HiringProfile2') // Navigate to 'H2' for second profile
                  }>
                  <View style={styles.profileHeader}>
                    <Text style={styles.profileName}>{profile.name}</Text>
                    <Text style={styles.profileLabel}>{profile.label}</Text>
                  </View>

                  <Image
                    source={profile.achievementImage}
                    style={styles.achievementImage}
                  />
                </Pressable>

                <View style={styles.profileFooter}>
                  {/* Flash icon to increment engagement count */}
                  <Pressable
                    onPress={() => handleFlashIconPress(profile.id)}
                    style={styles.engagementSection}>
                    <Icon
                      name={profile.flashClicked ? "flash" : "flash-outline"}
                      size={24}
                      color={profile.flashClicked ? "#FFC107" : "#FFC107"}
                    />
                    <Text style={styles.engagementCount}>
                      {profile.engagementCount}
                    </Text>
                  </Pressable>

                  {/* Navigation to a different screen if needed */}
                  <Pressable onPress={() => navigation.navigate('P2')}>
                    <Icon name="chevron-forward-outline" size={24} color="#fff" />
                  </Pressable>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noResultsText}>No profiles match your search.</Text>
          )}
        </ScrollView>
        
        {/* Conditionally render NavBar */}
        {!isKeyboardVisible && <NavBarHire/>}
      </KeyboardAvoidingView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 15 },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 20,
    paddingTop: 10,
  },
  searchContainer: {
    padding: 20,
    paddingTop: 40,
    width: '100%',
    marginTop: 50,
  },
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
  searchInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#fff',
  },
  searchIcon: { marginHorizontal: 10 },
  profilesContainer: {
    padding: 15,
  },
  profileCard: {
    backgroundColor: 'rgba(225, 225, 255, 0.2)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 15,
    marginBottom: 20,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileName: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  profileLabel: { fontSize: 14, color: '#fff' },
  achievementImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
    marginVertical: 15,
  },
  profileFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  engagementSection: { flexDirection: 'row', alignItems: 'center' },
  engagementCount: { marginLeft: 8, fontSize: 14, color: '#888' },
  notificationIcon: { position: 'absolute', top: 50, right: 15 },
  noResultsText: {
    fontSize: 18,
    color: '#ed1b1b',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default HireHomePage;
