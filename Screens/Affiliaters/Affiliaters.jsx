import React from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import Icon from 'react-native-vector-icons/Ionicons';  // Import Ionicons for icons
import Background from '../../Components/Bg';  // Ensure this is properly imported

const Affiliates = ({ navigation }) => {
  const storeData = [
    {
      name: "Amazon Store",
      profit: "Upto 8% Profit",
      image: require("../../assets/amazon.png"),
    },
    {
      name: "Apple Store",
      profit: "Upto 2% Profit",
      image: require("../../assets/apple.png"),
    },
    {
      name: "Nike Store",
      profit: "Flat 8% Discount",
      image: require("../../assets/nike.png"),
    },
    {
      name: "Flipkart Store",
      profit: "Upto 8% Profit",
      image: require("../../assets/flipkart.png"),
    },
    {
      name: "Udemy",
      profit: "Upto 8% Off",
      image: require("../../assets/udemy.png"),
    },
  ];

  return (
    <Background>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-circle-outline" size={34} color="#fff" />
          </Pressable>
          <Text style={styles.title}>Affiliates</Text>
        </View>
        {storeData.map((store, index) => (
          <Pressable key={index} style={styles.storeItem}>
            <Image source={store.image} style={styles.storeImage} />
            <View style={styles.storeText}>
              <Text style={styles.storeName}>{store.name}</Text>
              <Text style={styles.storeProfit}>{store.profit}</Text>
            </View>
            <Icon name="chevron-forward-outline" size={24} color="#000" style={styles.chevronIcon} />
          </Pressable>
        ))}
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#6200ea",  // Dark background for contrast
    paddingVertical: 20,
    paddingTop: 70,
    borderRadius: 20,
    paddingHorizontal: 15,
    alignItems: "center",  // Center items vertically
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 15,
    zIndex: 20,
    paddingVertical: 10,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  storeItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  storeImage: {
    width: 40,  // Fit image inside the button
    height: 40,
    marginRight: 10,  // Spacing between image and text
  },
  storeText: {
    flex: 1,
    justifyContent: "center",  // Align text vertically centered
  },
  storeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  storeProfit: {
    fontSize: 14,
    color: "#888",
    marginTop: 3,  // Slight margin for spacing between lines
  },
  chevronIcon: {
    marginLeft: 10,  // Spacing between text and icon
  },
});

export default Affiliates;
