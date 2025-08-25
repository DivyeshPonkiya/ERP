import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NAVIGATION} from '../constants/navigation';
import CustomDrawerContent from './CustomDrawerContent';
import Dashboard from '../screens/drawer/Dashboard';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  EditProfile,
  PrivacyPolicy,
  Profile,
  TermsOfUse,
} from '../screens';


import LeavesScreen from '../screens/employee/leaves/LeavesScreen';
import AddLeaves from '../screens/employee/leaves/AddLeaves';
import LeavesDetail from '../screens/employee/leaves/LeavesDetail';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const Stack = createNativeStackNavigator();

 







  const LeavesNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={NAVIGATION.LeavesScreen}>
        <Stack.Screen name={NAVIGATION.LeavesScreen} component={LeavesScreen} />
        <Stack.Screen name={NAVIGATION.AddLeaves} component={AddLeaves} />
        <Stack.Screen name={NAVIGATION.LeavesDetail} component={LeavesDetail} />
      </Stack.Navigator>
    );
  };


  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {width: '80%'},
      }}
      initialRouteName={NAVIGATION.Dashboard}
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name={NAVIGATION.Dashboard} component={Dashboard} />
      <Drawer.Screen name={NAVIGATION.Profile} component={Profile} />
      <Drawer.Screen name={NAVIGATION.EditProfile} component={EditProfile} />

      <Drawer.Screen name={NAVIGATION.LeavesScreen} component={LeavesNavigator} />


      <Drawer.Screen
        name={NAVIGATION.PrivacyPolicy}
      component={PrivacyPolicy}
      />
      <Drawer.Screen name={NAVIGATION.TermsOfUse} component={TermsOfUse} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
