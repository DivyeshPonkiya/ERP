import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {goBack, navigate} from '../../navigators/RootNavigation';
import {strings} from '../../localization';
import InputField from '../../components/InputField';
import ButtonView from '../../components/ButtonView';
import {Colors} from '../../theme/variables';
import {ms} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {Layout} from '../../theme';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import {EmailSvg} from '../../assets/Images/svg';
import {CommonProps} from '../types';
import CommonHeader from './CommonHeader';
import {isNull, toastConst, validateForm} from '../../constants/constants';
import {useDispatch, useSelector} from 'react-redux';
import {urlEndPoint} from '../../constants/urlEndPoint';
import {fetchForgetPassword} from '../../createAsyncThunk/authAsyncThunk';
import {AppDispatch, RootState} from '../../store/store';
import ToastMessage from '../../components/ToastMessage';
import {setErrorData, setForgetPassData} from '../../createSlice/authSlice';
import {NAVIGATION} from '../../constants/navigation';
import {useFocusEffect} from '@react-navigation/native';

const ForgotPassword = ({navigation}: CommonProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [forgetPassData, forgetPassLoading, error] = useSelector(
    (state: RootState) => [
      state.authSlice.forgetPassData,
      state.authSlice.forgetPassLoading,
      state.authSlice.error,
    ],
  );

  const [formData, setFormData] = useState({
    email: '',
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isCurrentScreen, setCurrentScreen] = useState(false);

  useEffect(() => {
    if (error) {
      dispatch(setErrorData(null));
    }
  }, [error]);

  useFocusEffect(
    React.useCallback(() => {
      setCurrentScreen(true);
      return () => {
        setCurrentScreen(false);
      };
    }, []),
  );

  useEffect(() => {
    if (!isNull(forgetPassData) && isCurrentScreen) {
      ToastMessage.set(toastConst.errorToast, forgetPassData.message);
      dispatch(setForgetPassData(null));
      navigate(NAVIGATION.EnterOTP, {email: formData.email});
    }
  }, [forgetPassData]);

  const handleContinue = () => {
    const errors = validateForm(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const params = {
        email: formData.email,
      };
      dispatch(
        fetchForgetPassword({
          params: params,
          endPoint: urlEndPoint.forget_password,
        }),
      );
    }
  };

  return (
    <SafeAreaWrapper style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[styles.scrollContainer]}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View style={[Layout.center, {marginBottom: ms(40)}]}>
            <CommonHeader onBackPress={goBack} />
            <Text style={styles.welcomeText}>{strings.forgotPassword}</Text>
            <Text style={styles.subtitle}>{strings.forgotDec}</Text>
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
          </View>
          <ButtonView
            btnTxt={strings.continue}
            btnStyle={{
              height: ms(50),
              backgroundColor: Colors.primary,
              borderRadius: ms(10),
            }}
            backgroundColor={Colors.buttonCl}
            onBtnPress={handleContinue}
            fontColor={Colors.white}
            isLoading={forgetPassLoading}
            disable={forgetPassLoading}
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
  backBorder: {
    width: ms(44),
    height: ms(44),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderCl,
    borderRadius: ms(10),
  },
});

export default ForgotPassword;
