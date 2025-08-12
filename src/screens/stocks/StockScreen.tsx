import React, {useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  RefreshControl,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import ActionBar from '../../components/ActionBar';
import {BackSvg, CalendarSvg, DropDownSvg} from '../../assets/Images/svg';
import {goBack, navigate} from '../../navigators/RootNavigation';
import {Colors} from '../../theme/variables';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import {height, ms} from '../../theme/spacing';
import SearchHeader from '../../components/SearchHeader';
import {strings} from '../../localization';
import {NAVIGATION} from '../../constants/navigation';
import EmptyState from '../../components/EmptyState';
import ReusableModal from '../../components/ReusableModal';
import {useDispatch, useSelector} from 'react-redux';
import {urlEndPoint} from '../../constants/urlEndPoint';
import {RootState} from '../../store/store';
import {
  ACTIVE_OPACITY,
  CFL,
  isNull,
  keyValueEmptyFilter,
  toastConst,
} from '../../constants/constants';
import {typography} from '../../theme/typography';
import {AppDispatch} from '../../store/store';
import {fetchStock, fetchStockDelete} from '../../createAsyncThunk/stocksThunk';
import {setDeleteStockData} from '../../createSlice/stocksSlice';
import ToastMessage from '../../components/ToastMessage';
import _ from 'lodash';
import CardStockItem from '../../components/CardStockItem';
import RightToLeftFilterModal from '../../components/RightFilterModal';
import BottomDateRangeModal from '../../components/BottomDateRangeModal';
import InputField from '../../components/InputField';
import moment from 'moment';
import SelectDropdown from '../../components/SelectDropdown/SelectDropdown';
import ReusableFilterModal from '../../components/ReusableFilterModal';
import {setProductSearchData} from '../../createSlice/productsSlice';
import {fetchProductsSearch} from '../../createAsyncThunk/productsThunk';

const StockScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [
    StockListData,
    StockListLoading,

    DeleteStockData,
    DeleteStockLoading,
    productSearchData,
    error,
  ] = useSelector((state: RootState) => [
    state.stocksSlice.StockListData,
    state.stocksSlice.StockListLoading,

    state.stocksSlice.DeleteStockData,
    state.stocksSlice.DeleteStockLoading,
    state.productsSlice.productSearchData,

    state.stocksSlice.error,
  ]);

  const [stocksList, setStocksList] = useState<any>(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>({id: 0});

  const [searchFiled, setSearchFiled] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [applyFilter, setApplyFilter] = useState(false);
  const [isFooterLoading, setFooterLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [productList, setProductList] = useState<any>([]);

  const [product, setProduct] = useState('');
  const [visible, setVisible] = useState(false);
  const [period, setPeriod] = useState(new Date());
  type GroupByType = {name: string; id: string} | undefined;

  const [filterFormData, setFilterFormData] = useState<{
    product: GroupByType;
    start_date: string | Date;
    end_date: string | Date;
  }>({
    product: {name: '', id: ''},
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    dispatch(
      fetchStock({
        params: '',
        endPoint: urlEndPoint.stocks,
      }),
    );
  }, []);

  useEffect(() => {
    if (error) {
      setFooterLoading(false);
      setRefreshing(false);
      setApplyFilter(false);
      setStocksList([]);
    }
  }, [error]);

  useEffect(() => {
    if (productSearchData) {
      const itemsArray = Object.keys(productSearchData)
        .filter(key => !isNaN(Number(key))) // keep only numeric keys
        .map(key => productSearchData[key]);
      setProductList(itemsArray);

      // if (dropdownRef && _.size(itemsArray) > 0) {
      //   dropdownRef?.current?.openDropdown();
      // }
      dispatch(setProductSearchData(null));
    }
  }, [productSearchData]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const rawParams = {
        term: filterFormData?.product?.name,
      };
      const params = Object.entries(rawParams).reduce((acc, [key, value]) => {
        if (value !== '' && value !== undefined && value !== null) {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, any>);
      if (!isNull(filterFormData?.product?.name)) {
        dispatch(
          fetchProductsSearch({
            params: params,
            endPoint: urlEndPoint.autocompleteProducts,
          }),
        );
      }
    }, 500); // Adjust the debounce delay as needed

    return () => clearTimeout(delayDebounceFn);
  }, [filterFormData?.product?.name]);

  useEffect(() => {
    if (!isNull(StockListData)) {
      const stockList = StockListData?.stocks || [];
      setStocksList((prev: any = []) => {
        if (StockListData?.pagy?.current_page === 1) {
          return stockList;
        } else if (StockListData?.pagy?.current_page > 1) {
          return [...prev, ...stockList];
        } else {
          return stockList ?? [];
        }
      });
      setFooterLoading(false);
      setRefreshing(false);
      setApplyFilter(false);
    }
  }, [StockListData]);

  useEffect(() => {
    if (DeleteStockData) {
      ToastMessage.set(toastConst.successToast, DeleteStockData?.message);
      dispatch(setDeleteStockData(null));
      setDeleteModal(false);
      setSelectedItem(null);
      const updatedList =
        stocksList?.filter((item: any) => item.id !== selectedItem?.id) || [];
      setStocksList(updatedList);
    }
  }, [DeleteStockData]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const rawParams = {
        search: searchFiled,
      };
      const params = keyValueEmptyFilter(rawParams);
      if (!isNull(searchFiled)) {
        dispatch(
          fetchStock({
            params: params,
            endPoint: urlEndPoint.stocks,
          }),
        );
      }
    }, 500); // Adjust the debounce delay as needed

    return () => clearTimeout(delayDebounceFn);
  }, [searchFiled]);

  function formatUTCDate(date: any) {
    const iso = date.toISOString(); // "2025-07-31T18:30:00.000Z"
    const [datePart, timePart] = iso.split('T');
    const time = timePart.replace('.000Z', '');
    return encodeURIComponent(`${datePart} ${time} UTC`);
  }

  useEffect(() => {
    if (applyFilter) {
      const rawParams = {
        name: filterFormData.product?.name,
        product_id: filterFormData.product?.id,
        start_date: filterFormData.start_date
          ? formatUTCDate(filterFormData.start_date)
          : '',
        end_date: filterFormData.end_date
          ? formatUTCDate(filterFormData.end_date)
          : '',
      };

      const params = keyValueEmptyFilter(rawParams);

      dispatch(
        fetchStock({
          params: params,
          endPoint: urlEndPoint.stocks,
        }),
      );
    }
  }, [applyFilter]);

  const onEndReached = () => {
    if (isFooterLoading) {
      return;
    }
    const stockListPage = StockListData?.pagy || {};
    if (stockListPage?.total_pages > stockListPage?.current_page) {
      const rawParams = {
        page: stockListPage?.current_page + 1,
        name: filterFormData.product?.name,
        product_id: filterFormData.product?.id,
        start_date: filterFormData.start_date
          ? moment(filterFormData.start_date)?.format('MMMM D, YYYY')
          : '',
        end_date: filterFormData.end_date
          ? moment(filterFormData.end_date)?.format('MMMM D, YYYY')
          : '',
      };

      const params = keyValueEmptyFilter(rawParams);

      dispatch(
        fetchStock({
          params: params,
          endPoint: urlEndPoint.stocks,
        }),
      );
      setFooterLoading(true);
    }
  };

  const clearFilter = () => {
    setFilterFormData({
      product: {name: '', id: ''},
      start_date: '',
      end_date: '',
    });
    setVisible(false);
    setApplyFilter(false);
    dispatch(
      fetchStock({
        endPoint: urlEndPoint.stocks,
      }),
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    setSearchFiled('');
    setFilterFormData({
      product: {name: '', id: ''},
      start_date: '',
      end_date: '',
    });
    dispatch(
      fetchStock({
        endPoint: urlEndPoint.stocks,
      }),
    );
  };

  const onDeleteCall = () => {
    dispatch(
      fetchStockDelete({
        endPoint: urlEndPoint.stocks + `/${selectedItem?.id}`,
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

  const modalContent = useMemo(
    () => (
      <View>
        <Text
          style={[typography._16SofticesSemibold, {color: Colors.secondary}]}>
          {selectedItem?.product ? selectedItem?.product?.name : ''}
        </Text>
      </View>
    ),
    [deleteModal, selectedItem],
  ); // Add dependencies if needed

  const filterContent = () => {
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
      <View style={{flex: 1}}>
        <SelectDropdown
          data={productList}
          disableAutoScroll={false}
          search={true}
          onChangeSearchInputText={(text: any) => {
            // Call API with debounce logic in useEffect
            setFilterFormData(prev => ({
              ...prev,
              product: {...prev.product, name: text, id: '', unit: ''},
            }));
          }}
          selectedRowTextStyle={{
            color: Colors.textCl,
            ...typography._14SofticesSemibold,
          }}
          rowTextStyle={{
            color: Colors.textCl,
            ...typography._14SofticesRegular,
          }}
          dropdownStyle={{marginTop: ms(-15)}}
          buttonTextAfterSelection={(selectedItem: any, index: any) => {
            return selectedItem?.name;
          }}
          rowTextForSelection={(item: any, index: any) => {
            return CFL(item?.name);
          }}
          buttonStyle={[styles.inputStyleAcc]}
          searchPlaceHolder={strings.search}
          renderCustomizedButtonChild={(selectedItem: any) => (
            <InputField
              value={filterFormData?.product?.name}
              onChangeText={val => {
                setFilterFormData(prev => ({
                  ...prev,
                  product: {...prev.product, name: val, id: '', unit: ''},
                }));
              }}
              labelTxt={strings.product}
              placeholder={strings.select}
              requiredField={true}
              editable={false}
            />
          )}
          onSelect={(item: any, index: any) => {
            setFilterFormData(prev => ({
              ...prev,
              product: {
                name: item.name,
                id: item.id,
                unit: item.unit,
              },
            }));
          }}
        />

        <TouchableOpacity
          activeOpacity={ACTIVE_OPACITY}
          onPress={() => setShowDatePicker(true)}>
          <InputField
            value={dateRange}
            editable={false}
            labelTxt={strings.period}
            placeholder={strings.search}
            leftIcon={
              <CalendarSvg height={22} width={22} color={Colors.textLight} />
            }
            rightIcon={
              <DropDownSvg
                height={22}
                width={22}
                color={Colors.textLight}
                styles={{marginRight: ms(14)}}
              />
            }
          />
        </TouchableOpacity>
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
          onDone={() => setShowDatePicker(false)}
          onClose={() => setShowDatePicker(false)}
        />
      </View>
    );
  };

  return (
    <SafeAreaWrapper
      isLoading={stocksList == null ? true : false}
      statusBg={Colors.primary}
      style={styles.container}
      barStyle="light-content">
      <ActionBar
        title={strings.stocks}
        LeftIcon={<BackSvg width={28} height={28} color={Colors.white} />}
        onLeftPress={() => goBack()}
        onRightPress={() => navigate(NAVIGATION.AddStock)}
      />

      <SearchHeader
        editable={false}
        onFilterPress={() => setVisible(true)}
        value={filterFormData.product?.name}
        mainStyle={{margin: ms(20)}}
      />

      <FlatList
        data={stocksList || []}
        showsVerticalScrollIndicator={false}
        bounces={true}
        onEndReached={() => {
          onEndReached();
        }}
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
        renderItem={({item}) => (
          <CardStockItem
            item={item}
            onPress={() => navigate(NAVIGATION.StockDetail, {stockData: item})}
            deleteModal={() => {
              setDeleteModal(true), setSelectedItem(item);
            }}
          />
        )}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <EmptyState
            title={strings.noDataFound}
            description={strings.noDataFoundDes}
          />
        }
      />

      <ReusableModal
        visible={deleteModal}
        cancelLabel={strings.cancel}
        submitLabel={strings.delete}
        submitBgColor={Colors.colorRedD4}
        isLoading={DeleteStockLoading}
        title={strings.delete}
        description={strings.deleteConf}
        onClose={() => setDeleteModal(false)}
        onSubmit={() => onDeleteCall()}>
        {modalContent}
      </ReusableModal>

      <ReusableFilterModal
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onApply={() => {
          setVisible(false);
          setApplyFilter(true);
        }}
        onClear={() => {
          clearFilter();
        }}
        isLoading={StockListLoading}>
        {filterContent()}
      </ReusableFilterModal>
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
  },
  inputStyleAcc: {
    width: '100%',
  },
});

export default StockScreen;
