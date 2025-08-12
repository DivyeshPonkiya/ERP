import React from 'react';
import {View} from 'react-native';
import Svg, {G, Mask, Path} from 'react-native-svg';
import {ms} from '../../../theme/spacing';
import {svgProps} from './types';

export function SortingSvg({width, height, color, styles}: svgProps) {
  return (
    <View style={styles}>
      <Svg
        width={ms(width)}
        height={ms(height)}
        viewBox="0 0 20 20"
        fill="none">
        <Mask
          id="mask0_185_931"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="20"
          height="20">
          <Path
            d="M19.9804 19.9805V0.0195312H0.0195007V19.9805H19.9804Z"
            fill="white"
            stroke="white"
            strokeWidth="0.0390625"
          />
        </Mask>
        <G mask="url(#mask0_185_931)">
          <Path
            d="M14.3359 19.2188V6.87527C14.3359 6.44383 13.9861 6.09402 13.5546 6.09402H10.1958C9.53542 6.09402 9.20476 5.29098 9.67167 4.82129L13.2299 1.24207C13.8396 0.628713 14.8321 0.628713 15.4419 1.24207L19.0001 4.82129C19.467 5.29098 19.1364 6.09402 18.476 6.09402H17.6171"
            stroke={color}
            strokeWidth="1.5625"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M5.66401 0.782053V13.1255C5.66401 13.557 5.31425 13.9068 4.88276 13.9068H1.5239C0.863545 13.9068 0.532881 14.7098 0.999795 15.1795L4.558 18.7587C5.16776 19.3721 6.16026 19.3721 6.77003 18.7587L10.3282 15.1795C10.7951 14.7098 10.4645 13.9068 9.80413 13.9068H8.94526"
            stroke={color}
            strokeWidth="1.5625"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
      </Svg>
    </View>
  );
}
