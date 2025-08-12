import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
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
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {
  setAddProductionData,
  setProductionLoaderData,
} from '../../createSlice/productionsSlice';
import ToastMessage from '../../components/ToastMessage';
import {urlEndPoint} from '../../constants/urlEndPoint';
import {
  fetchProductionCreate,
  fetchProductionList,
  fetchProductionUpdate,
} from '../../createAsyncThunk/productionsThunk';
import {fetchProductsSearch} from '../../createAsyncThunk/productsThunk';

export default function AddProduction({route, navigation}: CommonProps) {
  const detail = route?.params;
  const dispatch = useDispatch<AppDispatch>();

  const [
    addProductionData,
    addProductionLoading,
    productSearchData,
    workSearchData,
    error,
  ] = useSelector((state: RootState) => [
    state.productionsSlice.addProductionData,
    state.productionsSlice.addProductionLoading,
    state.productsSlice.productSearchData,
    state.worksSlice.WorkSearchData,
    state.productionsSlice.error,
  ]);

  const [requireFormData, setRequireFormData] = useState({
    product: {productName: '', id: ''},
    quantity: '',
    work: {workName: '', id: ''},
  });
  const [formData, setFormData] = useState({
    quantity_unit: '',
    note: '',
    name: '',
    mobile: '',
    whatsApp: '',
    email: '',
  });
  const [searchProductList, setSearchProductList] = useState<any>([]);
  const [workListData, setWorkListData] = useState<any>([]);
  const [isSearchModal, setSearchModal] = useState<any>(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (workSearchData) {
      const itemsArray = Object.keys(workSearchData)
        .filter(key => !isNaN(Number(key))) // keep only numeric keys
        .map(key => workSearchData[key]);
      setWorkListData(itemsArray);
    }
  }, []);

  useEffect(() => {
    if (error) {
      dispatch(setProductionLoaderData(null));
    }
  }, [error]);

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
    if (!isNull(addProductionData)) {
      ToastMessage.set(toastConst.errorToast, addProductionData.message);
      dispatch(setAddProductionData(null));
      dispatch(
        fetchProductionList({params: '', endPoint: urlEndPoint.productions}),
      );
      resetData();
      navigation.goBack();
    }
  }, [addProductionData]);

  const resetData = () => {
    setRequireFormData({
      product: {productName: '', id: ''},
      quantity: '',
      work: {workName: '', id: ''},
    });
    setFormData({
      quantity_unit: '',
      note: '',
      name: '',
      mobile: '',
      whatsApp: '',
      email: '',
    });
  };

  const handleEdit = () => {
    const requireForm = {
      ...requireFormData,
      product: requireFormData?.product.id,
      work: requireFormData?.work.id,
    };

    const errors = validateForm(requireForm);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const params: ParamsProps = {
        'production[product_id]': requireFormData?.product?.id,
        'production[quantity]': requireFormData?.quantity,
        'production[quantity_unit]': formData?.quantity_unit,
        'production[status]': 'in_progress',
        'production[production_works_attributes][0][work_id]':
          requireFormData?.work.id,
        'production[production_works_attributes][0][finished_at]': '',
        'production[production_works_attributes][0][contact_name]':
          formData?.name,
        'production[production_works_attributes][0][contact_mobile]':
          formData?.mobile,
        'production[production_works_attributes][0][contact_whatsapp]':
          formData?.whatsApp,
        'production[production_works_attributes][0][contact_email]':
          formData?.email,
        'production[production_works_attributes][0][notes]': formData?.note,
        'production[production_works_attributes][0][status]': '',
      };

      if (detail) {
        dispatch(
          fetchProductionUpdate({
            params: params,
            endPoint: urlEndPoint.productions + `/${detail?.id}`,
          }),
        );
      } else {
        dispatch(
          fetchProductionCreate({
            params: params,
            endPoint: urlEndPoint.productions,
          }),
        );
      }
    }
  };

  return (
    <SafeAreaWrapper statusBg={Colors.primary} barStyle="light-content">
      <ActionBar
        title={strings.addProductions}
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
        <Text style={styles.titleText}>{strings.productionWorks}</Text>
        <SelectDropdown
          data={workListData}
          disabled={isNull(workListData)}
          buttonStyle={[styles.inputStyleAcc]}
          onSelect={(selectedItem: any, index: any) => {
            setRequireFormData({
              ...requireFormData,
              work: {workName: selectedItem?.name, id: selectedItem?.id},
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
                value={requireFormData.work.workName}
                onChangeText={() =>
                  setRequireFormData({
                    ...requireFormData,
                    work: {workName: '', id: ''},
                  })
                }
                labelTxt={strings.work}
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
                errorMessage={formErrors?.work}
                validationStatus={formErrors?.work ? 'error' : 'default'}
              />
            );
          }}
        />
        <InputField
          value={formData.note}
          onChangeText={val => setFormData({...formData, note: val})}
          labelTxt={strings.notes}
          placeholder={strings.notePlaceholder}
          multiline={true}
          textAlignVertical={'top'}
        />
        <Text style={styles.titleText}>{strings.contactPerson}</Text>
        <InputField
          value={formData.name}
          onChangeText={val => setFormData({...formData, name: val})}
          labelTxt={strings.name}
          placeholder={strings.enterName}
        />
        <InputField
          value={formData.mobile}
          onChangeText={val => setFormData({...formData, mobile: val})}
          labelTxt={strings.mobile}
          keyboardType="number-pad"
          placeholder={strings.enterMobile}
        />
        <InputField
          value={formData.whatsApp}
          onChangeText={val => setFormData({...formData, whatsApp: val})}
          labelTxt={strings.whatsApp}
          keyboardType="number-pad"
          placeholder={strings.enterWhatsApp}
        />
        <InputField
          value={formData.email}
          onChangeText={val => setFormData({...formData, email: val})}
          labelTxt={strings.email}
          keyboardType="email-address"
          placeholder={strings.enterEmail}
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
                      });
                      setFormData({
                        ...formData,
                        quantity_unit: item?.unit || '',
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
                  <Text style={styles.searchRowText}>
                    {strings.noDataFound}
                  </Text>
                </View>
              )}
            />
          </View>
        ) : null}
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
          height: vs(50),
          marginHorizontal: hs(20),
        }}
        isLoading={addProductionLoading}
        disable={addProductionLoading}
      />
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
    top: ms(100),
    width: '100%',
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
