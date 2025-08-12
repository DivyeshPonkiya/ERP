import React from 'react';
import {View} from 'react-native';
import Svg, {G, Mask, Path} from 'react-native-svg';
import {ms} from '../../../theme/spacing';
import {svgProps} from './types';

export function SalesSvg({width, height, color, styles}: svgProps) {
  return (
    <View style={styles}>
      <Svg
        width={ms(width)}
        height={ms(height)}
        viewBox="0 0 24 24"
        fill="none">
        <Path
          d="M11.9998 23.2964C18.2218 23.2964 23.2966 18.2216 23.2966 11.9995C23.2966 5.77742 18.2218 0.702639 11.9998 0.702639C5.77766 0.702639 0.702881 5.77742 0.702881 11.9995C0.702881 18.2216 5.77766 23.2964 11.9998 23.2964Z"
          stroke={color}
          strokeWidth="1.40625"
          strokeMiterlimit="22.926"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M8.2262 6.70239H10.6636C12.2105 6.70239 13.4761 7.96802 13.4761 9.51489C13.4761 11.0618 12.2105 12.3274 10.6636 12.3274H7.75745L13.5699 19.1711"
          stroke={color}
          strokeWidth="1.40625"
          strokeMiterlimit="22.926"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M7.71057 6.70239H16.2887"
          stroke={color}
          strokeWidth="1.40625"
          strokeMiterlimit="22.926"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M7.71057 9.51489H16.2887"
          stroke={color}
          strokeWidth="1.40625"
          strokeMiterlimit="22.926"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}
