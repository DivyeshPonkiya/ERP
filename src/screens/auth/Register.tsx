import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {navigate} from '../../navigators/RootNavigation';
import {strings} from '../../localization';
import InputField from '../../components/InputField';
import ButtonView from '../../components/ButtonView';
import {Colors} from '../../theme/variables';
import {ms} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {Layout} from '../../theme';
import {SofticesSvg} from '../../assets/Images/svg/SofticesSvg';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import {
  CompanySvg,
  EmailSvg,
  LocationSvg,
  PassWordSvg,
  PhoneSvg,
  UserSvg,
  VisibleSvg,
} from '../../assets/Images/svg';
import {CommonProps, ParamsProps} from '../types';
import {NAVIGATION} from '../../constants/navigation';
import {
  asyncKeys,
  Client_Id,
  isNull,
  validateForm,
} from '../../constants/constants';
import {useDispatch, useSelector} from 'react-redux';
import {urlEndPoint} from '../../constants/urlEndPoint';
import {
  fetchProfile,
  fetchRegister,
} from '../../createAsyncThunk/authAsyncThunk';
import {AppDispatch, RootState} from '../../store/store';
import storage from '../../storage';
import {setErrorData, setRegisterData} from '../../createSlice/authSlice';

const Register = ({navigation}: CommonProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [registerData, profileLoading, error] = useSelector(
    (state: RootState) => [
      state.authSlice.registerData,
      state.authSlice.profileLoading,
      state.authSlice.error,
    ],
  );

  const [formData, setFormData] = useState({
    email: '',
    company_name: '',
    company_mobile: '',
    company_address: '',
    user_name: '',
    password: '',
    confirm_password: '',
  });

  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [passVisible, setPassVisible] = useState<boolean>(true);
  const [cPassVisible, setCPassVisible] = useState<boolean>(true);

  useEffect(() => {
    if (error) {
      dispatch(setErrorData(null));
    }
  }, [error]);

  useEffect(() => {
    if (!isNull(registerData)) {
      if (registerData?.token) {
        storage.setStringAsync(asyncKeys.accessToken, registerData?.token);
      }
      dispatch(fetchProfile({endPoint: urlEndPoint.profile}));
      dispatch(setRegisterData(null));
    }
  }, [registerData]);

  const handleRegister = () => {
    // Handle login logic here
    const errors = validateForm(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const params: ParamsProps = {
        client_id: Client_Id,
        'company[name]': formData.company_name,
        'company[mobile]': formData.company_mobile,
        'company[address]': formData.company_address,
        'user[name]': formData.user_name,
        'user[email]': formData.email,
        'user[password]': formData.password,
        'user[password_confirmation]': formData.confirm_password,
      };
      dispatch(fetchRegister({params: params, endPoint: urlEndPoint.sign_up}));
    }
  };

  const handleLogin = () => {
    // Handle navigation to register screen
    navigate(NAVIGATION.Login);
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
            <Text style={styles.subtitle}>{strings.createYourAccount}</Text>
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
              value={formData.company_name}
              onChangeText={val =>
                setFormData({...formData, company_name: val})
              }
              labelTxt={strings.companyName}
              errorMessage={formErrors.company_name}
              validationStatus={formErrors.company_name ? 'error' : 'default'}
              placeholder={strings.companyName}
              leftIcon={
                <CompanySvg width={20} height={20} color={Colors.textLight} />
              }
            />
            <InputField
              value={formData.company_mobile}
              onChangeText={val =>
                setFormData({...formData, company_mobile: val})
              }
              labelTxt={strings.companyMobileNumber}
              errorMessage={formErrors.company_mobile}
              maxLength={10}
              inputKeyboardType={'number-pad'}
              validationStatus={formErrors.company_mobile ? 'error' : 'default'}
              placeholder={strings.companyMobileNumber}
              leftIcon={
                <PhoneSvg width={20} height={20} color={Colors.textLight} />
              }
            />

            <InputField
              value={formData.company_address}
              onChangeText={val =>
                setFormData({...formData, company_address: val})
              }
              labelTxt={strings.companyAddress}
              errorMessage={formErrors.company_address}
              validationStatus={
                formErrors.company_address ? 'error' : 'default'
              }
              placeholder={strings.companyAddress}
              leftIcon={
                <LocationSvg width={20} height={20} color={Colors.textLight} />
              }
            />
            <InputField
              value={formData.user_name}
              onChangeText={val => setFormData({...formData, user_name: val})}
              labelTxt={strings.userName}
              errorMessage={formErrors.user_name}
              validationStatus={formErrors.user_name ? 'error' : 'default'}
              placeholder={strings.userName}
              leftIcon={
                <UserSvg width={20} height={20} color={Colors.textLight} />
              }
            />

            <InputField
              value={formData.password}
              onChangeText={val => setFormData({...formData, password: val})}
              labelTxt={strings.password}
              errorMessage={formErrors.password}
              validationStatus={formErrors.password ? 'error' : 'default'}
              placeholder={strings.enterPasswordAddress}
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
          </View>
          <ButtonView
            btnTxt={strings.register}
            btnStyle={{
              height: ms(50),
              backgroundColor: Colors.primary,
              borderRadius: ms(10),
            }}
            backgroundColor={Colors.buttonCl}
            onBtnPress={handleRegister}
            fontColor={Colors.white}
            disable={profileLoading}
            isLoading={profileLoading}
            style={{width: '100%', marginBottom: ms(24)}}
          />

          <Text style={styles.registerText}>
            {strings.alreadyHaveAccount}{' '}
            <TouchableWithoutFeedback onPress={handleLogin}>
              <Text style={styles.registerLink}>{strings.loginNow}</Text>
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

export default Register;
