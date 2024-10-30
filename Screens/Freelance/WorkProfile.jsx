import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ScrollView, Dimensions, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Background from '../../Components/Bg';
import NavBarWork from '../../Components/NavBarWork';
import { useNavigation } from "@react-navigation/native";
import axiosInstance from "../../axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const WorkProfile = () => {
  const navigation = useNavigation();
  const router = useRoute()
  const { userId } = router.params

  const [userData, setUserData] = useState({});
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        console.log('Stored Token:', storedToken); // Log token to ensure it's fetched
        if (storedToken) {
          setToken(storedToken);
          const response = await axiosInstance.get(`/freelance/profile/${userId}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          const { fullName, email, skills, projects, strikes=0 } = response.data.data;
          setUserData({ fullName, email, strikes});
          setSkills(skills || []);
          setProjects(projects || []);
        } else {
          Alert.alert('Error', 'User token not found');
        }
      } catch (error) {
        console.log('Fetch Error:', error); // Log fetch error if any
        Alert.alert('Error', 'Failed to fetch profile data');
      }
    };
  
    fetchProfileData();
  }, [userId]);
  
  const handleAddSkill = async () => {
    if (newSkill.trim() && token) {
      try {
        console.log('Adding skill:', newSkill); // Log skill to see if the input is correct
        const response = await axiosInstance.post('/profile/skills', { skill: newSkill.trim() }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('API response:', response); // Log API response
        setSkills([...skills, newSkill.trim()]);
        setNewSkill('');
      } catch (error) {
        console.log('Error:', error.response || error.message); // Log any error
        Alert.alert('Error', 'Failed to add skill');
      }
    } else {
      Alert.alert('Error', 'Skill name cannot be empty');
    }
  };
  

  const handleRemoveSkill = async (skillToRemove) => {
    if (token) {
      try {
        await axiosInstance.delete(`/profile/skills/${skillToRemove}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSkills(skills.filter((skill) => skill !== skillToRemove));
      } catch (error) {
        Alert.alert('Error', 'Failed to remove skill');
      }
    }
  };

  const handleAddProject = async () => {
    if (newProjectName.trim() && token) {
      try {
        const newProject = { name: newProjectName.trim(), description: newProjectDescription.trim() };
        await axiosInstance.post('/profile/projects', newProject, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects([...projects, newProject]);
        setNewProjectName('');
        setNewProjectDescription('');
      } catch (error) {
        Alert.alert('Error', 'Failed to add project');
      }
    }
  };

  const handleRemoveProject = async (projectToRemove) => {
    if (token) {
      try {
        await axiosInstance.delete(`/profile/projects/${projectToRemove.name}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(projects.filter((project) => project.name !== projectToRemove.name));
      } catch (error) {
        Alert.alert('Error', 'Failed to remove project');
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Background>
      <View style={styles.headerContainer}>
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('WorkHomePage')}>
          <Icon name="arrow-back-circle-outline" size={34} color="#fff" />
        </Pressable>
        <Pressable style={styles.menuButton} onPress={() => navigation.navigate('Otherpage')}>
          <Icon name="reorder-three-outline" size={34} color="#fff" />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Icon name="person-circle-outline" size={100} color="#CCCCCC" />
          <Text style={styles.profileName}>{userData?.fullName}</Text>
          <Text style={styles.emailText}>{userData?.email}</Text>
          <View style={styles.upiBox}>
            <Text style={styles.upiText}>FreeLancer</Text>
          </View>
          <View style={styles.pincodeContainer}>
            <Icon name="flash-outline" size={24} color="#FFC107" />
            <Text style={styles.count}>{userData?.strikes}</Text>
          </View>
        </View>

        {/* Skills Section */}
        <View style={styles.displaySection}>
          <View style={styles.headerWithEdit}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Pressable onPress={handleEdit}>
              <Icon name={isEditing ? "checkmark-circle-outline" : "pencil"} size={24} color="#fff" />
            </Pressable>
          </View>
          <View style={styles.tileContainer}>
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <View key={index} style={styles.tile}>
                  <Text style={styles.tileText}>{skill}</Text>
                  {isEditing && (
                    <Pressable onPress={() => handleRemoveSkill(skill)}>
                      <Icon name="remove-circle-outline" size={24} color="#D9534F" />
                    </Pressable>
                  )}
                </View>
              ))
            ) : (
              <Text style={styles.tileText}>No skills added yet.</Text>
            )}
          </View>
          {isEditing && (
            <View style={styles.addSkillContainer}>
             <TextInput
  style={styles.input}
  placeholder="Add new skill"
  value={newSkill}
  onChangeText={setNewSkill} // Make sure this is updating correctly
/>

              <Pressable style={styles.addButton} onPress={handleAddSkill}>
                <Text style={styles.addButtonText}>Add</Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Projects Section */}
        <View style={styles.displaySection}>
          <View style={styles.headerWithEdit}>
            <Text style={styles.sectionTitle}>Projects</Text>
            <Pressable onPress={handleEdit}>
              <Icon name={isEditing ? "checkmark-circle-outline" : "pencil"} size={24} color="#fff" />
            </Pressable>
          </View>
          <View style={styles.tileContainer}>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <View key={index} style={styles.tile}>
                  <Text style={styles.tileText}>{project.name}</Text>
                  {isEditing && (
                    <Pressable onPress={() => handleRemoveProject(project)}>
                      <Icon name="remove-circle-outline" size={24} color="#D9534F" />
                    </Pressable>
                  )}
                </View>
              ))
            ) : (
              <Text style={styles.tileText}>No projects added yet.</Text>
            )}
          </View>
          {isEditing && (
            <View style={styles.addProjectContainer}>
              <TextInput
                style={styles.input}
                placeholder="Project Name"
                value={newProjectName}
                onChangeText={setNewProjectName}
              />
              <TextInput
                style={styles.input}
                placeholder="Project Description"
                value={newProjectDescription}
                onChangeText={setNewProjectDescription}
              />
              <Pressable style={styles.addButton} onPress={handleAddProject}>
                <Text style={styles.addButtonText}>Add Project</Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
      <NavBarWork />
    </Background>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 3,
    paddingVertical: 40,
    paddingHorizontal: 15,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  backButton: {
    paddingTop: 10,
    paddingRight: 40,
  },
  menuButton: {
    marginLeft: 'auto',
  },
  profileSection: {
    width: width * 0.9,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },
  profileName: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
  emailText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },
  upiBox: {
    backgroundColor: '#1F2937',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  upiText: {
    color: '#fff',
  },
  pincodeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  count: {
    fontSize: 16,
    color: '#FFC107',
    marginLeft: 5,
  },
  displaySection: {
    marginBottom: 30,
  },
  headerWithEdit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  tileContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  tile: {
    backgroundColor: '#1F2937',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tileText: {
    fontSize: 14,
    color: '#fff',
  },
  addSkillContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  addProjectContainer: {
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
    color: '#000',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
  },
});

export default WorkProfile;
