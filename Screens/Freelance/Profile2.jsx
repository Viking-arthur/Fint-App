import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ScrollView, Dimensions } from 'react-native';
import * as Clipboard from 'expo-clipboard'; // Clipboard API from Expo
import Icon from 'react-native-vector-icons/Ionicons';
import Background from '../../Components/Bg';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window'); // Get screen width

const Profile2 = () => {
  const [skills,] = useState(['React Native', 'JavaScript', 'Python']); // Sample skills
  const [projects] = useState([
    { name: 'Project A', description: 'Description for Project A' },
    { name: 'Project B', description: 'Description for Project B' },
    { name: 'Project C', description: 'Description for Project C' }
  ]); // Sample projects with descriptions

  const navigation = useNavigation();

  const handleCopyUPI = () => {
    const upiId = 'xyz@oksbi';
    Clipboard.setStringAsync(upiId); // Copy UPI ID to clipboard
    Alert.alert('Copied', 'UPI ID copied to clipboard');
  };

  return (
    <Background>
      {/* Buttons and Title */}
      <View style={styles.headerContainer}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-circle-outline" size={34} color="#fff" />
        </Pressable>
        <Pressable style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          <Icon name="reorder-three-outline" size={34} color="#fff" />
        </Pressable>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Icon name="person-circle-outline" size={100} color="#CCCCCC" />
        <Text style={styles.profileName}>Guru</Text>

        {/* UPI ID Section */}
        <View style={styles.upiBox}>
          <Text style={styles.upiText}>Team Lead</Text>
        </View>

        <View style={styles.pincodeContainer}>
          <Icon name="flash-outline" size={24} color="#FFC107"/>
          <Text style={styles.count}>8.2k</Text>
        </View>
      </View>

      {/* Display Sections */}
      <ScrollView contentContainerStyle={[styles.menuSection, { width }]}>
        <View style={styles.displaySection}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.tileContainer}>
            {skills.map((skill, index) => (
              <View key={index} style={styles.tile}>
                <Text style={styles.tileText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.displaySection}>
          <Text style={styles.sectionTitle}>Projects</Text>
          <View style={styles.tileContainer}>
            {projects.map((project, index) => (
              <View
                key={index}
                style={[
                  styles.tile,
                  project.description ? styles.tileWithDescription : styles.tileWithoutDescription
                ]}
              >
                <Text style={styles.tileText}>{project.name}</Text>
                {project.description ? (
                  <Text style={styles.tileDescription}>{project.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      
    </Background>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  backButton: {
    paddingTop: 10,
    marginRight: 10,
  },
  menuButton: {
    paddingTop: 10,
    marginLeft: 'auto', // Pushes button to the end of the row
  },
  profileSection: {
    paddingTop: 50,
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
    paddingHorizontal: 22,
    backgroundColor: '#333',
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  upiText: {
    fontSize: 16,
    color: '#CCCCCC',
    marginRight: 10,
  },
  pincodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    backgroundColor: '#333',
    borderRadius: 10,
    paddingVertical: 10,
  },
  count: {
    fontSize: 14,
    color: 'white',
    marginRight: 5,
  },
  menuSection: {
    height: '100%',
    backgroundColor: '#000',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    marginBottom: 50, // Ensure there's space for the logout button
  },
  displaySection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  tileContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow wrapping of tiles to next line
    justifyContent: 'flex-start', // Align tiles to the start
  },
  tile: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tileDescription: {
    color: '#CCCCCC',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  tileWithDescription: {
    width: (width - 60) / 2, // Increase width for tiles with descriptions
  },
  tileWithoutDescription: {
    width: (width - 60) / 3, // Default width for tiles without descriptions
  },
});

export default Profile2;
