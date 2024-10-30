import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Background from '../../Components/Bg';
import { useNavigation } from '@react-navigation/native';


const FontSize = {
  size_xl: 26,
  size_lg: 18,
};

const Color = {
  colorBackground: "#002244",
  colorWhite: "#fff",
  colorBlack: "#000",
};

const Border = {
  br_lg: 20, // Local definition for border radius
};

const GlassMorphismButton = ({ text, onPress }) => (
  <Pressable onPress={onPress} style={styles.glassButton}>
    <Text style={styles.buttonText}>{text}</Text>
    <Icon name="arrow-forward-circle" size={24} color={Color.colorWhite} />
  </Pressable>
);

const AccType = () => {
   const navigation = useNavigation();


  return (
    <Background>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back-circle-outline" size={34} color="#fff" />
      </Pressable>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          <Text style={styles.headerText}>Select Account Type</Text>
          <Text style={styles.subHeaderText}>Don’t worry, this can be changed</Text>

          {/* Top Image */}
          <Image 
            style={styles.imagePlaceholder} 
            source={require("../../assets/Acc1.png")} 
          />

          <GlassMorphismButton
            text="I want to work"
            onPress={() => navigation.navigate('FreelanceSignup')}
          />

          {/* Middle Image */}
          <Image 
            style={styles.imagePlaceholderMiddle} 
            source={require("../../assets/Acc2.png")} 
          />

          <GlassMorphismButton
            text="I want to hire"
            onPress={() => navigation.navigate('HireHomePage')}
          />
        </View>
      </ScrollView>
      
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 20,
    paddingTop: 35,
  },
  page: {
    width: '100%',
    paddingTop: '10%',
    paddingHorizontal: '5%', 
    alignItems: 'center',
  },
  headerText: {
    fontSize: FontSize.size_xl,
    color: '#fff',
    marginBottom: 10,
    textAlign: "center",
  },
  subHeaderText: {
    fontSize: FontSize.size_lg,
    color: '#fff',
    marginBottom: 30,
    textAlign: "center",
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  imagePlaceholderMiddle: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  glassButton: {
    width: '90%',
    height: 150,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 5,
  },
  buttonText: {
    fontSize: FontSize.size_lg,
    color: Color.colorWhite,
  },
});

export default AccType;
