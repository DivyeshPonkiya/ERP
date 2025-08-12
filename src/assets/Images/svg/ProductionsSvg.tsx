import React from 'react';
import {View} from 'react-native';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {ms} from '../../../theme/spacing';
import {svgProps} from './types';

export function ProductionsSvg({width, height, color, styles}: svgProps) {
  return (
    <View style={styles}>
      <Svg
        width={ms(width)}
        height={ms(height)}
        viewBox="0 0 24 25"
        fill="none">
        <G clip-path="url(#clip0_138_226)">
          <Path
            d="M12 2.20605C14.4343 2.20605 16.7717 3.10934 18.6388 4.62391H17.5955V6.03016H21.1111V2.51454H19.7048V3.6814C17.5608 1.87193 14.8378 0.799805 12 0.799805C5.40891 0.799805 0 6.20871 0 12.7998C0 14.6984 0.478781 16.5132 1.33158 18.1954L2.58539 17.5596C1.83422 16.0765 1.40625 14.4752 1.40625 12.7998C1.40625 6.98393 6.18413 2.20605 12 2.20605Z"
            fill={color}
          />
          <Path
            d="M22.6267 7.32178L21.3771 7.96725C22.1536 9.46959 22.594 11.0956 22.594 12.7998C22.594 18.6157 17.8161 23.3936 12.0002 23.3936C9.52837 23.3936 7.16255 22.4664 5.28347 20.9112H6.3457V19.5049H2.83008V23.0205H4.23633V21.8675C6.38855 23.7093 9.13237 24.7998 12.0002 24.7998C18.5913 24.7998 24.0002 19.3909 24.0002 12.7998C24.0002 10.8958 23.4947 9.00196 22.6267 7.32178Z"
            fill={color}
          />
          <Path
            d="M11.2969 13.2341L5.67188 10.4214V17.4529L11.2969 20.2654V13.2341Z"
            fill={color}
          />
          <Path
            d="M11.9998 12.0137L17.6245 9.20108L11.9998 6.38867L6.375 9.20108L11.9998 12.0137Z"
            fill={color}
          />
          <Path
            d="M12.7031 13.2341V20.2654L18.3281 17.4529V10.4214L12.7031 13.2341Z"
            fill={color}
          />
        </G>
        <Defs>
          <ClipPath id="clip0_138_226">
            <Rect
              width="24"
              height="24"
              fill="white"
              transform="translate(0 0.799805)"
            />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
}
