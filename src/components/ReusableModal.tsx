import React, {ReactNode} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import {ReusableModalProps} from './types';
import ButtonView from './ButtonView';
import {height, ms} from '../theme/spacing';
import {Colors} from '../theme/variables';
import {strings} from '../localization';
import {typography} from '../theme/typography';
import {ACTIVE_OPACITY, hexToRGBA} from '../constants/constants';
import {CloseSvg} from '../assets/Images/svg';

const ReusableModalComponent: React.FC<ReusableModalProps> = ({
  visible,
  title,
  onClose,
  children,
  onSubmit,
  submitLabel = strings.submit,
  cancelBgColor = Colors.white,
  submitBgColor = Colors.primary,
  cancelLabel,
  description,
  isLoading = false,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable
          style={{flex: 1, width: '100%'}}
          disabled={isLoading}
          onPress={onClose}
        />
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            {!cancelLabel ? (
              <TouchableOpacity
                activeOpacity={ACTIVE_OPACITY}
                onPress={onClose}>
                <CloseSvg width={20} height={20} color={Colors.textCl} />
              </TouchableOpacity>
            ) : null}
          </View>

          {description ? (
            <Text style={styles.description}>{description}</Text>
          ) : null}
          {/* Content */}
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>

          {/* Footer */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {cancelLabel ? (
              <>
                <ButtonView
                  btnTxt={cancelLabel}
                  btnStyle={{
                    height: ms(50),
                    backgroundColor: cancelBgColor,
                    borderRadius: ms(10),
                    borderWidth: 1,
                    borderColor: Colors.borderCl,
                  }}
                  backgroundColor={Colors.buttonCl}
                  onBtnPress={onClose}
                  fontColor={Colors.textLight}
                  style={{
                    height: ms(50),
                    flex: 1,
                  }}
                />
                <View style={{width: ms(16)}} />
              </>
            ) : null}
            <ButtonView
              btnTxt={submitLabel}
              btnStyle={{
                height: ms(50),
                backgroundColor: submitBgColor,
                borderRadius: ms(10),
              }}
              backgroundColor={Colors.buttonCl}
              onBtnPress={onSubmit}
              fontColor={Colors.white}
              style={{
                height: ms(50),
                flex: 1,
              }}
              disable={isLoading}
              isLoading={isLoading}
            />
          </View>
        </View>
        <Pressable
          style={{flex: 1, width: '100%'}}
          disabled={isLoading}
          onPress={onClose}
        />
      </View>
    </Modal>
  );
};
// Only re-render if props actually change
const ReusableModal = React.memo(ReusableModalComponent);

export default ReusableModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: hexToRGBA(Colors.black, 0.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: ms(10),
    padding: ms(20),
    maxHeight: (height * 70) / 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...typography._22SofticesBold,
    color: Colors.textCl,
  },
  description: {
    ...typography._16SofticesRegular,
    color: Colors.textLight,
    textAlign: 'left',
  },
  closeButton: {
    fontSize: 22,
    color: '#333',
  },
  content: {
    marginVertical: ms(20),
  },
});
