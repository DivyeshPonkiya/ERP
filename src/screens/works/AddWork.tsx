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
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {urlEndPoint} from '../../constants/urlEndPoint';
import ToastMessage from '../../components/ToastMessage';
import {
  fetchWork,
  fetchWorkCreate,
  fetchWorkEdit,
} from '../../createAsyncThunk/worksThunk';

import {AppDispatch} from '../../store/store';
import {setAddWorkData, setEditWorkData} from '../../createSlice/worksSlice';
import _ from 'lodash';
import {ParamsProps} from '../types';

export default function AddWork({navigation, route}: any) {
  const dispatch = useDispatch<AppDispatch>();

  const timeUnitType = [
    {id: 'select', name: 'Select'},
    {id: 'minute', name: 'Minute'},
    {id: 'hour', name: 'Hour'},
    {id: 'day', name: 'Day'},
    {id: 'week', name: 'Week'},
    {id: 'month', name: 'Month'},
    {id: 'year', name: 'Year'},
  ];

  const [AddWorkData, AddWorkLoading, EditWorkData, EditWorkLoading, error] =
    useSelector((state: RootState) => [
      state.worksSlice.AddWorkData,
      state.worksSlice.AddWorkLoading,

      state.worksSlice.EditWorkData,
      state.worksSlice.EditWorkLoading,

      state.worksSlice.error,
    ]);

  const [requireFormData, setRequireFormData] = useState({
    name: '',
  });
  const [formData, setFormData] = useState({
    active: false,
    last_step: false,
    time_to_finish: '',
    time_unit: {name: '', id: ''},
    description: '',
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const routeParams = route?.params?.workData;

  useEffect(() => {
    if (error == 501) {
    }
  }, [error]);

  useEffect(() => {
    if (!isNull(routeParams)) {
      setRequireFormData({
        name: routeParams?.name,
      });
      setFormData({
        active: routeParams?.active,
        last_step: routeParams?.last_step,
        time_to_finish: routeParams?.time_to_finish,
        time_unit: {name: _.capitalize(routeParams?.time_unit), id: ''},
        description: routeParams?.description,
      });
    }
  }, [routeParams]);

  useEffect(() => {
    if (!isNull(AddWorkData) || !isNull(EditWorkData)) {
      ToastMessage.set(
        toastConst.errorToast,
        AddWorkData?.message || EditWorkData?.message,
      );
      dispatch(
        fetchWork({
          endPoint: urlEndPoint.works,
        }),
      );

      dispatch(setAddWorkData(null));
      dispatch(setEditWorkData(null));

      setRequireFormData({
        name: '',
      });
      setFormData({
        active: false,
        last_step: false,
        time_to_finish: '',
        time_unit: {name: '', id: ''},
        description: '',
      });

      navigation.goBack();
    }
  }, [AddWorkData, EditWorkData]);

  const handleEdit = () => {
    const requireForm: any = requireFormData;

    if (formData.time_to_finish && formData.time_unit.name === 'Select') {
      requireForm.time_to_finish = '';
    }

    const errors = validateForm(requireForm);

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const params: ParamsProps = {
        'work[name]': requireFormData.name,
        'work[time_to_finish]': formData.time_to_finish,
        'work[time_unit]': formData.time_unit.name,
        'work[last_step]': formData.last_step ? 1 : 0,
        'work[active]': formData.active ? 1 : 0,
        'work[description]': formData.description,
      };
      if (routeParams) {
        dispatch(
          fetchWorkEdit({
            params: params,
            endPoint: urlEndPoint.works + `/${routeParams?.id}`,
          }),
        );
      } else {
        dispatch(
          fetchWorkCreate({
            params: params,
            endPoint: urlEndPoint.works,
          }),
        );
      }
    }
  };

  return (
    <SafeAreaWrapper statusBg={Colors.primary} barStyle="light-content">
      <ActionBar
        title={strings.addWork}
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

        <SelectDropdown
          data={timeUnitType}
          disabled={isNull(timeUnitType)}
          buttonStyle={[styles.inputStyleAcc]}
          onSelect={(selectedItem: any, index: any) => {
            setFormData({
              ...formData,
              time_unit: {name: selectedItem?.name, id: selectedItem?.id},
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
                value={
                  formData?.time_to_finish ? `${formData?.time_to_finish}` : ''
                }
                onChangeText={(val: any) =>
                  setFormData({...formData, time_to_finish: val})
                }
                inputKeyboardType="number-pad"
                labelTxt={strings.timeToFinish}
                placeholder={strings.timeToFinish}
                rightIcon={
                  <View style={styles.pcsView}>
                    <Text style={styles.pcsText}>
                      {formData?.time_unit.name
                        ? formData?.time_unit.name
                        : strings.select}
                    </Text>
                    <DropDownSvg
                      height={22}
                      width={22}
                      color={Colors.textLight}
                    />
                  </View>
                }
                requiredField={
                  formData?.time_to_finish
                    ? formData.time_unit.name === 'Select'
                      ? true
                      : false
                    : false
                }
              />
            );
          }}
        />

        <View style={styles.activeBtnView}>
          <Text style={styles.titleText}>{strings.lastStep}?</Text>
          <Switch
            value={formData.last_step}
            onValueChange={val => setFormData({...formData, last_step: val})}
            trackColor={{
              true: hexToRGBA(Colors.NorthTexasGreen, 0.4),
              false: hexToRGBA(Colors.gray, 0.4),
            }}
            thumbColor={
              formData.last_step ? Colors.NorthTexasGreen : Colors.gray
            }
          />
        </View>

        <View style={styles.activeBtnView}>
          <Text style={styles.titleText}>{strings.active}?</Text>
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

        <InputField
          value={formData.description}
          onChangeText={val => setFormData({...formData, description: val})}
          labelTxt={strings.description}
          placeholder={strings.writeDescription}
          multiline={true}
          textAlignVertical={'top'}
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
        isLoading={AddWorkLoading || EditWorkLoading}
        disable={AddWorkLoading || EditWorkLoading}
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
    minWidth: ms(93),
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
