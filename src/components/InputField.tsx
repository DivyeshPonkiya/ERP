import React, {forwardRef, useImperativeHandle, useRef, memo} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {Colors} from '../theme/variables';
import {typography} from '../theme/typography';
import {hs, ms, vs} from '../theme/spacing';
import {CFL} from '../constants/constants';

// Types for external use
export interface InputFieldRef {
  focus: () => void;
  clear: () => void;
  blur: () => void;
  validate: () => boolean;
  getValue: () => string;
}

interface Props extends TextInputProps {
  value: string;
  onChangeText?: (val: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onSubmitEditing?: () => void;
  inputKeyboardType?: TextInputProps['keyboardType'];
  inputReturnKeyType?: TextInputProps['returnKeyType'];
  placeholder?: string;
  labelTxt?: any;
  validationStatus?: 'default' | 'error' | 'valid';
  errorMessage?: string;
  maxLength?: number;
  textInputHeight?: number;
  textAlignVertical?: 'top' | 'center' | 'bottom';
  editable?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  secureTextEntry?: boolean;
  requiredField?: boolean;
}

const InputField = forwardRef<InputFieldRef, Props>(
  (
    {
      value,
      onChangeText = () => {},
      onBlur = () => {},
      onFocus = () => {},
      placeholder = 'Enter email address',
      onSubmitEditing = () => {},
      inputKeyboardType = 'default',
      inputReturnKeyType,
      multiline,
      placeholderTextColor = Colors.gray,
      validationStatus = 'default',
      errorMessage = '',
      labelTxt = 'Email',
      secureTextEntry,
      maxLength,
      textInputHeight = ms(50),
      textAlignVertical = 'center',
      editable = true,
      style,
      inputStyle,
      rightIcon,
      leftIcon,
      requiredField = false,
    },
    ref,
  ) => {
    const inputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      clear: () => inputRef.current?.clear(),
      blur: () => inputRef.current?.blur(),
      validate: () => !!value && value.trim().length > 0,
      getValue: () => value || '',
    }));

    const getInputStyle = () => {
      switch (validationStatus) {
        case 'error':
          return styles.inputError;
        case 'valid':
          return styles.inputValid;
        default:
          return styles.inputDefault;
      }
    };

    return (
      <View style={[styles.container, style]}>
        {labelTxt ? (
          <Text style={[typography._16SofticesSemibold, styles.label]}>
            {labelTxt}
            {requiredField ? '*' : ''}
          </Text>
        ) : null}

        <View
          style={[
            styles.inputBase,
            getInputStyle(),
            {
              minHeight: multiline ? ms(110) : textInputHeight,
              paddingRight: rightIcon ? 0 : ms(14),
            },
          ]}>
          {leftIcon && <>{leftIcon}</>}

          <TextInput
            ref={inputRef}
            multiline={multiline}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            textAlignVertical={textAlignVertical}
            editable={editable}
            value={value}
            style={[
              typography._16SofticesRegular,
              {
                flex: 1,
                marginHorizontal: leftIcon ? ms(10) : 0,
                minHeight: multiline ? ms(100) : undefined,
                pointerEvents: !editable ? 'none' : 'auto',
                color: Colors.textCl,
              },
              inputStyle,
            ]}
            maxLength={maxLength}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            onBlur={onBlur}
            onFocus={onFocus}
            returnKeyType={inputReturnKeyType}
            keyboardType={inputKeyboardType}
          />

          {rightIcon && <>{rightIcon}</>}
        </View>

        {validationStatus === 'error' && !!errorMessage && (
          <Text style={styles.errorText}>{CFL(errorMessage)}</Text>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: vs(16),
  },
  label: {
    color: Colors.textCl,
    marginBottom: vs(8),
  },
  inputBase: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: ms(10),
    paddingLeft: ms(14),
    borderWidth: ms(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputDefault: {
    borderColor: Colors.borderCl,
  },
  inputValid: {
    borderColor: Colors.primary,
  },
  inputError: {
    borderColor: Colors.colorRedD4,
  },
  errorText: {
    color: Colors.colorRedD4,
    ...typography._12SofticesRegular,
    marginTop: ms(4),
    marginLeft: ms(4),
  },
});

export default memo(InputField);
