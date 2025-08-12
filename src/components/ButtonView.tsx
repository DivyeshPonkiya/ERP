import React, {memo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Variables} from '../theme';
import {ButtonProps} from './types';
import {typography} from '../theme/typography';
import {ms} from '../theme/spacing';
import {ACTIVE_OPACITY} from '../constants/constants';

const ButtonView: React.FC<ButtonProps> = ({
  btnTxt,
  onBtnPress = () => {},
  fontColor,
  isLoading,
  disable = false,
  style,
  btnStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={ACTIVE_OPACITY}
      disabled={disable}
      style={[styles.nextBtnView, style]}
      onPress={() => onBtnPress()}>
      <View style={[styles.nextBtnTextView, btnStyle]}>
        {!isLoading ? (
          <Text
            style={[
              styles.buttonCommonTxt,
              {color: fontColor},
              typography._16SofticesSemibold,
            ]}>
            {btnTxt}
          </Text>
        ) : (
          <ActivityIndicator color={fontColor} animating={isLoading} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  nextBtnView: {
    alignSelf: 'center',
  },
  nextBtnTextView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: ms(12),
  },
  nextTxt: {
    fontSize: Variables.Measures.fontSize / 1.2,
  },
  buttonCommonTxt: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize / 1.2,
  },
});
export default memo(ButtonView);
