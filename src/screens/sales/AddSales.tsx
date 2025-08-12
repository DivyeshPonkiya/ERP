import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';

import ActionBar from '../../components/ActionBar';
import {BackSvg} from '../../assets/Images/svg';
import {height, ms} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {Colors} from '../../theme/variables';
import InputField from '../../components/InputField';
import {strings} from '../../localization';
import {
  ACTIVE_OPACITY,
  CFL,
  hexToRGBA,
  isNull,
  toastConst,
  validateForm,
} from '../../constants/constants';
import ButtonView from '../../components/ButtonView';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import {goBack} from '../../navigators/RootNavigation';
import {CommonProps, ParamsProps} from '../types';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {
  setAddSalesData,
  setSalesLoaderData,
  setUpdateSalesData,
} from '../../createSlice/salesSlice';
import {fetchProductsSearch} from '../../createAsyncThunk/productsThunk';
import {urlEndPoint} from '../../constants/urlEndPoint';
import ToastMessage from '../../components/ToastMessage';
import {
  fetchSalesCreate,
  fetchSalesList,
  fetchSalesUpdate,
} from '../../createAsyncThunk/salesThunk';
import {fetchCustomerSearch} from '../../createAsyncThunk/customersThunk';

export default function AddSales({route, navigation}: CommonProps) {
  const detail = route?.params;
  const dispatch = useDispatch<AppDispatch>();

  const [
    addSalesData,
    addSalesLoading,
    updateSalesData,
    updateSalesLoading,
    productSearchData,
    customerSearchData,
    error,
  ] = useSelector((state: RootState) => [
    state.salesSlice.addSalesData,
    state.salesSlice.addSalesLoading,
    state.salesSlice.updateSalesData,
    state.salesSlice.updateSalesLoading,
    state.productsSlice.productSearchData,
    state.customersSlice.customerSearchData,
    state.salesSlice.error,
  ]);

  const [requireFormData, setRequireFormData] = useState({
    product: {productName: '', id: ''},
    quantity: '',
    customer: {customerName: '', id: ''},
  });
  const [formData, setFormData] = useState({
    note: '',
    quantity_unit: '',
  });
  const [searchProductList, setSearchProductList] = useState<any>([]);
  const [searchCustomerList, setSearchCustomerList] = useState<any>([]);
  const [isSearchProductModal, setSearchProductModal] = useState<any>(false);
  const [isSearchCustomerModal, setSearchCustomerModal] = useState<any>(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (error) {
      dispatch(setSalesLoaderData(null));
      setSearchProductModal(false);
      setSearchCustomerModal(false);
    }
  }, [error]);

  useEffect(() => {
    if (detail) {
      setRequireFormData({
        product: {productName: detail?.product?.name, id: detail?.product?.id},
        quantity: `${detail?.quantity}`,
        customer: {
          customerName: detail?.customer?.name,
          id: detail?.customer?.id,
        },
      });
      setFormData({
        note: detail?.notes,
        quantity_unit: detail?.quantity_unit,
      });
    }
  }, [detail]);

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
          term: requireFormData.product.productName,
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
  }, [requireFormData.product.productName]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isSearchCustomerModal) {
      const delayDebounceFn = setTimeout(() => {
        const url = {
          term: requireFormData.customer.customerName,
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
  }, [requireFormData.customer.customerName]);

  useEffect(() => {
    if (!isNull(addSalesData)) {
      ToastMessage.set(toastConst.errorToast, addSalesData.message);
      dispatch(setAddSalesData(null));
      dispatch(fetchSalesList({params: '', endPoint: urlEndPoint.sales}));
      resetData();
      navigation.goBack();
    }
    if (!isNull(updateSalesData)) {
      ToastMessage.set(toastConst.errorToast, updateSalesData.message);
      dispatch(setUpdateSalesData(null));
      dispatch(fetchSalesList({params: '', endPoint: urlEndPoint.sales}));
      resetData();
      navigation.goBack();
    }
  }, [addSalesData, updateSalesData]);

  const resetData = () => {
    setRequireFormData({
      product: {productName: '', id: ''},
      quantity: '',
      customer: {customerName: '', id: ''},
    });
    setFormData({
      note: '',
      quantity_unit: '',
    });
    setSearchProductList([]);
    setSearchProductModal(false);
    setSearchCustomerModal(false);
    setFormErrors({});
  };

  const handleEdit = () => {
    const requireForm = {
      ...requireFormData,
      product: requireFormData?.product.id,
      customer: requireFormData?.customer.id,
    };

    const errors = validateForm(requireForm);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const params: ParamsProps = {
        'sale[product_id]': requireFormData.product.id,
        'sale[quantity]': requireFormData.quantity,
        'sale[quantity_unit]': formData.quantity_unit,
        'sale[customer_id]': requireFormData.customer.id,
        'sale[notes]': formData.note,
      };

      if (detail) {
        dispatch(
          fetchSalesUpdate({
            params: params,
            endPoint: urlEndPoint.sales + `/${detail?.id}`,
          }),
        );
      } else {
        dispatch(
          fetchSalesCreate({
            params: params,
            endPoint: urlEndPoint.sales,
          }),
        );
      }
    }
  };

  return (
    <SafeAreaWrapper statusBg={Colors.primary} barStyle="light-content">
      <ActionBar
        title={strings.addSale}
        LeftIcon={<BackSvg width={28} height={28} color={Colors.white} />}
        onLeftPress={() => goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.container}
        scrollEnabled={
          isSearchProductModal || isSearchCustomerModal ? false : true
        }>
        <View>
          <InputField
            value={requireFormData.product.productName}
            onChangeText={val =>
              setRequireFormData({
                ...requireFormData,
                product: {productName: val, id: ''},
              })
            }
            onFocus={() => {
              setSearchProductModal(true);
            }}
            labelTxt={strings.product}
            placeholder={strings.search}
            requiredField={true}
            errorMessage={formErrors?.product}
            validationStatus={formErrors?.product ? 'error' : 'default'}
          />
          {isSearchProductModal ? (
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
                        setRequireFormData({
                          ...requireFormData,
                          product: {productName: item?.name, id: item?.id},
                        });
                        setFormData({
                          ...formData,
                          quantity_unit: item?.unit || '',
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
        <InputField
          value={requireFormData.quantity}
          onChangeText={val =>
            setRequireFormData({
              ...requireFormData,
              quantity: val,
            })
          }
          labelTxt={strings.quantity}
          placeholder={strings.quantity}
          requiredField={true}
          rightIcon={
            <>
              {formData?.quantity_unit ? (
                <View style={styles.pcsView}>
                  <Text style={styles.pcsText}>
                    {CFL(formData?.quantity_unit)}
                  </Text>
                </View>
              ) : null}
            </>
          }
          errorMessage={formErrors?.quantity}
          validationStatus={formErrors?.quantity ? 'error' : 'default'}
        />
        <View>
          <InputField
            value={requireFormData.customer.customerName}
            onChangeText={val =>
              setRequireFormData({
                ...requireFormData,
                customer: {customerName: val, id: ''},
              })
            }
            onFocus={() => {
              setSearchCustomerModal(true);
            }}
            labelTxt={strings.customer}
            placeholder={strings.search}
            requiredField={true}
            errorMessage={formErrors?.customer}
            validationStatus={formErrors?.customer ? 'error' : 'default'}
          />
          {isSearchCustomerModal ? (
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
                        setRequireFormData({
                          ...requireFormData,
                          customer: {customerName: item?.name, id: item?.id},
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

        <InputField
          value={formData.note}
          onChangeText={val => setFormData({...formData, note: val})}
          labelTxt={strings.notes}
          placeholder={strings.notePlaceholder}
          multiline={true}
          textAlignVertical={'top'}
        />
      </ScrollView>
      <ButtonView
        btnTxt={strings.submit}
        btnStyle={{
          height: ms(50),
          backgroundColor: Colors.primary,
          borderRadius: ms(10),
        }}
        backgroundColor={Colors.buttonCl}
        onBtnPress={handleEdit}
        fontColor={Colors.white}
        style={{
          width: '90%',
          height: ms(50),
          marginHorizontal: ms(20),
        }}
        isLoading={addSalesLoading || updateSalesLoading}
        disable={addSalesLoading || updateSalesLoading}
      />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: ms(20),
    alignItems: 'center',
  },

  changePwView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: ms(20),
  },
  editProfileText: {
    color: Colors.primary,
    ...typography._16SofticesSemibold,
  },
  inputContainer: {
    alignSelf: 'stretch',
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 14,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    fontSize: 16,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: hexToRGBA(Colors.colorRedD4, 0.1),
    justifyContent: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  deleteText: {
    color: Colors.colorRedD4,
    ...typography._16SofticesRegular,
  },
  pcsView: {
    backgroundColor: Colors.cardBg,
    borderRadius: ms(10),
    height: ms(42),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: ms(4),
    paddingHorizontal: ms(10),
  },
  pcsText: {
    color: Colors.textCl,
    ...typography._16SofticesRegular,
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
