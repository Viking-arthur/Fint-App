import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Background from './Bg';
import { useNavigation } from '@react-navigation/native';

const BANNER_H = 300; // Define your banner height

const Home = () => {
  const navigation = useNavigation(); // Ensure navigation is enabled
  const scrollA = useRef(new Animated.Value(0)).current;

  return (
    <Background>
      <View style={styles.container}>
        {/* Header Icons */}
        <View style={styles.header}>
          {/* Profile Icon */}
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Icon name="person-circle-outline" size={30} color="#fff" />
          </TouchableOpacity>
          {/* Align Other Icons to the Right */}
          <View style={styles.rightIconsContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('OtherPage')}>
              <Icon name="notifications-outline" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconWithMargin}
              onPress={() => navigation.navigate('ComingSoon')}>
              <Image
                source={require('../assets/coupon.png')}
                style={{ width: 35, height: 35 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollA } } }],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}>
          <View style={styles.scrollViewContent}>
            <Animated.Image
              style={styles.banner(scrollA)}
              //source={require('../assets/fintdummy.jpg')}
            />
            {/* Sections in a unified black background */}
            <View style={styles.unifiedBackground}>
              {/* Money Transfer Section */}
              <View style={styles.sectionTop}>
                <Text style={styles.sectionTitle}>Money Transfer</Text>
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('PayContacts')}>
                    <Icon name="person" size={34} color="#fff" style={{ fontWeight: 'bold' }}/>
                    <Text style={styles.TransferText}>Pay Contacts</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('PayBankUPI')}>
                    <Icon name="business" size={34} color="#fff" style={{ fontWeight: 'bold' }}/>
                    <Text style={styles.TransferText}>{'Bank Transfer'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('PaySelf')}>
                    <Icon name="wallet" size={34} color="#fff" style={{ fontWeight: 'bold' }}/>
                    <Text style={styles.TransferText}>To Self</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('MoreOptions')}>
                    <Icon
                      name="ellipsis-horizontal"
                      size={34}
                      color="#fff"
                      style={{ fontWeight: 'bold' }}
                    />
                    <Text style={styles.TransferText}>More</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* UPI ID Box with Send Button */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputText}>
                  UPI ID: your-upi-id@example.com
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SendMoney')}>
                  <Icon name="chevron-forward-outline" size={24} color="#000" />
                </TouchableOpacity>
              </View>

              {/* Fint Business Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Fint Business</Text>
                <View style={styles.buttonGrid}>
                  <TouchableOpacity
                    style={styles.businessButton}
                    onPress={() => navigation.navigate('Amt')}>
                    <Text style={styles.buttonText}>Generate QR Code</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.businessButton}
                    onPress={() => navigation.navigate('AdPage')}>
                    <Text style={styles.buttonText}>Fint AD Mob</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.businessButton}
                    onPress={() => navigation.navigate('Affiliates')}>
                    <Text style={styles.buttonText}>Fint Affiliates</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.businessButton}
                    onPress={() => navigation.navigate('AccType')}>
                    <Text style={styles.buttonText}>Freelance</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Coming Soon Section */}
              <View style={styles.section}>
                <View style={styles.comingSoonContainer}>
                  <Text style={styles.comingSoonText}>COMING SOON!</Text>
                </View>
              </View>
            </View>
          </View>
        </Animated.ScrollView>

        {/* Navigation Bar with Updated Icons and Same Alignment */}
        <View style={styles.navbar}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('TransactionHistory')}>
            <Icon name="receipt-outline" size={22} color="#fff" />
            <Text style={styles.navText}>Transactions</Text>
          </TouchableOpacity>

          <View style={styles.qrContainer}>
            <Text style={styles.qrText}>Scan</Text>
          </View>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('CheckBalance')}>
            <Icon name="cash-outline" size={22} color="#fff" />
            <Text style={styles.navText}>Balance</Text>
          </TouchableOpacity>
        </View>

        {/* QR Image Positioned at the Bottom Center */}
        <View style={styles.qrBottomContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Scan')}>
            <Image
              source={require('../assets/Qr.png')}
              style={styles.qrBottomImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 10,
    paddingTop: 30,
    marginBottom: 70, // Make space for the QR image at the bottom
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 35,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute', // Keep it fixed at the top
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20, // Ensure it stays above other content
  },
  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 'auto', // Push the icons to the right
  },
  iconWithMargin: {
    marginLeft: 10,
    zIndex: 20,
  },
  unifiedBackground: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderTopRightRadius: 100,
    padding: 20,
    marginTop: -60,
    justifyContent: 'flex-start',
    width: '110%',
  },
  sectionTop: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    padding: 35,
    width: '100%',
    alignItems: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '100%',
  },
  sectionTitle: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    left: 8,
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 2,
    justifyContent: 'center',
    backgroundColor: '#0C2562',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: '23%',
    height: 95,
    marginHorizontal: 10,
  },
  TransferText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#d9d9d9',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputText: {
    color: '#000',
    fontSize: 16,
    flex: 1,
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  buttonGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  businessButton: {
    backgroundColor: '#0C2562',
    borderColor: '#000',
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: '48%',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#0B2053',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 10, // Ensure it's below the QR image
    height: 60, // Define the height of the navbar
  },
  navButton: {
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
  },
  navText: {
    color: '#fff',
    fontSize: 12,
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20, // Ensure it’s below the QR image
  },
  qrText: {
    color: '#fff',
    fontSize: 12,
    left: -7,
    marginTop: 25, // Adjust to fit with the QR image
  },
  comingSoonContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 2,
  },
  comingSoonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  banner: (scrollA) => ({
    height: BANNER_H,
    width: '100%',
    opacity: scrollA.interpolate({
      inputRange: [0, BANNER_H / 2, BANNER_H],
      outputRange: [1, 0.7, 0],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [BANNER_H / 2, 0, -BANNER_H / 3, -BANNER_H / 3],
        }),
      },
    ],
  }),
  qrBottomContainer: {
    position: 'absolute',
    bottom: 40, // Aligns the container with the bottom of the screen
    left: '50%',
    transform: [{ translateX: -45 }], // Centers the QR image horizontally
    zIndex: 30,
  },
  qrBottomImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    // Negative margin to overlap the navbar
    marginBottom: -20, // Adjust as needed
  },
});

export default Home;
