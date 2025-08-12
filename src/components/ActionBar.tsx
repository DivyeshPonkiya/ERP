import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import {ms} from '../theme/spacing';
import {Colors} from '../theme/variables';
import {typography} from '../theme/typography';
import {ActionBarProps} from './types';
import {ACTIVE_OPACITY, hexToRGBA} from '../constants/constants';
import {AddSvg} from '../assets/Images/svg/AddSvg';

interface AddButtonProps {
  onPress?: () => void;
  label?: string;
}

const AddButton = ({onPress, label = 'Add'}: AddButtonProps) => (
  <TouchableOpacity
    activeOpacity={ACTIVE_OPACITY}
    style={styles.button}
    onPress={onPress && onPress}>
    <AddSvg width={26} height={26} color={Colors.white} />
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const ActionBar = ({
  title,
  LeftIcon,
  onLeftPress,
  RightIcon,
  onRightPress,
}: ActionBarProps) => {
  return (
    <View style={styles.container}>
      {/* Left Icon */}
      <TouchableOpacity
        activeOpacity={ACTIVE_OPACITY}
        onPress={onLeftPress}
        style={styles.iconContainer}>
        {LeftIcon ? <>{LeftIcon}</> : null}
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right Icon */}
      <View style={styles.iconContainer}>
        {onRightPress ? <AddButton onPress={onRightPress} /> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ms(55),
    backgroundColor: Colors.primary, // Blue background as in your screenshot
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    ...typography._22SofticesBold,
    color: Colors.white,
    textAlign: 'left',
  },
  iconContainer: {
    alignItems: 'center',
    marginHorizontal: ms(20),
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: hexToRGBA(Colors.white, 0.1), // Use a secondary color for button background
    borderRadius: ms(8),
    paddingHorizontal: ms(7),
    paddingVertical: ms(6),
  },
  iconBox: {
    backgroundColor: Colors.white,
    borderRadius: ms(5),
    width: ms(22),
    height: ms(22),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: ms(6),
  },
  plus: {
    color: Colors.primary,
    fontSize: ms(18),
    fontWeight: 'bold',
  },
  label: {
    ...typography._16SofticesSemibold,
    color: Colors.white,
    marginLeft: ms(4),
  },
});

export default ActionBar;
