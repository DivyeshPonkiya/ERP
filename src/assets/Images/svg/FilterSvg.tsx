import React from 'react';
import {View} from 'react-native';
import Svg, {G, Mask, Path} from 'react-native-svg';
import {ms} from '../../../theme/spacing';
import {svgProps} from './types';

export function FilterSvg({width, height, color, styles}: svgProps) {
  return (
    <View style={styles}>
      <Svg
        width={ms(width)}
        height={ms(height)}
        viewBox="0 0 20 20"
        fill="none">
        <Path
          d="M13.2122 9.92188L12.1309 11.1764C11.7642 11.6019 11.5625 12.1449 11.5625 12.7066V19.2188L8.43753 17.0553V12.7066C8.43753 12.1449 8.23581 11.6019 7.86913 11.1764L2.91214 5.42512C2.5455 4.99965 2.34378 4.45664 2.34378 3.89496V1.17188"
          stroke={color}
          strokeWidth="1.5625"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M17.6562 1.17188V3.89496C17.6562 4.45664 17.4545 4.99965 17.0878 5.42512L15.6025 7.14844"
          stroke={color}
          strokeWidth="1.5625"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M0.78125 0.78125H19.2187"
          stroke={color}
          strokeWidth="1.5625"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M2.65625 4.72656H17.3828"
          stroke={color}
          strokeWidth="1.5625"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}
