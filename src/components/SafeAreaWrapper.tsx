import React, {memo, useEffect, useState} from 'react';
import {
  Appearance,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from '../theme/variables';
import {SafeAreaProps} from './types';
import {ms} from '../theme/spacing';

const SafeAreaWrapper = ({
  children,
  edges = ['top', 'bottom'],
  statusBg = Colors.white,
  isLoading = false, // 👈 added
  barStyle = Appearance.getColorScheme() === 'dark'
    ? 'light-content'
    : 'dark-content',
}: SafeAreaProps & {isLoading?: boolean}) => {
  const insets = useSafeAreaInsets();
  const isAndroid15OrAbove =
    Platform.OS === 'android' && Platform.Version >= 34;

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <>
      <SafeAreaView
        style={[
          styles.container,
          {
            paddingTop: isAndroid15OrAbove ? insets.top : 0,
            backgroundColor: statusBg,
          },
        ]}
      />
      <StatusBar barStyle={barStyle} backgroundColor={statusBg} />
      <KeyboardAvoidingView
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        behavior={
          Platform.OS == 'ios'
            ? 'padding'
            : keyboardVisible
            ? 'height'
            : undefined
        }
        style={styles.container01}>
        <View style={styles.contentWrapper}>
          {children}
          {isLoading && (
            <View style={styles.loaderOverlay}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
      <SafeAreaView
        style={[
          styles.container,
          {
            paddingBottom: isAndroid15OrAbove ? insets.bottom : 0,
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  container01: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentWrapper: {
    flex: 1,
    position: 'relative',
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.white, // semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ms(55),
  },
});

export default memo(SafeAreaWrapper);
