import {ViewStyle} from 'react-native';

export interface svgProps {
  width: any;
  height: any;
  color?: string;
  styles?: ViewStyle;
  selected?: boolean;
  activeDeActive?: boolean;
  onPress?: () => void;
}
