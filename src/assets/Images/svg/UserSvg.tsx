import React from 'react';
import {View} from 'react-native';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {ms} from '../../../theme/spacing';
import {svgProps} from './types';

export function UserSvg({width, height, color, styles}: svgProps) {
  return (
    <View style={styles}>
      <Svg
        width={ms(width)}
        height={ms(height)}
        viewBox="0 0 22 22"
        fill="none">
        <G clip-path="url(#clip0_346_55)">
          <Path
            d="M21.01 12.6147C21.2984 10.8378 21.1171 8.96179 20.3878 7.17282C18.274 1.98826 12.3575 -0.501223 7.17276 1.61245C1.98807 3.72613 -0.5015 9.64254 1.61222 14.8271C3.72594 20.0118 9.64252 22.5012 14.8272 20.3876C16.7831 19.5902 18.3555 18.2516 19.4418 16.6153"
            stroke={color}
            strokeWidth="1.71875"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M11.0002 10.8261C12.5462 10.8261 13.7995 9.57283 13.7995 8.02682C13.7995 6.48082 12.5462 5.22754 11.0002 5.22754C9.45421 5.22754 8.20093 6.48082 8.20093 8.02682C8.20093 9.57283 9.45421 10.8261 11.0002 10.8261Z"
            stroke={color}
            strokeWidth="1.71875"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M4.78284 18.8619C5.58257 16.1854 8.06354 14.2343 11.0002 14.2343C13.9408 14.2343 16.4245 16.1905 17.2208 18.8725"
            stroke={color}
            strokeWidth="1.71875"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_346_55">
            <Rect width="22" height="22" fill="white" />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
}
