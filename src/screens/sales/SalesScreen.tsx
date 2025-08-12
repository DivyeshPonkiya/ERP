import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
  Text,
  RefreshControl,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import CardItem from '../../components/CardItem';
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
import {CommonProps} from '../types';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {
  fetchSalesDelete,
  fetchSalesList,
} from '../../createAsyncThunk/salesThunk';
import {urlEndPoint} from '../../constants/urlEndPoint';
import {
  ACTIVE_OPACITY,
  isNull,
  keyValueEmptyFilter,
  toastConst,
} from '../../constants/constants';
import {
  setSalesDeleteData,
  setSalesLoaderData,
} from '../../createSlice/salesSlice';
import {typography} from '../../theme/typography';
import LoadViewList from '../../components/LoadViewList';
import ReusableFilterModal from '../../components/ReusableFilterModal';
import BottomDateRangeModal from '../../components/BottomDateRangeModal';
import moment from 'moment';
import InputField from '../../components/InputField';
import {fetchProductsSearch} from '../../createAsyncThunk/productsThunk';
import {fetchCustomerSearch} from '../../createAsyncThunk/customersThunk';
import ToastMessage from '../../components/ToastMessage';

type GroupByType = {name: string; id: string} | undefined;

const SalesScreen = ({navigation}: CommonProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [
    salesListData,
    salesListLoading,
    salesDeleteData,
    salesDeleteLoading,
    productSearchData,
    customerSearchData,
    error,
  ] = useSelector((state: RootState) => [
    state.salesSlice.salesListData,
    state.salesSlice.salesListLoading,
    state.salesSlice.salesDeleteData,
    state.salesSlice.salesDeleteLoading,
    state.productsSlice.productSearchData,
    state.customersSlice.customerSearchData,
    state.customersSlice.error,
  ]);

  const [salesLists, setSalesLists] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [selectDeleteItem, setSelectDeleteItem] = useState<any>('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [applyFilter, setApplyFilter] = useState(false);
  const [isFooterLoading, setFooterLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const isFirstRender = useRef(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [searchProductList, setSearchProductList] = useState<any>([]);
  const [searchCustomerList, setSearchCustomerList] = useState<any>([]);
  const [isSearchProductModal, setSearchProductModal] = useState<any>(false);
  const [isSearchCustomerModal, setSearchCustomerModal] = useState<any>(false);
  const [filterFormData, setFilterFormData] = useState<{
    product: GroupByType;
    customer: GroupByType;
    start_date: string | Date;
    end_date: string | Date;
  }>({
    product: {name: '', id: ''},
    customer: {name: '', id: ''},
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    dispatch(fetchSalesList({params: '', endPoint: urlEndPoint.sales}));
  }, []);

  useEffect(() => {
    if (!isNull(salesListData)) {
      const salesListGet = salesListData?.sales || [];

      setSalesLists((prev: any = []) => {
        if (salesListData?.pagy?.current_page === 1) {
          return salesListGet;
        } else if (salesListData?.pagy?.current_page > 1) {
          return [...prev, ...salesListGet];
        } else {
          return salesListGet ?? [];
        }
      });

      setFooterLoading(false);
      setRefreshing(false);
      setApplyFilter(false);
    }
  }, [salesListData]);

  useEffect(() => {
    if (applyFilter) {
      const url = {
        product_name: filterFormData.product?.name,
        product_id: filterFormData.product?.id,
        customer_name: filterFormData.customer?.name,
        customer_id: filterFormData.customer?.id,
        start_date: filterFormData.start_date
          ? moment(filterFormData.start_date).format('YYYY-MM-DD HH:mm:ss')
          : '',
        end_date: filterFormData.end_date
          ? moment(filterFormData.end_date).format('YYYY-MM-DD HH:mm:ss')
          : '',
      };
      const params = keyValueEmptyFilter(url);
      dispatch(fetchSalesList({params: params, endPoint: urlEndPoint.sales}));
    }
  }, [applyFilter]);

  useEffect(() => {
    if (salesDeleteData) {
      ToastMessage.set(toastConst.errorToast, salesDeleteData?.message);
      const updatedList =
        salesLists?.filter((item: any) => item.id !== selectDeleteItem?.id) ||
        [];
      setSalesLists(updatedList);
      setSelectDeleteItem('');
      dispatch(setSalesDeleteData(null));
      setDeleteModal(false);
    }
  }, [salesDeleteData]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (productSearchData) {
      const itemsArray = Object.keys(productSearchData)
        .filter(key => !isNaN(Number(key))) // keep only numeric keys
        .map(key => productSearchData[key]);
      setSearchProductList(itemsArray);
    }
  }, [productSearchData]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (customerSearchData) {
      const itemsArray = Object.keys(customerSearchData)
        .filter(key => !isNaN(Number(key))) // keep only numeric keys
        .map(key => customerSearchData[key]);
      setSearchCustomerList(itemsArray);
    }
  }, [customerSearchData]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isSearchProductModal) {
      const delayDebounceFn = setTimeout(() => {
        const url = {
          term: filterFormData.product?.name,
        };
        dispatch(
          fetchProductsSearch({
            params: url,
            endPoint: urlEndPoint.autocompleteProducts,
          }),
        );
      }, 500); // Adjust the debounce delay as needed
      return () => clearTimeout(delayDebounceFn);
    }
  }, [filterFormData.product?.name]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isSearchCustomerModal) {
      const delayDebounceFn = setTimeout(() => {
        const url = {
          term: filterFormData.customer?.name,
        };
        dispatch(
          fetchCustomerSearch({
            params: url,
            endPoint: urlEndPoint.autocompleteCustomers,
          }),
        );
      }, 500); // Adjust the debounce delay as needed
      return () => clearTimeout(delayDebounceFn);
    }
  }, [filterFormData.customer?.name]);

  useEffect(() => {
    if (error) {
      dispatch(setSalesLoaderData(null));
      setFilterFormData({
        product: {name: '', id: ''},
        customer: {name: '', id: ''},
        start_date: '',
        end_date: '',
      });
      setSelectDeleteItem('');
      setSalesLists([]);
      setDeleteModal(false);
      setApplyFilter(false);
      setFooterLoading(false);
      setRefreshing(false);
    }
  }, [error]);

  const onEndReached = () => {
    if (isFooterLoading) {
      return;
    }
    const productListGet = salesListData?.pagy;
    if (productListGet?.total_pages > productListGet?.current_page) {
      const url = {
        page: productListGet?.current_page + 1,
        product_name: filterFormData.product?.name,
        product_id: filterFormData.product?.id,
        customer_name: filterFormData.customer?.name,
        customer_id: filterFormData.customer?.id,
        start_date: filterFormData.start_date
          ? moment(filterFormData.start_date).format('YYYY-MM-DD HH:mm:ss')
          : '',
        end_date: filterFormData.end_date
          ? moment(filterFormData.end_date).format('YYYY-MM-DD HH:mm:ss')
          : '',
      };
      const params = keyValueEmptyFilter(url);
      dispatch(fetchSalesList({params: params, endPoint: urlEndPoint.sales}));

      setFooterLoading(true);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setFilterFormData({
      product: {name: '', id: ''},
      customer: {name: '', id: ''},
      start_date: '',
      end_date: '',
    });
    setSelectDeleteItem('');
    dispatch(fetchSalesList({params: '', endPoint: urlEndPoint.sales}));
  };

  const deleteHandel = () => {
    if (selectDeleteItem) {
      dispatch(
        fetchSalesDelete({
          params: '',
          endPoint: urlEndPoint.sales + `/${selectDeleteItem?.id}`,
        }),
      );
    }
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

  const modalContent = () => (
    <View>
      <Text style={styles.titleText}>
        {selectDeleteItem?.product?.code}
        {' - '}
        {selectDeleteItem?.product?.name}
      </Text>
    </View>
  );

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
      <View style={{height: height}}>
        <View>
          <InputField
            value={filterFormData.product?.name}
            onChangeText={val =>
              setFilterFormData({
                ...filterFormData,
                product: {name: val, id: ''},
              })
            }
            onFocus={() => {
              setSearchProductModal(true);
              setSearchCustomerModal(false);
            }}
            labelTxt={strings.product}
            placeholder={strings.search}
            requiredField={true}
          />
          {visible && isSearchProductModal ? (
            <View style={styles.searchContainer}>
              <FlatList
                data={searchProductList}
                showsVerticalScrollIndicator={false}
                style={{
                  backgroundColor: Colors.white,
                  maxHeight: (height * 30) / 100,
                  borderRadius: ms(10),
                }}
                keyExtractor={({id}, index) => id}
                renderItem={({item, index}: any) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={ACTIVE_OPACITY}
                      onPress={() => {
                        setFilterFormData({
                          ...filterFormData,
                          product: {name: item?.name, id: item?.id},
                        });
                        setSearchProductModal(false);
                      }}
                      style={styles.searchRow}>
                      <Text style={styles.searchRowText}>{item?.name}</Text>
                    </TouchableOpacity>
                  );
                }}
                ListEmptyComponent={() => (
                  <View style={{alignItems: 'center', paddingVertical: ms(10)}}>
                    <Text style={styles.searchRowText}>
                      {strings.noDataFound}
                    </Text>
                  </View>
                )}
              />
            </View>
          ) : null}
        </View>
        <View>
          <InputField
            value={filterFormData.customer?.name}
            onChangeText={val =>
              setFilterFormData({
                ...filterFormData,
                customer: {name: val, id: ''},
              })
            }
            onFocus={() => {
              setSearchCustomerModal(true);
              setSearchProductModal(false);
            }}
            labelTxt={strings.customer}
            placeholder={strings.search}
            requiredField={true}
          />
          {visible && isSearchCustomerModal ? (
            <View style={styles.searchContainer}>
              <FlatList
                data={searchCustomerList}
                showsVerticalScrollIndicator={false}
                style={{
                  backgroundColor: Colors.white,
                  maxHeight: (height * 30) / 100,
                  borderRadius: ms(10),
                }}
                keyExtractor={({id}, index) => id}
                renderItem={({item, index}: any) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={ACTIVE_OPACITY}
                      onPress={() => {
                        setFilterFormData({
                          ...filterFormData,
                          customer: {name: item?.name, id: item?.id},
                        });
                        setSearchCustomerModal(false);
                      }}
                      style={styles.searchRow}>
                      <Text style={styles.searchRowText}>{item?.name}</Text>
                    </TouchableOpacity>
                  );
                }}
                ListEmptyComponent={() => (
                  <View style={{alignItems: 'center', paddingVertical: ms(10)}}>
                    <Text style={styles.searchRowText}>
                      {strings.noDataFound}
                    </Text>
                  </View>
                )}
              />
            </View>
          ) : null}
        </View>
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
      statusBg={Colors.primary}
      style={styles.container}
      barStyle="light-content">
      <ActionBar
        title={strings.sales}
        LeftIcon={<BackSvg width={28} height={28} color={Colors.white} />}
        onLeftPress={() => goBack()}
        onRightPress={() => navigate(NAVIGATION.AddSales)}
      />

      <View>
        <SearchHeader
          value={filterFormData.product?.name}
          onChangeText={val =>
            setFilterFormData({
              ...filterFormData,
              product: {name: val, id: ''},
            })
          }
          onFocus={() => {
            setSearchProductModal(true);
            setSearchCustomerModal(false);
          }}
          onBlur={() => {
            setTimeout(() => {
              setSearchProductModal(false);
              setSearchCustomerModal(false);
            }, 1000);
          }}
          onFilterPress={() => setVisible(true)}
          mainStyle={{margin: ms(20)}}
        />
        {!visible && isSearchProductModal ? (
          <View
            style={[
              styles.searchContainer,
              {width: '74%', marginLeft: ms(20)},
            ]}>
            <FlatList
              data={searchProductList}
              showsVerticalScrollIndicator={false}
              style={{
                backgroundColor: Colors.white,
                maxHeight: (height * 30) / 100,
                borderRadius: ms(10),
              }}
              keyExtractor={({id}, index) => id}
              renderItem={({item, index}: any) => {
                return (
                  <TouchableOpacity
                    activeOpacity={ACTIVE_OPACITY}
                    onPress={() => {
                      setFilterFormData({
                        ...filterFormData,
                        product: {name: item?.name, id: item?.id},
                      });
                      setSearchProductModal(false);
                      setApplyFilter(true);
                    }}
                    style={styles.searchRow}>
                    <Text style={styles.searchRowText}>{item?.name}</Text>
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={() => (
                <View style={{alignItems: 'center', paddingVertical: ms(10)}}>
                  <Text style={styles.searchRowText}>
                    {strings.noDataFound}
                  </Text>
                </View>
              )}
            />
          </View>
        ) : null}
      </View>

      {salesLists == null ? (
        <LoadViewList />
      ) : (
        <FlatList
          data={salesLists}
          showsVerticalScrollIndicator={false}
          bounces={true}
          onEndReached={() => {
            onEndReached();
          }}
          contentContainerStyle={{height: height}}
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
            <CardItem
              item={item}
              onPress={() => {
                navigate(NAVIGATION.SaleDetail, item);
                // setSearchProductModal(false);
              }}
              deleteModal={() => {
                setSelectDeleteItem(item);
                setDeleteModal(true);
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
      )}

      <ReusableModal
        visible={deleteModal}
        cancelLabel={strings.cancel}
        submitLabel={strings.delete}
        submitBgColor={Colors.colorRedD4}
        title={strings.delete}
        description={strings.deleteConf}
        isLoading={salesDeleteLoading}
        onClose={() => {
          setDeleteModal(false);
          setSelectDeleteItem('');
        }}
        onSubmit={() => deleteHandel()}>
        {modalContent()}
      </ReusableModal>

      <ReusableFilterModal
        visible={visible}
        onClose={() => {
          setVisible(false);
          setSearchProductModal(false);
          setSearchCustomerModal(false);
        }}
        onApply={() => {
          setVisible(false);
          setApplyFilter(true);
        }}
        onClear={() => {
          setFilterFormData({
            product: {name: '', id: ''},
            customer: {name: '', id: ''},
            start_date: '',
            end_date: '',
          });
        }}
        scrollEnabled={!isSearchProductModal && !isSearchCustomerModal}
        isLoading={salesListLoading}>
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
  inputStyleAcc: {
    width: '100%',
  },
  titleText: {
    color: Colors.textCl,
    ...typography._16SofticesSemibold,
  },
  searchContainer: {
    position: 'absolute',
    top: ms(80),
    width: '100%',
    elevation: 10,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    zIndex: 1,
    backgroundColor: Colors.white,
    borderRadius: ms(10),
  },
  searchRow: {
    padding: ms(10),
    borderBottomWidth: ms(1),
    borderBlockColor: Colors.borderCl,
  },
  searchRowText: {
    color: Colors.textCl,
    ...typography._14SofticesRegular,
  },
});

export default SalesScreen;
