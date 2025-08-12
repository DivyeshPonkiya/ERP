import React from 'react';
import {View} from 'react-native';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {ms} from '../../../theme/spacing';
import {svgProps} from './types';

export function ProductsSvg({width, height, color, styles}: svgProps) {
  return (
    <View style={styles}>
      <Svg
        width={ms(width)}
        height={ms(height)}
        viewBox="0 0 24 24"
        fill="none">
        <G clip-path="url(#clip0_125_121)">
          <Path
            d="M-0.00012207 -0.000242233H23.9999V23.9998H-0.00012207V-0.000242233Z"
            fill="white"
          />
          <Path
            d="M23.2496 12.9368L17.6246 14.8118V23.2961L23.2496 21.4211V12.9368Z"
            stroke={color}
            strokeWidth="1.40625"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M11.9996 12.9368L17.6246 14.8118V23.2961L11.9996 21.4211V12.9368Z"
            stroke={color}
            strokeWidth="1.40625"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M23.2496 12.9368L17.6246 14.8118L11.9996 12.9368L17.6246 11.0618L23.2496 12.9368Z"
            stroke={color}
            strokeWidth="1.40625"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M11.9996 12.9368L6.37463 14.8118V23.2961L11.9996 21.4211V12.9368Z"
            stroke={color}
            strokeWidth="1.40625"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M0.749756 12.937L6.37476 14.812V23.2964L0.749756 21.4214V12.937Z"
            stroke={color}
            strokeWidth="1.40625"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M11.9996 12.9368L6.37463 14.8118L0.749634 12.9368L6.37463 11.0618L11.9996 12.9368Z"
            stroke={color}
            strokeWidth="1.40625"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M17.6246 2.57739L11.9996 4.45239V12.9368L17.6246 11.0618V2.57739Z"
            stroke={color}
            strokeWidth="1.40625"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M6.37463 2.57739L11.9996 4.45239V12.9368L6.37463 11.0618V2.57739Z"
            stroke={color}
            strokeWidth="1.40625"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M17.6246 2.57739L11.9996 4.45239L6.37463 2.57739L11.9996 0.702393L17.6246 2.57739Z"
            stroke={color}
            strokeWidth="1.40625"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_125_121">
            <Rect width="24" height="24" fill="white" />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
}
