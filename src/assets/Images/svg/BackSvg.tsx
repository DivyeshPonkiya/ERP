import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {ms} from '../../../theme/spacing';
import {svgProps} from './types';

export function BackSvg({width, height, color, styles}: svgProps) {
  return (
    <View style={styles}>
      <Svg
        width={ms(width)}
        height={ms(height)}
        viewBox="0 0 24 24"
        fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.7073 4.29274C11.0978 4.68327 11.0978 5.31643 10.7073 5.70696L5.41445 10.9998H21.0002C21.5525 10.9998 22.0002 11.4475 22.0002 11.9998C22.0002 12.5521 21.5525 12.9998 21.0002 12.9998H5.41445L10.7073 18.2927C11.0978 18.6832 11.0978 19.3164 10.7073 19.7069C10.3168 20.0974 9.68366 20.0974 9.29313 19.7069L2.29313 12.7069C1.90261 12.3164 1.90261 11.6832 2.29313 11.2927L9.29313 4.29274C9.68366 3.90222 10.3168 3.90222 10.7073 4.29274Z"
          fill={color}
        />
      </Svg>
    </View>
  );
}
