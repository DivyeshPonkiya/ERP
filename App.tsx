import React, {useEffect} from 'react';

import AppNavigator from './src/navigators/appNavigator';
import {Reactotron} from './src/reactron/index';
import {persist, store} from './src/store/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast, {BaseToast} from 'react-native-toast-message';
import {Colors} from './src/theme/variables';
import {typography} from './src/theme/typography';
import {ms} from './src/theme/spacing';
import {LogBox, Text, TextInput, View} from 'react-native';

const App = () => {
  LogBox.ignoreAllLogs();

  return (
    <SafeAreaProvider>
      <Provider store={store} stabilityCheck="never">
        <PersistGate loading={null} persistor={persist}>
          <AppNavigator />
          <Toast config={toastConfig} key={Date.now().toString()} />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};
export default __DEV__ ? Reactotron?.overlay(App) : App;

if (Text?.defaultProps) {
  Text.defaultProps.allowFontScaling = false;
} else {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

// Override Text scaling in input fields
if (TextInput.defaultProps) {
  TextInput.defaultProps.allowFontScaling = false;
} else {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

export const toastConfig = {
  /*
    overwrite 'success' type,
    modifying the existing `BaseToast` component
  */
  // success: ({text1, props, ...rest}) => (
  //   <BaseToast
  //     {...rest}
  //     style={{borderLeftColor: Colors.red, backgroundColor: Colors.black}}
  //     contentContainerStyle={{
  //       paddingHorizontal: 15,
  //       backgroundColor: Colors.black,
  //     }}
  //     text1Style={{
  //       fontSize: ms(15),
  //       fontWeight: '400',
  //     }}
  //     text2Style={{
  //       fontSize: ms(15),
  //       fontWeight: '400',
  //     }}
  //     text1={text1}
  //     text2={props.uuid}
  //   />
  // ),

  /*
    or create a completely new type - `my_custom_type`,
    building the layout from scratch
  */
  internet: ({text1, props, ...rest}) => (
    <View
      style={{
        minHeight: ms(40),
        width: '90%',
        backgroundColor: Colors.textCl,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: ms(20),
        padding: 5,
      }}>
      <Text
        style={[
          {
            color: Colors.white,
            textAlign: 'center',
            width: '100%',
          },
          typography._14SofticesRegular,
        ]}>
        {text1}
      </Text>
    </View>
  ),
  error: ({text1, props, ...rest}) => (
    <View
      style={{
        minHeight: ms(40),
        width: '90%',
        backgroundColor: Colors.textCl,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: ms(20),
        padding: 5,
      }}>
      <Text
        style={[
          {
            color: Colors.white,
            textAlign: 'center',
            width: '100%',
          },
          typography._14SofticesRegular,
        ]}>
        {text1}
      </Text>
    </View>
  ),
  success: ({text1, props, ...rest}) => (
    <View
      style={{
        minHeight: ms(40),
        width: '90%',
        backgroundColor: Colors.textCl,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: ms(20),
      }}>
      <Text
        style={[
          {
            color: Colors.white,
            textAlign: 'center',
            width: '90%',
          },
          typography._14SofticesRegular,
        ]}>
        {text1}
      </Text>
    </View>
  ),
};
