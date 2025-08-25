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

import WorkScreen from '../screens/employee/leaves/LeavesScreen';
import WorkDetail from '../screens/employee/leaves/LeavesDetail';
import AddWork from '../screens/employee/leaves/AddLeaves';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const Stack = createNativeStackNavigator();

 







  const WorksNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={NAVIGATION.WorksScreen}>
        <Stack.Screen name={NAVIGATION.WorksScreen} component={WorkScreen} />
        <Stack.Screen name={NAVIGATION.AddWorks} component={AddWork} />
        <Stack.Screen name={NAVIGATION.WorksDetail} component={WorkDetail} />
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
      <Drawer.Screen
        name={NAVIGATION.PrivacyPolicy}
      component={PrivacyPolicy}
      />
      <Drawer.Screen name={NAVIGATION.TermsOfUse} component={TermsOfUse} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
