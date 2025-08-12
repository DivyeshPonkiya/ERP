import React from 'react';
import {View} from 'react-native';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {ms} from '../../../theme/spacing';
import {svgProps} from './types';

export function LocationSvg({width, height, color, styles}: svgProps) {
  return (
    <View style={styles}>
      <Svg
        width={ms(width)}
        height={ms(height)}
        viewBox="0 0 22 22"
        fill="none">
        <G clip-path="url(#clip0_346_41)">
          <Path
            d="M10.7818 17.5624C8.47934 13.9148 4.60562 11.8656 4.60156 7.67886C4.60558 4.16645 7.4793 1.32025 10.988 1.32025C14.4966 1.32025 17.3534 4.16645 17.3574 7.67886C17.3534 11.8656 13.4966 13.9148 11.1942 17.5624H10.7818Z"
            stroke={color}
            strokeWidth="1.64063"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M11 10.8359C9.27841 10.8359 7.88281 9.44028 7.88281 7.71869C7.88281 5.9971 9.27841 4.6015 11 4.6015C12.7216 4.6015 14.1172 5.9971 14.1172 7.71869"
            stroke={color}
            strokeWidth="1.64063"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M15.7988 16.5526C18.7254 16.9281 20.6797 17.6938 20.6797 18.5042C20.6797 19.7047 16.3459 20.678 11 20.678C5.65406 20.678 1.32031 19.7047 1.32031 18.5042C1.32031 17.6995 3.26687 16.997 6.16016 16.6211"
            stroke={color}
            strokeWidth="1.64063"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_346_41">
            <Rect width="22" height="22" fill="white" />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
}
