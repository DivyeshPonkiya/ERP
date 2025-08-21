import React, {useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Platform,
  Pressable,
} from 'react-native';
import ActionBar from '../../components/ActionBar';
import {
  BackSvg,
  CalendarSvg,
  DropDownSvg,
  FilterSvg,
} from '../../assets/Images/svg';
import {goBack, navigate} from '../../navigators/RootNavigation';
import {Colors} from '../../theme/variables';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import {hs, ms, vs} from '../../theme/spacing';
import SearchHeader from '../../components/SearchHeader';
import {strings} from '../../localization';
import EmptyState from '../../components/EmptyState';
import InputField from '../../components/InputField';
import {useDispatch, useSelector} from 'react-redux';
import {urlEndPoint} from '../../constants/urlEndPoint';
import {RootState} from '../../store/store';
import ReusableFilterModal from '../../components/ReusableFilterModal';
import {
  ACTIVE_OPACITY,
  CFL,
  isNull,
  keyValueEmptyFilter,
} from '../../constants/constants';
import {typography} from '../../theme/typography';
import SelectDropdown from '../../components/SelectDropdown/SelectDropdown';

import {AppDispatch} from '../../store/store';
import {fetchReport} from '../../createAsyncThunk/reportThunk';

import _ from 'lodash';
import ReportItem from './ReportItem';
import moment from 'moment';

import BottomDateRangeModal from '../../components/BottomDateRangeModal';

const ReportScreen = ({route, navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const lastStepType = [
    {id: 'product', name: strings.product},
    {id: 'customer', name: strings.customer},
  ];

  const [ReportListData, ReportListLoading, ReportData, error] = useSelector(
    (state: RootState) => [
      state.reportSlice.ReportListData,
      state.reportSlice.ReportListLoading,
      state.reportSlice.ReportData,

      state.reportSlice.error,
    ],
  );

  const [visible, setVisible] = useState(false);
  const [period, setPeriod] = useState(new Date());
  const [reportsList, setReportsList] = useState<any>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [refreshMe, setRefreshMe] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [isFooterLoading, setFooterLoading] = useState(false);
  type GroupByType = {name: string; id: string} | undefined;

  const [filterFormData, setFilterFormData] = useState<{
    start_date: string | Date;
    end_date: string | Date;
    group_by: GroupByType;
  }>({
    start_date: '',
    end_date: '',
    group_by: undefined,
  });

  const endUrl = ReportData?.id;

  useEffect(() => {
    const focusLister = navigation.addListener('focus', () => {
      setRefreshMe(true);
    });

    return focusLister;
  }, [route]);

  useEffect(() => {
    if (refreshMe) {
      setRefreshMe(false);
      dispatch(
        fetchReport({
          endPoint: `${urlEndPoint.reports}/${endUrl}`,
        }),
      );
    }
  }, [refreshMe]);

  useEffect(() => {
    if (error == 501) {
      setFooterLoading(false);
      setRefreshing(false);
      setReportsList([]);
    }
  }, [error]);

  useEffect(() => {
    if (!isNull(ReportListData)) {
      const reportList =
        ReportListData?.productions ??
        ReportListData?.stock ??
        ReportListData?.sales ??
        [];
      setReportsList((prev: any = []) => {
        if (ReportListData?.pagy?.current_page === 1) {
          return reportList;
        } else if (ReportListData?.pagy?.current_page > 1) {
          return [...prev, ...reportList];
        } else {
          return reportList ?? [];
        }
      });
      setFooterLoading(false);
      setRefreshing(false);
    }
  }, [ReportListData]);

  const filterCall = () => {
    setShowDatePicker(false);
    const rawParams = {
      start_date: filterFormData.start_date
        ? moment(filterFormData.start_date)?.format('MMMM D, YYYY')
        : '',
      end_date: filterFormData.end_date
        ? moment(filterFormData.end_date)?.format('MMMM D, YYYY')
        : '',
      group_by: filterFormData?.group_by?.id,
    };

    const params = keyValueEmptyFilter(rawParams);

    dispatch(
      fetchReport({
        params: params,
        endPoint: `${urlEndPoint.reports}/${endUrl}`,
      }),
    );
  };

  const clearFilter = () => {
    setShowDatePicker(false);
    setFilterFormData({
      start_date: '',
      end_date: '',
      group_by: undefined,
    });
    setVisible(false);
    dispatch(
      fetchReport({
        endPoint: `${urlEndPoint.reports}/${endUrl}`,
      }),
    );
  };
  const clearFilter01 = () => {
    setShowDatePicker(false);
    setFilterFormData({
      start_date: filterFormData.start_date,
      end_date: filterFormData.end_date,
      group_by: undefined,
    });
    setVisible(false);
    dispatch(
      fetchReport({
        endPoint: `${urlEndPoint.reports}/${endUrl}`,
      }),
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    setFilterFormData({
      start_date: '',
      end_date: '',
      group_by: undefined,
    });
    dispatch(
      fetchReport({
        endPoint: `${urlEndPoint.reports}/${endUrl}`,
      }),
    );
  };

  const renderFooter = () => {
    return (
      <>
        {isFooterLoading ? (
          <View style={{paddingVertical: ms(16)}}>
            <ActivityIndicator
              color={Colors.primary}
              size={'small'}
              animating={isFooterLoading}
            />
          </View>
        ) : null}
      </>
    );
  };

  const filterContent = () => {
    return (
      <>
        {/* Period */}
        {/* <Text style={[styles.label]}>{strings.dateRange}</Text>
        <TouchableOpacity
          activeOpacity={ACTIVE_OPACITY}
          style={styles.datePicker}
          onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateText}>
            {period.toLocaleDateString('en-GB')}
          </Text>
          <CalendarSvg height={22} width={22} color={Colors.textLight} />
        </TouchableOpacity> */}

        {endUrl == 'sales' ? (
          <SelectDropdown
            data={lastStepType}
            disabled={isNull(lastStepType)}
            buttonStyle={[styles.inputStyleAcc]}
            onSelect={(selectedItem: any, index: any) => {
              setFilterFormData({
                ...filterFormData,
                group_by: {name: selectedItem?.name, id: selectedItem?.id},
              });
            }}
            selectedRowTextStyle={{
              color: Colors.textCl,
              ...typography._14SofticesSemibold,
            }}
            rowTextStyle={{
              color: Colors.textCl,
              ...typography._14SofticesRegular,
            }}
            buttonTextAfterSelection={(selectedItem: any, index: any) => {
              return selectedItem?.name;
            }}
            rowTextForSelection={(item: any, index: any) => {
              return CFL(item?.name);
            }}
            renderCustomizedButtonChild={(selectedItem: any) => {
              return (
                <InputField
                  value={filterFormData?.group_by?.name ?? ''}
                  labelTxt={strings.groupBy}
                  placeholder={strings.productionPlaceholder}
                  editable={false}
                  rightIcon={
                    <View style={{marginRight: ms(12)}}>
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
        ) : null}
      </>
    );
  };

  return (
    <SafeAreaWrapper
      isLoading={reportsList == null ? true : false}
      statusBg={Colors.primary}
      style={styles.container}
      barStyle="light-content">
      <ActionBar
        title={ReportData?.label ?? strings.reports}
        LeftIcon={<BackSvg width={28} height={28} color={Colors.white} />}
        onLeftPress={() => goBack()}
      />

      {/* Date Range Row */}
      <Text style={styles.label}>{strings.dateRange}</Text>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: ms(20),
          marginBottom: ms(16),
        }}>
        <Pressable
          style={styles.dateRangeBox}
          onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateText}>
            {[
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
            )}
          </Text>
          <TouchableOpacity activeOpacity={ACTIVE_OPACITY}>
            <CalendarSvg height={22} width={22} color={Colors.textCl} />
          </TouchableOpacity>
        </Pressable>
        {endUrl == 'sales' ? (
          <View style={styles.filterBtnView}>
            <TouchableOpacity
              activeOpacity={ACTIVE_OPACITY}
              style={{paddingHorizontal: ms(12)}}
              onPress={() => setVisible(true)}>
              <FilterSvg height={20} width={20} color={Colors.black} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      <FlatList
        data={reportsList || []}
        showsVerticalScrollIndicator={false}
        bounces={true}
        onEndReachedThreshold={0.1}
        removeClippedSubviews={true} // removes off-screen items
        initialNumToRender={5} // render only a few initially
        maxToRenderPerBatch={10} // controls the batch rendering size
        keyExtractor={(item: any, index: any) => `${item.id}`}
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
        renderItem={({item}) => <ReportItem item={item} />}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <EmptyState
            title={strings.noDataFound}
            description={strings.noDataFoundDes}
          />
        }
      />

      <ReusableFilterModal
        visible={visible}
        onClose={() => setVisible(false)}
        onApply={() => {
          setVisible(false);
        }}
        onClear={() => {
          clearFilter01();
        }}
        period={period}
        isLoading={ReportListLoading}
        onPeriodChange={setPeriod}>
        {filterContent()}
      </ReusableFilterModal>

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
        onClear={() => clearFilter()}
        onDone={() => filterCall()}
        onClose={() => clearFilter()}
      />
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  activeBtnView: {
    borderWidth: ms(1),
    borderColor: Colors.borderCl,
    borderRadius: ms(10),
    marginBottom: ms(16),
    padding: ms(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    color: Colors.textCl,
    ...typography._16SofticesSemibold,
    padding: ms(10),
  },
  inputStyleAcc: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.borderCl,
    borderRadius: ms(12),
    paddingHorizontal: hs(12),
    paddingVertical: vs(10),
    fontSize: ms(14),
    color: Colors.primary,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: ms(12),
    paddingHorizontal: hs(12),
    paddingVertical: vs(10),
    justifyContent: 'space-between',
    height: ms(50),
    marginBottom: vs(16),
  },
  dateText: {
    flex: 1,
    ...typography._16SofticesRegular,
    color: Colors.textLight,
  },
  label: {
    ...typography._16SofticesSemibold,
    color: Colors.textCl,
    marginBottom: vs(8),
    marginTop: ms(16),
    marginHorizontal: ms(20),
  },
  dateRangeBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.borderCl,
    borderRadius: ms(10),
    padding: ms(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterBtnView: {
    height: ms(56),
    width: ms(56),
    marginLeft: hs(8),
    backgroundColor: Colors.white,
    borderRadius: ms(12),
    borderWidth: ms(1),
    borderColor: Colors.borderCl,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default ReportScreen;
