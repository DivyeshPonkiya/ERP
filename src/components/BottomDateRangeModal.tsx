import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import DateRangePicker from './DateRangePicker';
import {strings} from '../localization';
import {Colors} from '../theme/variables';
import {ms} from '../theme/spacing';
import {typography} from '../theme/typography';

type Props = {
  visible: boolean;
  onClose: () => void;
  filterFormData: {
    start_date: string | Date;
    end_date: string | Date;
  };
  onChange: (dates: {startDate: string | Date; endDate: string | Date}) => void;
  onClear: () => void;
  onDone: () => void;
};

const BottomDateRangeModal = ({
  visible,
  onClose,
  filterFormData,
  onChange,
  onClear,
  onDone,
}: Props) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClear}>
            <Text style={[styles.titleText, {color: Colors.primary}]}>
              {strings.clear}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDone}>
            <Text style={[styles.titleText, {color: Colors.primary}]}>
              {strings.done}
            </Text>
          </TouchableOpacity>
        </View>

        <DateRangePicker onChange={onChange} filterFormData={filterFormData} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: '#00000077',
  },
  modalContainer: {
    backgroundColor: Colors.borderCl,
    borderTopLeftRadius: ms(10),
    borderTopRightRadius: ms(10),
    paddingHorizontal: ms(16),
    paddingTop: ms(12),
    paddingBottom: ms(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: ms(10),
  },
  titleText: {
    ...typography._16SofticesSemibold,
    color: Colors.primary,
  },
});

export default BottomDateRangeModal;
