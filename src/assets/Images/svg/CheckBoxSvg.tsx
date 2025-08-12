import React from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Path, Rect} from 'react-native-svg';
import {ms} from '../../../theme/spacing';
import {svgProps} from './types';
import {ACTIVE_OPACITY} from '../../../constants/constants';

export function CheckBoxSvg({
  width,
  height,
  styles,
  color,
  activeDeActive = false,
  onPress = () => {},
}: svgProps) {
  return (
    <TouchableOpacity
      activeOpacity={ACTIVE_OPACITY}
      onPress={onPress}
      style={styles}>
      {activeDeActive ? (
        <Svg
          width={ms(width)}
          height={ms(height)}
          viewBox="0 0 20 19"
          fill="none">
          <Rect width="18.33" height="18.33" rx="3" fill={color} />
          <Path
            d="M4.99999 9.73913L7.17773 11.6809C7.65161 12.1314 8.40411 12.1011 8.84031 11.614L13.4638 6"
            stroke="white"
            strokeWidth="1.56"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ) : (
        <Svg
          width={ms(width)}
          height={ms(height)}
          viewBox="0 0 20 19"
          fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.833313 4.91646C0.833313 2.38516 2.88534 0.33313 5.41665 0.33313H14.5833C17.1146 0.33313 19.1666 2.38516 19.1666 4.91646V14.0831C19.1666 16.6144 17.1146 18.6665 14.5833 18.6665H5.41665C2.88534 18.6665 0.833313 16.6144 0.833313 14.0831V4.91646ZM5.41665 2.16646C3.89787 2.16646 2.66665 3.39768 2.66665 4.91646V14.0831C2.66665 15.602 3.89787 16.8331 5.41665 16.8331H14.5833C16.1021 16.8331 17.3333 15.602 17.3333 14.0831V4.91646C17.3333 3.39768 16.1021 2.16646 14.5833 2.16646H5.41665Z"
            fill={color}
          />
        </Svg>
      )}
    </TouchableOpacity>
  );
}
