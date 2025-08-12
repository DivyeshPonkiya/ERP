// EditProfile.tsx
import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View, Text, Switch} from 'react-native';

import ActionBar from '../../components/ActionBar';
import {BackSvg, DropDownSvg} from '../../assets/Images/svg';
import {ms} from '../../theme/spacing';
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
import UploadDocField from '../../components/UploadDocField';
import {CommonProps, ParamsProps} from '../types';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchCustomerCreate,
  fetchCustomerList,
  fetchCustomerUpdate,
} from '../../createAsyncThunk/customersThunk';
import {urlEndPoint} from '../../constants/urlEndPoint';
import {AppDispatch, RootState} from '../../store/store';
import {
  setAddCustomerData,
  setCustomerLoaderData,
  setUpdateCustomerData,
} from '../../createSlice/customersSlice';
import ToastMessage from '../../components/ToastMessage';
import ImagePickerModal from '../../components/ImagePickerModal';

const CustomerType = [
  {id: 'individual', name: strings.individual},
  {id: 'company', name: strings.company},
];

export default function AddCustomers({route, navigation}: CommonProps) {
  const detail = route?.params;
  const dispatch = useDispatch<AppDispatch>();

  const [
    addCustomerData,
    addCustomerLoading,
    updateCustomerData,
    updateCustomerLoading,
    error,
  ] = useSelector((state: RootState) => [
    state.customersSlice.addCustomerData,
    state.customersSlice.addCustomerLoading,
    state.customersSlice.updateCustomerData,
    state.customersSlice.updateCustomerLoading,
    state.customersSlice.error,
  ]);

  const [requireFormData, setRequireFormData] = useState({
    customerType: {type: '', id: ''},
    name: '',
    email: '',
    phone: '',
  });
  const [formData, setFormData] = useState({
    company_name: '',
    whatsAppNumber: '',
    photo: '',
    visitingCard: '',
    active: true,
    address: '',
    note: '',
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [photoPick, setPhotoPick] = useState(false);
  const [visitingPick, setVisitingPick] = useState(false);

  useEffect(() => {
    if (error) {
      dispatch(setCustomerLoaderData(null));
    }
  }, [error]);

  useEffect(() => {
    if (detail) {
      const customerTypeFind = CustomerType.findIndex(
        e => e.id == detail?.ctype,
      );

      setRequireFormData({
        customerType: {
          type: CustomerType[customerTypeFind].name,
          id: CustomerType[customerTypeFind].id,
        },
        name: detail?.name,
        email: detail?.email,
        phone: detail?.phone,
      });
      setFormData({
        ...formData,
        company_name: detail?.company_name,
        whatsAppNumber: detail?.whatsapp,
        photo: detail?.photo_url,
        visitingCard: detail?.visiting_card_url,
        active: detail?.active,
        address: detail?.address,
        note: detail?.notes,
      });
    }
  }, [detail]);

  useEffect(() => {
    if (!isNull(addCustomerData)) {
      ToastMessage.set(toastConst.errorToast, addCustomerData.message);
      dispatch(setAddCustomerData(null));
      dispatch(
        fetchCustomerList({params: '', endPoint: urlEndPoint.customers}),
      );
      resetData();
      navigation.goBack();
    }
    if (!isNull(updateCustomerData)) {
      ToastMessage.set(toastConst.errorToast, updateCustomerData?.message);
      dispatch(setUpdateCustomerData(null));
      dispatch(
        fetchCustomerList({params: '', endPoint: urlEndPoint.customers}),
      );
      resetData();
      navigation.goBack();
    }
  }, [addCustomerData, updateCustomerData]);

  const resetData = () => {
    setRequireFormData({
      customerType: {type: '', id: ''},
      name: '',
      email: '',
      phone: '',
    });
    setFormData({
      company_name: '',
      whatsAppNumber: '',
      photo: '',
      visitingCard: '',
      active: true,
      address: '',
      note: '',
    });
  };

  const handleEdit = () => {
    // Handle login logic here
    const requireForm = {
      ...requireFormData,
      type: requireFormData?.customerType.type,
    };
    if (requireFormData?.customerType.id == 'company') {
      requireForm.company_name = formData.company_name;
    }

    const errors = validateForm(requireForm);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      let photo = formData?.photo?.uri;
      let visitingCard = formData?.visitingCard?.uri;
      const params: ParamsProps = {
        'customer[ctype]': requireFormData.customerType.id,
        'customer[name]': requireFormData.name,
        'customer[company_name]': formData.company_name,
        'customer[email]': requireFormData.email,
        'customer[phone]': requireFormData.phone,
        'customer[whatsapp]': formData.whatsAppNumber,
        'customer[active]': formData.active,
        'customer[address]': formData.address,
        'customer[description]': formData.note,
      };
      if (photo) {
        params['customer[photo]'] = {
          uri: photo,
          name: photo.slice(photo.lastIndexOf('/') + 1),
          type: 'image/' + photo.slice(photo.lastIndexOf('.') + 1),
        };
      }
      if (visitingCard) {
        params['customer[visiting_card]'] = {
          uri: visitingCard,
          name: visitingCard.slice(visitingCard.lastIndexOf('/') + 1),
          type:
            'image/' + visitingCard.slice(visitingCard.lastIndexOf('.') + 1),
        };
      }

      if (detail) {
        dispatch(
          fetchCustomerUpdate({
            params: params,
            endPoint: urlEndPoint.customers + `/${detail?.id}`,
          }),
        );
      } else {
        dispatch(
          fetchCustomerCreate({
            params: params,
            endPoint: urlEndPoint.customers,
          }),
        );
      }
    }
  };

  return (
    <SafeAreaWrapper statusBg={Colors.primary} barStyle="light-content">
      <ActionBar
        title={strings.addCustomer}
        LeftIcon={<BackSvg width={28} height={28} color={Colors.white} />}
        onLeftPress={() => goBack()}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <SelectDropdown
          data={CustomerType}
          // ref={inputRef.country}
          disabled={isNull(CustomerType)}
          buttonStyle={[styles.inputStyleAcc]}
          onSelect={(selectedItem: any, index: any) => {
            setRequireFormData({
              ...requireFormData,
              customerType: {type: selectedItem?.name, id: selectedItem?.id},
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
                value={requireFormData.customerType.type}
                onChangeText={() =>
                  setRequireFormData({
                    ...requireFormData,
                    customerType: {type: '', id: ''},
                  })
                }
                labelTxt={strings.type}
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
                errorMessage={formErrors?.type}
                validationStatus={formErrors?.type ? 'error' : 'default'}
              />
            );
          }}
        />
        <InputField
          value={requireFormData.name}
          onChangeText={val =>
            setRequireFormData({
              ...requireFormData,
              name: val,
            })
          }
          labelTxt={strings.name}
          requiredField={true}
          placeholder={strings.enterName}
          errorMessage={formErrors?.name}
          validationStatus={formErrors?.name ? 'error' : 'default'}
        />
        {requireFormData.customerType.id == 'company' ? (
          <InputField
            value={formData.company_name}
            onChangeText={val =>
              setFormData({
                ...formData,
                company_name: val,
              })
            }
            labelTxt={strings.companyName}
            requiredField={true}
            placeholder={`Enter ${strings.companyName.toLocaleLowerCase()}`}
            errorMessage={formErrors?.company_name}
            validationStatus={formErrors?.company_name ? 'error' : 'default'}
          />
        ) : null}
        <InputField
          value={requireFormData.email}
          onChangeText={val =>
            setRequireFormData({
              ...requireFormData,
              email: val,
            })
          }
          labelTxt={strings.email}
          placeholder={strings.enterEmail}
          requiredField={true}
          keyboardType="email-address"
          errorMessage={formErrors?.email}
          validationStatus={formErrors?.email ? 'error' : 'default'}
        />
        <InputField
          value={requireFormData.phone}
          onChangeText={val =>
            setRequireFormData({
              ...requireFormData,
              phone: val,
            })
          }
          labelTxt={strings.phone}
          placeholder={strings.enterPhoneNumber}
          requiredField={true}
          keyboardType="number-pad"
          errorMessage={formErrors?.phone}
          validationStatus={formErrors?.phone ? 'error' : 'default'}
        />

        <InputField
          value={formData.whatsAppNumber}
          onChangeText={val =>
            setFormData({
              ...formData,
              whatsAppNumber: val,
            })
          }
          labelTxt={strings.whatsApp}
          placeholder={strings.enterWhatsApp}
          keyboardType="number-pad"
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <UploadDocField
            value={formData.photo}
            labelTxt={strings.photo}
            titleTxt={`Upload ${strings.photo.toLocaleLowerCase()}`}
            btnTxt={strings.upload}
            openModal={() => setPhotoPick(true)}
            rowImage={false}
          />
          <View style={{width: ms(16)}} />
          <UploadDocField
            value={formData.visitingCard}
            labelTxt={strings.visitingCard}
            titleTxt={`Upload ${strings.visitingCard.toLocaleLowerCase()}`}
            btnTxt={strings.upload}
            openModal={() => setVisitingPick(true)}
            rowImage={false}
          />
        </View>
        <View style={styles.activeBtnView}>
          <Text style={styles.titleText}>{strings.active}</Text>
          <Switch
            value={formData.active}
            onValueChange={val =>
              setFormData({
                ...formData,
                active: val,
              })
            }
            trackColor={{
              true: hexToRGBA(Colors.NorthTexasGreen, 0.4),
              false: hexToRGBA(Colors.gray, 0.4),
            }}
            thumbColor={formData.active ? Colors.NorthTexasGreen : Colors.gray}
          />
        </View>
        <InputField
          value={formData.address}
          onChangeText={val =>
            setFormData({
              ...formData,
              address: val,
            })
          }
          labelTxt={strings.address}
          placeholder={`Enter ${strings.address.toLocaleLowerCase()}`}
          keyboardType="number-pad"
        />
        <InputField
          value={formData.note}
          onChangeText={val =>
            setFormData({
              ...formData,
              note: val,
            })
          }
          labelTxt={strings.notes}
          placeholder={strings.writeNote}
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
        isLoading={addCustomerLoading || updateCustomerLoading}
        disablebtn={addCustomerLoading || updateCustomerLoading}
      />
      <ImagePickerModal
        visible={photoPick}
        includeBase64={false}
        selectionLimit={1}
        enablecropper={true}
        height={200}
        width={200}
        // docOption={true}
        onImageSelect={(imageAssets: any) => {
          setPhotoPick(false);
          if (imageAssets.didCancel) {
          } else if (imageAssets.error) {
          } else {
            setFormData({...formData, photo: imageAssets || ''});
          }
        }}
        onClose={() => {
          setPhotoPick(false);
        }}
        supportMb={10}
      />
      <ImagePickerModal
        visible={visitingPick}
        includeBase64={false}
        selectionLimit={1}
        enablecropper={true}
        height={200}
        width={200}
        // docOption={true}
        onImageSelect={(imageAssets: any) => {
          setVisitingPick(false);
          if (imageAssets.didCancel) {
          } else if (imageAssets.error) {
          } else {
            setFormData({...formData, visitingCard: imageAssets || ''});
          }
        }}
        onClose={() => {
          setVisitingPick(false);
        }}
        supportMb={10}
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
