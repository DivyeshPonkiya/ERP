import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {typography} from '../theme/typography';
import {Colors} from '../theme/variables';
import {ms} from '../theme/spacing';
import {navigate} from './RootNavigation';
import {NAVIGATION} from '../constants/navigation';
import {
  CustomersSvg,
  HomeSvg,
  LogoutSvg,
  PrivacyPolicySvg,
  ProductionsSvg,
  ProductsSvg,
  ReportsSvg,
  SalesSvg,
  StocksSvg,
  TermsOfUseSvg,
  WorksSvg,
} from '../assets/Images/svg';
import {DropDownSvg} from '../assets/Images/svg/DropDownSvg';
import {
  ACTIVE_OPACITY,
  asyncKeys,
  CFL,
  Client_Id,
  Client_Secret,
  FirstLatter,
  isNull,
  toastConst,
} from '../constants/constants';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store/store';
import {setProfileData, setRevokeData} from '../createSlice/authSlice';
import {strings} from '../localization';
import {fetchRevoke} from '../createAsyncThunk/authAsyncThunk';
import {urlEndPoint} from '../constants/urlEndPoint';
import {resetState} from '../createAsyncThunk/resetStateAsyncThunk';
import storage from '../storage';
import ToastMessage from '../components/ToastMessage';
import {CommonProps} from '../screens/types';
import SelectDropdown from '../components/SelectDropdown/SelectDropdown';
import InputField from '../components/InputField';
import { setEmployeeEndPoint } from '../createSlice/employeeSlice';

interface MenuSubItem {
  id?: any;
  label?: string;
  redirect?: string;

}

interface menuProps {
  label: string;
  redirect: string;
  isExpandable?: boolean; 
  subItems?: MenuSubItem[];
}

const modulesList = [
  {
    name: strings.employee,
    id: 'employee',
    icon: <HomeSvg height={22} width={22} color={Colors.textLight} />,
  },
  {
    name: strings.procurement,
    id: 'procurement',
    icon: <HomeSvg height={22} width={22} color={Colors.textLight} />,
  },
  {
    name: strings.sale,
    id: 'sale',
    icon: <SalesSvg height={22} width={22} color={Colors.textLight} />,
  },
  {
    name: strings.farmer,
    id: 'farmer',
    icon: <HomeSvg height={22} width={22} color={Colors.textLight} />,
  },
];

const svgLoad = (key: any, color1: any, styles?: any) => {
  switch (key) {
    case strings.dashboard:
      return <HomeSvg height={24} width={24} color={color1} styles={styles} />;
    case strings.sales:
      return <SalesSvg height={24} width={24} color={color1} styles={styles} />;
    case strings.stocks:
      return (
        <StocksSvg height={24} width={24} color={color1} styles={styles} />
      );
    case strings.productions:
      return (
        <ProductionsSvg height={24} width={24} color={color1} styles={styles} />
      );
    case strings.customers:
      return (
        <CustomersSvg height={24} width={24} color={color1} styles={styles} />
      );
    case strings.products:
      return (
        <ProductsSvg height={24} width={24} color={color1} styles={styles} />
      );
    case strings.works:
      return <WorksSvg height={24} width={24} color={color1} styles={styles} />;
    case 'Reports':
      return (
        <ReportsSvg height={24} width={24} color={color1} styles={styles} />
      );
    case 'Terms of Use':
      return (
        <TermsOfUseSvg height={24} width={24} color={color1} styles={styles} />
      );
    case 'Privacy Policy':
      return (
        <PrivacyPolicySvg
          height={24}
          width={24}
          color={color1}
          styles={styles}
        />
      );
    case 'Logout':
      return (
        <LogoutSvg height={24} width={24} color={color1} styles={styles} />
      );
    default:
      return <HomeSvg height={24} width={24} color={color1} styles={styles} />;
  }
};

const CustomDrawer = ({route, navigation}: CommonProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [profileData, revokeData, revokeLoading] = useSelector(
    (state: RootState) => [
      state.authSlice.profileData,
      state.authSlice.revokeData,
      state.authSlice.revokeLoading,
    ],
  );
  const profileDetail = profileData?.employee;

  const [expandedMenus, setExpandedMenus] = useState<{[key: string]: boolean}>(
    {},
  );
  const [selectModule, setSelectModule] = useState({
    name: strings.employee,
    id: 'employee',
    icon: <HomeSvg height={22} width={22} color={Colors.textLight} />,
  });

  const toggleExpand = (label: string) => {
    setExpandedMenus(prev => ({...prev, [label]: !prev[label]}));
  };

  const menuEmployeeItem = useMemo<menuProps[]>(() => {
    const items: menuProps[] = [
      {label: strings.dashboard, redirect: NAVIGATION.Dashboard},
       {
      label: strings.profile,
      redirect: NAVIGATION.Profile,
      isExpandable: true,
      subItems: [
      {id:urlEndPoint.employeeProfile,label: strings.basicDetails, redirect: NAVIGATION.Profile},
      {id:urlEndPoint.employeeHeads,label: strings.heads, redirect: NAVIGATION.Profile},
      {id:urlEndPoint.employeeDesignations,label: strings.designations, redirect: NAVIGATION.Profile},
      {id:urlEndPoint.employeeDepartments,label: strings.departments, redirect: NAVIGATION.Profile},
      {id:urlEndPoint.employeeEducations,label: strings.educations, redirect: NAVIGATION.Profile},
      {id:urlEndPoint.employeeExperiences,label: strings.experiences, redirect: NAVIGATION.Profile},
      ],
    },
      {label: strings.holidays, redirect: NAVIGATION.Profile},
      {label: strings.leaves, redirect: NAVIGATION.Leaves},
      {label: strings.logout, redirect: 'power'},

    ];

 

    return items;
  }, [profileDetail]);

  const menuFarmerItem = useMemo<menuProps[]>(() => {
    const items: menuProps[] = [
      {label: strings.profile, redirect: NAVIGATION.Profile},
    ];
    return items;
  }, []);

  const [menuItems, setMenuItems] = useState<menuProps[]>(menuEmployeeItem);

  useEffect(() => {
    if (selectModule) {
      setMenuItems(
        selectModule.id == 'employee'
          ? menuEmployeeItem
          : selectModule.id == 'farmer'
          ? menuFarmerItem
          : [],
      );
      if (selectModule.id == 'employee') {
        // navigate(NAVIGATION.Dashboard);
      } else if (selectModule.id == 'farmer') {
        // navigate(NAVIGATION.Profile, {title: strings.designation});
      }
    }
  }, [selectModule]);

  useEffect(() => {
    if (revokeData) {
      ToastMessage.set(toastConst.errorToast, revokeData?.message);
      setTimeout(() => {
        dispatch(setProfileData(null));
        dispatch(setRevokeData(null));
        dispatch(resetState());
      }, 1000);
    }
  }, [revokeData]);

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {FirstLatter(profileDetail?.first_name) +
                FirstLatter(profileDetail?.middle_name)}
            </Text>
          </View>

          <Text style={styles.name}>
            {profileDetail?.first_name +
              ' ' +
              profileDetail?.middle_name +
              ' ' +
              profileDetail?.last_name}
          </Text>
        </View>
      </View>

      <SelectDropdown
        data={modulesList}
        disabled={isNull(modulesList)}
        buttonStyle={[styles.inputStyleAcc]}
        onSelect={(selectedItem: any, index: any) => {
          setSelectModule({
            name: selectedItem?.name,
            id: selectedItem?.id,
            icon: selectedItem?.icon,
          });
        }}
        selectedRowTextStyle={{
          color: Colors.textCl,
          ...typography._18SofticesRegular,
        }}
        rowTextStyle={{
          color: Colors.textCl,
          ...typography._14SofticesRegular,
          textAlign: 'left',
        }}
        buttonTextAfterSelection={(selectedItem: any, index: any) => {
          return selectedItem?.name;
        }}
        rowTextForSelection={(item: any, index: any) => {
          return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {item?.icon}
              <Text
                style={{
                  marginLeft: ms(10),
                  color: Colors.textCl,
                  ...typography._18SofticesRegular,
                }}>
                {CFL(item?.name)}
              </Text>
            </View>
          );
        }}
        renderCustomizedButtonChild={(selectedItem: any) => {
          return (
            <InputField
              value={selectModule.name}
              onChangeText={() =>
                setSelectModule({name: '', id: '', icon: <></>})
              }
              labelTxt={strings.modules}
              
              placeholder={strings.productionPlaceholder}
              editable={false}
              inputStyle={{...typography._18SofticesMedium}}
              rightIcon={
                <View style={{marginRight: ms(14)}}>
                  <DropDownSvg
                    height={22}
                    width={22}
                    color={Colors.textLight}
                  />
                </View>
              }
            />
          );
        }}
      />

      <ScrollView>
        <View style={{flex: 1, pointerEvents: revokeLoading ? 'none' : 'auto'}}>
          {menuItems.map((item, index) => {
            const isExpanded = expandedMenus[item.label];

            if (item.isExpandable) {
              return (
                <View key={index}>
                  <TouchableOpacity
                    activeOpacity={ACTIVE_OPACITY}
                    onPress={() => toggleExpand(item.label)}
                    style={styles.row}>
                    {svgLoad(item.label, Colors.textCl)}
                    <Text style={styles.label}>{item.label}</Text>
                    <DropDownSvg
                      width={22}
                      height={22}
                      color={Colors.textCl}
                      styles={{position: 'absolute', right: 0}}
                    />
                  </TouchableOpacity>
                  {isExpanded &&
                    item.subItems?.map((subItem, subIdx) => (
                      <DrawerItem
                        key={subIdx}
                        data={subItem}
                        label={subItem.label}
                        redirect={item.redirect}
                        isSub
                      />
                    ))}
                </View>
              );
            }

            return (
              <DrawerItem
                key={index}
                label={item.label}
                redirect={item.redirect}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const DrawerItem = ({data, redirect, label, isSub = false}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const token = storage.getString(asyncKeys.accessToken);

  const logOutParam = {
    client_id: Client_Id,
    client_secret: Client_Secret,
    token: token,
  };
  const handlePress = () => {
    if (label === strings.logout) {
      Alert.alert(strings.logout, strings.logoutDesc, [
        {text: strings.no},
        {
          text: strings.yes,
          onPress: () => {
            dispatch(
              fetchRevoke({params: logOutParam, endPoint: urlEndPoint.revoke}),
            );
          },
        },
      ]);
    } else {
      navigate(redirect, {title: label}, redirect == NAVIGATION.Profile);
      dispatch(setEmployeeEndPoint(data?.id));
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={ACTIVE_OPACITY}
      style={[styles.row, isSub && styles.subRow]}
      onPress={handlePress}>
      {!isSub && redirect && svgLoad(label, Colors.textCl)}
      <Text
        style={[
          styles.label,
          isSub && styles.subLabel,
          {marginLeft: isSub ? ms(16) : ms(16)},
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(20),
    flex: 1,
    backgroundColor: Colors.white,
  },
  profileSection: {marginVertical: ms(20), marginTop: ms(40)},
  profileRow: {flexDirection: 'row', alignItems: 'center'},
  avatar: {
    width: ms(80),
    height: ms(80),
    borderRadius: ms(40),
    backgroundColor: Colors.borderCl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...typography._24SofticesBold,
    color: Colors.primary,
  },
  name: {
    marginLeft: ms(18),
    ...typography._24SofticesBold,
    color: Colors.primary,
    flexShrink: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(20),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.borderCl,
  },
  subRow: {paddingLeft: ms(10)},
  label: {
    ...typography._18SofticesRegular,
    color: Colors.textCl,
    marginLeft: ms(16),
  },
  subLabel: {
    ...typography._18SofticesLight,
    color: Colors.textCl,
  },
  inputStyleAcc: {
    width: '100%',
  },
});

export default CustomDrawer;
