import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ms} from '../theme/spacing';
import {Colors} from '../theme/variables';
import {typography} from '../theme/typography';
import InputField from './InputField';
import ButtonView from './ButtonView';
import ReusableModal from './ReusableModal';

interface DeleteModalProps {
  visible: boolean;
  title?: string;
  itemName: string;
  onClose: () => void;
  onDelete: (confirmText: string) => void;
}

const DeleteModal = ({
  visible,
  title = 'Delete',
  itemName,
  onClose,
  onDelete,
}: DeleteModalProps) => {
  const [confirmText, setConfirmText] = useState('');

  return (
    <ReusableModal
      visible={visible}
      title={title}
      onClose={onClose}
      onSubmit={() => onDelete(confirmText)}
      submitLabel="Delete"
      cancelLabel="Cancel">
      <View>
        <Text style={styles.desc}>Are you sure you want to delete?</Text>
        <InputField
          value={confirmText}
          onChangeText={setConfirmText}
          placeholder="Type the name of the stock to confirm"
        />
        <Text style={styles.itemName}>{itemName}</Text>
      </View>
    </ReusableModal>
  );
};

const styles = StyleSheet.create({
  desc: {
    ...typography._16SofticesRegular,
    color: Colors.textLight,
    marginBottom: ms(12),
  },
  input: {
    marginBottom: ms(10),
  },
  itemName: {
    ...typography._16SofticesBold,
    color: Colors.textCl,
    marginBottom: ms(16),
  },
  deleteBtn: {
    backgroundColor: Colors.colorRedD4,
    borderRadius: ms(10),
  },
});

export default DeleteModal;
