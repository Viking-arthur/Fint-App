import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  Animated,
  Easing,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useNavigationState } from '@react-navigation/native';
const { width } = Dimensions.get('window');
import { useRoute } from '@react-navigation/native';

const NavBarWork = () => {
  const route = useRoute();
  const { userId } = route.params || {};  // Get the userId from route parameters
  const navigation = useNavigation();
  const navigationState = useNavigationState((state) => state);

  const [selectedNavButton, setSelectedNavButton] = useState(1); // Default button index
  const [isKeyboardVisible, setKeyboardVisible] = useState(false); // Track keyboard visibility

  const navBarAnimation = useRef(new Animated.Value(1 * (width / 3))).current;

  const buttonAnimations = [
    useRef(new Animated.Value(1)).current, // Button 1 scale (Profile)
    useRef(new Animated.Value(1)).current, // Button 2 scale (Home)
    useRef(new Animated.Value(1)).current, // Button 3 scale (Edit)
  ];

  const translateYAnimations = [
    useRef(new Animated.Value(0)).current, // Button 1 translateY (Profile)
    useRef(new Animated.Value(0)).current, // Button 2 translateY (Home)
    useRef(new Animated.Value(0)).current, // Button 3 translateY (Edit)
  ];

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const currentRoute = navigationState.routes[navigationState.index].name;
    switch (currentRoute) {
      case 'WorkProfile':
        setSelectedNavButton(0);
        break;
      case 'EditWorkProfile':
        setSelectedNavButton(2);
        break;
      default:
        break;
    }
  }, [navigationState]);

  useEffect(() => {
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
    if (index === selectedNavButton) return;

    // Pass userId as a parameter when navigating
    navigation.navigate(targetRoute, { userId });
    setSelectedNavButton(index);
  };

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
        onPress={() => handleNavButtonPress(0, 'WorkProfile')}
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
        onPress={() => handleNavButtonPress(2, 'EditWorkProfile')}
      >
        <Animated.View
          style={[
            styles.navButton,
            { transform: [{ scale: buttonAnimations[2] }, { translateY: translateYAnimations[2] }] },
          ]}
        >
          <Icon
            name="document-outline"
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

export default NavBarWork;
