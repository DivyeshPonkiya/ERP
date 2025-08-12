import React from 'react';
import {View} from 'react-native';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {ms} from '../../../theme/spacing';
import {svgProps} from './types';

export function DropDownSvg({width, height, color, styles}: svgProps) {
  return (
    <View style={styles}>
      <Svg
        width={ms(width)}
        height={ms(height)}
        viewBox="0 0 22 22"
        fill="none">
        <Path
          d="M10.9982 15.5833L17.4148 8.25H4.58154L10.9982 15.5833Z"
          fill={color}
        />
      </Svg>
    </View>
  );
}
