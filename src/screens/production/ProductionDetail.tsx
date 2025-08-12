import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import ActionBar from '../../components/ActionBar';
import {
  BackSvg,
  CalendarSvg,
  DetailTitleSvg,
  DropDownSvg,
  StatusDetailSvg,
} from '../../assets/Images/svg';
import {goBack} from '../../navigators/RootNavigation';
import {Colors} from '../../theme/variables';
import {ms, vs} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import {strings} from '../../localization';
import {QuantitySvg} from '../../assets/Images/svg/QuantitySvg';
import {DateSvg} from '../../assets/Images/svg/DateSvg';
import {AddSvg} from '../../assets/Images/svg/AddSvg';
import {
  ACTIVE_OPACITY,
  CFL,
  isNull,
  toastConst,
  validateForm,
} from '../../constants/constants';
import EmptyState from '../../components/EmptyState';
import CardProductionDetailItem from '../../components/CardProductionDetailItem';
import ReusableModal from '../../components/ReusableModal';
import InputField from '../../components/InputField';
import SelectDropdown from '../../components/SelectDropdown/SelectDropdown';
import {CommonProps, ParamsProps} from '../types';
import {AppDispatch, RootState} from '../../store/store';
import {useDispatch, useSelector} from 'react-redux';
import {
  setAddProductionWorkData,
  setProductionLoaderData,
  setProductionWorkStatusUpdateData,
  setUpdateProductionWorkData,
  setUpdateProductionWorkDelete,
} from '../../createSlice/productionsSlice';
import FastImageView from '../../components/FastImageView';
import moment from 'moment';
import {
  fetchProductionDetail,
  fetchProductionWorkCreate,
  fetchProductionWorkDelete,
  fetchProductionWorkStatusUpdate,
  fetchProductionWorkUpdate,
} from '../../createAsyncThunk/productionsThunk';
import {urlEndPoint} from '../../constants/urlEndPoint';
import ToastMessage from '../../components/ToastMessage';
import DateTimePicker from '@react-native-community/datetimepicker';
import {calculateDates} from './StartEndDate';

const sortingType = [
  {name: strings.inProgress, id: 'in_progress'},
  {name: strings.completed, id: 'completed'},
  {name: strings.cancelled, id: 'cancelled'},
];

export default function ProductionDetail({navigation}: CommonProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [
    productionDetailData,
    productionDetailLoading,
    addProductionWorkData,
    addProductionWorkLoading,
    updateProductionWorkData,
    updateProductionWorkLoading,
    productionWorkDeleteData,
    productionWorkDeleteLoading,
    productionWorkStatusUpdateData,
    productionWorkStatusUpdateLoading,
    workSearchData,
    error,
  ] = useSelector((state: RootState) => [
    state.productionsSlice.productionDetailData,
    state.productionsSlice.productionDetailLoading,
    state.productionsSlice.addProductionWorkData,
    state.productionsSlice.addProductionWorkLoading,
    state.productionsSlice.updateProductionWorkData,
    state.productionsSlice.updateProductionWorkLoading,
    state.productionsSlice.productionWorkDeleteData,
    state.productionsSlice.productionWorkDeleteLoading,
    state.productionsSlice.productionWorkStatusUpdateData,
    state.productionsSlice.productionWorkStatusUpdateLoading,
    state.worksSlice.WorkSearchData,
    state.productionsSlice.error,
  ]);
  const detail = productionDetailData?.production;

  const [requireFormData, setRequireFormData] = useState({
    work: {workName: '', id: ''},
  });
  const [formData, setFormData] = useState<any | Date>({
    note: '',
    name: '',
    mobile: '',
    whatsApp: '',
    email: '',
    status: {name: '', id: ''},
    finishedAt: '',
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [selectWorksItem, setSelectWorksItem] = useState<any>('');
  const [worksList, setWorksList] = useState([]);
  const [workListData, setWorkListData] = useState<any>([]);
  const [selectStatus, seSelectStatus] = useState({name: '', id: ''});
  const [workAddModal, setWorkAddModal] = useState(false);
  const [statusChangeModal, setStatusChangeModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const isFirstRender = useRef(true);
  const startEndDate = calculateDates(detail?.production_works);

  useEffect(() => {
    if (error) {
      dispatch(setProductionLoaderData(null));
    }
  }, [error]);

  useEffect(() => {
    if (detail) {
      setWorksList(detail?.production_works || []);
    }
  }, [productionDetailData]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (workSearchData && workAddModal) {
      const itemsArray = Object.keys(workSearchData)
        .filter(key => !isNaN(Number(key))) // keep only numeric keys
        .map(key => workSearchData[key]);
      setWorkListData(itemsArray);
    }
  }, [workSearchData, workAddModal]);

  useEffect(() => {
    if (addProductionWorkData) {
      ToastMessage.set(toastConst.errorToast, addProductionWorkData.message);
      dispatch(setAddProductionWorkData(null));
      dispatch(
        fetchProductionDetail({
          params: '',
          endPoint: urlEndPoint.productions + `/${detail?.id}`,
        }),
      );
      resetData();
    }
    if (updateProductionWorkData) {
      ToastMessage.set(toastConst.errorToast, updateProductionWorkData.message);
      dispatch(setUpdateProductionWorkData(null));
      dispatch(
        fetchProductionDetail({
          params: '',
          endPoint: urlEndPoint.productions + `/${detail?.id}`,
        }),
      );
      resetData();
    }
  }, [addProductionWorkData, updateProductionWorkData]);

  useEffect(() => {
    if (productionWorkDeleteData) {
      ToastMessage.set(
        toastConst.errorToast,
        productionWorkDeleteData?.message,
      );
      dispatch(setUpdateProductionWorkDelete(null));
      dispatch(
        fetchProductionDetail({
          params: '',
          endPoint: urlEndPoint.productions + `/${detail?.id}`,
        }),
      );
      resetData();
    }
  }, [productionWorkDeleteData]);

  useEffect(() => {
    if (productionWorkStatusUpdateData) {
      ToastMessage.set(
        toastConst.errorToast,
        productionWorkStatusUpdateData?.message,
      );
      dispatch(setProductionWorkStatusUpdateData(null));
      dispatch(
        fetchProductionDetail({
          params: '',
          endPoint: urlEndPoint.productions + `/${detail?.id}`,
        }),
      );
      resetData();
    }
  }, [productionWorkStatusUpdateData]);

  useEffect(() => {
    if (selectWorksItem && workAddModal) {
      const customerTypeFind = sortingType.findIndex(
        e => e.id == selectWorksItem?.status,
      );
      setRequireFormData({
        work: {workName: selectWorksItem?.name, id: selectWorksItem?.work_id},
      });
      setFormData({
        note: selectWorksItem?.notes,
        name: selectWorksItem?.contact_name,
        mobile: selectWorksItem?.contact_mobile,
        whatsApp: selectWorksItem?.contact_whatsapp,
        email: selectWorksItem?.contact_email,
        status: {
          name: sortingType[customerTypeFind]?.name,
          id: sortingType[customerTypeFind]?.id,
        },
        finishedAt: selectWorksItem?.finished_at
          ? selectWorksItem?.finished_at
          : '',
      });
    }
    if (selectWorksItem && statusChangeModal) {
      const customerTypeFind = sortingType.findIndex(
        e => e.id == selectWorksItem?.status,
      );
      seSelectStatus({
        name: sortingType[customerTypeFind]?.name,
        id: sortingType[customerTypeFind]?.id,
      });
    }
  }, [selectWorksItem]);

  const resetData = () => {
    setRequireFormData({
      work: {workName: '', id: ''},
    });
    setFormData({
      note: '',
      name: '',
      mobile: '',
      whatsApp: '',
      email: '',
      status: {name: '', id: ''},
      finishedAt: '',
    });
    setSelectWorksItem('');
    seSelectStatus({name: '', id: ''});
    setStatusChangeModal(false);
    setWorkAddModal(false);
    setWorkAddModal(false);
    setDeleteModal(false);
  };

  const statusChangeHandle = () => {
    const params: ParamsProps = {
      status: selectStatus.id,
    };
    dispatch(
      fetchProductionWorkStatusUpdate({
        params: params,
        endPoint:
          urlEndPoint.productions +
          `/${detail?.id}/` +
          urlEndPoint.production_works +
          `/${selectWorksItem?.id}/update_status`,
      }),
    );
  };

  const addEditWorkHandle = () => {
    const requireForm = {
      work: requireFormData?.work.id,
    };
    if (selectWorksItem) {
      requireForm.status = formData?.status.id;
    }

    const errors = validateForm(requireForm);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const params: ParamsProps = {
        'production_work[work_id]': requireFormData.work.id,
        'production_work[status]': formData?.status.id,
        'production_work[notes]': formData?.note,
        'production_work[contact_name]': formData?.name,
        'production_work[contact_mobile]': formData?.mobile,
        'production_work[contact_whatsapp]': formData?.whatsApp,
        'production_work[contact_email]': formData?.email,
        'production_work[finished_at]': moment(formData?.finishedAt).format(
          'YYYY-MM-DD',
        ),
      };

      if (selectWorksItem) {
        dispatch(
          fetchProductionWorkUpdate({
            params: params,
            endPoint:
              urlEndPoint.productions +
              `/${detail?.id}/` +
              urlEndPoint.production_works +
              `/${selectWorksItem?.id}`,
          }),
        );
      } else {
        dispatch(
          fetchProductionWorkCreate({
            params: params,
            endPoint:
              urlEndPoint.productions +
              `/${detail?.id}/` +
              urlEndPoint.production_works,
          }),
        );
      }
    }
  };

  const deleteWorkHandel = () => {
    if (selectWorksItem) {
      dispatch(
        fetchProductionWorkDelete({
          params: '',
          endPoint:
            urlEndPoint.productions +
            `/${detail?.id}/` +
            urlEndPoint.production_works +
            `/${selectWorksItem?.id}`,
        }),
      );
    }
  };

  const modalDeleteContent = () => (
    <View>
      <Text style={{color: Colors.textCl, ...typography._16SofticesSemibold}}>
        {selectWorksItem?.name}
      </Text>
    </View>
  );

  const modalContent = () => {
    return (
      <View>
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
                requiredField={true}
                errorMessage={formErrors?.work}
                validationStatus={formErrors?.work ? 'error' : 'default'}
              />
            );
          }}
        />
        {selectWorksItem ? (
          <>
            <SelectDropdown
              data={sortingType}
              disabled={isNull(sortingType)}
              buttonStyle={[styles.inputStyleAcc]}
              onSelect={(selectedItem: any, index: any) => {
                setFormData({
                  ...formData,
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
                    value={formData.status.name}
                    onChangeText={() =>
                      setFormData({
                        ...formData,
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
            <TouchableOpacity
              activeOpacity={ACTIVE_OPACITY}
              onPress={() => setShowDatePicker(true)}>
              <InputField
                value={
                  formData.finishedAt
                    ? moment(formData.finishedAt).format('DD - MM - YYYY')
                    : strings.dateFormate
                }
                onChangeText={val =>
                  setFormData({...formData, finishedAt: val})
                }
                labelTxt={strings.finishedAt}
                placeholder={strings.dateFormate}
                editable={false}
                rightIcon={
                  <CalendarSvg
                    width={20}
                    height={20}
                    color={Colors.textLight}
                    styles={{marginRight: ms(14)}}
                  />
                }
              />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={(_, selectedDate) => {
                  if (selectedDate)
                    setFormData({
                      ...formData,
                      finishedAt: selectedDate,
                    });
                  setShowDatePicker(false);
                }}
              />
            )}
          </>
        ) : null}
        <InputField
          value={formData.note}
          onChangeText={val => setFormData({...formData, note: val})}
          labelTxt={strings.notes}
          placeholder={strings.notePlaceholder}
          multiline={true}
          textAlignVertical={'top'}
        />
        <Text
          style={[
            styles.titleText,
            {textAlign: 'left', marginTop: ms(4), marginBottom: ms(16)},
          ]}>
          {strings.contactPerson}
        </Text>
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
      </View>
    );
  };

  const statusChangeModalContent = () => {
    return (
      <View>
        <SelectDropdown
          data={sortingType}
          disabled={isNull(sortingType)}
          buttonStyle={[styles.inputStyleAcc]}
          onSelect={(selectedItem: any, index: any) => {
            seSelectStatus({name: selectedItem?.name, id: selectedItem?.id});
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
                value={selectStatus.name}
                onChangeText={() => seSelectStatus({name: '', id: ''})}
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
      </View>
    );
  };

  return (
    <SafeAreaWrapper statusBg={Colors.primary} barStyle="light-content">
      <ActionBar
        title={strings.productions}
        LeftIcon={<BackSvg width={28} height={28} color={Colors.white} />}
        onLeftPress={() => goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* Sale Code Card */}
        <View>
          <View style={styles.imageBox}>
            {detail?.cover_image_url ? (
              <FastImageView
                source={detail?.cover_image_url}
                resizeMode="contain"
                style={styles.image}
              />
            ) : (
              <DetailTitleSvg
                width={100}
                height={140}
                color={Colors.borderCl}
              />
            )}
          </View>
          <Text style={styles.titleText}>{detail?.product_name}</Text>
        </View>

        {/* Details Card */}
        <View style={styles.detailCard}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: ms(20),
            }}>
            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <QuantitySvg width={24} height={24} color={Colors.secondary} />
              </View>

              <View style={styles.detailTextBox}>
                <Text style={styles.detailLabel}>{strings.quantity}</Text>
                <Text style={styles.detailValue}>{detail?.quantity}</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <StatusDetailSvg
                  width={24}
                  height={24}
                  color={Colors.secondary}
                />
              </View>

              <View style={styles.detailTextBox}>
                <Text style={styles.detailLabel}>{strings.status}</Text>
                <Text
                  style={[
                    styles.detailValue,
                    {
                      color:
                        detail?.status == 'in_progress'
                          ? Colors.Tawny
                          : detail?.status == 'completed'
                          ? Colors.NorthTexasGreen
                          : detail?.status == 'cancelled'
                          ? Colors.textLight
                          : '',
                    },
                  ]}>
                  {detail?.status == 'in_progress'
                    ? strings.inProgress
                    : detail?.status == 'completed'
                    ? strings.completed
                    : detail?.status == 'cancelled'
                    ? strings.cancelled
                    : null}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.divider} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <DateSvg width={24} height={24} color={Colors.secondary} />
              </View>

              <View style={styles.detailTextBox}>
                <Text style={styles.detailLabel}>{strings.startedDate}</Text>
                <Text style={styles.detailValue}>
                  {startEndDate?.startDate
                    ? moment(startEndDate?.startDate).format('DD-MM-YYYY')
                    : '-'}
                </Text>
              </View>
            </View>
            {startEndDate?.completedDate ? (
              <View style={styles.detailRow}>
                <View style={{alignItems: 'flex-end'}}>
                  <Text style={styles.detailLabel}>
                    {strings.completedDate}
                  </Text>

                  <Text style={styles.detailValue}>
                    {startEndDate?.completedDate
                      ? moment(startEndDate?.completedDate).format('DD-MM-YYYY')
                      : '-'}
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={styles.detailLabel}>{strings.inProgress}</Text>
            )}
          </View>
        </View>
        <View style={styles.screenDivider} />
        <View style={styles.headerRow}>
          <Text style={styles.header}>{strings.works}</Text>
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            onPress={() => {
              setWorkAddModal(true);
            }}
            style={styles.addButton}>
            <AddSvg width={26} height={26} color={Colors.primary} />
            <Text style={styles.addText}>{strings.addWork}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={worksList}
          scrollEnabled={false}
          style={{marginTop: ms(16)}}
          renderItem={({item}) => (
            <CardProductionDetailItem
              item={item}
              onPress={() => {}}
              setStatusChangeModal={() => {
                setStatusChangeModal(true);
                setSelectWorksItem(item);
              }}
              setSelectItem={(item: any) => {
                setSelectWorksItem(item);
                setWorkAddModal(true);
              }}
              deleteModal={() => {
                setSelectWorksItem(item);
                setDeleteModal(true);
              }}
            />
          )}
          keyExtractor={(item: any) => item?.id}
          ListEmptyComponent={
            <EmptyState
              title={strings.noDataFound}
              description={strings.noDataFoundDes}
            />
          }
        />
      </ScrollView>

      <ReusableModal
        visible={workAddModal}
        submitLabel={selectWorksItem ? strings.update : strings.submit}
        submitBgColor={Colors.primary}
        title={selectWorksItem ? strings.editWork : strings.addWork}
        isLoading={addProductionWorkLoading || updateProductionWorkLoading}
        onClose={() => {
          resetData();
        }}
        onSubmit={() => addEditWorkHandle()}>
        {modalContent()}
      </ReusableModal>

      <ReusableModal
        visible={statusChangeModal}
        submitLabel={strings.submit}
        submitBgColor={Colors.primary}
        title={strings.updateStatus}
        isLoading={productionWorkStatusUpdateLoading}
        onClose={() => {
          resetData();
        }}
        onSubmit={() => statusChangeHandle()}>
        {statusChangeModalContent()}
      </ReusableModal>

      <ReusableModal
        visible={deleteModal}
        cancelLabel={strings.cancel}
        submitLabel={strings.delete}
        submitBgColor={Colors.colorRedD4}
        title={strings.delete}
        description={strings.deleteConf}
        isLoading={productionWorkDeleteLoading}
        onClose={() => {
          resetData();
        }}
        onSubmit={() => deleteWorkHandel()}>
        {modalDeleteContent()}
      </ReusableModal>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: ms(5),
  },
  imageBox: {
    height: ms(180),
    width: ms(180),
    borderWidth: ms(1),
    borderColor: Colors.borderCl,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(10),
    alignSelf: 'center',
    marginTop: ms(15),
  },
  image: {
    height: ms(180),
    width: ms(180),
    borderRadius: ms(10),
  },
  titleText: {
    ...typography._20SofticesBold,
    color: Colors.textCl,
    textAlign: 'center',
    marginTop: ms(14),
  },
  detailCard: {
    backgroundColor: Colors.white,
    borderRadius: ms(12),
    padding: ms(16),
    marginTop: ms(18),
    borderWidth: ms(1),
    marginHorizontal: ms(20),
    borderColor: Colors.borderCl,
    shadowColor: Colors.black,
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
  },
  detailIcon: {
    width: ms(40),
    height: ms(40),
    marginRight: ms(12),
    borderRadius: ms(8),
    borderWidth: ms(1),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.imgBg,
    borderColor: Colors.borderCl,
  },
  detailTextBox: {
    // flex: 1,
  },
  detailLabel: {
    ...typography._16SofticesRegular,
    color: Colors.textLight,
    marginBottom: ms(2),
  },
  detailValue: {
    ...typography._16SofticesSemibold,
    color: Colors.black,
  },
  divider: {
    height: vs(1),
    backgroundColor: Colors.borderCl,
    marginBottom: vs(20),
  },
  screenDivider: {
    height: ms(10),
    backgroundColor: Colors.borderCl,
    marginVertical: ms(24),
  },
  noteBox: {
    marginTop: ms(8),
  },
  noteLabel: {
    ...typography._16SofticesRegular,
    color: Colors.textLight,
    marginBottom: ms(2),
  },
  noteValue: {
    ...typography._16SofticesRegular,
    color: Colors.black,
  },

  header: {...typography._20SofticesBold, color: Colors.textCl},
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: ms(20),
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: ms(8),
    paddingHorizontal: ms(8),
    paddingVertical: ms(5),
    borderWidth: ms(1),
    borderColor: Colors.primary,
  },
  addText: {
    marginLeft: ms(6),
    ...typography._16SofticesSemibold,
    color: Colors.primary,
  },
  inputStyleAcc: {
    width: '100%',
  },
});
