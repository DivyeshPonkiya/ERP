// Profile.tsx
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import ActionBar from '../../components/ActionBar';
import {DrawerSvg} from '../../assets/Images/svg';
import {ms} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {Colors} from '../../theme/variables';
import InputField from '../../components/InputField';
import {strings} from '../../localization';
import {FirstLatter, isNull} from '../../constants/constants';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {CommonProps} from '../types';
import EmptyState from '../../components/EmptyState';
import {
  fetchHolidays,
  fetchProfile,
} from '../../createAsyncThunk/authAsyncThunk';
import {urlEndPoint} from '../../constants/urlEndPoint';

const ProfileSection = ({formData}: any) => {
  return (
    <>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {FirstLatter(formData?.first_name) +
            FirstLatter(formData?.middle_name)}
        </Text>
      </View>

      <InputField
        value={formData.name}
        labelTxt={strings.name}
        placeholder={strings.na}
        editable={false}
      />
      
      <InputField
        value={formData.companyEmail}
        labelTxt={strings.companyEmail}
        placeholder={strings.na}
        editable={false}
      />
      <InputField
        value={formData.gender}
        labelTxt={strings.gender}
        placeholder={strings.na}
        editable={false}
      />
      <InputField
        value={formData.joiningDate}
        labelTxt={strings.joiningDate}
        placeholder={strings.na}
        editable={false}
      />
      <InputField
        value={formData.onboardingDate}
        labelTxt={strings.onboardingDate}
        placeholder={strings.na}
        editable={false}
      />
      <InputField
        value={formData.nationality}
        labelTxt={strings.nationality}
        placeholder={strings.na}
        editable={false}
      />
    </>
  );
};

const HeadsSection = ({formData}: any) => {
  return (
    <>
      {formData?.map((item: any, index: any) => {
        const head = item?.head;
        const role = item?.role;
        return (
          <View style={styles.boxView}>
            <View style={[styles.titleSubTitleRaw, {paddingTop: ms(10)}]}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.name}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {head?.first_name} {head?.middle_name} {head?.last_name}
              </Text>
            </View>
            <View style={styles.titleSubTitleRaw}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.role}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {role?.name}
              </Text>
            </View>
          </View>
        );
      })}
    </>
  );
};

const DesignationsSection = ({formData}: any) => {
  return (
    <>
      {formData?.map((item: any, index: any) => {
        const designation = item?.designation;
        return (
          <View style={styles.boxView}>
            <View style={[styles.titleSubTitleRaw, {paddingTop: ms(10)}]}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.designation}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {designation?.title}
              </Text>
            </View>
            <View style={styles.titleSubTitleRaw}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.start_date}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {item?.start_date}
              </Text>
            </View>
            <View style={styles.titleSubTitleRaw}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.revoke_date}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {item?.revoke_date || '-'}
              </Text>
            </View>
          </View>
        );
      })}
    </>
  );
};

const DepartmentSection = ({formData}: any) => {
  return (
    <>
      {formData?.map((item: any, index: any) => {
        const department = item?.department;
        return (
          <View style={styles.boxView}>
            <View style={[styles.titleSubTitleRaw, {paddingTop: ms(10)}]}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.department}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {department?.title}
              </Text>
            </View>
            <View style={styles.titleSubTitleRaw}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.start_date}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {item?.start_date}
              </Text>
            </View>
            <View style={styles.titleSubTitleRaw}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.revoke_date}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {item?.revoke_date || '-'}
              </Text>
            </View>
          </View>
        );
      })}
    </>
  );
};

const EducationSection = ({formData}: any) => {
  return (
    <>
      {formData?.map((item: any, index: any) => {
        return (
          <View style={styles.boxView}>
            <View style={[styles.titleSubTitleRaw, {paddingTop: ms(10)}]}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.degree}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {item?.degree}
              </Text>
            </View>
            <View style={styles.titleSubTitleRaw}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.university}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {item?.university}
              </Text>
            </View>
            <View style={styles.titleSubTitleRaw}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.college}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {item?.college}
              </Text>
            </View>
            <View style={styles.titleSubTitleRaw}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.specialization}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {item?.specialization}
              </Text>
            </View>
            <View style={styles.titleSubTitleRaw}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.start_year}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {item?.start_year}
              </Text>
            </View>
            {item?.pursuing !== undefined ? (
              <View style={styles.titleSubTitleRaw}>
                <Text style={[styles.titleText, styles.width38]}>
                  {item?.pursuing ? strings.pursuing : strings.end_year}:
                </Text>
                <Text style={[styles.subTitleText, styles.width63]}>
                  {item?.pursuing ? strings.yes : item?.end_year}
                </Text>
              </View>
            ) : null}
          </View>
        );
      })}
    </>
  );
};

const ExperienceSection = ({formData}: any) => {
  return (
    <>
      {formData?.map((item: any, index: any) => {
        return (
          <View style={styles.boxView}>
            <View style={[styles.titleSubTitleRaw, {paddingTop: ms(10)}]}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.companyName}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {item?.company_name}
              </Text>
            </View>
            <View style={styles.titleSubTitleRaw}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.department}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {item?.department}
              </Text>
            </View>
            <View style={styles.titleSubTitleRaw}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.designation}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {item?.designation}
              </Text>
            </View>
            <View style={styles.titleSubTitleRaw}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.total_working_time_in_month}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {item?.total_working_time_in_month}
              </Text>
            </View>
            <View style={styles.titleSubTitleRaw}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.start_year}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {item?.start_month}/{item?.start_year}
              </Text>
            </View>
            <View style={styles.titleSubTitleRaw}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.end_year}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {item?.end_month}/{item?.end_year}
              </Text>
            </View>
          </View>
        );
      })}
    </>
  );
};

const HolidaysSection = ({formData}: any) => {
  return (
    <>
      {formData?.map((item: any, index: any) => {
        return (
          <View style={styles.boxView}>
            <View style={[styles.titleSubTitleRaw, {paddingTop: ms(10)}]}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.companyName}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {item?.company_name}
              </Text>
            </View>
            <View style={styles.titleSubTitleRaw}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.department}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {item?.department}
              </Text>
            </View>
            <View style={styles.titleSubTitleRaw}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.designation}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {item?.designation}
              </Text>
            </View>
            <View style={styles.titleSubTitleRaw}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.total_working_time_in_month}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {item?.total_working_time_in_month}
              </Text>
            </View>
            <View style={styles.titleSubTitleRaw}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.start_year}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {item?.start_month}/{item?.start_year}
              </Text>
            </View>
            <View style={styles.titleSubTitleRaw}>
              <Text style={[styles.titleText, styles.width38]}>
                {strings.end_year}:
              </Text>
              <Text style={[styles.subTitleText, styles.width63]}>
                {item?.end_month}/{item?.end_year}
              </Text>
            </View>
          </View>
        );
      })}
    </>
  );
};

export default function Profile({route, navigation}: CommonProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [profileData, holidaysData, profileLoading, holidaysLoading] =
    useSelector((state: RootState) => [
      state.authSlice.profileData,
      state.authSlice.holidaysData,
      state.authSlice.profileLoading,
      state.authSlice.holidaysLoading,
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
  const details = profileData?.employee;

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

  useEffect(() => {
    if (!isNull(route?.params?.title == strings.holidays)) {
      dispatch(fetchHolidays({endPoint: urlEndPoint.holidays}));
    }
  }, [route]);

  const onRefresh = () => {
    if (!isNull(route?.params?.title == strings.holidays)) {
      dispatch(fetchHolidays({endPoint: urlEndPoint.holidays}));
    } else {
      dispatch(fetchProfile({endPoint: urlEndPoint.profile}));
    }
  };

  return (
    <SafeAreaWrapper statusBg={Colors.primary} barStyle="light-content">
      <ActionBar
        title={route?.params?.title || strings.profile}
        LeftIcon={<DrawerSvg height={28} width={28} color={Colors.white} />}
        onLeftPress={() => navigation?.openDrawer()}
      />

      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={profileLoading || holidaysLoading}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }>
        {route?.params?.title == strings.basicDetails ? (
          <ProfileSection formData={formData} />
        ) : null}

        {route?.params?.title == strings.heads ? (
          !isNull(details?.employee_heads) ? (
            <HeadsSection formData={details?.employee_heads} />
          ) : (
            <EmptyState
              title={strings.noDataFound}
              description={strings.noDataFoundDes}
            />
          )
        ) : null}

        {route?.params?.title == strings.designations ? (
          !isNull(details?.employee_designations) ? (
            <DesignationsSection formData={details?.employee_designations} />
          ) : (
            <EmptyState
              title={strings.noDataFound}
              description={strings.noDataFoundDes}
            />
          )
        ) : null}

        {route?.params?.title == strings.departments ? (
          !isNull(details?.employee_departments) ? (
            <DepartmentSection formData={details?.employee_departments} />
          ) : (
            <EmptyState
              title={strings.noDataFound}
              description={strings.noDataFoundDes}
            />
          )
        ) : null}

        {route?.params?.title == strings.educations ? (
          !isNull(details?.employee_educations) ? (
            <EducationSection formData={details?.employee_educations} />
          ) : (
            <EmptyState
              title={strings.noDataFound}
              description={strings.noDataFoundDes}
            />
          )
        ) : null}

        {route?.params?.title == strings.experiences ? (
          !isNull(details?.employee_experiences) ? (
            <ExperienceSection formData={details?.employee_experiences} />
          ) : (
            <EmptyState
              title={strings.noDataFound}
              description={strings.noDataFoundDes}
            />
          )
        ) : null}

        {route?.params?.title == strings.holidays ? (
          !isNull(holidaysData) ? (
            <HolidaysSection formData={holidaysData?.holidays} />
          ) : (
            <EmptyState
              title={strings.noDataFound}
              description={strings.noDataFoundDes}
            />
          )
        ) : null}
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(20),
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
    alignSelf: 'center',
  },
  avatarText: {
    ...typography._26SofticesExtraBold,
    color: Colors.primary,
  },

  boxView: {
    borderWidth: ms(1),
    marginTop: ms(20),
    paddingHorizontal: ms(10),
    borderRadius: ms(10),
    borderColor: Colors.borderCl,
  },
  titleSubTitleRaw: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ms(10),
  },
  titleText: {
    ...typography._16SofticesBold,
    color: Colors.textCl,
  },
  subTitleText: {
    ...typography._16SofticesSemibold,
    color: Colors.textCl,
  },
  width38: {width: '38%'},
  width63: {width: '63%', marginLeft: ms(5)},
});
