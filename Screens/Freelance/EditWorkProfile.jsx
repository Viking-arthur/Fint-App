import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import Background from '../../Components/Bg'; // Assuming you have a background component
import NavBarWork from '../../Components/NavBarWork';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../axiosInstance';

const { width, height } = Dimensions.get('window');

const EditWorkProfile = () => {
  const navigation = useNavigation();
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [image, setImage] = useState(null);

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

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

  // Handle form submission
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('projectName', projectName);
    formData.append('description', description);
    formData.append('skills', skills.join(',')); // Convert skills array to a comma-separated string
  
    // If an image is selected, append it to the formData
    if (image) {
      formData.append('image', {
        uri: image,
        type: 'image/jpeg', // Adjust image type as needed
        name: 'project-image.jpg',
      });
    }
  
    try {
      const response = await axiosInstance.post('/project/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Access response data directly
      const result = response.data;
      console.log('Project uploaded successfully:', result);
      console.log('result');
      
      if (response.status === 200) {
        navigation.navigate('WorkHomePage'); // Navigate back after successful upload
      } else {
        console.error('Error uploading project:', result);
      }
    } catch (error) {
      console.error('Error uploading project:', error);
    }
  };
  
  return (
    <Background>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.navigate('WorkHomePage')}
      >
        <Icon name="arrow-back-circle-outline" size={34} color="#fff" />
      </Pressable>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>Share your projects...</Text>

        <Text style={styles.label}>Project name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter project name"
          placeholderTextColor="#CCCCCC"
          value={projectName}
          onChangeText={setProjectName}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Enter project description"
          placeholderTextColor="#CCCCCC"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        {/* Image Upload Section */}
        <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.uploadedImage} />
          ) : (
            <Icon name="add-outline" size={40} color="#000" />
          )}
        </TouchableOpacity>
        <Text style={styles.uploadText}>Upload image</Text>

        <Text style={styles.label}>Skills</Text>
        <FlatList
          data={skills}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          renderItem={({ item, index }) => (
            <View style={styles.skillTile}>
              <Text style={styles.skillText}>{item}</Text>
              <TouchableOpacity onPress={() => removeSkill(index)}>
                <Icon name="close-circle" size={20} color="#FA9746" />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.noSkillsText}>No skills added yet</Text>
          )}
        />

        <View style={styles.addSkillContainer}>
          <TextInput
            style={styles.addSkillInput}
            placeholder="Add skill"
            placeholderTextColor="#CCCCCC"
            value={newSkill}
            onChangeText={setNewSkill}
          />
          <TouchableOpacity style={styles.addSkillButton} onPress={addSkill}>
            <Text style={styles.addSkillButtonText}>+ Add skills</Text>
          </TouchableOpacity>
        </View>

        {/* Submit button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>

      <NavBarWork />
    </Background>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: width * 0.05,
    paddingBottom: height * 0.09,
    paddingTop: height * 0.1,
    width: 400,
  },
  backButton: {
    position: 'absolute',
    top: height * 0.06,
    left: width * 0.05,
    zIndex: 20,
    paddingTop: 10,
  },
  screenTitle: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  label: {
    color: '#fff',
    fontSize: width * 0.045,
    marginBottom: height * 0.01,
  },
  input: {
    backgroundColor: '#001F54',
    color: '#fff',
    padding: width * 0.03,
    borderRadius: 10,
    marginBottom: height * 0.03,
    borderWidth: 1,
    borderColor: '#FA9746',
    fontSize: width * 0.04,
  },
  descriptionInput: {
    height: height * 0.15,
  },
  uploadBox: {
    width: '100%',
    height: height * 0.2,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  uploadedImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: 10,
  },
  uploadText: {
    color: 'white',
    textAlign: 'center',
    marginBottom: height * 0.03,
  },
  skillTile: {
    backgroundColor: '#002D6F',
    padding: width * 0.03,
    marginHorizontal: width * 0.01,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillText: {
    color: '#fff',
    marginRight: width * 0.02,
  },
  noSkillsText: {
    color: '#fff',
    fontStyle: 'italic',
  },
  addSkillContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addSkillInput: {
    backgroundColor: '#001F54',
    color: '#fff',
    padding: width * 0.03,
    borderRadius: 10,
    flex: 1,
    marginRight: width * 0.02,
    borderWidth: 1,
    borderColor: '#FA9746',
  },
  addSkillButton: {
    backgroundColor: '#FA9746',
    padding: width * 0.03,
    borderRadius: 10,
  },
  addSkillButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  submitButton: {
    backgroundColor: '#FA9746',
    padding: width * 0.04,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.05,
  },
});

export default EditWorkProfile;
