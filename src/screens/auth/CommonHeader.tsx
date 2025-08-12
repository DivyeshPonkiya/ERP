import React from 'react';
import {View, TouchableOpacity, StyleSheet, ViewStyle} from 'react-native';
import {BackSvg} from '../../assets/Images/svg';
import {Colors} from '../../theme/variables';
import {ms} from '../../theme/spacing';
import {ACTIVE_OPACITY} from '../../constants/constants';

interface CommonHeaderProps {
  onBackPress?: () => void;
  showBackButton?: boolean;
  containerStyle?: ViewStyle;
}

const CommonHeader: React.FC<CommonHeaderProps> = ({
  onBackPress,
  showBackButton = true,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {showBackButton && (
        <TouchableOpacity
          activeOpacity={ACTIVE_OPACITY}
          style={styles.backBorder}
          onPress={onBackPress}>
          <BackSvg width={24} height={24} color={Colors.secondary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: ms(20),
    width: '100%',
    height: ms(80),
    justifyContent: 'center',
  },
  backBorder: {
    width: ms(44),
    height: ms(44),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderCl,
    borderRadius: ms(10),
  },
});

export default CommonHeader;
