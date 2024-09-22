import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Background from '../../Components/Bg';
import { useNavigation } from '@react-navigation/native';
import NavBarHire from '../../Components/NavBarHire';


const StrikeCart = () => {
  const navigation = useNavigation();

  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: 'Badri R',
      label: 'Entrepreneur',
      engagementCount: 1300,
      hasEngaged: false, // Add a flag for engagement status
    },
    {
      id: 2,
      name: 'Guru Kiran',
      label: 'Entrepreneur',
      engagementCount: 1300,
      hasEngaged: false, // Add a flag for engagement status
    },
    {
      id: 3,
      name: 'Vignesh',
      label: 'engineer',
      engagementCount: 1300,
      hasEngaged: false, // Add a flag for engagement status
    },
    {
      id: 4,
      name: 'Kiran',
      label: 'CTO',
      engagementCount: 1300,
      hasEngaged: false, // Add a flag for engagement status
    },
  ]);

  const handleFlashIconPress = (profileId) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id === profileId && !profile.hasEngaged // Check if engagement has not happened yet
          ? { ...profile, engagementCount: profile.engagementCount + 1, hasEngaged: true } // Increment and set engaged
          : profile
      )
    );
  };

  return (
    <Background>
      {/* Header section */}
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.navigate('HireHome')}
      >
        <Icon name="arrow-back-circle-outline" size={34} color="#fff" />
      </Pressable>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Cart Cart
          <Icon name="flash" size={20} color="#FFC107" />
        </Text>
      </View>

      {/* Profile Cards */}
      <ScrollView
        contentContainerStyle={styles.profilesContainer}
        showsVerticalScrollIndicator={false}>
        {profiles.map((profile) => (
          <View key={profile.id} style={styles.profileCard}>
            <Pressable
              onPress={() =>
                profile.id === 1
                  ? navigation.navigate('H1')
                  : navigation.navigate('H2')
              }>
              <View style={styles.profileHeader}>
                <Text style={styles.profileName}>{profile.name}</Text>
                <Text style={styles.profileLabel}>{profile.label}</Text>
              </View>
            </Pressable>

            {/* Flash icon to increment engagement count */}
            <View style={styles.profileFooter}>
              <Pressable
                onPress={() => handleFlashIconPress(profile.id)}
                style={styles.engagementSection}
                disabled={profile.hasEngaged} // Disable the button after one touch
              >
                <Icon
                  name={profile.hasEngaged ? "flash" : "flash-outline"} // Change icon after engagement
                  size={24}
                  color="#FFC107"
                />
                <Text style={styles.engagementCount}>
                  {profile.engagementCount}
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

      <NavBarHire />
    </Background>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#002B5B',
    position: 'relative',
    width: '100%',
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFC107',
  },
  profilesContainer: {
    padding: 15,
    paddingTop: 60,
    width: '100%',
  },
  profileCard: {
    backgroundColor: '#2D3E50',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row', // Make the profile card content horizontal
    justifyContent: 'space-between', // Distribute content evenly
    alignItems: 'center',
    width: '100%',
  },
  profileHeader: {
    flexDirection: 'column',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileLabel: {
    fontSize: 14,
    color: '#fff',
  },
  profileFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  engagementSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  engagementCount: {
    marginLeft: 8,
    fontSize: 14,
    color: '#FFC107',
  },
});

export default StrikeCart;
