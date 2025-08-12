import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import ActionBar from '../../components/ActionBar';
import {BackSvg, DropDownSvg} from '../../assets/Images/svg';
import {height, hs, ms, vs} from '../../theme/spacing';
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
import SelectDropdown from '../../components/SelectDropdown/SelectDropdown';
import {CommonProps, ParamsProps} from '../types';
import {AppDispatch, RootState} from '../../store/store';
import {useDispatch, useSelector} from 'react-redux';
import {
  setProductionLoaderData,
  setUpdateProductionData,
} from '../../createSlice/productionsSlice';
import {fetchProductsSearch} from '../../createAsyncThunk/productsThunk';
import {urlEndPoint} from '../../constants/urlEndPoint';
import ToastMessage from '../../components/ToastMessage';
import {
  fetchProductionList,
  fetchProductionUpdate,
} from '../../createAsyncThunk/productionsThunk';
import {FlatList} from 'react-native-gesture-handler';

const sortingType = [
  {name: strings.inProgress, id: 'in_progress'},
  {name: strings.completed, id: 'completed'},
  {name: strings.cancelled, id: 'cancelled'},
];

export default function EditProduction({route, navigation}: CommonProps) {
  const detail = route?.params;

  const dispatch = useDispatch<AppDispatch>();

  const [
    updateProductionData,
    updateProductionLoading,
    productSearchData,
    error,
  ] = useSelector((state: RootState) => [
    state.productionsSlice.updateProductionData,
    state.productionsSlice.updateProductionLoading,
    state.productsSlice.productSearchData,
    state.productionsSlice.error,
  ]);

  const [requireFormData, setRequireFormData] = useState({
    product: {productName: '', id: ''},
    quantity: '',
    quantity_unit: '',
    status: {name: '', id: ''},
  });
  const [searchProductList, setSearchProductList] = useState<any>([]);
  const [isSearchModal, setSearchModal] = useState<any>(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (error) {
      dispatch(setProductionLoaderData(null));
    }
  }, [error]);

  useEffect(() => {
    if (detail) {
      const customerTypeFind = sortingType?.findIndex(
        e => e?.id == detail?.status,
      );

      const firstLine = detail?.product_name?.split('\n')[0];
      const lastWord = firstLine?.split('-')[1]?.trim() || '';

      setRequireFormData({
        product: {
          productName: lastWord,
          id: detail?.product_id,
        },
        quantity: detail?.quantity?.toString(),
        quantity_unit: detail?.quantity_unit,
        status: {
          name: sortingType[customerTypeFind].name,
          id: sortingType[customerTypeFind].id,
        },
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
      setSearchModal(true);
    }
  }, [productSearchData]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isSearchModal) {
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
    if (!isNull(updateProductionData)) {
      ToastMessage.set(toastConst.errorToast, updateProductionData?.message);
      dispatch(setUpdateProductionData(null));
      dispatch(
        fetchProductionList({params: '', endPoint: urlEndPoint.productions}),
      );
      resetData();
      navigation.goBack();
    }
  }, [updateProductionData]);

  const resetData = () => {
    setRequireFormData({
      product: {productName: '', id: ''},
      quantity: '',
      quantity_unit: '',
      status: {name: '', id: ''},
    });
  };

  const handleEdit = () => {
    const requireForm = {
      ...requireFormData,
      product: requireFormData?.product.id,
      status: requireFormData?.status.id,
    };

    const errors = validateForm(requireForm);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const params: ParamsProps = {
        'production[product_id]': requireFormData?.product?.id,
        'production[quantity]': requireFormData?.quantity,
        'production[quantity_unit]': requireFormData?.quantity_unit,
        'production[status]': requireFormData?.status.id,
      };

      dispatch(
        fetchProductionUpdate({
          params: params,
          endPoint: urlEndPoint.productions + `/${detail?.id}`,
        }),
      );
    }
  };

  return (
    <SafeAreaWrapper statusBg={Colors.primary} barStyle="light-content">
      <ActionBar
        title={strings.editProductions}
        LeftIcon={<BackSvg width={28} height={28} color={Colors.white} />}
        onLeftPress={() => goBack()}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <InputField
          value={requireFormData.product.productName}
          onChangeText={val =>
            setRequireFormData({
              ...requireFormData,
              product: {productName: val, id: ''},
            })
          }
          onFocus={() => {
            setSearchModal(true);
          }}
          labelTxt={strings.product}
          requiredField={true}
          placeholder={strings.customerPlaceholder}
          errorMessage={formErrors?.product}
          validationStatus={formErrors?.product ? 'error' : 'default'}
        />
        <InputField
          value={requireFormData.quantity}
          onChangeText={val =>
            setRequireFormData({
              ...requireFormData,
              quantity: val,
            })
          }
          labelTxt={strings.quantity}
          requiredField={true}
          placeholder={strings.quantity}
          rightIcon={
            <View style={styles.pcsView}>
              <Text style={styles.pcsText}>
                {CFL(requireFormData?.quantity_unit)}
              </Text>
            </View>
          }
          errorMessage={formErrors?.quantity}
          validationStatus={formErrors?.quantity ? 'error' : 'default'}
        />
        <SelectDropdown
          data={sortingType}
          disabled={isNull(sortingType)}
          buttonStyle={[styles.inputStyleAcc]}
          onSelect={(selectedItem: any, index: any) => {
            setRequireFormData({
              ...requireFormData,
              status: {name: selectedItem?.name, id: selectedItem?.id},
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
                value={requireFormData.status.name}
                onChangeText={() =>
                  setRequireFormData({
                    ...requireFormData,
                    status: {name: '', id: ''},
                  })
                }
                labelTxt={strings.status}
                requiredField={true}
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
                errorMessage={formErrors?.status}
                validationStatus={formErrors?.status ? 'error' : 'default'}
              />
            );
          }}
        />
      </ScrollView>
      <ButtonView
        btnTxt={strings.update}
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
          height: vs(50),
          marginHorizontal: hs(20),
        }}
        isLoading={updateProductionLoading}
        disable={updateProductionLoading}
      />
      {isSearchModal ? (
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
                      quantity_unit: item?.unit,
                    });
                    setSearchModal(false);
                  }}
                  style={styles.searchRow}>
                  <Text style={styles.searchRowText}>{item?.name}</Text>
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={() => (
              <View style={{alignItems: 'center', paddingVertical: ms(10)}}>
                <Text style={styles.searchRowText}>{strings.noDataFound}</Text>
              </View>
            )}
          />
        </View>
      ) : null}
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: ms(20),
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

  titleText: {
    color: Colors.textCl,
    ...typography._20SofticesBold,
    marginBottom: vs(16),
    marginTop: vs(8),
  },

  inputStyleAcc: {
    width: '100%',
  },
  searchContainer: {
    position: 'absolute',
    marginHorizontal: ms(20),
    top: ms(154),
    width: '90%',
    elevation: 10,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 10,
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
