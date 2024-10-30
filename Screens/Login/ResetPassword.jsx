import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Background from '../../Components/Bg';
import Icon from 'react-native-vector-icons/Ionicons';

const ResetPassword = ({ route, navigation }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false); // State to toggle both password fields
  const [loading, setLoading] = useState(false);

  const handleResetPassword = () => {
    const { resetToken } = route.params || {};

    if (!resetToken) {
      alert("Invalid or missing reset token");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    axiosInstance
      .post(`/auth/reset/${resetToken}`, {
        newPassword,
        confirmPassword,
      })
      .then((response) => {
        console.log(response.data);
        alert("Password reset successful");
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error(error.message);
        alert("Password reset failed");
      });
  };

  return (
    <Background>
      {/* Back button to go to the previous screen */}
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back-circle-outline" size={34} color="#fff" />
      </Pressable>

      {/* Scrollable container to handle smaller screens */}
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Title text */}
          <Text style={styles.title}>Reset Your Password</Text>

          {/* New password input field */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPasswords}
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </View>

          {/* Confirm password input field */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPasswords}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          {/* Show Passwords checkbox */}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              onPress={() => setShowPasswords(!showPasswords)}
              style={styles.checkbox}
            >
              {showPasswords ? (
                <Icon name="checkbox-outline" size={24} color="#fff" />
              ) : (
                <Icon name="square-outline" size={24} color="#fff" />
              )}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Show Passwords</Text>
          </View>

          {/* Reset Password button */}
          <TouchableOpacity
            style={[styles.button, loading && { backgroundColor: "gray" }]}
            onPress={handleResetPassword}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Reset Password</Text>
            )}
          </TouchableOpacity> 
        </View>
      </ScrollView>
    </Background>
  );
};

// Styles for the Reset Password screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  scrollContainer: {
    width: 400,
    marginTop: 150,
    paddingHorizontal: 0,
    paddingBottom: 150, // Ensure enough space for bottom content
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 20,
    paddingTop: 10,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    color: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0a66e1',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ResetPassword;
