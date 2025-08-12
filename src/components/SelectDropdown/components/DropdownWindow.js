import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {ms} from '../../../theme/spacing';

const DropdownWindow = ({layoutStyle, children}) => {
  return (
    <View
      style={{...styles.dropdownOverlayView, ...styles.shadow, ...layoutStyle}}>
      {children}
    </View>
  );
};

export default DropdownWindow;

const styles = StyleSheet.create({
  dropdownOverlayView: {
    backgroundColor: '#EFEFEF',
    marginTop: Platform.OS == 'ios' ? ms(-15) : ms(-60),
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
});
