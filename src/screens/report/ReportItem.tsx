import React, {useRef, useState} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {Colors} from '../../theme/variables';
import {hs, ms} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {QuantitySvg} from '../../assets/Images/svg/QuantitySvg';
import {DateSvg} from '../../assets/Images/svg/DateSvg';
import {ProductionSvg, ReportsSvg} from '../../assets/Images/svg';
import {strings} from '../../localization';

interface CardProps {
  item?: any;
  name?: string;
  iconUrl?: string;
  pcsValue?: string;
  onPress?: () => void;
}

const ReportItem = ({name, iconUrl, pcsValue, onPress, item}: CardProps) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      {/* Top Row */}
      <View style={styles.topRow}>
        {/* Image */}
        <View
          style={{flexDirection: 'row', alignItems: 'center', flexShrink: 1}}>
          <>
            <View style={styles.imageWrapper}>
              {iconUrl ? (
                <Image
                  source={{uri: iconUrl}} // Leave empty; set image from your side
                  style={styles.image}
                  resizeMode="cover"
                />
              ) : (
                <ReportsSvg width={30} height={30} color={Colors.secondary} />
              )}
            </View>

            {/* Title */}
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>{item?.product_name ?? ''}</Text>
            </View>
          </>
          {/* Quantity Box */}
          <View style={styles.infoBox}>
            <QuantitySvg
              width={20}
              height={20}
              color={Colors.secondary}
              styles={{marginTop: ms(2)}}
            />
            <View style={{marginLeft: hs(8), alignItems: 'flex-end'}}>
              <Text style={styles.label}>{strings.quantity}</Text>
              <Text style={styles.value}>
                {[item?.quantity, item?.quantity_unit]?.join(' ')}
              </Text>
            </View>
          </View>
        </View>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: ms(8),
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

export default ReportItem;
