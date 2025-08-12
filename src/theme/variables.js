import {Dimensions, StatusBar, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

let screen = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';

export const Colors = {
  textHeaderCl: '#122350',
  white: '#ffffff',
  buttonCl: '#24479E',
  textCl: '#1C2331',
  cardGrey: '#72778166',
  primary: '#24479E',
  secondary: '#122350',
  gray: '#727781',
  borderCl: '#DEE7F9',
  textLight: '#60656E',
  colorRedD4: '#D43217',
  cardBg: '#F8F9FC',
  lightGray: '#F9F9F9',
  black: '#000000',
  labelCl: '#64748B',
  infoBox: '#F8FAFC',
  imgBg: '#F3F4F6',
  Tawny: '#CE6000',
  NorthTexasGreen: '#079A2F',
  PictonBlue: '#34B7F1',
  UFOGreen: '#25D366',
  PastelOrange: '#FFB347',
  VeryLightBlue: '#6C63FF',
};

export const fonts = {
  SofticesBold: 'Softices-Bold',
  SofticesMedium: 'Softices-Medium',
  SofticesRegular: 'Softices-Regular',
  SofticesSemibold: 'Softices-SemiBold',
  SofticesLight: 'Softices-Light',
};

export const Measures = {
  width: screen.width,
  height: screen.height,
  unit: 8,
  fontSize: (screen.width / 100) * 5.34,
  fullScreenStatusBarHeight: Platform.select({
    ios:
      DeviceInfo.hasNotch() === true
        ? (screen.height = 5 / 100)
        : (screen.height = 3 / 100),
    android: StatusBar.currentHeight,
    default: 0,
  }),
  StatusBarHeight: Platform.select({
    ios: getStatusBarHeight(),
    android: StatusBar.currentHeight,
  }),
};

export default {
  Colors,
  Measures,
};
