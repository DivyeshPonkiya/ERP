import React from 'react';
import {View} from 'react-native';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {ms} from '../../../theme/spacing';
import {svgProps} from './types';

export function DeleteSvg({width, height, color, styles}: svgProps) {
  return (
    <View style={styles}>
      <Svg
        width={ms(width)}
        height={ms(height)}
        viewBox="0 0 23 23"
        fill="none">
        <G clip-path="url(#clip0_128_330)">
          <Path
            d="M19.5049 4.73511H3.49646"
            stroke={color}
            strokeWidth="1.67797"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M15.4658 4.73448H7.53552V4.11607C7.53552 2.726 8.6624 1.59912 10.0525 1.59912H12.9489C14.3389 1.59912 15.4658 2.726 15.4658 4.11607V4.73448H15.4658Z"
            stroke={color}
            strokeWidth="1.67797"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M14.5903 16.4669L14.9309 9.79248"
            stroke={color}
            strokeWidth="1.67797"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M8.06982 9.79248L8.41037 16.4669"
            stroke={color}
            strokeWidth="1.67797"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M11.5002 9.79272V16.4671"
            stroke={color}
            strokeWidth="1.67797"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M18.2037 14.8071L18.7176 4.7356H4.28357L5.01197 19.0115C5.08027 20.35 6.18542 21.4002 7.52565 21.4002H15.4755C16.8158 21.4002 17.9209 20.35 17.9892 19.0115L17.9897 19.002"
            stroke={color}
            strokeWidth="1.67797"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_128_330">
            <Rect
              width="22"
              height="22"
              fill="white"
              transform="translate(0.5 0.5)"
            />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
}
