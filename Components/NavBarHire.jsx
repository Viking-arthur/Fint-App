import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  Animated,
  Easing,
  Keyboard, // Import Keyboard API
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const NavBarHire = () => {
  const navigation = useNavigation();
  const navigationState = useNavigationState((state) => state);

  const [selectedNavButton, setSelectedNavButton] = useState(1); // Set default button to Home
  const [isKeyboardVisible, setKeyboardVisible] = useState(false); // Track keyboard visibility
  const navBarAnimation = useRef(new Animated.Value(1 * (width / 3))).current;

  // Define animated values for each button's scale and translateY
  const buttonAnimations = [
    useRef(new Animated.Value(1)).current, // Button 1 scale (Profile)
    useRef(new Animated.Value(1)).current, // Button 2 scale (Home)
    useRef(new Animated.Value(1)).current, // Button 3 scale (Add)
  ];

  const translateYAnimations = [
    useRef(new Animated.Value(0)).current, // Button 1 translateY (Profile)
    useRef(new Animated.Value(0)).current, // Button 2 translateY (Home)
    useRef(new Animated.Value(0)).current, // Button 3 translateY (Add)
  ];

  useEffect(() => {
    // Add listeners for keyboard events
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    // Cleanup listeners on component unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    // Determine which button should be selected based on current route
    const currentRoute = navigationState.routes[navigationState.index].name;

    switch (currentRoute) {
      case 'HireProfile':
        setSelectedNavButton(0);
        break;
      case 'HireHomePage':
        setSelectedNavButton(1);
        break;
      case 'StrikeCart':
        setSelectedNavButton(2);
        break;
      default:
        break;
    }
  }, [navigationState]);

  useEffect(() => {
    // Reset all button animations
    buttonAnimations.forEach((anim) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start();
    });

    translateYAnimations.forEach((anim) => {
      Animated.timing(anim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start();
    });

    // Animate the nav bar indicator and selected button
    Animated.parallel([
      Animated.timing(navBarAnimation, {
        toValue: selectedNavButton * (width / 3),
        duration: 300,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start(),
      Animated.parallel([
        Animated.timing(buttonAnimations[selectedNavButton], {
          toValue: 1.2, // Scale up selected button
          duration: 300,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }).start(),
        Animated.timing(translateYAnimations[selectedNavButton], {
          toValue: -10, // Move selected button upwards
          duration: 300,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }).start(),
      ]),
    ]);
  }, [selectedNavButton]);

  const handleNavButtonPress = (index, targetRoute) => {
    if (index === selectedNavButton) return; // Avoid unnecessary navigation and animation

    // Navigate to the target route
    navigation.navigate(targetRoute);

    // Update selected button state
    setSelectedNavButton(index);
  };

  // Conditionally render the NavBar based on keyboard visibility
  if (isKeyboardVisible) {
    return null; // Hide NavBar when keyboard is visible
  }

  return (
    <View style={styles.navBar}>
      <Animated.View
        style={[
          styles.navBarIndicator,
          { transform: [{ translateX: navBarAnimation }] },
        ]}
      />
      <Pressable
        style={styles.navButtonContainer}
        onPress={() => handleNavButtonPress(0, 'HireProfile')}
      >
        <Animated.View
          style={[
            styles.navButton,
            { transform: [{ scale: buttonAnimations[0] }, { translateY: translateYAnimations[0] }] },
          ]}
        >
          <Icon
            name="person"
            size={30}
            color={selectedNavButton === 0 ? '#6495ed' : '#333'}
          />
        </Animated.View>
      </Pressable>
      <Pressable
        style={styles.navButtonContainer}
        onPress={() => handleNavButtonPress(1, 'HireHomePage')}
      >
        <Animated.View
          style={[
            styles.navButton,
            { transform: [{ scale: buttonAnimations[1] }, { translateY: translateYAnimations[1] }] },
          ]}
        >
          <Icon
            name="home"
            size={30}
            color={selectedNavButton === 1 ? '#6495ed' : '#333'}
          />
        </Animated.View>
      </Pressable>
      <Pressable
        style={styles.navButtonContainer}
        onPress={() => handleNavButtonPress(2, 'StrikeCart')}
      >
        <Animated.View
          style={[
            styles.navButton,
            { transform: [{ scale: buttonAnimations[2] }, { translateY: translateYAnimations[2] }] },
          ]}
        >
          <Icon
            name="flash"
            size={30}
            color={selectedNavButton === 2 ? '#6495ed' : '#333'}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 4,
  },
  navButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButton: {
    alignItems: 'center',
  },
  navBarIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 5,
    width: width / 3,
    backgroundColor: '#6495ed',
  },
});

export default NavBarHire;
