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
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Background from '../../Components/Bg';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../axiosInstance';

const { width } = Dimensions.get('window');

const HireHomePage = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNavButton, setSelectedNavButton] = useState(1);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clickedStrikes, setClickedStrikes] = useState({}); // Tracks clicked profiles

  const navBarAnimation = new Animated.Value(width / 3);

  const handleNavButtonPress = (index) => {
    setSelectedNavButton(index);

    Animated.spring(navBarAnimation, {
      toValue: index * (width / 3),
      useNativeDriver: true,
    }).start();
  };

  const handleStrike = async (profileId) => {
    // Check if the user has already clicked the strike button for this profile
    if (clickedStrikes[profileId]) return;

    try {
      const response = await axiosInstance.post(`/freelance/strike/${profileId}`);
      if (response.data.success) {
        // Update the profiles state with the new strike count
        setProfiles((prevProfiles) =>
          prevProfiles.map((profile) =>
            profile._id === profileId
              ? { ...profile, strikes: response.data.data.strikes }
              : profile
          )
        );
        // Mark this profile as clicked
        setClickedStrikes((prevClickedStrikes) => ({
          ...prevClickedStrikes,
          [profileId]: true,
        }));
      }
    } catch (error) {
      console.error("Error updating strike count:", error);
    }
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

  const filteredProfiles = profiles.filter((profile) =>
    profile.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                        // ? navigation.navigate('HiringProfile1')
                        // : navigation.navigate('HiringProfile2')
                    }
                  >
                    <View style={styles.profileHeader}>
                      <Text style={styles.profileName}>{profile.fullName}</Text>
                    </View>
                    <Text style={styles.profileLabel}>{profile.skills.join(', ')}</Text>
                  </Pressable>

                  <View style={styles.profileFooter}>
                    <Pressable
                      onPress={() => handleStrike(profile._id)} // Call the strike function here
                      style={styles.engagementSection}
                      disabled={clickedStrikes[profile._id]} // Disable if already clicked
                    >
                      <Icon
                        name={profile.strikes > 0 ? 'flash' : 'flash-outline'}
                        size={24}
                        color="#FFC107"
                      />
                      <Text style={styles.engagementCount}>
                        {profile.strikes || 0} Strikes {/* Display the number of strikes */}
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
    padding: 25, // Increase padding for larger size
    marginBottom: 20,
    elevation: 3,
  },
  profileHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  profileName: { fontSize: 22, fontWeight: 'bold', color: '#fff' }, // Increase font size for bigger tile
  profileLabel: { fontSize: 16, color: '#fff', marginTop: 5 },
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

export default HireHomePage;
