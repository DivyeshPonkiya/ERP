import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {FontStyle, Layout, Variables} from '../theme';
import {HeaderProps} from './types';
import {ms} from '../theme/spacing';
import {typography} from '../theme/typography';
import {ACTIVE_OPACITY} from '../constants/constants';

const Header: React.FC<HeaderProps> = ({
  leftIcon,
  leftText,
  centerText,
  rightIcon,
  rightText,
  onLeftPress,
  onRightPress,
  rightSvg,
  leftSvg,
  backgroundColor,
}) => {
  return (
    <View
      style={[
        styles.headerView,
        {justifyContent: 'center', backgroundColor: backgroundColor},
      ]}>
      <View style={Layout.rowAlignCenter}>
        <View style={[styles.leftView]}>
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            onPress={onLeftPress}>
            {leftIcon && <Image source={leftIcon} style={styles.imageView} />}
            {leftSvg && <View style={styles.imageView}>{leftSvg}</View>}
            {leftText && (
              <Text style={typography._24SofticesBold}>{leftText}</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={[styles.centerView]}>
          <Text
            numberOfLines={1}
            style={[typography._24SofticesBold, styles.centerText]}>
            {centerText}
          </Text>
        </View>
        <View style={[styles.leftView, Layout.center]}>
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            onPress={onRightPress}>
            {rightIcon && <Image source={rightIcon} style={styles.imageView} />}
            {rightSvg && <View style={styles.imageView}>{rightSvg}</View>}
            {rightText && (
              <TouchableOpacity
                activeOpacity={ACTIVE_OPACITY}
                onPress={onRightPress}>
                <Text style={typography._24SofticesBold}>{rightText}</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerView: {
    height: ms(55),
    width: '93%',
    alignSelf: 'center',
  },
  centerView: {
    width: '79%',
    marginLeft: ms(10),
  },
  leftView: {
    width: '9%',
    alignItems: 'center',
  },
  imageView: {
    height: ms(20),
    width: ms(20),
    justifyContent: 'center',
  },
  centerText: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize * 1.0,
  },
});
export default Header;
