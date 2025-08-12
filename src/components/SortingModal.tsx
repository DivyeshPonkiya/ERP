import React from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {hs, ms, vs} from '../theme/spacing';
import {typography} from '../theme/typography';
import {Colors} from '../theme/variables';
import {strings} from '../localization';
import {CloseSvg} from '../assets/Images/svg';
import {ACTIVE_OPACITY, hexToRGBA} from '../constants/constants';
import {SelectOptionSvg} from '../assets/Images/svg/SelectOptionSvg';

type Props = {
  visible: boolean;
  onClose: () => void;
  selectType?: any;
  setSelectType?: (data: any) => void;
};

const sortingType = [
  {name: strings.inProgress, id: 'in_progress'},
  {name: strings.completed, id: 'completed'},
  {name: strings.cancelled, id: 'cancelled'},
];

const SortingModal: React.FC<Props> = ({
  visible,
  onClose,
  selectType,
  setSelectType = () => {},
}) => {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.container}>
        {/* TopDrop */}
        <TouchableOpacity
          activeOpacity={ACTIVE_OPACITY}
          style={styles.backdrop}
          onPress={onClose}
        />

        {/* Bottom Sheet */}
        <View style={styles.sheet}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.title}>{strings.sort}</Text>
            <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={onClose}>
              <CloseSvg height={20} width={20} color={Colors.textCl} />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: vs(20)}}>
            {sortingType.map((item, index) => {
              return (
                <>
                  <TouchableOpacity
                    activeOpacity={ACTIVE_OPACITY}
                    style={styles.selectTypeRow}
                    onPress={() => {
                      setSelectType({id: item?.id, name: item?.name});
                    }}>
                    <SelectOptionSvg
                      height={22}
                      width={22}
                      color={
                        selectType == item?.id
                          ? Colors.textCl
                          : Colors.textLight
                      }
                      selected={selectType == item?.id}
                    />
                    <Text style={styles.sortTypeText}>{item?.name}</Text>
                  </TouchableOpacity>
                  {sortingType.length !== index + 1 ? (
                    <View style={styles.divider} />
                  ) : null}
                </>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row-reverse', // Important: ensures right-to-left slide
    backgroundColor: hexToRGBA(Colors.black, 0.5),
  },
  sheet: {
    backgroundColor: Colors.white,
    padding: hs(16),
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
  selectTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vs(16),
  },
  sortTypeText: {
    ...typography._16SofticesRegular,
    color: Colors.textCl,
    marginLeft: ms(8),
  },
  divider: {
    height: ms(1),
    backgroundColor: Colors.borderCl,
    marginBottom: vs(16),
  },
});

export default SortingModal;
