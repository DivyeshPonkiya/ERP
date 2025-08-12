import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {ms} from '../../../theme/spacing';
import {svgProps} from './types';

export function QuantitySvg({width, height, color, styles}: svgProps) {
  return (
    <View style={styles}>
      <Svg
        width={ms(width)}
        height={ms(height)}
        viewBox="0 0 20 21"
        fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.3771 12.4416V17.2954L15.1736 19.7222V14.8684L19.3771 12.4416ZM10.3234 17.2954L14.5269 19.7223V14.8684L10.3234 12.4416V17.2954ZM0.622833 17.2954L4.82661 19.7223V14.8684L0.622833 12.4416V17.2954ZM9.99998 1.27783L5.89346 3.64864L9.99998 6.01965L14.1065 3.64885L9.99998 1.27783ZM5.47331 19.7222L9.67679 17.2954L9.67684 12.4416L5.47331 14.8684V19.7222ZM5.14979 9.45436L9.35332 11.8814L5.14979 14.3082L0.946057 11.8814L5.14979 9.45436ZM10.3235 11.3214L10.3234 6.57964L14.43 4.20863L14.43 8.9504L10.3235 11.3214ZM9.67679 6.57964V11.3214L5.57028 8.95036V4.20879L9.67679 6.57964ZM14.8504 9.45452L10.6468 11.8816L14.8504 14.3084L19.0539 11.8816L14.8504 9.45452Z"
          fill={color}
        />
      </Svg>
    </View>
  );
}
