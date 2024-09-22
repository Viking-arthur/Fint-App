import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ScrollView, Dimensions, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Background from '../../Components/Bg';
import { useNavigation } from '@react-navigation/native';
import NavBarWork from '../../Components/NavBarWork';

const { width } = Dimensions.get('window'); // Get screen width

const WorkProfile = () => {
  const navigation = useNavigation();
  const [skills, setSkills] = useState(['React Native', 'JavaScript', 'TypeScript', 'Node.js', 'Python']); // Sample skills
  const [projects, setProjects] = useState([
    { name: 'Project A', description: 'Description for Project A' },
    { name: 'Project B', description: 'Description for Project B' },
    { name: 'Project C', description: 'Description for Project C' }
  ]); // Sample projects with descriptions
  const [isEditing, setIsEditing] = useState(false); // Track if in editing mode
  const [newSkill, setNewSkill] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');


  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleAddProject = () => {
    if (newProjectName.trim()) {
      setProjects([...projects, { name: newProjectName.trim(), description: newProjectDescription.trim() }]);
      setNewProjectName('');
      setNewProjectDescription('');
    }
  };

  const handleRemoveProject = (projectToRemove) => {
    setProjects(projects.filter(project => project.name !== projectToRemove.name));
  };

  return (
    <Background>
    {/* Buttons and Title */}
        <View style={styles.headerContainer}>
          <Pressable style={styles.backButton} onPress={() => navigation.navigate('WorkHomePage')}>
            <Icon name="arrow-back-circle-outline" size={34} color="#fff" />
          </Pressable>
          <Pressable style={styles.menuButton} onPress={() => navigation.navigate('Otherpage')}>
            <Icon name="reorder-three-outline" size={34} color="#fff" />
          </Pressable>
        </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Icon name="person-circle-outline" size={100} color="#CCCCCC" />
          <Text style={styles.profileName}>Badri R</Text>

          {/* UPI ID Section */}
          <View style={styles.upiBox}>
            <Text style={styles.upiText}>Entrepreneur</Text>
          </View>

          <View style={styles.pincodeContainer}>
            <Icon name="flash-outline" size={24} color="#FFC107"/>
            <Text style={styles.count}>13.2k</Text>
          </View>
        </View>

        {/* Display Sections */}
        <View style={styles.displaySection}>
          <View style={styles.headerWithEdit}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Pressable onPress={handleEdit}>
              <Icon name={isEditing ? "checkmark-circle-outline" : "pencil"} size={24} color="#fff" />
            </Pressable>
          </View>
          <View style={styles.tileContainer}>
            {skills.map((skill, index) => (
              <View key={index} style={styles.tile}>
                <Text style={styles.tileText}>{skill}</Text>
                {isEditing && (
                  <Pressable onPress={() => handleRemoveSkill(skill)}>
                    <Icon name="remove-circle-outline" size={24} color="#D9534F" />
                  </Pressable>
                )}
              </View>
            ))}
          </View>
          {isEditing && (
            <View style={styles.addSkillContainer}>
              <TextInput
                style={styles.input}
                placeholder="Add new skill"
                value={newSkill}
                onChangeText={setNewSkill}
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
            {projects.map((project, index) => (
              <View
                key={index}
                style={[styles.tile, styles.largeTile]} // Increased size of the tile
              >
                <View>
                  <Text style={styles.tileText}>{project.name}</Text>
                  {project.description ? (
                    <Text style={styles.tileDescription}>{project.description}</Text>
                  ) : null}
                </View>
                {isEditing && (
                  <Pressable onPress={() => handleRemoveProject(project)}>
                    <Icon name="remove-circle-outline" size={24} color="#D9534F" />
                  </Pressable>
                )}
              </View>
            ))}
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
                style={[styles.input, { marginTop: 10 }]}
                placeholder="Project Description"
                value={newProjectDescription}
                onChangeText={setNewProjectDescription}
              />
              <Pressable style={styles.addButton} onPress={handleAddProject}>
                <Text style={styles.addButtonText}>Add</Text>
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
    flexGrow: 3, // Allows content to fill the scrollable area
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
    borderRadius: 10,
  },
  count: {
    fontSize: 14,
    color: 'white',
    marginRight: 5,
  },
  displaySection: {
    marginBottom: 20,
  },
  headerWithEdit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: 'white',
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: (width - 60) / 3, // Default tile width
  },
  tileText: {
    fontSize: 16,
    color: 'white',
  },
  largeTile: {
    width: (width - 40), // Larger tile width
    padding: 20, // Increase padding for a larger feel
  },
  tileDescription: {
    fontSize: 12,
    color: '#CCCCCC',
    marginTop: 5,
  },
  addSkillContainer: {
    marginTop: 10,
  },
  input: {
    backgroundColor: '#222',
    color: 'white',
    padding: 10,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    alignSelf: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default WorkProfile;
