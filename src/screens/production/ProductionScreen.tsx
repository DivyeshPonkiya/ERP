import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
  Text,
  RefreshControl,
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
import InputField from '../../components/InputField';
import CardProductionItem from '../../components/CardProductionItem';
import SortingModal from '../../components/SortingModal';
import {CommonProps} from '../types';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {
  fetchProductionDelete,
  fetchProductionDetail,
  fetchProductionList,
} from '../../createAsyncThunk/productionsThunk';
import {urlEndPoint} from '../../constants/urlEndPoint';
import {
  ACTIVE_OPACITY,
  CFL,
  isNull,
  keyValueEmptyFilter,
  toastConst,
} from '../../constants/constants';
import {
  setProductionDeleteData,
  setProductionDetailData,
  setProductionLoaderData,
} from '../../createSlice/productionsSlice';
import {typography} from '../../theme/typography';
import SelectDropdown from '../../components/SelectDropdown/SelectDropdown';
import ReusableFilterModal from '../../components/ReusableFilterModal';
import LoadViewList from '../../components/LoadViewList';
import ToastMessage from '../../components/ToastMessage';
import {fetchWorkSearch} from '../../createAsyncThunk/employeeThunk';
import BottomDateRangeModal from '../../components/BottomDateRangeModal';
import moment from 'moment';
import {fetchProductsSearch} from '../../createAsyncThunk/productsThunk';

type GroupByType = {name: string; id: string} | undefined;

const statusType = [
  {name: strings.all, id: ''},
  {name: strings.inProgress, id: 'in_progress'},
  {name: strings.completed, id: 'completed'},
  {name: strings.cancelled, id: 'cancelled'},
];

const ProductionScreen = ({navigation}: CommonProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [
    ProductionListData,
    ProductionListLoading,
    productionDeleteData,
    productionDeleteLoading,
    workSearchData,
    productSearchData,
    error,
  ] = useSelector((state: RootState) => [
    state.productionsSlice.ProductionListData,
    state.productionsSlice.ProductionListLoading,
    state.productionsSlice.productionDeleteData,
    state.productionsSlice.productionDeleteLoading,
    state.worksSlice.WorkSearchData,
    state.productsSlice.productSearchData,
    state.productionsSlice.error,
  ]);

  const [productionLists, setProductionLists] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [sortingModal, setSortingModal] = useState(false);
  const [selectDeleteItem, setSelectDeleteItem] = useState<any>('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [applyFilter, setApplyFilter] = useState(false);
  const [sortingFilter, setSortingFilter] = useState(false);
  const [isFooterLoading, setFooterLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchProductList, setSearchProductList] = useState<any>([]);
  const [workListData, setWorkListData] = useState<any>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [isSearchProductModal, setSearchProductModal] = useState<any>(false);
  const [filterFormData, setFilterFormData] = useState<{
    product: GroupByType;
    workType: GroupByType;
    statusType: GroupByType;
    start_date: string | Date;
    end_date: string | Date;
  }>({
    product: {name: '', id: ''},
    workType: {name: '', id: ''},
    statusType: {name: '', id: ''},
    start_date: '',
    end_date: '',
  });
  const isFirstRender = useRef(true);

  useEffect(() => {
    dispatch(
      fetchProductionList({params: '', endPoint: urlEndPoint.productions}),
    );
    dispatch(
      fetchWorkSearch({params: '', endPoint: urlEndPoint.autocompleteWorks}),
    );
  }, []);

  useEffect(() => {
    if (workSearchData) {
      const itemsArray = Object.keys(workSearchData)
        .filter(key => !isNaN(Number(key))) // keep only numeric keys
        .map(key => workSearchData[key]);
      setWorkListData(itemsArray);
    }
  }, [workSearchData]);

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
    if (!isNull(ProductionListData)) {
      const productionListGet = ProductionListData?.productions || [];

      setProductionLists((prev: any = []) => {
        if (ProductionListData?.pagy?.current_page === 1) {
          return productionListGet;
        } else if (ProductionListData?.pagy?.current_page > 1) {
          return [...prev, ...productionListGet];
        } else {
          return productionListGet ?? [];
        }
      });

      setFooterLoading(false);
      setRefreshing(false);
      setApplyFilter(false);
      setSortingFilter(false);
    }
  }, [ProductionListData]);

  useEffect(() => {
    if (applyFilter) {
      const url = {
        name: filterFormData.product?.name,
        product_id: filterFormData.product?.id,
        work_id: filterFormData.workType?.id,
        start_date: filterFormData.start_date,
        end_date: filterFormData.end_date,
        status: filterFormData.statusType?.id,
      };
      const params = keyValueEmptyFilter(url);

      dispatch(
        fetchProductionList({
          params: params,
          endPoint: urlEndPoint.productions,
        }),
      );
    }
  }, [applyFilter]);

  useEffect(() => {
    if (sortingFilter) {
      const url = {
        name: filterFormData.product?.name,
        product_id: filterFormData.product?.id,
        work_id: filterFormData.workType?.id,
        start_date: filterFormData.start_date,
        end_date: filterFormData.end_date,
        status: filterFormData.statusType?.id,
      };
      const params = keyValueEmptyFilter(url);

      dispatch(
        fetchProductionList({
          params: params,
          endPoint: urlEndPoint.productions,
        }),
      );
    }
  }, [sortingFilter]);

  useEffect(() => {
    if (productionDeleteData) {
      ToastMessage.set(toastConst.errorToast, productionDeleteData?.message);
      const updatedList =
        productionLists?.filter(
          (item: any) => item.id !== selectDeleteItem?.id,
        ) || [];
      setProductionLists(updatedList);
      setSelectDeleteItem('');
      dispatch(setProductionDeleteData(null));
      setDeleteModal(false);
    }
  }, [productionDeleteData]);

  useEffect(() => {
    if (error) {
      dispatch(setProductionLoaderData(null));
      setProductionLists([]);
      setApplyFilter(false);
      setSortingFilter(false);
      setFooterLoading(false);
      setRefreshing(false);
    }
  }, [error]);

  const onEndReached = () => {
    if (isFooterLoading) {
      return;
    }
    const productListGet = ProductionListData?.pagy;
    if (productListGet?.total_pages > productListGet?.current_page) {
      const url = {
        page: productListGet?.current_page + 1,
        name: filterFormData.product?.name,
        product_id: filterFormData.product?.id,
        work_id: filterFormData.workType?.id,
        start_date: filterFormData.start_date,
        end_date: filterFormData.end_date,
        status: filterFormData.statusType?.id,
      };
      const params = keyValueEmptyFilter(url);

      dispatch(
        fetchProductionList({
          params: params,
          endPoint: urlEndPoint.productions,
        }),
      );
      setFooterLoading(true);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setFilterFormData({
      product: {name: '', id: ''},
      workType: {name: '', id: ''},
      statusType: {name: '', id: ''},
      start_date: '',
      end_date: '',
    });
    setSelectDeleteItem('');
    dispatch(
      fetchProductionList({
        params: '',
        endPoint: urlEndPoint.productions,
      }),
    );
  };

  const deleteHandel = () => {
    if (selectDeleteItem) {
      dispatch(
        fetchProductionDelete({
          params: '',
          endPoint: urlEndPoint.productions + `/${selectDeleteItem?.id}`,
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
        {selectDeleteItem?.product?.product_name}
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
      <>
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
            }}
            onBlur={() => {
              setSearchProductModal(false);
            }}
            labelTxt={strings.product}
            placeholder={strings.search}
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
        <SelectDropdown
          data={workListData}
          disabled={isNull(workListData)}
          buttonStyle={[styles.inputStyleAcc]}
          onSelect={(selectedItem: any, index: any) => {
            setFilterFormData({
              ...filterFormData,
              workType: {name: selectedItem?.name, id: selectedItem?.id},
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
                value={filterFormData?.workType?.name}
                onChangeText={() =>
                  setFilterFormData({
                    ...filterFormData,
                    workType: {name: '', id: ''},
                  })
                }
                labelTxt={strings.work}
                placeholder={strings.productionPlaceholder}
                editable={false}
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
        <SelectDropdown
          data={statusType}
          disabled={isNull(statusType)}
          buttonStyle={[styles.inputStyleAcc]}
          onSelect={(selectedItem: any, index: any) => {
            setFilterFormData({
              ...filterFormData,
              statusType: {name: selectedItem?.name, id: selectedItem?.id},
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
                value={filterFormData?.statusType?.name}
                onChangeText={() =>
                  setFilterFormData({
                    ...filterFormData,
                    statusType: {name: '', id: ''},
                  })
                }
                labelTxt={strings.status}
                placeholder={strings.productionPlaceholder}
                editable={false}
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
      </>
    );
  };

  return (
    <SafeAreaWrapper
      statusBg={Colors.primary}
      style={styles.container}
      barStyle="light-content">
      <ActionBar
        title={strings.productions}
        LeftIcon={<BackSvg width={28} height={28} color={Colors.white} />}
        onLeftPress={() => goBack()}
        onRightPress={() => navigate(NAVIGATION.AddProduction)}
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
          }}
          onBlur={() => {
            setSearchProductModal(false);
          }}
          onFilterPress={() => setVisible(true)}
          isSorting={true}
          onSortingPress={() => setSortingModal(true)}
          mainStyle={{margin: ms(20)}}
        />
        {!visible && isSearchProductModal ? (
          <View
            style={[
              styles.searchContainer,
              {width: '65%', marginLeft: ms(20)},
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

      {productionLists == null ? (
        <LoadViewList />
      ) : (
        <FlatList
          data={productionLists}
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
            <CardProductionItem
              item={item}
              onPress={() => {
                navigate(NAVIGATION.ProductionDetail);
                dispatch(setProductionDetailData(null));
                dispatch(
                  fetchProductionDetail({
                    params: '',
                    endPoint: urlEndPoint.productions + `/${item?.id}`,
                  }),
                );
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
        isLoading={productionDeleteLoading}
        onClose={() => setDeleteModal(false)}
        onSubmit={() => deleteHandel()}>
        {modalContent()}
      </ReusableModal>
      <ReusableFilterModal
        visible={visible}
        onClose={() => setVisible(false)}
        onApply={() => {
          setVisible(false);
          setApplyFilter(true);
        }}
        onClear={() => {
          setFilterFormData({
            statusType: {name: '', id: ''},
            workType: {name: '', id: ''},
            date: {startDate: '', endDate: ''},
          });
        }}
        isLoading={ProductionListLoading}>
        {filterContent()}
      </ReusableFilterModal>
      <SortingModal
        visible={sortingModal}
        onClose={() => setSortingModal(false)}
        selectType={filterFormData.statusType.id}
        setSelectType={(type: any) => {
          setFilterFormData({
            ...filterFormData,
            statusType: {name: type?.name, id: type?.id},
          });
          setSortingFilter(true);
          setSortingModal(false);
        }}
      />
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  titleText: {
    color: Colors.textCl,
    ...typography._16SofticesSemibold,
  },
  inputStyleAcc: {
    width: '100%',
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

export default ProductionScreen;
