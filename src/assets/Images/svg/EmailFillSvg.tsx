import React from 'react';
import {View} from 'react-native';
import Svg, {G, Mask, Path} from 'react-native-svg';
import {ms} from '../../../theme/spacing';
import {svgProps} from './types';

export function EmailFillSvg({width, height, color, styles}: svgProps) {
  return (
    <View style={styles}>
      <Svg
        width={ms(width)}
        height={ms(height)}
        viewBox="0 0 20 21"
        fill="none">
        <Mask
          id="mask0_192_448"
          maskUnits="userSpaceOnUse"
          x="1"
          y="1"
          width="19"
          height="19">
          <Path d="M1 1H20V20H1V1Z" fill="white" />
        </Mask>
        <G mask="url(#mask0_192_448)">
          <Path
            d="M10.4999 9.50879L19.5016 3.77643C18.9984 3.05384 18.1621 2.57969 17.2167 2.57969H3.78315C2.83779 2.57969 2.00153 3.05384 1.49829 3.77643L10.4999 9.50879Z"
            fill={color}
          />
          <Path
            d="M10.799 10.6383C10.7078 10.6964 10.6039 10.7255 10.5 10.7255C10.3961 10.7255 10.2922 10.6964 10.201 10.6383L1.05466 4.81382C1.01896 4.99146 1 5.175 1 5.36296V15.6377C1 17.1724 2.24854 18.4209 3.7832 18.4209H17.2168C18.7515 18.4209 20 17.1724 20 15.6377V5.36296C20 5.175 19.981 4.99146 19.9453 4.81386L10.799 10.6383Z"
            fill={color}
          />
        </G>
      </Svg>
    </View>
  );
}
