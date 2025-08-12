import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {goBack, navigate} from '../../navigators/RootNavigation';
import {strings} from '../../localization';
import InputField from '../../components/InputField';
import ButtonView from '../../components/ButtonView';
import {Colors, fonts} from '../../theme/variables';
import {ms} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {Layout} from '../../theme';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import {PassWordSvg, VisibleSvg} from '../../assets/Images/svg';
import {CommonProps} from '../types';
import {NAVIGATION} from '../../constants/navigation';
import {BackSvg} from '../../assets/Images/svg/BackSvg';
import CommonHeader from './CommonHeader';

const ResetPassword = ({navigation}: CommonProps) => {
  const [cPassword, setCPassword] = useState('');
  const [password, setPassword] = useState('');

  const handleReset = () => {
    // Handle login logic here
    navigate(NAVIGATION.Login);
  };

  return (
    <SafeAreaWrapper style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[styles.scrollContainer]}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View style={[Layout.center, {marginBottom: ms(40)}]}>
            <CommonHeader onBackPress={goBack} />

            <Text style={styles.welcomeText}>{strings.resetYourPassword}</Text>
            <Text style={styles.subtitle}>{strings.resetYourPasswordDec}</Text>
          </View>

          <View style={styles.form}>
            <InputField
              value={password}
              onChangeText={setPassword}
              labelTxt={strings.password}
              placeholder={strings.enterPasswordAddress}
              rightIcon={
                <VisibleSvg
                  width={20}
                  height={20}
                  color={Colors.textLight}
                  styles={{marginRight: ms(14)}}
                />
              }
              leftIcon={
                <PassWordSvg width={20} height={20} color={Colors.textLight} />
              }
            />
            <InputField
              value={cPassword}
              onChangeText={setCPassword}
              labelTxt={strings.confirmPassword}
              placeholder={strings.enterPasswordAddress}
              rightIcon={
                <VisibleSvg
                  width={20}
                  height={20}
                  color={Colors.textLight}
                  styles={{marginRight: ms(14)}}
                />
              }
              leftIcon={
                <PassWordSvg width={20} height={20} color={Colors.textLight} />
              }
            />
          </View>
          <ButtonView
            btnTxt={strings.resetPassword}
            btnStyle={{
              height: ms(50),
              backgroundColor: Colors.primary,
              borderRadius: ms(10),
            }}
            backgroundColor={Colors.buttonCl}
            onBtnPress={handleReset}
            fontColor={Colors.white}
            style={{width: '100%', marginBottom: ms(24)}}
          />
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: ms(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  content: {
    flex: 1,
    marginHorizontal: ms(20),
  },
  welcomeText: {
    ...typography._26SofticesExtraBold,
    color: Colors.secondary,
  },
  subtitle: {
    ...typography._18SofticesRegular,
    color: Colors.secondary,
    textAlign: 'center',
  },
  form: {
    marginBottom: ms(40),
  },

  passwordOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    ...typography._16SofticesRegular,
    color: Colors.textCl,
  },
  forgotPasswordText: {
    color: Colors.primary,
    ...typography._16SofticesSemibold,
  },

  registerText: {
    textAlign: 'center',
    color: Colors.textCl,
    ...typography._16SofticesRegular,
  },
  registerLink: {
    color: Colors.primary,
    ...typography._16SofticesSemibold,
  },
  footer: {
    marginHorizontal: ms(20),
    alignItems: 'center',
    marginTop: ms(50),
  },
  footerText: {
    ...typography._16SofticesRegular,
    color: Colors.textCl,
    marginBottom: ms(5),
  },
});

export default ResetPassword;
