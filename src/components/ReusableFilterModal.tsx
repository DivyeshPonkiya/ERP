import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ms} from '../theme/spacing';
import {typography} from '../theme/typography';
import {Colors} from '../theme/variables';
import {strings} from '../localization';
import ButtonView from './ButtonView';
import {ACTIVE_OPACITY, hexToRGBA} from '../constants/constants';

type Props = {
  visible: boolean;
  onClose?: () => void;
  onApply?: () => void;
  onClear?: () => void;
  period?: Date;
  onPeriodChange?: (date: Date) => void;
  children: any;
  isLoading: boolean;
  scrollEnabled?: boolean;
};

const ReusableFilterModal: React.FC<Props> = ({
  visible,
  onClose,
  onApply,
  onClear,
  period,
  onPeriodChange,
  children,
  isLoading = false,
  scrollEnabled = true,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <SafeAreaView />
      <View style={styles.container}>
        {/* Right Slide-In Sheet */}
        <View style={styles.sheet}>
          <Text style={styles.title}>{strings.filter}</Text>
          <Text style={styles.description}>{strings.filterSubtitle}</Text>

          <ScrollView
            style={styles.content}
            scrollEnabled={scrollEnabled}
            showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
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
              isLoading={isLoading}
              disable={isLoading}
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
      <SafeAreaView style={{backgroundColor: Colors.white}} />
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
    padding: ms(16),
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
    marginTop: ms(4),
    marginBottom: ms(16),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingTop: ms(20),
  },
  content: {
    marginVertical: ms(10),
  },
});

export default ReusableFilterModal;
