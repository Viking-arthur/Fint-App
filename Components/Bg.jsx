import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const Background = ({ children }) => {
  return (
    <ImageBackground
      source={require('../assets/bg.png')}
      style={styles.backgroundImage}>
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    //backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: darken the background
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Background;
