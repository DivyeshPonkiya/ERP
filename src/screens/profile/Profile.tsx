// Profile.tsx
import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ActionBar from '../../components/ActionBar';
import {BackSvg, DeleteSvg, PencilSvg} from '../../assets/Images/svg';
import {ms} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {Colors} from '../../theme/variables';
import InputField from '../../components/InputField';
import {strings} from '../../localization';
import {ACTIVE_OPACITY, hexToRGBA, isNull} from '../../constants/constants';
import {goBack, navigate} from '../../navigators/RootNavigation';
import {NAVIGATION} from '../../constants/navigation';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import ReusableModal from '../../components/ReusableModal';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import FastImageView from '../../components/FastImageView';

export default function Profile({navigation}: any) {
  const dispatch = useDispatch();

  const [profileData, profileLoading] = useSelector((state: RootState) => [
    state.authSlice.profileData,
    state.authSlice.profileLoading,
  ]);

  const [formData, setFormData] = useState({
    photo: '',
    name: '',
    email: '',
  });

  const [password, setPassword] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (!isNull(profileData)) {
      const data = profileData?.user;
      setFormData({
        ...formData,
        photo: data?.photo_url,
        name: data?.name,
        email: data?.email,
      });
    }
  }, [profileData]);

  const modalContent = useMemo(
    () => (
      <View>
        <InputField
          value={password}
          onChangeText={setPassword}
          labelTxt={strings.password}
          placeholder={strings.enterPasswordAddress}
        />
      </View>
    ),
    [],
  ); // Add dependencies if needed

  return (
    <SafeAreaWrapper statusBg={Colors.primary} barStyle="light-content">
      <ActionBar
        title="Profile"
        LeftIcon={<BackSvg width={28} height={28} color={Colors.white} />}
        onLeftPress={() => goBack()}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <FastImageView
          source={formData.photo}
          resizeMode="contain"
          style={styles.profileImage}
        />

        <TouchableOpacity
          activeOpacity={ACTIVE_OPACITY}
          style={styles.editProfileBtn}
          onPress={() => navigate(NAVIGATION.EditProfile)}>
          <PencilSvg width={20} height={20} color={Colors.primary} />
          <View style={{alignItems: 'center'}}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
            <View
              style={{
                height: ms(1),
                backgroundColor: Colors.primary,
                marginTop: ms(2),
                width: '100%',
              }}
            />
          </View>
        </TouchableOpacity>

        <InputField
          value={formData.name}
          onChangeText={val => setFormData({...formData, name: val})}
          labelTxt={strings.name}
          placeholder={'Enter ' + strings.name}
          editable={false}
        />
        <InputField
          value={formData.email}
          onChangeText={val => setFormData({...formData, email: val})}
          labelTxt={strings.email}
          placeholder={'Enter ' + strings.enterEmailAddress}
          editable={false}
        />
      </ScrollView>
      <ReusableModal
        visible={deleteModal}
        cancelLabel={'Cancel'}
        submitLabel={'Delete Account'}
        submitBgColor={Colors.colorRedD4}
        title={'Delete Account'}
        description={
          'Are you sure you want to delete your account? This action is permanent and cannot be undone.'
        }
        onClose={() => setDeleteModal(false)}
        onSubmit={() => setDeleteModal(false)}>
        {modalContent}
      </ReusableModal>

      <TouchableOpacity
        activeOpacity={ACTIVE_OPACITY}
        style={styles.deleteButton}
        onPress={() => setDeleteModal(true)}>
        <DeleteSvg width={20} height={20} color={Colors.colorRedD4} />
        <Text style={styles.deleteText}> Delete Account</Text>
      </TouchableOpacity>
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
    marginVertical: ms(20),
    backgroundColor: Colors.borderCl,
  },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
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
