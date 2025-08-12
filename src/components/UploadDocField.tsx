import React, {forwardRef, useImperativeHandle, useRef, memo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ViewStyle,
  ViewProps,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Colors} from '../theme/variables';
import {typography} from '../theme/typography';
import {ms} from '../theme/spacing';
import {CloseSvg, UploadSvg} from '../assets/Images/svg';
import {ACTIVE_OPACITY, CFL, isNull} from '../constants/constants';
import {strings} from '../localization';
import {Asset} from 'react-native-image-picker';
import FastImageView from './FastImageView';

// Types for external use
export interface InputFieldRef {
  focus: () => void;
  validate: () => boolean;
  getValue: () => string;
}

interface Props extends ViewProps {
  labelTxt: string;
  titleTxt: string;
  btnTxt: string;
  value: string;
  onChangeText?: (val: string) => void;
  requiredField?: boolean;
  validationStatus?: 'default' | 'error' | 'valid';
  errorMessage?: string;
  style?: ViewStyle;
  uploadBtn?: ViewStyle;
  openModal?: () => void;
  removeImageIndex?: (data: any) => void;
  rowImage?: boolean;
}

const UploadDocField = forwardRef<InputFieldRef, Props>(
  (
    {
      labelTxt,
      titleTxt,
      btnTxt,
      value,
      validationStatus = 'default',
      errorMessage = '',
      style,
      requiredField,
      uploadBtn,
      openModal = () => {},
      removeImageIndex = () => {},
      rowImage = true,
    },
    ref,
  ) => {
    const inputRef = useRef<View>(null);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
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
        {Array.isArray(value) && value?.length > 0 ? (
          <View style={[styles.uploadedBox, getInputStyle()]}>
            <View style={styles.multiImageBox}>
              {value?.map((item: any, index) => {
                return (
                  <View>
                    {typeof item.photo === 'string' &&
                    item.photo.startsWith('http') ? (
                      <FastImageView
                        source={item?.photo}
                        resizeMode="contain"
                        style={[
                          styles.uploadedImage,
                          styles.uploadedMultiImage,
                        ]}
                      />
                    ) : (
                      <Image
                        key={index}
                        source={{
                          uri: item?.uri || item?.full_filepath,
                        }}
                        style={[
                          styles.uploadedImage,
                          styles.uploadedMultiImage,
                        ]}
                      />
                    )}
                    <TouchableOpacity
                      activeOpacity={ACTIVE_OPACITY}
                      style={styles.closeIcon}
                      onPress={() => {
                        removeImageIndex(index);
                      }}>
                      <CloseSvg height={12} width={12} color={Colors.white} />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
            <TouchableOpacity
              activeOpacity={ACTIVE_OPACITY}
              onPress={() => openModal()}
              style={[
                styles.uploadBtnView,
                uploadBtn,
                {marginTop: 0, alignSelf: 'flex-end'},
              ]}>
              <Text style={styles.uploadBtnText}>{strings.replace}</Text>
              <UploadSvg height={20} width={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
        ) : !isNull(value) ? (
          <View
            style={[
              styles.uploadedBox,
              rowImage ? styles.rowBox : styles.columnBox,
              getInputStyle(),
            ]}>
            {typeof value === 'string' && value.startsWith('http') ? (
              <FastImageView
                source={value}
                resizeMode="contain"
                style={styles.uploadedImage}
              />
            ) : (
              <Image
                source={{
                  uri: value?.uri || value?.full_filepath,
                }}
                style={styles.uploadedImage}
              />
            )}
            <TouchableOpacity
              activeOpacity={ACTIVE_OPACITY}
              onPress={() => openModal()}
              style={[
                styles.uploadBtnView,
                !rowImage && {marginTop: ms(12)},
                uploadBtn,
              ]}>
              <Text style={styles.uploadBtnText}>{strings.replace}</Text>
              <UploadSvg height={20} width={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={[
              styles.uploadedBox,
              rowImage ? styles.rowBox : styles.columnBox,
              getInputStyle(),
            ]}>
            <Text style={styles.titleText}>{titleTxt}</Text>
            <TouchableOpacity
              activeOpacity={ACTIVE_OPACITY}
              onPress={() => openModal()}
              style={[
                styles.uploadBtnView,
                !rowImage && {marginTop: ms(12)},
                uploadBtn,
              ]}>
              <Text style={styles.uploadBtnText}>{btnTxt}</Text>
              <UploadSvg height={20} width={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
        )}

        <View style={[styles.container, style]}>
          {validationStatus === 'error' && !!errorMessage && (
            <Text style={styles.errorText}>{CFL(errorMessage)}</Text>
          )}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: ms(16),
  },
  label: {
    color: Colors.textCl,
    marginBottom: ms(8),
  },
  uploadedBox: {
    borderWidth: ms(1),
    borderColor: Colors.borderCl,
    backgroundColor: Colors.white,
    borderRadius: ms(10),
    paddingVertical: ms(14),
    paddingHorizontal: ms(14),
    // flex: 1,
  },
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  columnBox: {
    alignItems: 'center',
  },
  uploadedImage: {
    height: ms(66),
    width: ms(66),
    borderRadius: ms(10),
  },
  multiImageBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  uploadedMultiImage: {
    borderWidth: ms(1),
    borderColor: Colors.borderCl,
    marginRight: ms(6),
    marginBottom: ms(12),
  },
  closeIcon: {
    height: ms(22),
    width: ms(22),
    borderRadius: ms(11),
    backgroundColor: Colors.textLight,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },

  uploadBox: {
    borderWidth: ms(1),
    borderColor: Colors.borderCl,
    backgroundColor: Colors.cardBg,
    borderStyle: 'dashed',
    borderRadius: ms(10),
    alignItems: 'center',
    paddingVertical: ms(14),
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

  titleText: {
    color: Colors.textLight,
    ...typography._16SofticesRegular,
  },
  uploadBtnView: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: ms(10),
    paddingVertical: ms(6.5),
    paddingHorizontal: ms(12),
    // marginTop: ms(12),
  },
  uploadBtnText: {
    color: Colors.white,
    ...typography._16SofticesSemibold,
    marginRight: ms(8),
  },
  errorText: {
    color: Colors.colorRedD4,
    ...typography._12SofticesRegular,
    marginTop: ms(4),
    marginLeft: ms(4),
  },
});

export default memo(UploadDocField);
