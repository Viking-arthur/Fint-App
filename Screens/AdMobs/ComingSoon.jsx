import React from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';
import Background from '../../Components/Bg';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const ComingSoon = () => {
   const navigation = useNavigation();


  return (
    <Background>
     <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()} // Use goBack instead of navigate
        >
          <Icon name="arrow-back-circle-outline" size={34} color="#fff" />
        </Pressable>
    <View style={styles.container}>
      {/* Outer Box */}
      <View style={styles.outerBox}>
        {/* Inner Box */}
        <View style={styles.innerBox}>
          <Text style={styles.comingSoonText}>Coming Soon</Text>
        </View>
      </View>
    </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    backButton: {
    position: 'absolute',
    top: 0,
    left: 20,
    zIndex: 20,
    paddingTop: 35,
  },
  outerBox: {
    width: 350,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E201E', // Light gray outer box color
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fff',
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5, // Shadow for Android
  },
  innerBox: {
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // White inner box color
    borderRadius: 10,
  },
  comingSoonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333', // Dark gray text color
  },
});

export default ComingSoon;
