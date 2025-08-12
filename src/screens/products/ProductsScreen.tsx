import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  RefreshControl,
  ActivityIndicator,
  Text,
} from 'react-native';
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
import ProductsItem from '../../components/ProductsItem';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchProduct,
  fetchProductDelete,
} from '../../createAsyncThunk/productsThunk';
import {urlEndPoint} from '../../constants/urlEndPoint';
import {AppDispatch, RootState} from '../../store/store';
import ReusableFilterModal from '../../components/ReusableFilterModal';
import {
  CFL,
  isNull,
  keyValueEmptyFilter,
  toastConst,
} from '../../constants/constants';
import {typography} from '../../theme/typography';
import SelectDropdown from '../../components/SelectDropdown/SelectDropdown';
import {
  setProductDeleteData,
  setProductLoaderData,
} from '../../createSlice/productsSlice';
import ToastMessage from '../../components/ToastMessage';
import LoadViewList from '../../components/LoadViewList';

const ProductsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const stockType = [
    {id: '', name: strings.all},
    {id: 'in_stock', name: strings.inStock},
    {id: 'out_of_stock', name: strings.outOfStock},
  ];

  const orderType = [
    {id: '', name: strings.all},
    {id: 'new_product', name: strings.byNewProduct},
    {id: 'old_product', name: strings.byOldProduct},
    {id: 'name', name: strings.byName},
    {id: 'status', name: strings.byStatus},
  ];

  const activeType = [
    {id: '', name: strings.all},
    {id: 'on', name: strings.yes},
    {id: 'off', name: strings.no},
  ];

  const [
    productListData,
    productListLoading,
    productDeleteData,
    productDeleteLoading,
    error,
  ] = useSelector((state: RootState) => [
    state.productsSlice.productListData,
    state.productsSlice.productListLoading,
    state.productsSlice.productDeleteData,
    state.productsSlice.productDeleteLoading,
    state.productsSlice.error,
  ]);

  const [visible, setVisible] = useState(false);
  const [productsLists, setProductsLists] = useState<any>(null);
  const [selectDeleteItem, setSelectDeleteItem] = useState<any>('');
  const [searchFiled, setSearchFiled] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [applyFilter, setApplyFilter] = useState(false);
  const [isFooterLoading, setFooterLoading] = useState(false);
  const [filterFormData, setFilterFormData] = useState({
    statusType: {name: '', id: ''},
    activeType: {name: '', id: ''},
    active: false,
    orderType: {name: '', id: ''},
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    dispatch(fetchProduct({params: '', endPoint: urlEndPoint.products}));
  }, []);

  useEffect(() => {
    if (!isNull(productListData)) {
      const productListGet = productListData?.products || [];

      setProductsLists((prev: any = []) => {
        if (productListData?.pagy?.current_page === 1) {
          return productListGet;
        } else if (productListData?.pagy?.current_page > 1) {
          return [...prev, ...productListGet];
        } else {
          return productListGet ?? [];
        }
      });

      setFooterLoading(false);
      setRefreshing(false);
      setApplyFilter(false);
    }
  }, [productListData]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      const url = {
        search: searchFiled,
        status: filterFormData.statusType.id,
        active: filterFormData.activeType.id,
        order_by: filterFormData.orderType.id,
      };
      const params = keyValueEmptyFilter(url);

      dispatch(
        fetchProduct({
          params: params,
          endPoint: urlEndPoint.products,
        }),
      );
    }, 500); // Adjust the debounce delay as needed

    return () => clearTimeout(delayDebounceFn);
  }, [searchFiled]);

  useEffect(() => {
    if (applyFilter) {
      const url = {
        search: searchFiled,
        status: filterFormData.statusType.id,
        active: filterFormData.activeType.id,
        order_by: filterFormData.orderType.id,
      };
      const params = keyValueEmptyFilter(url);

      dispatch(
        fetchProduct({
          params: params,
          endPoint: urlEndPoint.products,
        }),
      );
    }
  }, [applyFilter]);

  useEffect(() => {
    if (productDeleteData) {
      ToastMessage.set(toastConst.errorToast, productDeleteData.message);
      const updatedList =
        productsLists?.filter(
          (item: any) => item.id !== selectDeleteItem?.id,
        ) || [];
      setProductsLists(updatedList);
      setSelectDeleteItem('');
      dispatch(setProductDeleteData(null));
      setDeleteModal(false);
    }
  }, [productDeleteData]);

  useEffect(() => {
    if (error) {
      dispatch(setProductLoaderData(null));
      setProductsLists([]);
      setApplyFilter(false);
      setFooterLoading(false);
      setRefreshing(false);
    }
  }, [error]);

  const onEndReached = () => {
    if (isFooterLoading) {
      return;
    }
    const productListGet = productListData?.pagy;
    if (productListGet?.total_pages > productListGet?.current_page) {
      const url = {
        page: productListGet?.current_page + 1,
        search: searchFiled,
        status: filterFormData.statusType.id,
        active: filterFormData.activeType.id,
        order_by: filterFormData.orderType.id,
      };
      const params = keyValueEmptyFilter(url);
      dispatch(
        fetchProduct({
          params: params,
          endPoint: urlEndPoint.products,
        }),
      );
      setFooterLoading(true);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setSearchFiled('');
    setFilterFormData({
      statusType: {name: '', id: ''},
      activeType: {name: '', id: ''},
      active: false,
      orderType: {name: '', id: ''},
    });
    setSelectDeleteItem('');
    dispatch(
      fetchProduct({
        params: '',
        endPoint: urlEndPoint.products,
      }),
    );
  };

  const deleteHandel = () => {
    if (selectDeleteItem) {
      dispatch(
        fetchProductDelete({
          params: '',
          endPoint: urlEndPoint.products + `/${selectDeleteItem?.id}`,
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
          data={stockType}
          disabled={isNull(stockType)}
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
          data={activeType}
          disabled={isNull(activeType)}
          buttonStyle={[styles.inputStyleAcc]}
          onSelect={(selectedItem: any, index: any) => {
            setFilterFormData({
              ...filterFormData,
              activeType: {name: selectedItem?.name, id: selectedItem?.id},
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
                value={filterFormData?.activeType.name}
                onChangeText={() =>
                  setFilterFormData({
                    ...filterFormData,
                    activeType: {name: '', id: ''},
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
        <SelectDropdown
          data={orderType}
          disabled={isNull(orderType)}
          buttonStyle={[styles.inputStyleAcc]}
          onSelect={(selectedItem: any, index: any) => {
            setFilterFormData({
              ...filterFormData,
              orderType: {name: selectedItem?.name, id: selectedItem?.id},
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
                value={filterFormData?.orderType.name}
                onChangeText={() =>
                  setFilterFormData({
                    ...filterFormData,
                    orderType: {name: '', id: ''},
                  })
                }
                labelTxt={strings.order}
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
        title={strings.product}
        LeftIcon={<BackSvg width={28} height={28} color={Colors.white} />}
        onLeftPress={() => goBack()}
        onRightPress={() => navigate(NAVIGATION.AddProducts)}
      />

      <SearchHeader
        onChangeText={(text: string) => {
          setSearchFiled(text);
        }}
        onFilterPress={() => setVisible(true)}
        value={searchFiled}
        mainStyle={{margin: ms(20)}}
      />
      {productsLists == null ? (
        <LoadViewList />
      ) : (
        <FlatList
          data={productsLists}
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
            <ProductsItem
              item={item}
              onPress={() => {
                navigate(NAVIGATION.ProductsDetail, item);
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
        isLoading={productDeleteLoading}
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
            activeType: {name: '', id: ''},
            active: false,
            orderType: {name: '', id: ''},
          });
        }}
        isLoading={productListLoading}>
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

export default ProductsScreen;
