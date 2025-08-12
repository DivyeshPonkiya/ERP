import React from 'react';
import {View} from 'react-native';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {ms} from '../../../theme/spacing';
import {svgProps} from './types';

export function LocationFillSvg({width, height, color, styles}: svgProps) {
  return (
    <View style={styles}>
      <Svg
        width={ms(width)}
        height={ms(height)}
        viewBox="0 0 24 24"
        fill="none">
        <G clip-path="url(#clip0_100_668)">
          <Path
            d="M20.64 13.3203C20.28 14.0403 19.8 14.7603 19.32 15.3603C20.76 16.0803 21.6 16.9203 21.6 17.7603C21.6 20.5203 15.48 21.4803 12 21.4803C6 21.4803 2.4 19.5603 2.4 17.7603C2.4 16.9203 3.24 15.9603 4.68 15.3603C4.2 14.6403 3.72 14.0403 3.36 13.3203C1.2 14.4003 0 15.9603 0 17.8803C0 21.4803 4.8 24.0003 12 24.0003C19.2 24.0003 24 21.4803 24 17.8803C24 15.9603 22.8 14.4003 20.64 13.3203Z"
            fill={color}
          />
          <Path
            d="M12.0001 0C7.3201 0 3.6001 3.72 3.6001 8.4C3.6001 13.08 12.0001 20.4 12.0001 20.4C12.0001 20.4 20.4001 13.08 20.4001 8.4C20.4001 3.72 16.6801 0 12.0001 0ZM12.0001 12C9.9601 12 8.4001 10.44 8.4001 8.4C8.4001 6.36 9.9601 4.8 12.0001 4.8C14.0401 4.8 15.6001 6.36 15.6001 8.4C15.6001 10.44 14.0401 12 12.0001 12Z"
            fill={color}
          />
        </G>
        <Defs>
          <ClipPath id="clip0_100_668">
            <Rect width="24" height="24" fill="white" />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
}
