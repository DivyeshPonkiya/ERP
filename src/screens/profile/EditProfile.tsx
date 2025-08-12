// EditProfile.tsx
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import ActionBar from '../../components/ActionBar';
import {BackSvg, CameraSvg, VisibleSvg} from '../../assets/Images/svg';
import {ms} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {Colors} from '../../theme/variables';
import InputField from '../../components/InputField';
import {strings} from '../../localization';
import {
  ACTIVE_OPACITY,
  hexToRGBA,
  isNull,
  toastConst,
  validateForm,
} from '../../constants/constants';
import ButtonView from '../../components/ButtonView';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import {goBack} from '../../navigators/RootNavigation';
import ReusableModal from '../../components/ReusableModal';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import FastImageView from '../../components/FastImageView';
import {urlEndPoint} from '../../constants/urlEndPoint';
import ImagePickerModal from '../../components/ImagePickerModal';
import {
  fetchProfile,
  fetchProfileUpdate,
  fetchUpdatePassword,
} from '../../createAsyncThunk/authAsyncThunk';
import {CommonProps, ParamsProps} from '../types';
import {
  setProfileUpdateData,
  setUpdatePasswordData,
} from '../../createSlice/authSlice';
import ToastMessage from '../../components/ToastMessage';
import {useFocusEffect} from '@react-navigation/native';

export default function EditProfile({navigation}: CommonProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [
    profileData,
    profileUpdateData,
    profileUpdateLoading,
    updatePasswordData,
    updatePasswordLoading,
  ] = useSelector((state: RootState) => [
    state.authSlice.profileData,
    state.authSlice.profileUpdateData,
    state.authSlice.profileUpdateLoading,
    state.authSlice.updatePasswordData,
    state.authSlice.updatePasswordLoading,
  ]);

  const [requireFormData, setRequireFormData] = useState({
    name: '',
    email: '',
  });
  const [formData, setFormData] = useState({
    photo: '',
    avatarPhoto: '',
  });
  const [formPassword, setFormPassword] = useState({
    current_password: '',
    password: '',
    confirm_password: '',
  });
  const [passVisible, setPassVisible] = useState({
    current_password_visible: true,
    password_visible: true,
    confirm_password_visible: true,
  });
  const [passModal, setPassModal] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [passFormErrors, setPassFormErrors] = useState<{[key: string]: string}>(
    {},
  );
  const [imagePick, setImagePick] = useState(false);
  const [isCurrentScreen, setCurrentScreen] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setCurrentScreen(true);
      return () => {
        setCurrentScreen(false);
      };
    }, []),
  );

  useEffect(() => {
    if (!isNull(profileData) && isCurrentScreen) {
      const data = profileData?.user;
      setRequireFormData({
        ...requireFormData,
        name: data?.name,
        email: data?.email,
      });

      setFormData({
        ...formData,
        photo: data?.photo_url,
        avatarPhoto: '',
      });
    }
  }, [profileData, isCurrentScreen]);

  useEffect(() => {
    if (!isNull(profileUpdateData)) {
      dispatch(fetchProfile({endPoint: urlEndPoint.profile}));
      ToastMessage.set(toastConst.errorToast, profileUpdateData.message);
      dispatch(setProfileUpdateData(null));
      navigation.goBack();
    }
  }, [profileUpdateData]);

  useEffect(() => {
    if (!isNull(updatePasswordData)) {
      ToastMessage.set(toastConst.errorToast, updatePasswordData.message);
      dispatch(setUpdatePasswordData(null));
      setFormPassword({
        current_password: '',
        password: '',
        confirm_password: '',
      });
      setPassModal(false);
      navigation.goBack();
    }
  }, [updatePasswordData]);

  useEffect(() => {
    if (passModal) {
      setFormPassword({
        current_password: '',
        password: '',
        confirm_password: '',
      });
      setPassFormErrors({});
      setPassVisible({
        current_password_visible: true,
        password_visible: true,
        confirm_password_visible: true,
      });
    }
  }, [passModal]);

  const handleEdit = () => {
    const errors = validateForm(requireFormData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      let imagePath = formData?.avatarPhoto?.uri;
      const params: ParamsProps = {
        'user[name]': requireFormData.name,
        'user[email]': requireFormData.email,
      };
      if (imagePath) {
        params['user[photo]'] = {
          uri: imagePath,
          name: imagePath?.slice(
            imagePath?.lastIndexOf('/') + 1,
            imagePath?.length,
          ),
          type:
            'image/' +
            imagePath?.slice(
              imagePath?.lastIndexOf('.') + 1,
              imagePath?.length,
            ),
        };
      }

      dispatch(
        fetchProfileUpdate({
          params: params,
          endPoint: `${urlEndPoint.profile}/${profileData?.user?.id}`,
        }),
      );
    }
  };

  const changePassHandle = () => {
    const errors = validateForm(formPassword);
    setPassFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const params: ParamsProps = {
        'user[current_password]': formPassword.current_password,
        'user[password]': formPassword.password,
        'user[password_confirmation]': formPassword.confirm_password,
      };
      dispatch(
        fetchUpdatePassword({
          params: params,
          endPoint: urlEndPoint.update_password,
        }),
      );
    }
  };

  const modalContent = () => {
    return (
      <View>
        <InputField
          value={formPassword.current_password}
          onChangeText={val =>
            setFormPassword({...formPassword, current_password: val})
          }
          labelTxt={strings.currentPassword}
          errorMessage={passFormErrors.current_password}
          validationStatus={
            passFormErrors.current_password ? 'error' : 'default'
          }
          placeholder={'Enter ' + strings.currentPassword}
          requiredField={true}
          secureTextEntry={passVisible.current_password_visible}
          rightIcon={
            <VisibleSvg
              width={20}
              height={20}
              color={Colors.textLight}
              styles={{marginRight: ms(14)}}
              onPress={() => {
                setPassVisible({
                  ...passVisible,
                  current_password_visible:
                    !passVisible.current_password_visible,
                });
              }}
              activeDeActive={passVisible.current_password_visible}
            />
          }
        />
        <InputField
          value={formPassword.password}
          onChangeText={val =>
            setFormPassword({...formPassword, password: val})
          }
          labelTxt={strings.newPassword}
          errorMessage={passFormErrors.password}
          validationStatus={passFormErrors.password ? 'error' : 'default'}
          placeholder={'Enter ' + strings.newPassword}
          requiredField={true}
          secureTextEntry={passVisible.password_visible}
          rightIcon={
            <VisibleSvg
              width={20}
              height={20}
              color={Colors.textLight}
              styles={{marginRight: ms(14)}}
              onPress={() => {
                setPassVisible({
                  ...passVisible,
                  password_visible: !passVisible.password_visible,
                });
              }}
              activeDeActive={passVisible.password_visible}
            />
          }
        />
        <InputField
          value={formPassword.confirm_password}
          onChangeText={val =>
            setFormPassword({...formPassword, confirm_password: val})
          }
          labelTxt={strings.confirmNewPassword}
          errorMessage={passFormErrors.confirm_password}
          validationStatus={
            passFormErrors.confirm_password ? 'error' : 'default'
          }
          placeholder={'Enter ' + strings.confirmNewPassword}
          requiredField={true}
          secureTextEntry={passVisible.confirm_password_visible}
          rightIcon={
            <VisibleSvg
              width={20}
              height={20}
              color={Colors.textLight}
              styles={{marginRight: ms(14)}}
              onPress={() => {
                setPassVisible({
                  ...passVisible,
                  confirm_password_visible:
                    !passVisible.confirm_password_visible,
                });
              }}
              activeDeActive={passVisible.confirm_password_visible}
            />
          }
        />
      </View>
    );
  };

  return (
    <SafeAreaWrapper statusBg={Colors.primary} barStyle="light-content">
      <ActionBar
        title="Edit Profile"
        LeftIcon={<BackSvg width={28} height={28} color={Colors.white} />}
        onLeftPress={() => goBack()}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <View>
          {!isNull(formData?.avatarPhoto) ? (
            <Image
              source={{
                uri:
                  formData?.avatarPhoto?.uri ||
                  formData?.avatarPhoto?.full_filepath,
              }}
              style={styles.profileImage}
            />
          ) : (
            <FastImageView
              source={formData.photo}
              resizeMode="contain"
              style={styles.profileImage}
            />
          )}

          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            onPress={() => setImagePick(true)}
            style={styles.cameraView}>
            <CameraSvg height={17} width={17} color={Colors.white} />
          </TouchableOpacity>
        </View>

        <InputField
          value={requireFormData.name}
          onChangeText={val =>
            setRequireFormData({...requireFormData, name: val})
          }
          labelTxt={strings.name}
          errorMessage={formErrors.name}
          validationStatus={formErrors.name ? 'error' : 'default'}
          placeholder={'Enter ' + strings.name}
        />

        <InputField
          value={requireFormData.email}
          onChangeText={val =>
            setRequireFormData({...requireFormData, email: val})
          }
          labelTxt={strings.email}
          errorMessage={formErrors.email}
          validationStatus={formErrors.email ? 'error' : 'default'}
          placeholder={'Enter ' + strings.enterEmailAddress}
          inputKeyboardType={'email-address'}
        />

        <TouchableOpacity
          activeOpacity={ACTIVE_OPACITY}
          style={styles.changePwView}
          onPress={() => setPassModal(true)}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.editProfileText}>{strings.changePassword}</Text>
            <View
              style={{
                height: 1,
                backgroundColor: Colors.primary,
                marginTop: ms(2),
                width: '100%',
              }}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
      <ButtonView
        btnTxt={strings.submit}
        btnStyle={{
          height: ms(50),
          backgroundColor: Colors.primary,
          borderRadius: ms(10),
        }}
        backgroundColor={Colors.buttonCl}
        onBtnPress={handleEdit}
        fontColor={Colors.white}
        style={{
          width: '90%',
          height: ms(50),
          marginHorizontal: ms(20),
        }}
        isLoading={profileUpdateLoading}
        disable={profileUpdateLoading}
      />
      <ReusableModal
        visible={passModal}
        title={strings.changePassword}
        isLoading={updatePasswordLoading}
        onClose={() => setPassModal(false)}
        onSubmit={() => changePassHandle()}>
        {modalContent()}
      </ReusableModal>
      <ImagePickerModal
        visible={imagePick}
        includeBase64={false}
        selectionLimit={1}
        enablecropper={true}
        height={200}
        width={200}
        // docOption={true}
        onImageSelect={(imageAssets: any) => {
          setImagePick(false);
          if (imageAssets.didCancel) {
          } else if (imageAssets.error) {
          } else {
            setFormData({...formData, avatarPhoto: imageAssets || ''});
          }
        }}
        onClose={() => {
          setImagePick(false);
        }}
        supportMb={10}
      />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(20),
    alignItems: 'center',
    paddingBottom: ms(50),
  },
  profileImage: {
    width: ms(140),
    height: ms(140),
    borderRadius: ms(140),
    marginTop: ms(30),
    backgroundColor: Colors.borderCl,
  },
  cameraView: {
    height: ms(38),
    width: ms(38),
    borderWidth: ms(4),
    borderColor: Colors.white,
    borderRadius: ms(50),
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: ms(10),
    bottom: -ms(5),
  },
  changePwView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: ms(20),
  },
  editProfileText: {
    color: Colors.primary,
    ...typography._16SofticesSemibold,
  },
  inputContainer: {
    alignSelf: 'stretch',
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 14,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    fontSize: 16,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: hexToRGBA(Colors.colorRedD4, 0.1),
    justifyContent: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  deleteText: {
    color: Colors.colorRedD4,
    ...typography._16SofticesRegular,
  },
});
