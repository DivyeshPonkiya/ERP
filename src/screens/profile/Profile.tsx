// Profile.tsx
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import ActionBar from '../../components/ActionBar';
import {BackSvg, DrawerSvg} from '../../assets/Images/svg';
import {ms} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {Colors} from '../../theme/variables';
import InputField from '../../components/InputField';
import {strings} from '../../localization';
import {FirstLatter, isNull} from '../../constants/constants';
import {goBack} from '../../navigators/RootNavigation';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {CommonProps} from '../types';

const ProfileSection = ({formData}: any) => {
  return (
    <>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {FirstLatter(formData?.first_name) +
            FirstLatter(formData?.middle_name)}
        </Text>
      </View>

      {formData.name ? (
        <InputField
          value={formData.name}
          labelTxt={strings.name}
          placeholder={strings.name}
          editable={false}
        />
      ) : null}
      {formData.companyEmail ? (
        <InputField
          value={formData.companyEmail}
          labelTxt={strings.companyEmail}
          placeholder={strings.companyEmail}
          editable={false}
        />
      ) : null}
      {formData.gender ? (
        <InputField
          value={formData.gender}
          labelTxt={strings.gender}
          placeholder={strings.gender}
          editable={false}
        />
      ) : null}
      {formData.joiningDate ? (
        <InputField
          value={formData.joiningDate}
          labelTxt={strings.joiningDate}
          placeholder={strings.joiningDate}
          editable={false}
        />
      ) : null}
      {formData.onboardingDate ? (
        <InputField
          value={formData.onboardingDate}
          labelTxt={strings.onboardingDate}
          placeholder={strings.enterEmailAddress}
          editable={false}
        />
      ) : null}
      {formData.nationality ? (
        <InputField
          value={formData.nationality}
          labelTxt={strings.nationality}
          placeholder={strings.nationality}
          editable={false}
        />
      ) : null}
    </>
  );
};

export default function Profile({route, navigation}: CommonProps) {
  const dispatch = useDispatch();

  const [profileData, profileLoading] = useSelector((state: RootState) => [
    state.authSlice.profileData,
    state.authSlice.profileLoading,
  ]);

  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    name: '',
    companyEmail: '',
    gender: '',
    joiningDate: '',
    onboardingDate: '',
    nationality: '',
  });

  useEffect(() => {
    if (!isNull(profileData)) {
      const data = profileData?.employee;

      setFormData({
        ...formData,
        first_name: data?.first_name,
        middle_name: data?.middle_name,
        name:
          data?.first_name + ' ' + data?.middle_name + ' ' + data?.last_name,
        companyEmail: data?.email,
        gender: data?.gender,
        joiningDate: data?.joining_date,
        onboardingDate: data?.onboarding_date,
        nationality: data?.nationality,
      });
    }
  }, [profileData]);

  return (
    <SafeAreaWrapper statusBg={Colors.primary} barStyle="light-content">
      <ActionBar
        title={route?.params?.title || 'Profile'}
        // LeftIcon={<BackSvg width={28} height={28} color={Colors.white} />}
        // onLeftPress={() => goBack()}
        LeftIcon={<DrawerSvg height={28} width={28} color={Colors.white} />}
        onLeftPress={() => navigation?.openDrawer()}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {route?.params?.title == strings.profile ? (
          <ProfileSection formData={formData} />
        ) : null}
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(20),
    alignItems: 'center',
    paddingBottom: ms(50),
  },
  avatar: {
    width: ms(140),
    height: ms(140),
    borderRadius: ms(140),
    marginVertical: ms(20),
    backgroundColor: Colors.borderCl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...typography._26SofticesExtraBold,
    color: Colors.primary,
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
});
