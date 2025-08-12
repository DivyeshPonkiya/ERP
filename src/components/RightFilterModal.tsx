import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {hs, ms, vs} from '../theme/spacing';
import {typography} from '../theme/typography';
import {Colors} from '../theme/variables';
import {strings} from '../localization';
import InputField from './InputField';
import {CalendarSvg} from '../assets/Images/svg';
import ButtonView from './ButtonView';
import {ACTIVE_OPACITY, hexToRGBA} from '../constants/constants';

type Props = {
  visible: boolean;
  onClose: () => void;
  onApply: () => void;
  onClear: () => void;
  product: string;
  onProductChange: (text: string) => void;
  period: Date;
  onPeriodChange: (date: Date) => void;
};

const RightToLeftFilterModal: React.FC<Props> = ({
  visible,
  onClose,
  onApply,
  onClear,
  product,
  onProductChange,
  period,
  onPeriodChange,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.container}>
        {/* Right Slide-In Sheet */}
        <View style={styles.sheet}>
          <Text style={styles.title}>{strings.filter}</Text>
          <Text style={styles.description}>{strings.filterSubtitle}</Text>

          <View style={{marginTop: vs(20)}}>
            <InputField
              value={product}
              onChangeText={onProductChange}
              labelTxt={strings.product}
              placeholder={strings.product}
            />
            {/* Period */}
            <Text style={[styles.label]}>{strings.period}</Text>
            <TouchableOpacity
              activeOpacity={ACTIVE_OPACITY}
              style={styles.datePicker}
              onPress={() => setShowDatePicker(true)}>
              <CalendarSvg height={22} width={22} color={Colors.textLight} />
              <Text style={styles.dateText}>
                {period.toLocaleDateString('en-GB')}
              </Text>
              {/* <Feather name="chevron-down" size={18} color="#0F172A" /> */}
            </TouchableOpacity>
          </View>
          {/* Footer Buttons */}
          <View style={styles.footer}>
            <ButtonView
              btnTxt={strings.clear}
              btnStyle={{
                height: ms(50),
                backgroundColor: Colors.white,
                borderWidth: 1,
                borderColor: Colors.borderCl,
                borderRadius: ms(10),
              }}
              onBtnPress={onClear}
              fontColor={Colors.textLight}
              style={{width: '48%'}}
            />
            <ButtonView
              btnTxt={strings.apply}
              btnStyle={{
                height: ms(50),
                backgroundColor: Colors.primary,
                borderRadius: ms(10),
              }}
              onBtnPress={onApply}
              fontColor={Colors.white}
              style={{width: '48%', height: ms(50)}}
            />
          </View>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={period}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={(_, selectedDate) => {
              if (selectedDate) onPeriodChange(selectedDate);
              setShowDatePicker(false);
            }}
          />
        )}

        {/* Backdrop */}
        <TouchableOpacity
          activeOpacity={ACTIVE_OPACITY}
          style={styles.backdrop}
          onPress={onClose}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row-reverse', // Important: ensures right-to-left slide
    backgroundColor: hexToRGBA(Colors.black, 0.5),
  },
  sheet: {
    width: '80%',
    backgroundColor: Colors.white,
    padding: hs(16),
    justifyContent: 'flex-start',
    elevation: 10,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  title: {
    ...typography._24SofticesBold,
    color: Colors.textCl,
  },
  description: {
    ...typography._16SofticesRegular,
    color: Colors.textLight,
    marginTop: vs(4),
    marginBottom: vs(16),
  },
  label: {
    ...typography._16SofticesSemibold,
    color: Colors.textCl,
    marginBottom: vs(8),
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.borderCl,
    borderRadius: ms(12),
    paddingHorizontal: hs(12),
    paddingVertical: vs(10),
    fontSize: ms(14),
    color: '#0F172A',
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: hs(12),
    paddingVertical: vs(10),
    justifyContent: 'space-between',
    height: ms(50),
  },
  dateText: {
    flex: 1,
    marginHorizontal: hs(10),
    fontSize: ms(14),
    color: '#0F172A',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingTop: vs(20),
  },
  clearBtn: {
    borderWidth: 1,
    borderColor: '#1D4ED8',
    paddingHorizontal: hs(24),
    paddingVertical: vs(12),
    borderRadius: 10,
  },
  clearText: {
    fontSize: ms(14),
    fontWeight: '600',
    color: '#1D4ED8',
  },
  applyBtn: {
    backgroundColor: '#1D4ED8',
    paddingHorizontal: hs(24),
    paddingVertical: vs(12),
    borderRadius: 10,
  },
  applyText: {
    fontSize: ms(14),
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default RightToLeftFilterModal;
