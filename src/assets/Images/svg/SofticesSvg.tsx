import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {ms} from '../../../theme/spacing';
import {svgProps} from './types';

export function SofticesSvg({width, height, color, styles}: svgProps) {
  return (
    <View style={styles}>
      <Svg
        width={ms(width)}
        height={ms(height)}
        viewBox="0 0 80 80"
        fill="none">
        <Path
          d="M30.003 10L10.001 30.0001L4.16778 35.8337L0 40.0002L4.16778 44.1667L10.001 50.0002L20.002 40.0002L40.004 20.0001L50.005 10L40.004 0L30.003 10Z"
          fill={color}
        />
        <Path
          d="M25.004 45L15.0039 55L25.004 65.0001L35.005 55L25.004 45Z"
          fill={color}
        />
        <Path
          d="M29.9958 39.9998L39.9968 49.9998L54.9727 35.0253L59.9728 40.0249L54.9727 45.0244L39.9968 59.9999L29.9958 69.9999L39.9968 80L49.9978 69.9999L64.9737 55.0245L69.9738 50.0249L69.9988 49.9998L75.833 44.1663L79.9998 39.9998L75.833 35.8333L69.9988 29.9998L64.9988 25.0002L54.9978 15.0002L44.9968 25.0002L29.9958 39.9998Z"
          fill={color}
        />
      </Svg>
    </View>
  );
}
