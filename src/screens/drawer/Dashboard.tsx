import React, {useEffect} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {strings} from '../../localization';
import {Colors} from '../../theme/variables';
import {ms} from '../../theme/spacing';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import {DrawerSvg} from '../../assets/Images/svg';
import {CommonProps} from '../types';
import ActionBar from '../../components/ActionBar';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {fetchProfile} from '../../createAsyncThunk/authAsyncThunk';
import {urlEndPoint} from '../../constants/urlEndPoint';

const Dashboard = ({navigation}: CommonProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [profileLoading] = useSelector((state: RootState) => [
    state.authSlice.profileLoading,
  ]);

  useEffect(() => {
    dispatch(fetchProfile({endPoint: urlEndPoint.profile}));
  }, []);

  const onRefresh = () => {
    dispatch(fetchProfile({endPoint: urlEndPoint.profile}));
  };

  return (
    <SafeAreaWrapper
      style={styles.safeArea}
      statusBg={Colors.primary}
      barStyle="light-content">
      <ActionBar
        title={strings.dashboard}
        LeftIcon={<DrawerSvg height={28} width={28} color={Colors.white} />}
        onLeftPress={() => navigation?.openDrawer()}
      />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={profileLoading}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }>
        <View style={styles.form}></View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    padding: ms(20),
  },
});

export default Dashboard;
