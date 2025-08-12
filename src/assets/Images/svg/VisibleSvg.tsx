import React from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import {ms} from '../../../theme/spacing';
import {svgProps} from './types';
import {ACTIVE_OPACITY} from '../../../constants/constants';

export function VisibleSvg({
  width,
  height,
  color,
  styles,
  activeDeActive = true,
  onPress = () => {},
}: svgProps) {
  return (
    <TouchableOpacity
      activeOpacity={ACTIVE_OPACITY}
      onPress={onPress}
      style={styles}>
      {activeDeActive ? (
        <Svg
          width={ms(width)}
          height={ms(height)}
          viewBox="0 0 20 20"
          fill="none">
          <Path
            d="M9.99998 13.7093C12.0486 13.7093 13.7092 12.0486 13.7092 10C13.7092 7.95146 12.0486 6.29077 9.99998 6.29077C7.95142 6.29077 6.29073 7.95146 6.29073 10C6.29073 12.0486 7.95142 13.7093 9.99998 13.7093Z"
            stroke={color}
            strokeWidth="1.5625"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Circle cx="9.99998" cy="10" r="0.78125" fill={color} />
          <Path
            d="M17.5524 2.44763L15.0723 4.92771"
            stroke={color}
            strokeWidth="1.5625"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M4.92768 15.0723L2.4476 17.5524"
            stroke={color}
            strokeWidth="1.5625"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M11.9531 16.6158C16.3949 15.3131 19.2188 10 19.2188 10C19.2188 10 15.5507 3.09857 10 3.09857C4.44926 3.09857 0.78125 10 0.78125 10C0.78125 10 3.60512 15.3131 8.04688 16.6158"
            stroke={color}
            strokeWidth="1.5625"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ) : (
        <Svg
          width={ms(width)}
          height={ms(height)}
          viewBox="0 0 20 20"
          fill="none">
          <Path
            d="M9.99999 15.0408C11.842 15.0408 13.3353 13.5397 13.3353 11.688C13.3353 9.83627 11.842 8.33514 9.99999 8.33514C8.15794 8.33514 6.66467 9.83627 6.66467 11.688C6.66467 13.5397 8.15794 15.0408 9.99999 15.0408Z"
            stroke={color}
            strokeWidth="1.5625"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Circle cx="10" cy="11.688" r="0.78125" fill={color} />
          <Path
            d="M10 2.08862V2.62718"
            stroke={color}
            strokeWidth="1.5625"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M3.09778 4.39514L3.4786 4.77596"
            stroke={color}
            strokeWidth="1.5625"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M16.9022 4.39514L16.5214 4.77596"
            stroke={color}
            strokeWidth="1.5625"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M18.4556 12.7512C18.9493 12.1176 19.2188 11.688 19.2188 11.688C19.2188 11.688 15.3166 5.4649 10 5.4649C4.68336 5.4649 0.78125 11.688 0.78125 11.688C0.78125 11.688 4.68336 17.911 10 17.911C12.2209 17.911 14.1948 16.8252 15.7407 15.5606"
            stroke={color}
            strokeWidth="1.5625"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      )}
    </TouchableOpacity>
  );
}
