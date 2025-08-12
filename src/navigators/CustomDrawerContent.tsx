import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
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
  Access_Token,
  ACTIVE_OPACITY,
  asyncKeys,
  Client_Id,
  Client_Secret,
  toastConst,
} from '../constants/constants';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store/store';
import FastImageView from '../components/FastImageView';
import {setProfileData, setRevokeData} from '../createSlice/authSlice';
import {strings} from '../localization';
import {setEndUrl} from '../createSlice/reportSlice';
import {fetchRevoke} from '../createAsyncThunk/authAsyncThunk';
import {urlEndPoint} from '../constants/urlEndPoint';
import {resetState} from '../createAsyncThunk/resetStateAsyncThunk';
import storage from '../storage';
import ToastMessage from '../components/ToastMessage';
import {CommonProps} from '../screens/types';

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
      return null;
  }
};

const CustomDrawer = ({navigation}: CommonProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [expandedMenus, setExpandedMenus] = useState<{[key: string]: boolean}>(
    {},
  );

  const toggleExpand = (label: string) => {
    setExpandedMenus(prev => ({...prev, [label]: !prev[label]}));
  };

  const menuItems = [
    {label: strings.dashboard, redirect: NAVIGATION.Dashboard},
    {label: strings.sales, redirect: NAVIGATION.SalesScreen},
    {label: strings.stocks, redirect: NAVIGATION.StockScreen},
    {label: strings.productions, redirect: NAVIGATION.ProductionScreen},
    {label: strings.customers, redirect: NAVIGATION.CustomersScreen},
    {label: strings.products, redirect: NAVIGATION.ProductsScreen},
    {label: strings.works, redirect: NAVIGATION.WorksScreen},
    {
      label: strings.reports,
      redirect: NAVIGATION.ReportScreen,
      isExpandable: true,
      subItems: [
        {id: 'production', label: strings.productions},
        {id: 'stock', label: strings.stocks},
        {id: 'sales', label: strings.sales},
      ],
    },
    {label: strings.termUse, redirect: NAVIGATION.TermsOfUse},
    {label: strings.privacyPolicy, redirect: NAVIGATION.PrivacyPolicy},
    {label: strings.logout, redirect: 'power'},
  ];

  const [profileData, revokeData, revokeLoading] = useSelector(
    (state: RootState) => [
      state.authSlice.profileData,
      state.authSlice.revokeData,
      state.authSlice.revokeLoading,
    ],
  );
  const profileDetail = profileData?.user;

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
        <Pressable
          style={styles.profileRow}
          onPress={() => navigate(NAVIGATION.Profile)}>
          <FastImageView
            source={profileDetail?.photo_url}
            resizeMode="contain"
            style={styles.avatar}
          />
          <Text style={styles.name}>{profileDetail?.name ?? 'User'}</Text>
        </Pressable>
      </View>
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
      navigate(redirect);
      dispatch(setEndUrl(data));
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
});

export default CustomDrawer;
