import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {ms} from '../../../theme/spacing';
import {svgProps} from './types';

export function PrivacyPolicySvg({width, height, color, styles}: svgProps) {
  return (
    <View style={styles}>
      <Svg
        width={ms(width)}
        height={ms(height)}
        viewBox="0 0 24 24"
        fill="none">
        <Path d="M0 1.90735e-06H24V24H0V1.90735e-06Z" fill="white" />
        <Path
          d="M16.8433 10.1251V0.703229H2.02698V20.5361H12.9843"
          stroke={color}
          strokeWidth="1.40625"
          strokeMiterlimit="22.926"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16.803 10.2675C18.285 12.015 20.411 12.6165 21.9729 12.6165V16.8269C21.9729 18.2812 21.5762 19.6787 20.4205 20.5523L16.7898 23.2969L13.1591 20.5523C12.0033 19.6787 11.6066 18.2812 11.6066 16.8269V12.6165C13.1685 12.6165 15.2941 12.015 16.7761 10.2675C16.7761 10.2675 16.7905 10.2633 16.803 10.2675Z"
          stroke={color}
          strokeWidth="1.40625"
          strokeMiterlimit="22.926"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M15.1574 16.0313L16.635 17.7786L19.0433 14.9015"
          stroke={color}
          strokeWidth="1.40625"
          strokeMiterlimit="22.926"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M6.60132 3.51587H12.2691"
          stroke={color}
          strokeWidth="1.40625"
          strokeMiterlimit="22.926"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M4.84015 6.32837H14.0237"
          stroke={color}
          strokeWidth="1.40625"
          strokeMiterlimit="22.926"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M4.84015 9.14087H14.0237"
          stroke={color}
          strokeWidth="1.40625"
          strokeMiterlimit="22.926"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M6.57452 15.8438C7.34904 15.8438 7.98077 15.212 7.98077 14.4375C7.98077 13.663 7.34904 13.0312 6.57452 13.0312C5.80001 13.0312 5.16827 13.663 5.16827 14.4375C5.16827 15.212 5.80001 15.8438 6.57452 15.8438Z"
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
