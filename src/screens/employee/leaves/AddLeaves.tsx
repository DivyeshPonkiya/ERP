// EditProfile.tsx
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Switch,
  TouchableOpacity,
  Platform,
} from 'react-native';

import ActionBar from '../../../components/ActionBar';
import {BackSvg, CalendarSvg, DropDownSvg} from '../../../assets/Images/svg';
import {ms} from '../../../theme/spacing';
import {typography} from '../../../theme/typography';
import {Colors} from '../../../theme/variables';
import InputField from '../../../components/InputField';
import {strings} from '../../../localization';
import {
  ACTIVE_OPACITY,
  CFL,
  hexToRGBA,
  isNull,
  toastConst,
  validateForm,
} from '../../../constants/constants';
import ButtonView from '../../../components/ButtonView';
import SafeAreaWrapper from '../../../components/SafeAreaWrapper';
import {goBack} from '../../../navigators/RootNavigation';
import SelectDropdown from '../../../components/SelectDropdown/SelectDropdown';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import {urlEndPoint} from '../../../constants/urlEndPoint';
import ToastMessage from '../../../components/ToastMessage';
import {
  fetchLeaves,
  fetchLeavesCreate,
  fetchLeavesEdit,
  fetchLeavesSearch,
} from '../../../createAsyncThunk/leavesThunk';
import DateTimePicker from '@react-native-community/datetimepicker';

import {AppDispatch} from '../../../store/store';
import {
  setAddLeavesData,
  setEditLeavesData,
} from '../../../createSlice/leavesSlice';
import _ from 'lodash';
import {ParamsProps} from '../../types';
import moment from 'moment';

const timeUnitType = [
  {id: '0', name: 'First half'},
  {id: '2', name: 'Second half'},
];

export default function AddLeaves({navigation, route}: any) {
  const dispatch = useDispatch<AppDispatch>();

  const [
    AddLeavesData,
    AddLeavesLoading,
    EditLeavesData,
    EditLeavesLoading,

    LeavesSearchData,
    LeavesSearchLoading,
    error,
  ] = useSelector((state: RootState) => [
    state.leavesSlice.AddLeavesData,
    state.leavesSlice.AddLeavesLoading,

    state.leavesSlice.EditLeavesData,
    state.leavesSlice.EditLeavesLoading,

    state.leavesSlice.LeavesSearchData,
    state.leavesSlice.LeavesSearchLoading,

    state.leavesSlice.error,
  ]);

  const [formDataRequired, setFormDataRequired] = useState({
    date: '',
    leave_type: {name: '', id: ''},
    description: '',
  });

  const [formData, setFormData] = useState({
    half_day: false,
    half_day_period: {name: '', id: ''},
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  const routeParams = route?.params?.workData;

  useEffect(() => {
    if (error == 501) {
    }
  }, [error]);

  useEffect(() => {
    if (!isNull(routeParams)) {
      setFormDataRequired({
        date: routeParams?.date,
        leave_type: {name: _.capitalize(routeParams?.time_unit), id: ''},
        description: routeParams?.description,
      });
      setFormData({
        half_day: routeParams?.half_day,
        half_day_period: {name: '', id: ''},
      });
    }
  }, [routeParams]);

  useEffect(() => {
    if (!isNull(AddLeavesData) || !isNull(EditLeavesData)) {
      ToastMessage.set(
        toastConst.errorToast,
        AddLeavesData?.message || EditLeavesData?.message,
      );
      dispatch(
        fetchLeaves({
          endPoint: urlEndPoint.employeeLeaves,
        }),
      );

      dispatch(setAddLeavesData(null));
      dispatch(setEditLeavesData(null));

      setFormDataRequired({
        date: '',
        leave_type: {name: '', id: ''},
        description: '',
      });

      setFormData({
        half_day: false,
        half_day_period: {name: '', id: ''},
      });

      navigation.goBack();
    }
  }, [AddLeavesData, EditLeavesData]);

  const handleEdit = () => {
    const errors = validateForm(formDataRequired);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const params: ParamsProps = {
        'leave[leave_type_id]': formDataRequired.leave_type.id,
        'leave[date]': formDataRequired.date,
        'leave[half_day]': formData.half_day,
        'leave[details]': formDataRequired.description,
        'leave[half_day_period]':formData.half_day ? formData.half_day_period.name :'',

      };
      if (routeParams) {
        dispatch(
          fetchLeavesEdit({
            params: params,
            endPoint: urlEndPoint.employeeLeaves + `/${routeParams?.id}`,
          }),
        );
      } else {
        dispatch(
          fetchLeavesCreate({
            params: params,
            endPoint: urlEndPoint.employeeLeaves,
          }),
        );
      }
    }
  };

  const loadTypes = (search: any) => {
    const rawParams = {
      search: search,
    };
    const params = Object.entries(rawParams).reduce((acc, [key, value]) => {
      if (value !== '' && value !== undefined && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);
    console.log(rawParams, 'loadTypes');

    dispatch(
      fetchLeavesSearch({
        params: params,
        endPoint: urlEndPoint.leaveTypes,
      }),
    );
  };

  return (
    <SafeAreaWrapper statusBg={Colors.primary} barStyle="light-content">
      <ActionBar
        title={strings.addLeave}
        LeftIcon={<BackSvg width={28} height={28} color={Colors.white} />}
        onLeftPress={() => goBack()}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <SelectDropdown
          data={LeavesSearchData?.leave_types}
          disableAutoScroll={false}
          search={true}
          onChangeSearchInputText={(text: any) => {
            setFormDataRequired(prev => ({
              ...prev,
              leave_type: {...prev.leave_type, name: text, id: ''},
            }));
            loadTypes(text);
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
          buttonStyle={[styles.inputStyleAcc]}
          searchPlaceHolder={strings.search}
          renderCustomizedButtonChild={(selectedItem: any) => (
            <InputField
              value={_.capitalize(formDataRequired?.leave_type?.name)}
              onChangeText={val => {
                setFormDataRequired(prev => ({
                  ...prev,
                  leave_type: {...prev?.leave_type, name: val, id: ''},
                }));
              }}
              labelTxt={strings.leaveType}
              placeholder={strings.search}
              requiredField={true}
              editable={false}
            />
          )}
          onSelect={(item: any, index: any) => {
            setFormDataRequired(prev => ({
              ...prev,
              leave_type: {
                name: item.name,
                id: item.id,
              },
            }));
          }}
          errorMessage={formErrors?.leave_type?.name}
          validationStatus={formErrors?.leave_type?.name ? 'error' : 'default'}
        />

        <TouchableOpacity
          activeOpacity={ACTIVE_OPACITY}
          onPress={() => setShowDatePicker(true)}>
          <InputField
            value={
              formDataRequired.date
                ? moment(formDataRequired.date).format('DD - MM - YYYY')
                : strings.dateFormate
            }
            onChangeText={val => {
              setFormDataRequired({...formDataRequired, date: val});
            }}
            labelTxt={strings.date}
            placeholder={strings.select}
            editable={false}
            rightIcon={
              <CalendarSvg
                width={20}
                height={20}
                color={Colors.textLight}
                styles={{marginRight: ms(14)}}
              />
            }
            requiredField={true}
            errorMessage={formErrors?.date}
            validationStatus={formErrors?.date ? 'error' : 'default'}
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            minimumDate={new Date()}
            onChange={(_, selectedDate: any) => {
              if (selectedDate)
                setFormDataRequired({
                  ...formDataRequired,
                  date: selectedDate,
                });
              setShowDatePicker(false);
            }}
          />
        )}

        <View style={styles.activeBtnView}>
          <Text style={styles.titleText}>{strings.halfDay}?</Text>
          <Switch
            value={formData.half_day}
            onValueChange={val => setFormData({...formData, half_day: val})}
            trackColor={{
              true: hexToRGBA(Colors.NorthTexasGreen, 0.4),
              false: hexToRGBA(Colors.gray, 0.4),
            }}
            thumbColor={
              formData.half_day ? Colors.NorthTexasGreen : Colors.gray
            }
          />
        </View>

        {formData.half_day ? (
          <SelectDropdown
            data={timeUnitType}
            disabled={isNull(timeUnitType)}
            buttonStyle={[styles.inputStyleAcc]}
            onSelect={(selectedItem: any, index: any) => {
              setFormData({
                ...formData,
                half_day_period: {
                  name: selectedItem?.name,
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
                  value={formData?.half_day_period?.name}
                  onChangeText={(val: any) =>
                    setFormData({...formData, half_day_period: val})
                  }
                  editable={false}
                  labelTxt={strings.halfDayPeriod}
                  placeholder={strings.select}
                  rightIcon={
                    <View style={styles.pcsView}>
                      <DropDownSvg
                        height={22}
                        width={22}
                        color={Colors.textLight}
                      />
                    </View>
                  }
                  requiredField={
                    formData?.half_day
                      ? formData.half_day_period.name === 'Select'
                        ? true
                        : false
                      : false
                  }
                />
              );
            }}
          />
        ) : null}

        <InputField
          value={formDataRequired.description}
          onChangeText={val =>
            setFormDataRequired({...formDataRequired, description: val})
          }
          labelTxt={strings.details}
          placeholder={strings.writeDetails}
          multiline={true}
          textAlignVertical={'top'}
          requiredField={true}
          errorMessage={formErrors?.description}
          validationStatus={formErrors?.description ? 'error' : 'default'}
        />
      </ScrollView>
      <ButtonView
        btnTxt={routeParams ? strings.update : strings.submit}
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
          marginBottom: ms(20),
        }}
        isLoading={AddLeavesLoading || EditLeavesLoading}
        disable={AddLeavesLoading || EditLeavesLoading}
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
  pcsView: {
    backgroundColor: Colors.cardBg,
    borderRadius: ms(10),
    height: ms(42),
    paddingHorizontal: ms(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginRight: ms(4),
  },
  pcsText: {
    color: Colors.textCl,
    ...typography._16SofticesRegular,
  },
});
