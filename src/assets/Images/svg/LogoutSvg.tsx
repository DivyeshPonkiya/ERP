import React from 'react';
import {View} from 'react-native';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {ms} from '../../../theme/spacing';
import {svgProps} from './types';

export function LogoutSvg({width, height, color, styles}: svgProps) {
  return (
    <View style={styles}>
      <Svg
        width={ms(width)}
        height={ms(height)}
        viewBox="0 0 24 24"
        fill="none">
        <G clip-path="url(#clip0_125_196)">
          <Path
            d="M23.9996 0.000732422H-0.000366211V24.0007H23.9996V0.000732422Z"
            fill="white"
          />
          <Path
            d="M-0.000732422 0.00195503H23.9993V24.002H-0.000732422V0.00195503Z"
            fill="white"
          />
          <Path
            d="M23.3308 12.0018C23.3308 18.26 18.2575 23.3333 11.9993 23.3333C5.74113 23.3333 0.667847 18.26 0.667847 12.0018C0.667847 5.7436 5.74113 0.670317 11.9993 0.670317C18.2575 0.670317 23.3308 5.7436 23.3308 12.0018Z"
            stroke={color}
            strokeWidth="1.40625"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M15.043 6.55019C16.9127 7.61149 18.1741 9.62046 18.1741 11.924C18.1741 15.3343 15.4095 18.0989 11.9992 18.0989C8.58893 18.0989 5.82434 15.3343 5.82434 11.924C5.82434 9.73802 6.96026 7.81736 8.67401 6.72002"
            stroke={color}
            strokeWidth="1.40625"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M11.77 12.2708V4.9141"
            stroke={color}
            strokeWidth="1.40625"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_125_196">
            <Rect width="24" height="24" fill="white" />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
}
