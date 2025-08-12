import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {goBack, navigate} from '../../navigators/RootNavigation';
import {strings} from '../../localization';
import ButtonView from '../../components/ButtonView';
import {Colors} from '../../theme/variables';
import {ms} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {Layout} from '../../theme';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import {CommonProps} from '../types';
import {NAVIGATION} from '../../constants/navigation';
import PinButton from '../../components/Pin/PinButton';
import CommonHeader from './CommonHeader';
import {isNull, toastConst, validateForm} from '../../constants/constants';
import ToastMessage from '../../components/ToastMessage';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {
  fetchForgetPassword,
  fetchResetPassword,
} from '../../createAsyncThunk/authAsyncThunk';
import {urlEndPoint} from '../../constants/urlEndPoint';
import {AppDispatch, RootState} from '../../store/store';
import {CountdownTimer} from '../../components/TimerViews';
import InputField from '../../components/InputField';
import {PassWordSvg, VisibleSvg} from '../../assets/Images/svg';
import {
  setErrorData,
  setForgetPassData,
  setResetPasswordData,
} from '../../createSlice/authSlice';

const EnterOTP = ({navigation, route}: CommonProps) => {
  var diffSecRound = 180;

  const dispatch = useDispatch<AppDispatch>();

  const [
    forgetPassData,
    forgetPassLoading,
    resetPasswordData,
    resetPasswordLoading,
    error,
  ] = useSelector((state: RootState) => [
    state.authSlice.forgetPassData,
    state.authSlice.forgetPassLoading,
    state.authSlice.resetPasswordData,
    state.authSlice.resetPasswordLoading,
    state.authSlice.error,
  ]);

  const [otp, setOtp] = useState('');
  const [formData, setFormData] = useState({
    password: '',
    confirm_password: '',
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [passVisible, setPassVisible] = useState<boolean>(true);
  const [cPassVisible, setCPassVisible] = useState<boolean>(true);
  const [countFinish, setCountFinish] = useState(false);

  useEffect(() => {
    if (error) {
      dispatch(setErrorData(null));
    }
  }, [error]);

  useEffect(() => {
    if (!isNull(forgetPassData)) {
      ToastMessage.set(toastConst.errorToast, forgetPassData.message);
      dispatch(setForgetPassData(null));
      setCountFinish(false);
    }
  }, [forgetPassData]);

  useEffect(() => {
    if (!isNull(resetPasswordData)) {
      ToastMessage.set(toastConst.errorToast, resetPasswordData.message);
      dispatch(setResetPasswordData(null));
      navigate(NAVIGATION.Login);
    }
  }, [resetPasswordData]);

  const handleVerify = () => {
    const errors = validateForm(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      if (isNull(otp)) {
        ToastMessage.set(toastConst.errorToast, strings.pleaseEnterOtp);
      } else if (_.size(otp) < 6) {
        ToastMessage.set(toastConst.errorToast, strings.pleaseEnterOTPFull);
      } else {
        const params = {
          email: route?.params?.email,
          password: formData.password,
          password_confirmation: formData.confirm_password,
          otp: otp,
        };
        dispatch(
          fetchResetPassword({
            params: params,
            endPoint: urlEndPoint.reset_password,
          }),
        );
      }
    }
  };

  const handleResend = () => {
    setOtp('');
    const params = {
      email: route?.params?.email,
    };
    dispatch(
      fetchForgetPassword({
        params: params,
        endPoint: urlEndPoint.forget_password,
      }),
    );
    // Handle login logic here
  };

  return (
    <SafeAreaWrapper style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[styles.scrollContainer]}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View style={[Layout.center, {marginBottom: ms(40)}]}>
            <CommonHeader onBackPress={goBack} />

            <Text style={styles.welcomeText}>{strings.enterOTPCode}</Text>
            <Text style={styles.subtitle}>
              {strings.enterOTPCodeDec}{' '}
              <Text style={{color: Colors.primary}}>
                {route?.params?.email}
              </Text>
            </Text>
          </View>

          <View style={styles.form}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: ms(10),
              }}>
              <Text style={[typography._16SofticesSemibold, styles.label]}>
                {strings.otp}
              </Text>
            </View>
            <PinButton
              OTP={otp}
              onSucces={(res: any) => setOtp(res)}
              CELL_COUNT={6}
            />
            <InputField
              value={formData.password}
              onChangeText={val => setFormData({...formData, password: val})}
              labelTxt={strings.password}
              errorMessage={formErrors.password}
              validationStatus={formErrors.password ? 'error' : 'default'}
              placeholder={strings.enterPasswordAddress}
              secureTextEntry={passVisible}
              style={{marginTop: ms(16)}}
              rightIcon={
                <VisibleSvg
                  width={20}
                  height={20}
                  color={Colors.textLight}
                  styles={{marginRight: ms(14)}}
                  onPress={() => {
                    setPassVisible(!passVisible);
                  }}
                  activeDeActive={passVisible}
                />
              }
              leftIcon={
                <PassWordSvg width={20} height={20} color={Colors.textLight} />
              }
            />

            <InputField
              value={formData.confirm_password}
              onChangeText={val =>
                setFormData({...formData, confirm_password: val})
              }
              labelTxt={strings.confirmPassword}
              errorMessage={formErrors.confirm_password}
              validationStatus={
                formErrors.confirm_password ? 'error' : 'default'
              }
              placeholder={strings.enterPasswordAddress}
              secureTextEntry={cPassVisible}
              rightIcon={
                <VisibleSvg
                  width={20}
                  height={20}
                  color={Colors.textLight}
                  styles={{marginRight: ms(14)}}
                  onPress={() => {
                    setCPassVisible(!cPassVisible);
                  }}
                  activeDeActive={cPassVisible}
                />
              }
              leftIcon={
                <PassWordSvg width={20} height={20} color={Colors.textLight} />
              }
            />
            <Text style={styles.registerText}>
              {strings.didCode}{' '}
              {!countFinish ? (
                <CountdownTimer
                  setCountFinish={() => setCountFinish(!countFinish)}
                  durationInSeconds={diffSecRound}
                />
              ) : (
                <TouchableWithoutFeedback
                  onPress={handleResend}
                  disabled={forgetPassLoading}>
                  <Text style={styles.registerLink}>{strings.resend}</Text>
                </TouchableWithoutFeedback>
              )}
            </Text>
          </View>

          <ButtonView
            btnTxt={strings.verify}
            btnStyle={{
              height: ms(50),
              backgroundColor: Colors.primary,
              borderRadius: ms(10),
            }}
            backgroundColor={Colors.buttonCl}
            onBtnPress={handleVerify}
            fontColor={Colors.white}
            isLoading={resetPasswordLoading}
            disable={resetPasswordLoading}
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
  label: {
    color: Colors.textCl,
    marginBottom: 8,
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
    marginBottom: ms(20),
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
    textAlign: 'right',
    color: Colors.textCl,
    ...typography._16SofticesRegular,
    // marginBottom: ms(40),
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

export default EnterOTP;
