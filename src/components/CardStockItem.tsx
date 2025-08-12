import React, {useRef, useState} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {Colors} from '../theme/variables';
import {hs, ms} from '../theme/spacing';
import {typography} from '../theme/typography';
import {QuantitySvg} from '../assets/Images/svg/QuantitySvg';
import {DateSvg} from '../assets/Images/svg/DateSvg';
import {MoreSvg} from '../assets/Images/svg/MoreSvg';
import MenuPopup, {MenuItem} from './MenuPopup';
import {EyeSvg} from '../assets/Images/svg/EyeSvg';
import {EditSvg} from '../assets/Images/svg/EditSvg';
import {DeleteSvg, ProductionSvg} from '../assets/Images/svg';
import {strings} from '../localization';
import moment from 'moment';
import {navigate} from '../navigators/RootNavigation';
import {NAVIGATION} from '../constants/navigation';

interface CardProps {
  item: any;
  onPress?: () => void;
  deleteModal?: () => void;
}

const CardStockItem = ({item, onPress, deleteModal}: CardProps) => {
  const moreRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const menuItems: MenuItem[] = [
    {
      label: strings.view,
      icon: <EyeSvg width={20} height={20} color={Colors.textCl} />,
      onPress: () => {
        navigate(NAVIGATION.StockDetail, {stockData: item});
      },
    },
    {
      label: strings.edit,
      icon: <EditSvg width={20} height={20} color={Colors.textCl} />,
      onPress: () => {
        navigate(NAVIGATION.AddStock, {stockData: item});
      },
    },
    {
      label: strings.delete,
      icon: <DeleteSvg width={20} height={20} color={Colors.colorRedD4} />,
      onPress: () => {
        if (deleteModal) {
          deleteModal();
        }
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
            <Image
              source={{uri: item?.product?.cover_image ?? ''}} // Leave empty; set image from your side
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* Title */}
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{item?.product?.name}</Text>
          </View>
        </View>

        {/* Date */}
        <View style={styles.dateWrapper}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              marginRight: ms(8),
            }}>
            <DateSvg width={20} height={20} color={Colors.secondary} />
            <Text style={styles.dateText}>{`${moment(item?.created_at).format(
              'DD-MM-YYYY',
            )}`}</Text>
          </View>
          <Pressable
            hitSlop={10}
            ref={moreRef}
            onPress={() => setMenuVisible(true)}>
            <MoreSvg width={16} height={16} color={Colors.secondary} />
          </Pressable>
        </View>
      </View>

      {/* Bottom Info Row */}
      <View style={styles.bottomRow}>
        {/* Customer Box */}
        <View style={styles.infoBox}>
          <ProductionSvg
            width={20}
            height={20}
            color={Colors.secondary}
            styles={{marginTop: ms(2)}}
          />
          <View style={{marginLeft: hs(8), flexShrink: 1}}>
            <Text style={styles.label}>{strings.production}</Text>
            <Text
              style={[
                styles.value,
                {textDecorationLine: 'underline', color: Colors.primary},
              ]}>
              {`${item?.production?.name}`}
            </Text>
          </View>
        </View>
        <View style={{width: hs(10)}} />

        {/* Quantity Box */}
        <View style={styles.infoBox}>
          <QuantitySvg
            width={20}
            height={20}
            color={Colors.secondary}
            styles={{marginTop: ms(2)}}
          />
          <View style={{marginLeft: hs(8), flexShrink: 1}}>
            <Text style={styles.label}>{strings.quantity}</Text>
            <Text style={styles.value}>
              {[item?.quantity, item?.quantity_unit]?.join(' ')}
            </Text>
          </View>
        </View>
      </View>
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
    marginBottom: ms(20),
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
    backgroundColor: Colors.imgBg,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleWrapper: {
    flex: 1,
    marginLeft: ms(10),
  },
  title: {
    ...typography._16SofticesBold,
    color: Colors.textCl,
  },
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    ...typography._16SofticesSemibold,
    color: Colors.textCl,
    marginLeft: ms(4),
  },
  bottomRow: {
    flexDirection: 'row',
    marginTop: ms(16),
    justifyContent: 'space-between',
  },
  infoBox: {
    flex: 1,
    backgroundColor: Colors.infoBox,
    borderRadius: ms(8),
    padding: hs(10),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  label: {
    ...typography._16SofticesRegular,
    color: Colors.labelCl,
  },
  value: {
    ...typography._16SofticesSemibold,
    color: Colors.textCl,
  },
});

export default CardStockItem;
