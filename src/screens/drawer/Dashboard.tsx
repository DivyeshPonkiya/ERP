import React, {useEffect, useState} from 'react';
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {navigate} from '../../navigators/RootNavigation';
import {strings} from '../../localization';
import InputField from '../../components/InputField';
import {Colors} from '../../theme/variables';
import {hs, ms, vs} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import {CalendarSvg, DrawerSvg, DropDownSvg} from '../../assets/Images/svg';
import {CommonProps} from '../types';
import {NAVIGATION} from '../../constants/navigation';
import ActionBar from '../../components/ActionBar';
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
} from '../../assets/Images/svg';
import {ACTIVE_OPACITY, keyValueEmptyFilter} from '../../constants/constants';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {fetchDashboard} from '../../createAsyncThunk/authAsyncThunk';
import {urlEndPoint} from '../../constants/urlEndPoint';
import BottomDateRangeModal from '../../components/BottomDateRangeModal';
import moment from 'moment';

const svgLoad = (key: any, color1: any, styles?: any) => {
  switch (key) {
    case 'Dashboard':
      return <HomeSvg height={30} width={30} color={color1} styles={styles} />;
    case 'Sales':
      return <SalesSvg height={30} width={30} color={color1} styles={styles} />;
    case 'Stocks':
      return (
        <StocksSvg height={30} width={30} color={color1} styles={styles} />
      );
    case 'Productions':
      return (
        <ProductionsSvg height={30} width={30} color={color1} styles={styles} />
      );
    case 'Customers':
      return (
        <CustomersSvg height={30} width={30} color={color1} styles={styles} />
      );
    case 'Products':
      return (
        <ProductsSvg height={30} width={30} color={color1} styles={styles} />
      );
    case 'Works':
      return <WorksSvg height={30} width={30} color={color1} styles={styles} />;
    case 'Reports':
      return (
        <ReportsSvg height={30} width={30} color={color1} styles={styles} />
      );
    case 'Terms of Use':
      return (
        <TermsOfUseSvg height={30} width={30} color={color1} styles={styles} />
      );
    case 'Privacy Policy':
      return (
        <PrivacyPolicySvg
          height={30}
          width={30}
          color={color1}
          styles={styles}
        />
      );
    case 'Logout':
      return (
        <LogoutSvg height={30} width={30} color={color1} styles={styles} />
      );
    default:
      return null;
  }
};

const Dashboard = ({navigation}: CommonProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [dashboardData, dashboardLoading] = useSelector((state: RootState) => [
    state.authSlice.dashboardData,
    state.authSlice.dashboardLoading,
  ]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [applyFilter, setApplyFilter] = useState(false);

  const [filterFormData, setFilterFormData] = useState<{
    start_date: string | Date;
    end_date: string | Date;
  }>({
    start_date: moment().startOf('month').format('YYYY-MM-DD'),
    end_date: moment().endOf('month').format('YYYY-MM-DD'),
  });

  const apiCall = (params?: any) => {
    dispatch(fetchDashboard({params: params, endPoint: urlEndPoint.dashboard}));
  };

  useEffect(() => {
    apiCall();
  }, []);

  useEffect(() => {
    if (applyFilter) {
      const url = {
        start_date: filterFormData.start_date
          ? moment(filterFormData.start_date).format('YYYY-MM-DD HH:mm:ss')
          : '',
        end_date: filterFormData.end_date
          ? moment(filterFormData.end_date).format('YYYY-MM-DD HH:mm:ss')
          : '',
      };
      const params = keyValueEmptyFilter(url);
      apiCall(params);
      setApplyFilter(false);
    }
  }, [applyFilter]);

  const onRefresh = () => {
    apiCall();
    setFilterFormData({
      start_date: moment().startOf('month').format('YYYY-MM-DD'),
      end_date: moment().endOf('month').format('YYYY-MM-DD'),
    });
  };

  const dateRange = [
    filterFormData.start_date
      ? moment(filterFormData.start_date)?.format('MMMM D, YYYY')
      : '',
    filterFormData.end_date
      ? moment(filterFormData.end_date)?.format('MMMM D, YYYY')
      : '',
  ]?.join(
    filterFormData.start_date || filterFormData.end_date
      ? ' - '
      : strings.selectRange,
  );

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
            refreshing={dashboardLoading}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }>
        <View style={styles.form}>
          {/* Date Range Row */}
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            onPress={() => setShowDatePicker(true)}>
            <InputField
              value={dateRange}
              editable={false}
              labelTxt={strings.dateRange}
              placeholder={strings.search}
              rightIcon={
                <CalendarSvg
                  height={22}
                  width={22}
                  color={Colors.textCl}
                  styles={{marginRight: ms(14)}}
                />
              }
            />
          </TouchableOpacity>

          {/* Dashboard Boxes */}
          <View style={styles.cardGrid}>
            {[
              {
                label: strings.sales,
                value: strings.rsSign + (dashboardData?.total_sales || 0),
                redirect: NAVIGATION.SalesScreen,
              },
              {
                label: strings.stocks,
                value: `${dashboardData?.stocks || 0}` + ' ' + strings.units,
                redirect: NAVIGATION.StockScreen,
              },
              {
                label: strings.productions,
                value: (dashboardData?.productions || 0) + ' ' + strings.items,
                redirect: NAVIGATION.ProductionScreen,
              },
              {
                label: strings.customers,
                value: dashboardData?.customers || 0,
                redirect: NAVIGATION.CustomersScreen,
              },
              {
                label: strings.products,
                value: dashboardData?.products || 0,
                redirect: NAVIGATION.ProductsScreen,
              },
            ].map((item, index) => (
              <Pressable
                key={index}
                style={styles.card}
                onPress={() => navigate(item.redirect)}>
                <View style={styles.cardIconWrapper}>
                  {svgLoad(item.label, Colors.primary)}
                </View>
                <Text style={styles.cardLabel}>{item.label}</Text>
                <Text style={styles.cardValue}>{item.value}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomDateRangeModal
        visible={showDatePicker}
        filterFormData={filterFormData}
        onChange={({startDate, endDate}) => {
          setFilterFormData({
            ...filterFormData,
            start_date: startDate,
            end_date: endDate,
          });
        }}
        onClear={() => setShowDatePicker(false)}
        onDone={() => {
          setShowDatePicker(false);
          setApplyFilter(true);
        }}
        onClose={() => setShowDatePicker(false)}
      />
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: ms(20),
  },

  label: {
    ...typography._16SofticesSemibold,
    marginBottom: ms(15),
  },

  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    backgroundColor: Colors.cardBg,
    borderRadius: ms(16),
    paddingVertical: vs(20),
    paddingHorizontal: hs(20),
    marginBottom: vs(18),
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  cardIconWrapper: {
    width: ms(50),
    height: ms(50),
    borderRadius: ms(10),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: vs(18),
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  cardLabel: {
    ...typography._16SofticesRegular,
    color: Colors.textCl,
    marginBottom: vs(4),
  },
  cardValue: {
    ...typography._20SofticesExtraBold,
    color: Colors.textCl,
  },
});

export default Dashboard;
