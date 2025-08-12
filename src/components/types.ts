import {ReactElement} from 'react';
import {TextStyle, ViewProps, ViewStyle} from 'react-native';

export interface SafeAreaProps {
  children: any;
  style?: ViewStyle;
  edges?: ['top', 'bottom'];
  statusBg?: string;
  barStyle?: 'default' | 'light-content' | 'dark-content';
}

export interface ActionBarProps {
  title: string;
  LeftIcon?: any;
  onLeftPress?: () => void;
  RightIcon?: any;
  onRightPress?: () => void;
  containerStyle?: ViewStyle;
}

export interface ReusableModalProps {
  visible: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  onSubmit: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  submitBgColor?: string;
  cancelBgColor?: string;
  children?: any;
  isLoading?: boolean;
}

export interface InputFieldProps {
  value?: any;
  autoCapitalize?: string | any;
  onChangeText: (value: any) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  onSubmitEditing?: () => void;
  onBlur?: () => void;
  inputref?: string | any;
  inputReturnKeyType?: string | any;
  inputKeyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'url';
  multiline?: boolean | any;
  placeholderIcon?: object;
  emailError?: number | undefined;
  passwordError?: number | undefined;
  nameError?: boolean | undefined;
  placeholderTextColor?: string;
  onEyeClicked?: () => void;
  passwordVisible?: boolean;
  placeholderSvg?: object | any;
  emptyField?: number | any;
  labelTxt?: string | any;
  maxLength?: number;
  textInputHeight?: number;
  textAlignVertical?: 'center' | 'auto' | 'bottom' | 'top';
  editable?: boolean;
  style?: any;
  rightIcon?: any;
  leftIcon?: any;
  isVerify?: boolean;
  validationStatus?: 'default' | 'error' | 'valid';
  errorMessage?: string;
}

export interface HeaderProps {
  leftIcon?: object;
  leftText?: string;
  centerText?: string;
  rightIcon?: object;
  rightText?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  rightSvg?: object | any;
  leftSvg?: object | any;
  backgroundColor?: object | any;
}

export interface BottomModalProps {
  openModal?: boolean;
  onModalClose?: () => void;
  headerTxt?: string;
  optionOneTxt?: string;
  optionTwoTxt?: string;
  onModalOptionPress?: (value: string) => void;
  cancelTxt?: string;
}

export interface OfferModalProps {
  openModal: boolean;
  headerTxt: string;
  setCloseModal?: () => void;
}

export interface SideBarProps {
  onClosePress: () => void;
  openDrawer: boolean;
  headingTxt: string;
  subHeadingText: string;
  firstDrawerText: string;
  secondDrawerText: string;
  firstImage: object;
  secondImage: object;
  onOptionPress: (value: string) => void;
}

export interface DropDownProps {
  dropDownData: object | any;
  value: string;
  zIndex?: number;
  bgcolor?: string;
  radius?: number;
  font?: string;
  fsize?: number;
  tcolor?: string;
  itemhight?: number | string;
  cTextSize?: number | string | any;
  cTextColor?: string;
  cTextFont?: string;
  onItemSelect?: (val: object) => void;
  dropDownSvg?: string | object | any;
  dropDownWidth: any;
  dropDownHeight?: any;
  top?: any;
}

export interface ButtonProps {
  btnTxt?: any;
  onBtnPress?: () => void;
  width?: number | any;
  backgroundColor?: any;
  fontColor?: any;
  borderColor?: any;
  borderWidth?: any;
  isLoading?: boolean;
  disable?: boolean;
  style?: ViewStyle;
  btnStyle?: ViewStyle;
}

export interface RadioProps {
  onBtnPress?: (value?: string) => void;
  backgroundColor?: string;
  isCheck?: boolean;
  disable?: boolean;
}

export interface BottomTabProps {
  iconFirstImg?: object | string | any;
  iconSecondImg?: object | string | any;
  iconThirdImg?: object | string | any;
  iconForthImg?: object | string | any;
  iconFifthImg?: object | string | any;
  iconSixthImg?: object | string | any;
  firstTabText?: string;
  secondTabText?: string;
  thirdTabText?: string;
  forthTabText?: string;
  fifthTabText?: string;
  sixthTabText?: string;
  firstTabColor?: string;
  secondTabColor?: string;
  thirdTabColor?: string;
  forthTabColor?: string;
  fifthTabColor?: string;
  sixthTabColor?: string;
  onTabPress: (value: string) => void;
}

export interface AddressDeatilsProps {
  openModal?: boolean;
  closeModal?: (val: boolean) => void;
}

export interface ProfileInputProps {
  value?: string | number | any;
  autoCapitalize?: string | any;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  onSubmitEditing?: () => void;
  inputref?: string | any;
  inputReturnKeyType?: string | any;
  inputKeyboardType?: string | any;
  multiline?: boolean | any;
  placeholderIcon?: object;
  emailError?: number | undefined;
  passwordError?: number | undefined;
  placeholderTextColor?: string;
  onEyeClicked?: () => void;
  passwordVisible?: boolean;
  onClicked?: () => void;
  placeholderSvg?: object | any;
  editable?: boolean;
  isClickable?: boolean;
  isEmailClickable?: boolean;
  marginTop?: number | string;
}
