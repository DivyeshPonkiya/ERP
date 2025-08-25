import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {navigate} from '../../navigators/RootNavigation';
import {strings} from '../../localization';
import InputField, {InputFieldRef} from '../../components/InputField';
import ButtonView from '../../components/ButtonView';
import {Colors} from '../../theme/variables';
import {ms, vs} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {Layout} from '../../theme';
import {SofticesSvg} from '../../assets/Images/svg/SofticesSvg';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import {
  CheckBoxSvg,
  EmailSvg,
  PassWordSvg,
  VisibleSvg,
} from '../../assets/Images/svg';
import {CommonProps} from '../types';
import {NAVIGATION} from '../../constants/navigation';
import {
  ACTIVE_OPACITY,
  asyncKeys,
  Client_Id,
  Client_Secret,
  Code_challenge_method,
  Grant_type,
  isNull,
  Redirect_Uri,
  Response_Type,
  Scope,
  validateForm,
} from '../../constants/constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchLogin,
  fetchProfile,
  fetchToken,
} from '../../createAsyncThunk/authAsyncThunk';
import {urlEndPoint} from '../../constants/urlEndPoint';
import {AppDispatch, RootState} from '../../store/store';
import {
  setErrorData,
  setLoginData,
  setTokenData,
} from '../../createSlice/authSlice';
import storage from '../../storage';
import pkceChallenge from 'react-native-pkce-challenge';

interface pckeCodeProps {
  codeChallenge: string;
  codeVerifier: string;
}

const Login = ({navigation}: CommonProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [loginData, tokenData, profileLoading, error] = useSelector(
    (state: RootState) => [
      state.authSlice.loginData,
      state.authSlice.tokenData,
      state.authSlice.profileLoading,
      state.authSlice.error,
    ],
  );

  const [formData, setFormData] = useState({
    email: __DEV__ ? 'raj.vasoya@softices.in' : '',
    password: __DEV__ ? 'password' : '',
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [remember, setRemember] = useState<boolean>(false);
  const [passVisible, setPassVisible] = useState<boolean>(true);
  const [pckeCode, setPckeCode] = useState<pckeCodeProps>(pkceChallenge());

  useEffect(() => {
    if (error) {
      dispatch(setErrorData(null));
    }
  }, [error]);

  useEffect(() => {
    const rememberData: any = storage.getMap(asyncKeys.RememberMe);
    if (!isNull(rememberData)) {
      setFormData({
        email: rememberData?.email,
        password: rememberData?.password,
      });
      setRemember(true);
    }
  }, []);

  useEffect(() => {
    if (!isNull(loginData)) {
      const params = {
        client_id: Client_Id,
        client_secret: Client_Secret,
        redirect_uri: Redirect_Uri,
        grant_type: Grant_type,
        code: loginData?.code,
        code_verifier: pckeCode.codeVerifier,
      };
      dispatch(fetchToken({params: params, endPoint: urlEndPoint.token}));
      dispatch(setLoginData(null));
    }
  }, [loginData]);

  useEffect(() => {
    if (!isNull(tokenData)) {
      if (tokenData?.access_token) {
        storage.setStringAsync(asyncKeys.accessToken, tokenData?.access_token);
      }
      dispatch(fetchProfile({endPoint: urlEndPoint.profile}));
      dispatch(setTokenData(null));
      if (remember) {
        storage.setMap(asyncKeys.RememberMe, {
          email: formData.email,
          password: formData.password,
        });
      } else {
        storage.removeItem(asyncKeys.RememberMe);
      }
    }
  }, [tokenData]);

  const handleLogin = () => {
    storage.removeItem(asyncKeys.accessToken);
    const errors = validateForm(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const params = {
        email: formData.email,
        password: formData.password,
        response_type: Response_Type,
        client_id: Client_Id,
        redirect_uri: Redirect_Uri,
        scope: Scope,
        code_challenge: pckeCode.codeChallenge,
        code_challenge_method: Code_challenge_method,
      };

      dispatch(fetchLogin({params: params, endPoint: urlEndPoint.login}));
    }
  };

  const handleForgotPassword = () => {
    navigate(NAVIGATION.ForgotPassword);
  };

  const handleRegister = () => {
    navigate(NAVIGATION.Register);
    storage.removeItem(asyncKeys.accessToken);
  };

  return (
    <SafeAreaWrapper style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[styles.scrollContainer]}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View style={[Layout.center, {marginBottom: ms(40)}]}>
            <SofticesSvg
              width={80}
              height={80}
              color={Colors.primary}
              styles={{marginVertical: ms(20)}}
            />
            <Text style={styles.welcomeText}>{strings.wellCome}</Text>
            <Text style={styles.subtitle}>{strings.happyToSeeYouAgain}</Text>
          </View>

          <View style={styles.form}>
            <InputField
              value={formData.email}
              onChangeText={val => setFormData({...formData, email: val})}
              labelTxt={strings.email}
              errorMessage={formErrors.email}
              validationStatus={formErrors.email ? 'error' : 'default'}
              placeholder={strings.enterEmailAddress}
              inputKeyboardType={'email-address'}
              leftIcon={
                <EmailSvg width={20} height={20} color={Colors.textLight} />
              }
            />

            <InputField
              value={formData.password}
              onChangeText={val => setFormData({...formData, password: val})}
              labelTxt={strings.password}
              errorMessage={formErrors.password}
              validationStatus={formErrors.password ? 'error' : 'default'}
              placeholder={strings.password}
              secureTextEntry={passVisible}
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

            <View style={styles.passwordOptions}>
              <View style={styles.rememberMe}>
                <CheckBoxSvg
                  height={18}
                  width={18}
                  color={Colors.textLight}
                  onPress={() => {
                    setRemember(!remember);
                  }}
                  activeDeActive={remember}
                />
                <Text style={styles.rememberText}>
                  {' '}
                  {strings.rememberPassword}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={ACTIVE_OPACITY}
                onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordText}>
                  {strings.forgotPassword}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <ButtonView
            btnTxt={strings.login}
            btnStyle={{
              height: vs(50),
              backgroundColor: Colors.primary,
              borderRadius: ms(10),
            }}
            backgroundColor={Colors.buttonCl}
            onBtnPress={handleLogin}
            fontColor={Colors.white}
            isLoading={profileLoading}
            disable={profileLoading}
            style={{width: '100%', marginBottom: vs(24)}}
          />

          <Text style={styles.registerText}>
            {strings.dontHaveAccount}{' '}
            <TouchableWithoutFeedback onPress={handleRegister}>
              <Text style={styles.registerLink}>{strings.registerNow}</Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{strings.rightReserved}</Text>
          <Text style={styles.footerText}>{strings.rightReservedDec}</Text>
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

export default Login;
