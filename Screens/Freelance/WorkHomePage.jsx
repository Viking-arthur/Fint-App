import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Background from '../../Components/Bg';
import NavBarWork from '../../Components/NavBarWork';
import { useNavigation } from '@react-navigation/native'; // For navigation

const { width } = Dimensions.get('window');

const WorkHomePage = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNavButton, setSelectedNavButton] = useState(1); // Home icon as the default selected button

  // Define animated values for each button's pop effect
  const buttonAnimations = [
    useRef(new Animated.Value(1)).current, // Button 1 scale (Profile)
    useRef(new Animated.Value(1)).current, // Button 2 scale (Home)
    useRef(new Animated.Value(1)).current, // Button 3 scale (Add)
  ];
  const translateYAnimations = [
    useRef(new Animated.Value(0)).current, // Button 1 translateY (Profile)
    useRef(new Animated.Value(0)).current, // Button 2 translateY (Home)
    useRef(new Animated.Value(0)).current, // Button 3 translateY (Add)
  ];
  const navBarAnimation = useRef(new Animated.Value(1 * (width / 2))).current;

  const handleNavButtonPress = (index, route) => {
    // Animate the nav bar indicator moving to the selected button
    Animated.spring(navBarAnimation, {
      toValue: index * (width / 3), // Adjust position based on index
      useNativeDriver: true,
    }).start();

    // Reset previous button animation
    Animated.parallel([
      Animated.spring(buttonAnimations[selectedNavButton], {
        toValue: 1, // Reset scale
        useNativeDriver: true,
      }),
      Animated.spring(translateYAnimations[selectedNavButton], {
        toValue: 0, // Reset translateY
        useNativeDriver: true,
      }),
    ]).start();

    // Set current button animation immediately
    Animated.parallel([
      Animated.spring(buttonAnimations[index], {
        toValue: 1.2, // Scale up selected button
        useNativeDriver: true,
      }),
      Animated.spring(translateYAnimations[index], {
        toValue: -10, // Move selected button upwards
        useNativeDriver: true,
      }),
    ]).start();

    // Update the selected button and navigate
    setSelectedNavButton(index);
    navigation.navigate(route);
  };

  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: '@234789',
      label: 'Entrepreneur',
      achievementImage: require('../../assets/entrepreneur.png'),
      engagementCount: 1300,
      clicked: false, // Track whether the flash icon has been clicked
    },
    {
      id: 2,
      name: '@340987',
      label: 'Team Lead',
      achievementImage: require('../../assets/team.png'),
      engagementCount: 1300,
      clicked: false, // Track whether the flash icon has been clicked
    },
  ]);

  const handleFlashIconPress = (profileId) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id === profileId
          ? { 
              ...profile,
              engagementCount: profile.clicked ? profile.engagementCount : profile.engagementCount + 1,
              clicked: true // Mark as clicked
            }
          : profile
      )
    );
  };

  // Filter profiles based on search query
  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Background>
      <Pressable style={styles.backButton} onPress={() => navigation.navigate('AccType')}>
        <Icon name="arrow-back-circle-outline" size={34} color="#fff" />
      </Pressable>

      <View style={styles.container}>
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

        <ScrollView contentContainerStyle={styles.profilesContainer} showsVerticalScrollIndicator={false}>
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile) => (
              <View key={profile.id} style={styles.profileCard}>
                <Pressable
                  onPress={() =>
                    profile.id === 1
                      ? navigation.navigate('Profile1') // Navigate to 'P1' for first profile
                      : navigation.navigate('Profile2') // Navigate to 'P2' for second profile
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
                  <Pressable
                    onPress={() => handleFlashIconPress(profile.id)}
                    style={styles.engagementSection}>
                    <Icon
                      name={profile.clicked ? "flash" : "flash-outline"}
                      size={24}
                      color={profile.clicked ? "#FFC107" : "#FFC107"}
                    />
                    <Text style={styles.engagementCount}>
                      {profile.engagementCount}
                    </Text>
                  </Pressable>

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

      <NavBarWork />
      </View>
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

export default WorkHomePage;
