import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View, Text, Switch, Alert} from 'react-native';

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
import ImagePickerModal from '../../components/ImagePickerModal';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {
  fetchProduct,
  fetchProductCreate,
  fetchProductsImageDelete,
  fetchProductUpdate,
} from '../../createAsyncThunk/productsThunk';
import {urlEndPoint} from '../../constants/urlEndPoint';
import ToastMessage from '../../components/ToastMessage';
import {
  setAddProductData,
  setProductImageDeleteData,
  setProductLoaderData,
  setProductUpdateData,
} from '../../createSlice/productsSlice';
import {CommonProps} from '../types';
import {Asset} from 'react-native-image-picker';

export default function AddProducts({route, navigation}: CommonProps) {
  const detail = route?.params;

  const dispatch = useDispatch<AppDispatch>();
  const stockType = [
    {id: 'in_stock', name: strings.inStock},
    {id: 'out_of_stock', name: strings.outOfStock},
  ];

  const unitType = [
    {id: strings.pcs, name: strings.pcs},
    {id: strings.meter, name: strings.meter},
  ];

  const [
    addProductData,
    addProductLoading,
    productUpdateData,
    productUpdateLoading,
    productImageDeleteData,
    error,
  ] = useSelector((state: RootState) => [
    state.productsSlice.addProductData,
    state.productsSlice.addProductLoading,
    state.productsSlice.productUpdateData,
    state.productsSlice.productUpdateLoading,
    state.productsSlice.productImageDeleteData,
    state.productsSlice.error,
  ]);

  const [requireFormData, setRequireFormData] = useState({
    name: '',
    code: '',
    photo: '',
    selectUnitType: {unit: '', id: ''},
  });
  const [formData, setFormData] = useState<{
    statusType: {name: string; id: string};
    active: boolean;
    note: string;
    photos: Asset[];
  }>({
    statusType: {name: '', id: ''},
    active: false,
    note: '',
    photos: [],
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [imagePick, setImagePick] = useState(false);
  const [imagesPick, setImagesPick] = useState(false);

  useEffect(() => {
    if (error) {
      dispatch(setProductLoaderData(null));
    }
  }, [error]);

  useEffect(() => {
    if (detail) {
      const stockTypeFind = stockType.findIndex(e => e.id == detail?.status);
      const unitTypeFind = unitType.findIndex(e => e.id == CFL(detail?.unit));
      setRequireFormData({
        name: detail?.name,
        code: detail?.code,
        photo: detail?.cover_image_url,
        selectUnitType: {
          unit: unitType[unitTypeFind]?.name,
          id: unitType[unitTypeFind]?.id,
        },
      });

      setFormData({
        statusType: {
          name: stockType[stockTypeFind]?.name,
          id: stockType[stockTypeFind]?.id,
        },
        active: detail?.active,
        note: detail?.description,
        photos: detail?.images_urls,
      });
    }
  }, [detail]);

  useEffect(() => {
    if (!isNull(addProductData)) {
      ToastMessage.set(toastConst.errorToast, addProductData.message);
      dispatch(setAddProductData(null));
      dispatch(fetchProduct({params: '', endPoint: urlEndPoint.products}));

      resetData();
      navigation.goBack();
    }
    if (!isNull(productUpdateData)) {
      ToastMessage.set(toastConst.errorToast, productUpdateData.message);
      dispatch(setProductUpdateData(null));
      dispatch(fetchProduct({params: '', endPoint: urlEndPoint.products}));

      resetData();
      navigation.goBack();
    }
  }, [addProductData, productUpdateData]);

  useEffect(() => {
    if (productImageDeleteData) {
      ToastMessage.set(toastConst.errorToast, productImageDeleteData.message);
      dispatch(setProductImageDeleteData(null));
    }
  }, [productImageDeleteData]);

  const resetData = () => {
    setRequireFormData({
      name: '',
      code: '',
      photo: '',
      selectUnitType: {unit: '', id: ''},
    });
    setFormData({
      statusType: {name: '', id: ''},
      active: false,
      note: '',
      photos: [],
    });
  };

  const handleEdit = () => {
    const requireForm = {
      ...requireFormData,
      unit: requireFormData?.selectUnitType.unit,
    };

    const errors = validateForm(requireForm);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const formDataValue = new FormData();

      // Append text fields
      formDataValue.append('product[name]', requireFormData.name);
      formDataValue.append('product[code]', requireFormData.code);
      formDataValue.append('product[status]', formData.statusType.id);
      formDataValue.append('product[active]', formData.active);
      formDataValue.append('product[unit]', requireFormData.selectUnitType.id);
      formDataValue.append('product[description]', formData.note);

      // Append cover image if exists
      if (requireFormData?.photo?.uri) {
        const imagePath = requireFormData.photo.uri;
        formDataValue.append('product[cover_image]', {
          uri: imagePath,
          name: imagePath.substring(imagePath.lastIndexOf('/') + 1),
          type: 'image/' + imagePath.substring(imagePath.lastIndexOf('.') + 1),
        } as any);
      }

      // Append multiple images
      if (formData.photos.length > 0) {
        formData.photos.forEach(item => {
          const uri = item?.uri;
          if (uri) {
            formDataValue.append('product[images][]', {
              uri,
              name: uri.substring(uri.lastIndexOf('/') + 1),
              type: 'image/' + uri.substring(uri.lastIndexOf('.') + 1),
            } as any);
          }
        });
      }

      if (detail) {
        dispatch(
          fetchProductUpdate({
            params: formDataValue,
            endPoint: urlEndPoint.products + `/${detail?.id}`,
          }),
        );
      } else {
        dispatch(
          fetchProductCreate({
            params: formDataValue,
            endPoint: urlEndPoint.products,
          }),
        );
      }
    }
  };

  return (
    <SafeAreaWrapper statusBg={Colors.primary} barStyle="light-content">
      <ActionBar
        title={strings.addProduct}
        LeftIcon={<BackSvg width={28} height={28} color={Colors.white} />}
        onLeftPress={() => goBack()}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <InputField
          value={requireFormData.name}
          onChangeText={val =>
            setRequireFormData({...requireFormData, name: val})
          }
          labelTxt={strings.name}
          errorMessage={formErrors.name}
          validationStatus={formErrors.name ? 'error' : 'default'}
          placeholder={strings.enterName}
          requiredField={true}
        />
        <InputField
          value={requireFormData.code}
          onChangeText={val =>
            setRequireFormData({...requireFormData, code: val})
          }
          labelTxt={strings.code}
          errorMessage={formErrors.code}
          validationStatus={formErrors.code ? 'error' : 'default'}
          placeholder={strings.enterCode}
          requiredField={true}
        />
        <SelectDropdown
          data={stockType}
          disabled={isNull(stockType)}
          buttonStyle={[styles.inputStyleAcc]}
          onSelect={(selectedItem: any, index: any) => {
            setFormData({
              ...formData,
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
                value={formData?.statusType.name}
                onChangeText={() =>
                  setFormData({...formData, statusType: {name: '', id: ''}})
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
        <UploadDocField
          value={requireFormData.photo}
          labelTxt={strings.coverImage}
          titleTxt={`Upload ${strings.image.toLocaleLowerCase()}`}
          btnTxt={strings.upload}
          requiredField={true}
          errorMessage={formErrors.photo}
          validationStatus={formErrors.photo ? 'error' : 'default'}
          openModal={() => setImagePick(true)}
        />

        <UploadDocField
          value={formData.photos}
          labelTxt={strings.image}
          titleTxt={`Upload ${strings.image.toLocaleLowerCase()}`}
          btnTxt={strings.upload}
          // requiredField={true}
          // errorMessage={formErrors.photo}
          // validationStatus={formErrors.photo ? 'error' : 'default'}
          openModal={() => setImagesPick(true)}
          removeImageIndex={(data: any) => {
            const removeItem = () => {
              const updatedPhotos = formData.photos.filter(
                (_, index) => index !== data,
              );
              setFormData({
                ...formData,
                photos: updatedPhotos,
              });
            };

            if (formData.photos[data]?.id) {
              Alert.alert(strings.delete, strings.deleteConf, [
                {text: strings.no},
                {
                  text: strings.yes,
                  onPress: () => {
                    dispatch(
                      fetchProductsImageDelete({
                        params: '',
                        endPoint: `products/${detail?.id}/destroy_images/${formData.photos[data]?.id}`,
                      }),
                    );
                    removeItem();
                  },
                },
              ]);
            } else {
              removeItem();
            }
          }}
        />
        <View style={styles.activeBtnView}>
          <Text style={styles.titleText}>{strings.active}</Text>
          <Switch
            value={formData.active}
            onValueChange={val => setFormData({...formData, active: val})}
            trackColor={{
              true: hexToRGBA(Colors.NorthTexasGreen, 0.4),
              false: hexToRGBA(Colors.gray, 0.4),
            }}
            thumbColor={formData.active ? Colors.NorthTexasGreen : Colors.gray}
          />
        </View>
        <SelectDropdown
          data={unitType}
          disabled={isNull(unitType)}
          buttonStyle={[styles.inputStyleAcc]}
          onSelect={(selectedItem: any, index: any) => {
            setRequireFormData({
              ...requireFormData,
              selectUnitType: {
                unit: selectedItem?.name,
                id: selectedItem?.id,
              },
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
                value={requireFormData?.selectUnitType.unit}
                onChangeText={() =>
                  setRequireFormData({
                    ...requireFormData,
                    selectUnitType: {
                      unit: selectedItem?.name,
                      id: selectedItem?.id,
                    },
                  })
                }
                labelTxt={strings.unit}
                placeholder={strings.productionPlaceholder}
                editable={false}
                requiredField={true}
                rightIcon={
                  <View style={{marginRight: ms(14)}}>
                    <DropDownSvg
                      height={22}
                      width={22}
                      color={Colors.textLight}
                    />
                  </View>
                }
                errorMessage={formErrors?.unit}
                validationStatus={formErrors?.unit ? 'error' : 'default'}
              />
            );
          }}
        />
        <InputField
          value={formData.note}
          onChangeText={val => setFormData({...formData, note: val})}
          labelTxt={strings.description}
          placeholder={strings.writeDescription}
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
        isLoading={addProductLoading || productUpdateLoading}
        disable={addProductLoading || productUpdateLoading}
      />
      <ImagePickerModal
        visible={imagePick}
        includeBase64={false}
        selectionLimit={1}
        enablecropper={true}
        height={200}
        width={200}
        // docOption={true}
        onImageSelect={(imageAssets: any) => {
          setImagePick(false);
          if (imageAssets.didCancel) {
          } else if (imageAssets.error) {
          } else {
            setRequireFormData({...requireFormData, photo: imageAssets || ''});
          }
        }}
        onClose={() => {
          setImagePick(false);
        }}
        supportMb={10}
      />

      <ImagePickerModal
        visible={imagesPick}
        includeBase64={false}
        selectionLimit={5}
        enablecropper={false}
        height={200}
        width={200}
        // docOption={true}
        onImageSelect={(imageAssets: any) => {
          setImagesPick(false);
          if (imageAssets.didCancel) {
          } else if (imageAssets.error) {
          } else {
            const newAssets = imageAssets.assets || [];
            if (formData.photos.length + newAssets.length > 5) {
              ToastMessage.set(toastConst.errorToast, strings.maxUploadDesc);
              return;
            }
            const combined = [...formData.photos, ...newAssets];
            setFormData({
              ...formData,
              photos: combined,
            });
          }
        }}
        onClose={() => {
          setImagesPick(false);
        }}
        supportMb={2}
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
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteText: {
    color: Colors.colorRedD4,
    ...typography._16SofticesRegular,
  },
  titleText: {
    color: Colors.textCl,
    ...typography._16SofticesSemibold,
  },
  inputStyleAcc: {
    width: '100%',
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
});
