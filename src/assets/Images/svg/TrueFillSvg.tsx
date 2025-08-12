import React from 'react';
import {View} from 'react-native';
import Svg, {Circle, ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {ms} from '../../../theme/spacing';
import {svgProps} from './types';

export function TrueFillSvg({width, height, color, styles}: svgProps) {
  return (
    <View style={styles}>
      <Svg
        width={ms(width)}
        height={ms(height)}
        viewBox="0 0 20 20"
        fill="none">
        <G clip-path="url(#clip0_185_1416)">
          <Circle cx="10" cy="10" r="10" fill={color} />
          <Path
            d="M14.7986 7.73785L9.29076 13.2457C9.18273 13.3538 9.05446 13.4395 8.91327 13.498C8.77208 13.5566 8.62074 13.5867 8.46791 13.5867C8.31508 13.5867 8.16374 13.5566 8.02256 13.498C7.88137 13.4395 7.75309 13.3538 7.64506 13.2457L5.11733 10.7183C4.89909 10.5001 4.77649 10.2041 4.77649 9.89547C4.77649 9.58684 4.89909 9.29085 5.11733 9.07261C5.33556 8.85438 5.63155 8.73178 5.94018 8.73178C6.24881 8.73178 6.5448 8.85438 6.76303 9.07261L8.46654 10.7761L13.1529 6.09371C13.261 5.98565 13.3893 5.89994 13.5305 5.84147C13.6717 5.783 13.823 5.75291 13.9759 5.75293C14.1287 5.75295 14.28 5.78307 14.4212 5.84157C14.5624 5.90008 14.6907 5.98582 14.7988 6.0939C14.9068 6.20199 14.9925 6.3303 15.051 6.47151C15.1095 6.61271 15.1396 6.76406 15.1395 6.91689C15.1395 7.06973 15.1094 7.22106 15.0509 7.36226C14.9924 7.50345 14.9067 7.63174 14.7986 7.7398V7.73785Z"
            fill="white"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_185_1416">
            <Rect width="20" height="20" fill="white" />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
}
