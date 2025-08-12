// EditProfile.tsx
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import ActionBar from '../../components/ActionBar';
import {BackSvg, DropDownSvg} from '../../assets/Images/svg';
import {hs, ms, vs} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {Colors} from '../../theme/variables';
import InputField from '../../components/InputField';
import {strings} from '../../localization';
import {
  CFL,
  hexToRGBA,
  isNull,
  toastConst,
  validateForm,
} from '../../constants/constants';
import ButtonView from '../../components/ButtonView';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import {goBack} from '../../navigators/RootNavigation';
import SelectDropdown from '../../components/SelectDropdown/SelectDropdown';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {
  fetchStock,
  fetchStockCreate,
  fetchStockEdit,
} from '../../createAsyncThunk/stocksThunk';
import {urlEndPoint} from '../../constants/urlEndPoint';
import {CommonProps, ParamsProps} from '../types';
import ToastMessage from '../../components/ToastMessage';
import {setAddStockData, setEditStockData} from '../../createSlice/stocksSlice';
import {fetchProductsSearch} from '../../createAsyncThunk/productsThunk';
import {fetchProductionList} from '../../createAsyncThunk/productionsThunk';
import _ from 'lodash';
import {setProductSearchData} from '../../createSlice/productsSlice';
import {setProductionListData} from '../../createSlice/productionsSlice';

export default function AddStock({navigation, route}: CommonProps) {
  const dispatch = useDispatch<AppDispatch>();
  const dropdownRef = useRef(null);
  const [
    AddStockData,
    AddStockLoading,
    EditStockData,
    EditStockLoading,

    productSearchData,
    ProductionListData,

    error,
  ] = useSelector((state: RootState) => [
    state.stocksSlice.AddStockData,
    state.stocksSlice.AddStockLoading,

    state.stocksSlice.EditStockData,
    state.stocksSlice.EditStockLoading,

    state.productsSlice.productSearchData,
    state.productionsSlice.ProductionListData,

    state.stocksSlice.error,
  ]);

  const [productList, setProductList] = useState<any>([]);
  const [productionList, setProductionList] = useState<any>([]);

  const [requireFormData, setRequireFormData] = useState({
    product: {name: '', id: '', unit: ''},
    production: {name: '', id: ''},
    quantity: '',
    quantity_unit: {name: '', id: ''},
  });
  const [formData, setFormData] = useState({
    note: '',
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  const routeParams = route?.params?.stockData;

  useEffect(() => {
    if (error == 501) {
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
    if (ProductionListData?.message) {
      ToastMessage.set(toastConst.successToast, ProductionListData?.message);
    }
    if (!isNull(ProductionListData)) {
      const itemsArray = Object.keys(ProductionListData)
        .filter(key => !isNaN(Number(key))) // keep only numeric keys
        .map(key => ProductionListData[key]);
      setProductionList(itemsArray);

      dispatch(setProductionListData(null));
    }
  }, [ProductionListData]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const rawParams = {
        term: requireFormData?.product?.name,
      };
      const params = Object.entries(rawParams).reduce((acc, [key, value]) => {
        if (value !== '' && value !== undefined && value !== null) {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, any>);
      if (!isNull(requireFormData?.product.name)) {
        dispatch(
          fetchProductsSearch({
            params: params,
            endPoint: urlEndPoint.autocompleteProducts,
          }),
        );
      }
    }, 500); // Adjust the debounce delay as needed

    return () => clearTimeout(delayDebounceFn);
  }, [requireFormData?.product.name]);

  const loadProduction = (product_id: any) => {
    const rawParams = {
      product_id: product_id,
    };
    const params = Object.entries(rawParams).reduce((acc, [key, value]) => {
      if (value !== '' && value !== undefined && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);
    dispatch(
      fetchProductionList({
        params: params,
        endPoint: urlEndPoint.stocks + `/fetch_productions`,
      }),
    );
  };

  useEffect(() => {
    if (!isNull(routeParams)) {
      setRequireFormData({
        product: {...routeParams?.product, unit: routeParams?.quantity_unit},
        production: routeParams?.production,
        quantity: `${routeParams?.quantity}`,
        quantity_unit: {name: '', id: ''},
      });
      setFormData({
        note: routeParams?.notes,
      });
    }
  }, [routeParams]);

  useEffect(() => {
    if (!isNull(AddStockData) || !isNull(EditStockData)) {
      ToastMessage.set(
        toastConst.errorToast,
        AddStockData?.message || EditStockData?.message,
      );
      dispatch(
        fetchStock({
          endPoint: urlEndPoint.stocks,
        }),
      );

      dispatch(setAddStockData(null));
      dispatch(setEditStockData(null));

      setRequireFormData({
        product: {name: '', id: '', unit: ''},
        production: {name: '', id: ''},
        quantity: '',
        quantity_unit: {name: '', id: ''},
      });
      setFormData({
        note: '',
      });

      navigation.goBack();
    }
  }, [AddStockData, EditStockData]);

  const handleEdit = () => {
    const errors = validateForm(requireFormData);

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const params: ParamsProps = {
        'stock[product_id]': requireFormData?.product?.id,
        'stock[production_id]': requireFormData?.production.id,
        'stock[quantity]': requireFormData?.quantity,
        'stock[quantity_unit]': requireFormData?.product?.unit,
        'stock[notes]': formData.note,
      };

      if (routeParams) {
        dispatch(
          fetchStockEdit({
            params: params,
            endPoint: urlEndPoint.stocks + `/${routeParams?.id}`,
          }),
        );
      } else {
        dispatch(
          fetchStockCreate({
            params: params,
            endPoint: urlEndPoint.stocks,
          }),
        );
      }
    }
  };

  return (
    <SafeAreaWrapper statusBg={Colors.primary} barStyle="light-content">
      <ActionBar
        title={strings.addStock}
        LeftIcon={<BackSvg width={28} height={28} color={Colors.white} />}
        onLeftPress={() => goBack()}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <SelectDropdown
          data={productList}
          disableAutoScroll={false}
          search={true}
          onChangeSearchInputText={(text: any) => {
            // Call API with debounce logic in useEffect
            setRequireFormData(prev => ({
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
              value={requireFormData?.product.name}
              onChangeText={val => {
                setRequireFormData(prev => ({
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
            setRequireFormData(prev => ({
              ...prev,
              product: {
                name: item.name,
                id: item.id,
                unit: item.unit,
              },
            }));
            loadProduction(item.id);
          }}
        />

        <SelectDropdown
          data={productionList}
          buttonStyle={[styles.inputStyleAcc]}
          onSelect={(selectedItem: any, index: any) => {
            setRequireFormData({
              ...requireFormData,
              production: {name: selectedItem?.text, id: selectedItem?.id},
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
          dropdownStyle={{marginTop: ms(-15)}}
          buttonTextAfterSelection={(selectedItem: any, index: any) => {
            return selectedItem?.text;
          }}
          rowTextForSelection={(item: any, index: any) => {
            return CFL(item?.text);
          }}
          renderCustomizedButtonChild={(selectedItem: any) => {
            return (
              <InputField
                value={requireFormData?.production?.name}
                onChangeText={(val: any) =>
                  setRequireFormData({
                    ...requireFormData,
                    production: {name: val, id: ''},
                  })
                }
                labelTxt={strings.production}
                placeholder={strings.select}
                requiredField={true}
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

        <InputField
          value={requireFormData?.quantity}
          onChangeText={val =>
            setRequireFormData({...requireFormData, quantity: val})
          }
          labelTxt={strings.quantity}
          requiredField={true}
          placeholder={strings.quantity}
          rightIcon={
            <View style={styles.pcsView}>
              <Text style={styles.pcsText}>
                {_.capitalize(requireFormData?.product.unit)}
              </Text>
            </View>
          }
        />

        <InputField
          value={formData?.note}
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
        disable={AddStockLoading || EditStockLoading}
        isLoading={AddStockLoading || EditStockLoading}
        style={{
          width: '90%',
          height: vs(50),
          marginHorizontal: hs(20),
          marginBottom: vs(20),
        }}
      />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: ms(20),
    alignItems: 'center',
  },
  inputStyleAcc: {
    width: '100%',
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
    minWidth: ms(42),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: ms(4),
    paddingHorizontal: ms(5),
  },
  pcsText: {
    color: Colors.textCl,
    ...typography._16SofticesRegular,
  },
});
