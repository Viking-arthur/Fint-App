import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import Login from './Screens/Login/Login';
import SignUp from './Screens/Login/SignUp';
import Email from './Screens/Login/Email';
import Otp from './Screens/Login/Otp';
import Home from './Components/Home';
import Profile from './Screens/Profile';
import Amt from './Screens/Qr/Amt';
import QrCode from './Screens/Qr/QrCode.jsx';
import AdPage from './Screens/AdMobs/AdPage';
import AdBanners from './Screens/AdMobs/AdBanners';
import CouponsPackage from './Screens/AdMobs/CouponsPackage';
import BannersPackage from './Screens/AdMobs/BannerPackage';
import CouponBronze from './Screens/AdMobs/CouponBronze';
import CouponSilver from './Screens/AdMobs/CouponSilver';
import CouponGold from './Screens/AdMobs/CouponGold';
import BannerBronze from './Screens/AdMobs/BannerBronze';
import BannerSilver from './Screens/AdMobs/BannerSilver';
import BannerGold from './Screens/AdMobs/BannerGold';
import Coupons from './Screens/AdMobs/Coupons';
import Affiliates from './Screens/Affiliaters/Affiliaters';
import FreelanceLogin from './Screens/Freelance/FreelanceLogin';
import ExistAcc from './Screens/Freelance/ExistAcc';
import Username from './Screens/Freelance/Username';
import AccType from './Screens/Freelance/AccType';
import WorkHomePage from './Screens/Freelance/WorkHomePage';
import HireHomePage from './Screens/Freelance/HireHomePage';
import WorkProfile from './Screens/Freelance/WorkProfile';
import HireProfile from './Screens/Freelance/HireProfile';
import StrikeCart from './Screens/Freelance/StrikeCart';
import EditWorkProfile from './Screens/Freelance/EditWorkProfile';

import Profile1 from './Screens/Freelance/Profile1';
import Profile2 from './Screens/Freelance/Profile2';
import HiringProfile1 from './Screens/Freelance/HiringProfile1';
import HiringProfile2 from './Screens/Freelance/HiringProfile2';

import ComingSoon from './Screens/AdMobs/ComingSoon';

const Stack = createNativeStackNavigator();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Email"
          component={Email}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Otp"
          component={Otp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Amt"
          component={Amt}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QrCode"
          component={QrCode}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdPage"
          component={AdPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Coupons"
          component={Coupons}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdBanners"
          component={AdBanners}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CouponsPackage"
          component={CouponsPackage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BannersPackage"
          component={BannersPackage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CouponBronze"
          component={CouponBronze}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CouponSilver"
          component={CouponSilver}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CouponGold"
          component={CouponGold}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BannerBronze"
          component={BannerBronze}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BannerSilver"
          component={BannerSilver}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BannerGold"
          component={BannerGold}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ComingSoon"
          component={ComingSoon}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Affiliates"
          component={Affiliates}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FreelanceLogin"
          component={FreelanceLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExistAcc"
          component={ExistAcc}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Username"
          component={Username}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AccType"
          component={AccType}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WorkHomePage"
          component={WorkHomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HireHomePage"
          component={HireHomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WorkProfile"
          component={WorkProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HireProfile"
          component={HireProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StrikeCart"
          component={StrikeCart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditWorkProfile"
          component={EditWorkProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile1"
          component={Profile1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile2"
          component={Profile2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HiringProfile1"
          component={HiringProfile1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HiringProfile2"
          component={HiringProfile2}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
