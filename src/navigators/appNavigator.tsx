import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import {navigationRef} from './RootNavigation';
import NetInfo from '@react-native-community/netinfo';

import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import ForgotPassword from '../screens/auth/ForgotPassword';
import EnterOTP from '../screens/auth/EnterOTP';
import ResetPassword from '../screens/auth/ResetPassword';

import {Colors, Measures} from '../theme/variables';
import {NAVIGATION} from '../constants/navigation';
import {isNull} from '../constants/constants';
import DrawerNavigator from './DrawerNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

const AppNavigator: React.FC = () => {
  const [login, setLogin] = useState<any>(null);
  const [network, setNetwork] = useState(null);

  const [profileData] = useSelector((state: RootState) => [
    state.authSlice.profileData,
  ]);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 10000);
    getLoginStatus();
    NetInfo.addEventListener((state: any) => {
      // setNetwork(state.isConnected);
    });
  }, []);

  const getLoginStatus = async () => {
    if (profileData) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  const Stack = createNativeStackNavigator();

  return login === null ? (
    <View style={styles.indicatorView}>
      <ActivityIndicator size={'small'} color={Colors.primary} />
    </View>
  ) : (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      {isNull(profileData) ? (
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              gestureEnabled: false,
            }}
            initialRouteName={NAVIGATION.Login}>
            <Stack.Screen name={NAVIGATION.Login} component={Login} />
            <Stack.Screen name={NAVIGATION.Register} component={Register} />
            <Stack.Screen name={NAVIGATION.EnterOTP} component={EnterOTP} />
            <Stack.Screen
              name={NAVIGATION.ResetPassword}
              component={ResetPassword}
            />
            <Stack.Screen
              name={NAVIGATION.ForgotPassword}
              component={ForgotPassword}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              gestureEnabled: false,
            }}
            initialRouteName={NAVIGATION.Drawer}>
            <Stack.Screen
              options={{gestureEnabled: false}}
              name={NAVIGATION.Drawer}
              component={DrawerNavigator}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  InternetConnectionView: {
    width: '100%',
    marginTop: Measures.StatusBarHeight,
    minHeight: Measures.fontSize * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: Measures.unit,
  },
  InternetText: {
    color: Colors.white,
    fontSize: Measures.fontSize / 1.3,
  },
  closeIcon: {
    width: Measures.fontSize,
    height: Measures.fontSize,
  },
  indicatorView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});

export default AppNavigator;
