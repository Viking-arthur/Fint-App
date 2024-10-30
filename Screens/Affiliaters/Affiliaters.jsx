import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView, ActivityIndicator, Share, TouchableOpacity} from "react-native";
import { Image } from "expo-image";
import Icon from 'react-native-vector-icons/Ionicons';  // Import Ionicons for icons
import Background from '../../Components/Bg';  // Ensure this is properly imported
import axiosInstance from "../../axiosInstance";

const Affiliates = ({ navigation }) => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axiosInstance.get("/auth/Affiliate");
        setLinks(response.data);
      } catch (error) {
        console.error("Error fetching affiliate links:", error);
        setError("Failed to load affiliate links.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchLinks();
  }, []);

  
  const handleShare = async (link) => {
    try {
      await Share.share({
        message: `Check out this affiliate: ${link}`,
      });
    } catch (error) {
      console.error("Error sharing the link:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <Background>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back-circle-outline" size={34} color="#fff" />
          </Pressable>
          <Text style={styles.title}>Affiliates</Text>
        </View>
        {links.map((store, index) => (
          <TouchableOpacity
            key={index}
            style={styles.storeItem}
            onPress={() => handleShare(store.link)}
          >
            <Image source={{ uri: store.image }} style={styles.storeImage} />
            <View style={styles.storeText}>
              <Text style={styles.storeName}>{store.description}</Text>
            </View>
            <Icon
              name="chevron-forward-outline"
              size={24}
              color="#000"
              style={styles.chevronIcon}
            />
          </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 20,
    color: "#fff",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 20,
    color: "red",
  },
});

export default Affiliates;
