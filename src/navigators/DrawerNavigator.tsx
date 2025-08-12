import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NAVIGATION} from '../constants/navigation';
import CustomDrawerContent from './CustomDrawerContent';
import Dashboard from '../screens/drawer/Dashboard';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AddCustomers,
  AddProduction,
  AddSales,
  AddStock,
  CustomersDetail,
  CustomersScreen,
  EditProduction,
  EditProfile,
  PrivacyPolicy,
  ProductionDetail,
  ProductionScreen,
  Profile,
  SaleDetail,
  SalesScreen,
  StockDetail,
  StockScreen,
  TermsOfUse,
} from '../screens';
import ProductsDetail from '../screens/products/ProductsDetail';
import AddProducts from '../screens/products/AddProducts';
import ProductsScreen from '../screens/products/ProductsScreen';
import ProductsImagesDetail from '../screens/products/ProductsImagesDetail';
import WorkScreen from '../screens/works/WorkScreen';
import WorkDetail from '../screens/works/WorkDetail';
import AddWork from '../screens/works/AddWork';
import ReportScreen from '../screens/report/ReportScreen';
import ImageZoom from '../screens/products/ImageZoom';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const Stack = createNativeStackNavigator();

  const SalesNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={NAVIGATION.SalesScreen}>
        <Stack.Screen name={NAVIGATION.SalesScreen} component={SalesScreen} />
        <Stack.Screen name={NAVIGATION.AddSales} component={AddSales} />
        <Stack.Screen name={NAVIGATION.SaleDetail} component={SaleDetail} />
      </Stack.Navigator>
    );
  };

  const StocksNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={NAVIGATION.StockScreen}>
        <Stack.Screen name={NAVIGATION.StockScreen} component={StockScreen} />
        <Stack.Screen name={NAVIGATION.AddStock} component={AddStock} />
        <Stack.Screen name={NAVIGATION.StockDetail} component={StockDetail} />
      </Stack.Navigator>
    );
  };

  const ProductionNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={NAVIGATION.ProductionScreen}>
        <Stack.Screen
          name={NAVIGATION.ProductionScreen}
          component={ProductionScreen}
        />
        <Stack.Screen
          name={NAVIGATION.AddProduction}
          component={AddProduction}
        />
        <Stack.Screen
          name={NAVIGATION.ProductionDetail}
          component={ProductionDetail}
        />
        <Stack.Screen
          name={NAVIGATION.EditProduction}
          component={EditProduction}
        />
      </Stack.Navigator>
    );
  };

  const CustomersNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={NAVIGATION.CustomersScreen}>
        <Stack.Screen
          name={NAVIGATION.CustomersScreen}
          component={CustomersScreen}
        />
        <Stack.Screen name={NAVIGATION.AddCustomers} component={AddCustomers} />
        <Stack.Screen
          name={NAVIGATION.CustomersDetail}
          component={CustomersDetail}
        />
      </Stack.Navigator>
    );
  };

  const ProductsNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={NAVIGATION.ProductsScreen}>
        <Stack.Screen
          name={NAVIGATION.ProductsScreen}
          component={ProductsScreen}
        />
        <Stack.Screen name={NAVIGATION.AddProducts} component={AddProducts} />
        <Stack.Screen
          name={NAVIGATION.ProductsDetail}
          component={ProductsDetail}
        />
        <Stack.Screen
          name={NAVIGATION.ProductsImagesDetail}
          component={ProductsImagesDetail}
        />
        <Stack.Screen name={NAVIGATION.ImageZoom} component={ImageZoom} />
      </Stack.Navigator>
    );
  };

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

  const ReportNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={NAVIGATION.ReportScreen}>
        <Stack.Screen name={NAVIGATION.ReportScreen} component={ReportScreen} />
      </Stack.Navigator>
    );
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {width: '65%'},
      }}
      initialRouteName={NAVIGATION.Dashboard}
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name={NAVIGATION.Dashboard} component={Dashboard} />
      <Drawer.Screen name={NAVIGATION.SalesScreen} component={SalesNavigator} />
      <Drawer.Screen
        name={NAVIGATION.StockScreen}
        component={StocksNavigator}
      />
      <Drawer.Screen
        name={NAVIGATION.ProductionScreen}
        component={ProductionNavigator}
      />
      <Drawer.Screen
        name={NAVIGATION.CustomersScreen}
        component={CustomersNavigator}
      />
      <Drawer.Screen
        name={NAVIGATION.ProductsScreen}
        component={ProductsNavigator}
      />

      <Drawer.Screen name={NAVIGATION.WorksScreen} component={WorksNavigator} />
      <Drawer.Screen
        name={NAVIGATION.ReportScreen}
        component={ReportNavigator}
      />

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
