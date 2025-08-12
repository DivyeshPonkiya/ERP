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
  DeleteSvg,
  DetailTitleSvg,
  StockSvg,
} from '../assets/Images/svg';
import {strings} from '../localization';
import {navigate} from '../navigators/RootNavigation';
import {NAVIGATION} from '../constants/navigation';
import FastImageView from './FastImageView';

interface ProductsProps {
  item: any;
  onPress?: () => void;
  deleteModal?: () => void;
}

const ProductsItem = ({item, onPress, deleteModal}: ProductsProps) => {
  const moreRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const menuItems: MenuItem[] = [
    {
      label: strings.view,
      icon: <EyeSvg width={20} height={20} color={Colors.textCl} />,
      onPress: () => {
        navigate(NAVIGATION.ProductsDetail, item);
      },
    },
    {
      label: strings.edit,
      icon: <EditSvg width={20} height={20} color={Colors.textCl} />,
      onPress: () => {
        navigate(NAVIGATION.AddProducts, item);
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
            {item?.cover_image_url ? (
              <FastImageView
                source={item?.cover_image_url}
                resizeMode="contain"
                style={styles.image}
              />
            ) : (
              <DetailTitleSvg width={24} height={24} color={Colors.primary} />
            )}
          </View>

          {/* Title */}
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>
              {item?.code}
              {' - '}
              {item?.name}
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

      {/* Bottom Info Row */}
      <View style={styles.divider} />
      <View style={[styles.bottomStatus, {justifyContent: 'space-between'}]}>
        <View style={styles.bottomStatus}>
          <StockSvg
            height={20}
            width={20}
            activeDeActive={item?.status == 'in_stock'}
            color={
              item?.status == 'in_stock'
                ? Colors.NorthTexasGreen
                : Colors.colorRedD4
            }
          />
          <Text
            style={[
              styles.bottomStatusText,
              {
                color:
                  item?.status == 'in_stock'
                    ? Colors.NorthTexasGreen
                    : Colors.colorRedD4,
                marginLeft: ms(10),
              },
            ]}>
            {item?.status == 'in_stock' ? strings.inStock : strings.outOfStock}
          </Text>
        </View>
        <View style={styles.bottomStatus}>
          <Text
            style={[
              styles.bottomStatusText,
              {
                color: item?.active
                  ? Colors.NorthTexasGreen
                  : Colors.colorRedD4,
                marginRight: ms(10),
              },
            ]}>
            {strings.active}
          </Text>
          <ActiveDeActiveSvg
            height={20}
            width={20}
            activeDeActive={item?.active}
            color={item?.active ? Colors.NorthTexasGreen : Colors.colorRedD4}
          />
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
    backgroundColor: Colors.imgBg,
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
    marginLeft: ms(10),
  },
  title: {
    ...typography._16SofticesBold,
    color: Colors.textCl,
  },

  divider: {
    height: ms(1),
    backgroundColor: Colors.borderCl,
    marginVertical: ms(10),
  },
  bottomStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  bottomStatusText: {
    ...typography._14SofticesSemibold,
  },
});

export default ProductsItem;
