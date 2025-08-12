import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Clipboard,
} from 'react-native';
import {Colors} from '../theme/variables';
import {ms} from '../theme/spacing';
import {typography} from '../theme/typography';
import {MoreSvg} from '../assets/Images/svg/MoreSvg';
import MenuPopup, {MenuItem} from './MenuPopup';
import {
  CopySvg,
  DateSvg,
  DeleteSvg,
  EditSvg,
  EmailFillSvg,
  PhoneFillSvg,
  WhatsAppFillSvg,
} from '../assets/Images/svg';
import {strings} from '../localization';
import {CustomerRoleSvg} from '../assets/Images/svg/CustomerRoleSvg';
import {ACTIVE_OPACITY} from '../constants/constants';
import {StatusChangeSvg} from '../assets/Images/svg/StatusChangeSvg';
import moment from 'moment';

interface CardProps {
  item: any;
  onPress?: () => void;
  setStatusChangeModal?: () => void;
  setSelectItem?: (item: any) => void;
  deleteModal?: () => void;
}

const CardProductionDetailItem = ({
  item,
  onPress,
  setStatusChangeModal,
  setSelectItem = () => {},
  deleteModal = () => {},
}: CardProps) => {
  const moreRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const menuItems: MenuItem[] = [
    {
      label: strings.changeStatus,
      icon: <StatusChangeSvg width={20} height={20} color={Colors.textCl} />,
      onPress: () => {
        setStatusChangeModal();
      },
    },
    {
      label: strings.edit,
      icon: <EditSvg width={20} height={20} color={Colors.textCl} />,
      onPress: () => {
        setSelectItem(item);
      },
    },
    {
      label: strings.delete,
      icon: <DeleteSvg width={20} height={20} color={Colors.colorRedD4} />,
      onPress: () => {
        deleteModal();
      },
    },
  ];

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.title}>{item?.name ?? '-'}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.statusTitleText}>{strings.status}: </Text>
            <Text
              style={[
                styles.statusText,
                {
                  color:
                    item?.status == 'in_progress'
                      ? Colors.Tawny
                      : item?.status == 'completed'
                      ? Colors.NorthTexasGreen
                      : item?.status == 'cancelled'
                      ? Colors.textLight
                      : '',
                },
              ]}>
              {item?.status == 'in_progress'
                ? strings.inProgress
                : item?.status == 'completed'
                ? strings.completed
                : item?.status == 'cancelled'
                ? strings.cancelled
                : '-'}
            </Text>
          </View>
        </View>
        <Pressable
          hitSlop={10}
          ref={moreRef}
          onPress={() => setMenuVisible(true)}>
          <MoreSvg width={16} height={16} color={Colors.secondary} />
        </Pressable>
      </View>
      <View style={styles.divider} />
      <Text style={styles.title}>{strings.contactPerson}</Text>
      <View style={[styles.contactRaw, {marginTop: ms(10)}]}>
        <View style={styles.contactInnerRaw}>
          <CustomerRoleSvg height={20} width={20} color={Colors.secondary} />
          <Text style={styles.contactTitle}>{strings.name}</Text>
        </View>
        <Text style={styles.contactSubTitle}>{item?.contact_name ?? '-'}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.contactRaw}>
        <View style={styles.contactInnerRaw}>
          <EmailFillSvg height={20} width={20} color={Colors.secondary} />
          <Text style={styles.contactTitle}>{strings.email}</Text>
        </View>
        <Text style={styles.contactSubTitle}>{item?.contact_email ?? '-'}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.contactRaw}>
        <View style={styles.contactInnerRaw}>
          <PhoneFillSvg height={20} width={20} color={Colors.PictonBlue} />
          <Text style={styles.contactTitle}>{strings.phone}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={ACTIVE_OPACITY}
          style={{flexDirection: 'row', alignItems: 'center', flexShrink: 1}}>
          {item?.contact_mobile ? (
            <>
              <TouchableOpacity
                activeOpacity={ACTIVE_OPACITY}
                onPress={() => {
                  Clipboard.setString(item?.contact_mobile);
                }}>
                <CopySvg height={20} width={20} color={Colors.primary} />
              </TouchableOpacity>
              <Text style={[styles.contactSubTitle, {marginLeft: ms(8)}]}>
                {item?.contact_mobile}
              </Text>
            </>
          ) : (
            <Text style={[styles.contactSubTitle, {marginLeft: ms(8)}]}>
              {'-'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={styles.contactRaw}>
        <View style={styles.contactInnerRaw}>
          <WhatsAppFillSvg height={20} width={20} color={Colors.UFOGreen} />
          <Text style={styles.contactTitle}>{strings.whatsApp}</Text>
        </View>
        <Text style={styles.contactSubTitle}>
          {item?.contact_whatsapp ?? '-'}
        </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.contactRaw}>
        <View style={styles.contactInnerRaw}>
          <DateSvg height={20} width={20} color={Colors.secondary} />
          <Text style={styles.contactTitle}>{strings.finishedAt}</Text>
        </View>
        <Text style={styles.contactSubTitle}>
          {item?.finished_at
            ? moment(item?.finished_at).format('DD-MM-YY')
            : '-'}
        </Text>
      </View>
      <MenuPopup
        visible={menuVisible}
        anchorRef={moreRef}
        items={menuItems}
        onClose={() => setMenuVisible(false)}
        MENU_WIDTH={ms(180)}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: ms(12),
    padding: ms(14),
    marginHorizontal: ms(20),
    marginBottom: ms(10),
    shadowColor: Colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: Colors.borderCl,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...typography._16SofticesBold,
    color: Colors.textCl,
  },
  statusTitleText: {
    ...typography._14SofticesRegular,
    color: Colors.textLight,
  },
  statusText: {
    ...typography._14SofticesSemibold,
    color: Colors.NorthTexasGreen,
  },
  divider: {
    height: ms(1),
    backgroundColor: Colors.borderCl,
    marginVertical: ms(12),
  },
  contactRaw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contactInnerRaw: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactTitle: {
    ...typography._16SofticesRegular,
    color: Colors.textLight,
    marginLeft: ms(8),
  },
  contactSubTitle: {
    ...typography._16SofticesSemibold,
    color: Colors.black,
    marginLeft: ms(10),
    flexShrink: 1,
  },
});

export default CardProductionDetailItem;
