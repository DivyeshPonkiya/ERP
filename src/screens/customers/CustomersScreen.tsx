import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
import CardCustomersItem from '../../components/CardCustomersItem';
import ActionBar from '../../components/ActionBar';
import {BackSvg, DropDownSvg} from '../../assets/Images/svg';
import {goBack, navigate} from '../../navigators/RootNavigation';
import {Colors} from '../../theme/variables';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import {ms} from '../../theme/spacing';
import SearchHeader from '../../components/SearchHeader';
import {strings} from '../../localization';
import {NAVIGATION} from '../../constants/navigation';
import EmptyState from '../../components/EmptyState';
import ReusableModal from '../../components/ReusableModal';
import InputField from '../../components/InputField';
import ReusableFilterModal from '../../components/ReusableFilterModal';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {
  fetchCustomerDelete,
  fetchCustomerList,
} from '../../createAsyncThunk/customersThunk';
import {urlEndPoint} from '../../constants/urlEndPoint';
import {
  CFL,
  isNull,
  keyValueEmptyFilter,
  toastConst,
} from '../../constants/constants';
import {
  setCustomerDeleteData,
  setCustomerLoaderData,
} from '../../createSlice/customersSlice';
import ToastMessage from '../../components/ToastMessage';
import {typography} from '../../theme/typography';
import SelectDropdown from '../../components/SelectDropdown/SelectDropdown';
import LoadViewList from '../../components/LoadViewList';

const customerType = [
  {id: '', name: strings.all},
  {id: 'individual', name: strings.individual},
  {id: 'company', name: strings.company},
];

const statusType = [
  {id: '', name: strings.all},
  {id: 'on', name: strings.yes},
  {id: 'off', name: strings.no},
];

const CustomersScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [
    CustomerListData,
    CustomerListLoading,
    customerDeleteData,
    customerDeleteLoading,
    error,
  ] = useSelector((state: RootState) => [
    state.customersSlice.CustomerListData,
    state.customersSlice.CustomerListLoading,
    state.customersSlice.customerDeleteData,
    state.customersSlice.customerDeleteLoading,
    state.customersSlice.error,
  ]);

  const [customerLists, setCustomerLists] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [searchFiled, setSearchFiled] = useState('');
  const [selectDeleteItem, setSelectDeleteItem] = useState<any>('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [applyFilter, setApplyFilter] = useState(false);
  const [isFooterLoading, setFooterLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filterFormData, setFilterFormData] = useState({
    customerType: {name: '', id: ''},
    statusType: {name: '', id: ''},
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    dispatch(fetchCustomerList({params: '', endPoint: urlEndPoint.customers}));
  }, []);

  useEffect(() => {
    if (!isNull(CustomerListData)) {
      const customerListGet = CustomerListData?.customers || [];

      setCustomerLists((prev: any = []) => {
        if (CustomerListData?.pagy?.current_page === 1) {
          return customerListGet;
        } else if (CustomerListData?.pagy?.current_page > 1) {
          return [...prev, ...customerListGet];
        } else {
          return customerListGet ?? [];
        }
      });

      setFooterLoading(false);
      setRefreshing(false);
      setApplyFilter(false);
    }
  }, [CustomerListData]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      const url = {
        search: searchFiled,
        ctype: filterFormData.customerType.id,
        active: filterFormData.statusType.id,
      };
      const params = keyValueEmptyFilter(url);
      dispatch(
        fetchCustomerList({
          params: params,
          endPoint: urlEndPoint.customers,
        }),
      );
    }, 500); // Adjust the debounce delay as needed

    return () => clearTimeout(delayDebounceFn);
  }, [searchFiled]);

  useEffect(() => {
    if (applyFilter) {
      const url = {
        search: searchFiled,
        ctype: filterFormData.customerType.id,
        active: filterFormData.statusType.id,
      };
      const params = keyValueEmptyFilter(url);

      dispatch(
        fetchCustomerList({
          params: params,
          endPoint: urlEndPoint.customers,
        }),
      );
    }
  }, [applyFilter]);

  useEffect(() => {
    if (customerDeleteData) {
      ToastMessage.set(toastConst.errorToast, customerDeleteData?.message);
      const updatedList =
        customerLists?.filter(
          (item: any) => item.id !== selectDeleteItem?.id,
        ) || [];
      setCustomerLists(updatedList);
      setSelectDeleteItem('');
      dispatch(setCustomerDeleteData(null));
      setDeleteModal(false);
    }
  }, [customerDeleteData]);

  useEffect(() => {
    if (error) {
      dispatch(setCustomerLoaderData(null));
      setCustomerLists([]);
      setApplyFilter(false);
      setFooterLoading(false);
      setRefreshing(false);
    }
  }, [error]);

  const onEndReached = () => {
    if (isFooterLoading) {
      return;
    }
    const productListGet = CustomerListData?.pagy;
    if (productListGet?.total_pages > productListGet?.current_page) {
      const url = {
        page: productListGet?.current_page + 1,
        search: searchFiled,
        ctype: filterFormData.customerType.id,
        active: filterFormData.statusType.id,
      };
      const params = keyValueEmptyFilter(url);
      dispatch(
        fetchCustomerList({
          params: params,
          endPoint: urlEndPoint.customers,
        }),
      );
      setFooterLoading(true);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setSearchFiled('');
    setFilterFormData({
      customerType: {name: '', id: ''},
      statusType: {name: '', id: ''},
    });
    setSelectDeleteItem('');
    dispatch(
      fetchCustomerList({
        params: '',
        endPoint: urlEndPoint.customers,
      }),
    );
  };

  const deleteHandel = () => {
    if (selectDeleteItem) {
      dispatch(
        fetchCustomerDelete({
          params: '',
          endPoint: urlEndPoint.customers + `/${selectDeleteItem?.id}`,
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
      <Text style={styles.titleText}>{selectDeleteItem?.name}</Text>
    </View>
  );

  const filterContent = () => {
    return (
      <>
        <SelectDropdown
          data={customerType}
          disabled={isNull(customerType)}
          buttonStyle={[styles.inputStyleAcc]}
          onSelect={(selectedItem: any, index: any) => {
            setFilterFormData({
              ...filterFormData,
              customerType: {name: selectedItem?.name, id: selectedItem?.id},
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
                value={filterFormData?.customerType?.name}
                onChangeText={() =>
                  setFilterFormData({
                    ...filterFormData,
                    customerType: {name: '', id: ''},
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
                value={filterFormData?.statusType.name}
                onChangeText={() =>
                  setFilterFormData({
                    ...filterFormData,
                    statusType: {name: '', id: ''},
                  })
                }
                labelTxt={strings.active}
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
      </>
    );
  };

  return (
    <SafeAreaWrapper
      statusBg={Colors.primary}
      style={styles.container}
      barStyle="light-content">
      <ActionBar
        title={strings.customers}
        LeftIcon={<BackSvg width={28} height={28} color={Colors.white} />}
        onLeftPress={() => goBack()}
        onRightPress={() => navigate(NAVIGATION.AddCustomers)}
      />

      <SearchHeader
        onChangeText={(text: string) => {
          setSearchFiled(text);
        }}
        onFilterPress={() => setVisible(true)}
        value={searchFiled}
        mainStyle={{margin: ms(20)}}
      />

      {customerLists == null ? (
        <LoadViewList />
      ) : (
        <FlatList
          data={customerLists}
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
            <CardCustomersItem
              item={item}
              onPress={() => {
                navigate(NAVIGATION.CustomersDetail, item);
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
        isLoading={customerDeleteLoading}
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
            customerType: {name: '', id: ''},
            statusType: {name: '', id: ''},
          });
        }}
        isLoading={CustomerListLoading}>
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
  titleText: {
    color: Colors.textCl,
    ...typography._16SofticesSemibold,
  },
  inputStyleAcc: {
    width: '100%',
  },
});

export default CustomersScreen;
