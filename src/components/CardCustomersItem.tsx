import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Colors} from '../theme/variables';
import {ms} from '../theme/spacing';
import {typography} from '../theme/typography';
import {MoreSvg} from '../assets/Images/svg/MoreSvg';
import MenuPopup, {MenuItem} from './MenuPopup';
import {EyeSvg} from '../assets/Images/svg/EyeSvg';
import {EditSvg} from '../assets/Images/svg/EditSvg';
import {
  ActiveDeActiveSvg,
  CompanyFillSvg,
  CustomerRoleSvg,
  DeleteSvg,
  IndividualSvg,
} from '../assets/Images/svg';
import {strings} from '../localization';
import {CFL, hexToRGBA} from '../constants/constants';
import FastImageView from './FastImageView';
import {navigate} from '../navigators/RootNavigation';
import {NAVIGATION} from '../constants/navigation';

interface CardProps {
  item: any;
  onPress?: () => void;
  deleteModal?: () => void;
}

const CardCustomersItem = ({item, onPress, deleteModal}: CardProps) => {
  const moreRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const menuItems: MenuItem[] = [
    {
      label: strings.view,
      icon: <EyeSvg width={20} height={20} color={Colors.textCl} />,
      onPress: () => {
        navigate(NAVIGATION.CustomersDetail, item);
      },
    },
    {
      label: strings.edit,
      icon: <EditSvg width={20} height={20} color={Colors.textCl} />,
      onPress: () => {
        navigate(NAVIGATION.AddCustomers, item);
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
      {/* Top Row */}
      <View style={styles.topRow}>
        {/* Image */}
        <View
          style={{flexDirection: 'row', alignItems: 'center', flexShrink: 1}}>
          <View style={styles.imageWrapper}>
            {item?.photo_url ? (
              <FastImageView
                source={item?.photo_url}
                resizeMode="contain"
                style={styles.image}
              />
            ) : (
              <CustomerRoleSvg
                width={24}
                height={24}
                color={hexToRGBA(Colors.secondary, 0.3)}
              />
            )}
          </View>

          {/* Title */}
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{item?.name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={[
                  styles.statusText,
                  {
                    color: item?.active
                      ? Colors.NorthTexasGreen
                      : Colors.colorRedD4,
                  },
                ]}>
                {strings.active}
              </Text>
              <ActiveDeActiveSvg
                height={16}
                width={16}
                color={
                  item?.active ? Colors.NorthTexasGreen : Colors.colorRedD4
                }
                activeDeActive={item?.active}
              />
            </View>
          </View>
        </View>

        {/* Date */}
        <View style={styles.typeWrapper}>
          <View
            style={[
              styles.typeView,
              item?.ctype == 'individual'
                ? {
                    borderColor: Colors.PastelOrange,
                    backgroundColor: hexToRGBA(Colors.PastelOrange, 0.15),
                  }
                : {
                    borderColor: Colors.VeryLightBlue,
                    backgroundColor: hexToRGBA(Colors.VeryLightBlue, 0.15),
                  },
            ]}>
            {item?.ctype == 'individual' ? (
              <IndividualSvg width={16} height={16} color={Colors.secondary} />
            ) : (
              <CompanyFillSvg width={16} height={16} color={Colors.secondary} />
            )}
            <Text style={styles.typeText}>{CFL(item?.ctype)}</Text>
          </View>
          <Pressable
            hitSlop={10}
            ref={moreRef}
            onPress={() => setMenuVisible(true)}>
            <MoreSvg width={16} height={16} color={Colors.secondary} />
          </Pressable>
        </View>
      </View>
      {item?.ctype == 'company' ? (
        <>
          <View style={styles.divider} />
          <View style={styles.companyInfo}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CompanyFillSvg width={20} height={20} color={Colors.secondary} />
              <Text style={styles.companyTitle}>{strings.companyName}</Text>
            </View>
            <Text style={styles.companyName}>{item?.company_name}</Text>
          </View>
        </>
      ) : null}
      <MenuPopup
        visible={menuVisible}
        anchorRef={moreRef}
        items={menuItems}
        onClose={() => setMenuVisible(false)}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: ms(12),
    padding: ms(12),
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
  imageWrapper: {
    width: ms(46),
    height: ms(46),
    borderRadius: ms(8),
    backgroundColor: Colors.infoBox,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleWrapper: {
    flex: 1,
    marginLeft: ms(12),
  },
  title: {
    ...typography._16SofticesBold,
    color: Colors.textCl,
  },
  statusText: {
    ...typography._14SofticesSemibold,
    marginRight: ms(6),
  },
  typeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: ms(6),
    borderWidth: ms(1),
    borderRadius: ms(8),
    paddingVertical: ms(9),
    paddingHorizontal: ms(6),
  },
  typeText: {
    ...typography._15SofticesRegular,
    color: Colors.textCl,
    marginLeft: ms(4),
  },
  divider: {
    height: ms(1),
    backgroundColor: Colors.borderCl,
    marginVertical: ms(10),
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  companyTitle: {
    ...typography._16SofticesRegular,
    color: Colors.textLight,
    marginLeft: ms(8),
  },
  companyName: {
    ...typography._16SofticesSemibold,
    color: Colors.textCl,
    flexShrink: 1,
    marginLeft: ms(8),
  },
});

export default CardCustomersItem;
