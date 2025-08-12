import React from 'react';
import {View} from 'react-native';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {ms} from '../../../theme/spacing';
import {svgProps} from './types';

export function CalendarSvg({width, height, color, styles}: svgProps) {
  return (
    <View style={styles}>
      <Svg
        width={ms(width)}
        height={ms(height)}
        viewBox="0 0 22 22"
        fill="none">
        <G clip-path="url(#clip0_126_223)">
          <Path
            d="M21.1406 7.05696H0.859375V4.97925C0.859375 3.55539 2.01364 2.40112 3.4375 2.40112H18.5625C19.9864 2.40112 21.1406 3.55539 21.1406 4.97925V7.05696Z"
            stroke={color}
            strokeWidth="1.71875"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M4.77396 1.56006V3.75507"
            stroke={color}
            strokeWidth="1.71875"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M11 1.55981V3.75483"
            stroke={color}
            strokeWidth="1.71875"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M17.2261 1.55981V3.75483"
            stroke={color}
            strokeWidth="1.71875"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M5.97369 11.5924V11.5535"
            stroke={color}
            strokeWidth="1.71875"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M11.0001 11.5535V11.5924"
            stroke={color}
            strokeWidth="1.71875"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M16.0264 11.5535V11.5924"
            stroke={color}
            strokeWidth="1.71875"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M5.97375 15.9428V15.9038"
            stroke={color}
            strokeWidth="1.71875"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M11.0001 15.9036V15.9425"
            stroke={color}
            strokeWidth="1.71875"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M16.0264 15.9036V15.9425"
            stroke={color}
            strokeWidth="1.71875"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M21.1406 13.5845V7.05688H0.859375V17.8612C0.859375 19.2851 2.01364 20.4393 3.4375 20.4393H18.5625C19.9796 20.4393 21.1297 19.296 21.1405 17.8814"
            stroke={color}
            strokeWidth="1.71875"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_126_223">
            <Rect width="22" height="22" fill="white" />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
}
