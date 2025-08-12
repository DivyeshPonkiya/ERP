import React from 'react';
import {
  Alert,
  Dimensions,
  Linking,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {pick, types} from '@react-native-documents/picker';
import {
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

import _ from 'lodash';
import {Colors} from '../theme/variables';
import {
  compressMedia,
  getFileSize,
  hexToRGBA,
  isNull,
  toastConst,
} from '../constants/constants';
import {ms} from '../theme/spacing';
import {strings} from '../localization';
import {typography} from '../theme/typography';
import ToastMessage from './ToastMessage';

const {width} = Dimensions.get('window');

const ImagePickerModal = ({
  visible,
  onClose,
  onImageSelect,
  includeBase64,
  selectionLimit,
  enablecropper,
  height,
  width,
  mediaType,
  isProgressing,
  videoOption = false,
  isPost = false,
  multiple,
  docOption = false,
  supportMb = 2,
}: any) => {
  let maxSize = isPost ? 5 : supportMb;

  const openCamera = async (mediaTypes?: any) => {
    if (enablecropper != undefined && enablecropper) {
      ImageCropPicker.openCamera({
        width: width,
        height: height,
        cropping: enablecropper,
        mediaType: mediaTypes ?? 'photo',
        forceJpg: true,
        multiple: multiple ?? false,
      })
        .then((image: any) => {
          let result = {
            uri: image.path,
            fileName: image.path.substring(
              image.path.lastIndexOf('/') + 1,
              image.path.length,
            ),
            type: image.mime,
          };
          const fileSize = image && image.size / 1024 ** 2;
          isProgressing && isProgressing(false);
          onClose();
          if (fileSize < maxSize) {
            onImageSelect(result);
          } else {
            ToastMessage.set(
              toastConst.errorToast,
              strings.mediaSelectWaring?.replace('{size}', `${maxSize}`),
            );
          }
        })
        .catch(error => {
          onClose();
          Alert.alert(error.message);
        });
    } else {
      ImageCropPicker.openCamera({
        mediaType: mediaTypes ?? 'photo',
        forceJpg: true,
        compressImageQuality: 0.5,
        multiple: multiple ?? false,
      })
        .then((image: any) => {
          let result = {
            uri: image.path,
            fileName: image.path.substring(
              image.path.lastIndexOf('/') + 1,
              image.path.length,
            ),
            type: image.mime,
            height: image.height,
            width: image.width,
            fileSize: image.size,
          };

          const fileSize = image && image.size / 1024 ** 2;

          isProgressing && isProgressing(false);
          onClose();

          if (fileSize < maxSize) {
            onImageSelect({assets: [result]});
          } else {
            ToastMessage.set(
              toastConst.errorToast,
              strings.mediaSelectWaring?.replace('{size}', `${maxSize}`),
            );
          }
        })
        .catch(error => {
          onClose();
          Alert.alert(error.message);
        });
    }
  };

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'ios') {
      const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);

      if (result === RESULTS.GRANTED) {
        openGallery();
      } else if (result === RESULTS.DENIED) {
        Alert.alert(
          'Permission Denied',
          'Photo library access is required to select images.',
        );
      } else if (result === RESULTS.BLOCKED) {
        Alert.alert(
          'Permission Blocked',
          'Photo library access is blocked. Please enable it from settings.',
          [
            {text: 'Cancel'},
            {
              text: 'Open Settings',
              onPress: () => {
                Linking.openURL('app-settings:');
              },
            },
          ],
        );
      }
    } else {
      // Android: handle permissions if needed
      openGallery();
    }
  };

  const requestCameraPermission = async (mediaTypes?: any) => {
    if (Platform.OS === 'ios') {
      const result = await request(PERMISSIONS.IOS.CAMERA);

      if (result === RESULTS.GRANTED) {
        openCamera(mediaTypes);
      } else if (result === RESULTS.DENIED) {
        Alert.alert(
          'Permission Denied',
          'Camera permission is required to take photos.',
        );
      } else if (result === RESULTS.BLOCKED) {
        Alert.alert(
          'Permission Blocked',
          'Camera permission is blocked. Please enable it from settings.',
          [
            {text: 'Cancel'},
            {
              text: 'Open Settings',
              onPress: () => {
                Linking.openURL('app-settings:');
              },
            },
          ],
        );
      }
    } else {
      // Android: handle permissions if needed
      const result = await request(PERMISSIONS.ANDROID.CAMERA);
      if (result === RESULTS.GRANTED) {
        openCamera(mediaTypes);
      } else if (result === RESULTS.DENIED) {
        Alert.alert(
          'Permission Denied',
          'Camera permission is required to take photos.',
        );
      } else if (result === RESULTS.BLOCKED) {
        Alert.alert(
          'Permission Blocked',
          'Camera permission is blocked. Please enable it from settings.',
          [
            {text: 'Cancel'},
            {
              text: 'Open Settings',
              onPress: () => {
                // Linking.openURL('app-settings:');
                openSettings('application-settings:');
              },
            },
          ],
        );
      }
      // Uncomment the line below if you want to open the camera directly without checking permissions

      // openCamera(mediaTypes);
    }
  };

  const openGallery = async () => {
    // if (Platform.OS == 'ios') {
    //   onClose();
    // }

    if (enablecropper != undefined && enablecropper) {
      ImageCropPicker.openPicker({
        width: width,
        height: height,
        cropping: enablecropper,
        mediaType: mediaType ?? 'photo',
        forceJpg: true,
        multiple: multiple ?? false,
      })
        .then((image: any) => {
          let result = {
            uri: image.path,
            fileName: image.path.substring(
              image.path.lastIndexOf('/') + 1,
              image.path.length,
            ),
            type: image.mime,
          };
          onClose();
          onImageSelect(result);
          isProgressing && isProgressing(false);
        })
        .catch(error => {
          onClose();
          Alert.alert(error.message);
        });
    } else {
      const result = await launchImageLibrary({
        // quality: 0.5,
        includeBase64: includeBase64,
        // videoQuality: 'low',
        mediaType: mediaType ?? 'photo',
        restrictMimeTypes: ['image/jpeg', 'image/jpg'],
        selectionLimit: selectionLimit != undefined ? selectionLimit : 1,
      });

      isProgressing && isProgressing(true);

      updateAssetsWithCompressedUri(result?.assets)
        .then(res => {
          const allowedTypes = ['image/jpeg', 'image/jpg'];

          // 1. Filter by allowed types (jpeg/jpg) first
          const allowedAssets = res?.assets?.filter((asset: any) =>
            allowedTypes.includes(asset?.type?.toLowerCase()),
          );

          // 2. If no allowed assets, alert user
          if (
            (!allowedAssets || allowedAssets?.length === 0) &&
            !isNull(res?.assets)
          ) {
            Alert.alert('Only JPG or JPEG images are allowed.');
            return;
          }

          // 3. Filter assets under the max size
          const validAssets = allowedAssets?.filter((asset: any) => {
            const sizeInMB = asset?.fileSize ? asset?.fileSize / 1024 ** 2 : 0;
            return sizeInMB <= maxSize;
          });

          onClose();

          // 4. Show toast if any images were skipped
          const skippedCount = allowedAssets?.length - validAssets?.length;
          if (skippedCount > 0) {
            ToastMessage.set(
              toastConst.errorToast,
              `${skippedCount} image(s) exceeded the ${maxSize}MB limit and were skipped.`,
            );
          }

          // 5. Send only valid assets to onImageSelect
          if (validAssets.length > 0) {
            onImageSelect({assets: validAssets});
          }

          isProgressing && isProgressing(false);
        })
        .catch(error => {
          isProgressing && isProgressing(false);
          console.error('Error processing image:', error.message);
        });
    }
  };

  const openDoc = async () => {
    pick({
      allowMultiSelection: true,
      type: [types.pdf],
    })
      .then((res: any) => {
        const allowedTypes = [types.pdf];

        // 1. Filter by allowed types (pdf) first
        const allowedAssets = res?.filter((asset: any) =>
          allowedTypes.includes(asset?.type?.toLowerCase()),
        );

        // 2. If no allowed assets, alert user
        if ((!allowedAssets || allowedAssets?.length === 0) && !isNull(res)) {
          Alert.alert('Only PDF are allowed.');
          return;
        }

        // 3. Filter assets under the max size
        const validAssets = allowedAssets?.filter((asset: any) => {
          const sizeInMB = asset?.size ? asset?.size / 1024 ** 2 : 0;
          return sizeInMB <= maxSize;
        });

        onClose();

        // 4. Show toast if any images were skipped
        const skippedCount = allowedAssets?.length - validAssets?.length;
        if (skippedCount > 0) {
          ToastMessage.set(
            toastConst.errorToast,
            `${skippedCount} pdf(s) exceeded the ${maxSize}MB limit and were skipped.`,
          );
        }

        // 5. Send only valid assets to onImageSelect
        if (validAssets?.length > 0) {
          onImageSelect({assets: validAssets});
        }
      })
      .catch(handleError => {});
  };

  const updateAssetsWithCompressedUri = async (assetsArray: any) => {
    try {
      for (let i = 0; i < assetsArray?.length; i++) {
        const asset = assetsArray[i];

        // ---- compress file ---- //
        // const mediaType = asset.type.includes('video') ? 'video' : 'image';

        // // Compress the media
        // const compressedUri = await compressMedia(asset.uri, mediaType);

        // if (compressedUri) {
        //   // Update the asset object with the compressed URI
        //   asset.uri = compressedUri;

        //   // Optionally, you can update the fileSize as well after compression
        //   const compressedSize = await getFileSize(compressedUri);
        //   asset.fileSize = compressedSize;
        // }
        // ---- compress file ---- //

        const compressedSize = await getFileSize(asset.uri);
        asset.fileSize = compressedSize;
      }
      return {assets: assetsArray};
    } catch (error) {
      console.error('updateAssetsWithCompressedUri', error);
      return {assets: assetsArray};
    }
  };

  return (
    <Modal
      visible={visible}
      animationType={'fade'}
      transparent={true}
      onRequestClose={() => {
        onClose();
      }}>
      <View style={styles.container}>
        <Pressable
          onPress={onClose}
          accessibilityRole="button"
          style={styles.overlayArea}
        />
        <View style={styles.modalContainer}>
          <Text style={styles.titleText}>
            {mediaType == 'any'
              ? strings.selectMedia
              : mediaType == 'video'
              ? strings.selectVideo
              : strings.selectImage}
          </Text>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => requestCameraPermission(mediaType)}>
            <Text style={styles.btnTxt}>
              {mediaType == 'video' ? strings.takeVideo : strings.takePhoto}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={requestGalleryPermission}>
            <Text style={styles.btnTxt}>{strings.chooseFromLibrary}</Text>
          </TouchableOpacity>
          {docOption ? (
            <TouchableOpacity style={styles.btnContainer} onPress={openDoc}>
              <Text style={styles.btnTxt}>{strings.chooseFromFiles}</Text>
            </TouchableOpacity>
          ) : null}
          {videoOption ? (
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => requestCameraPermission('video')}>
              <Text style={styles.btnTxt}>{strings.takeVideo}</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={styles.btnCancelContainer}
            onPress={() => {
              onClose();
            }}>
            <Text style={styles.btnCancelText}>
              {strings.cancel_cap?.toLocaleUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
        <Pressable
          onPress={onClose}
          accessibilityRole="button"
          style={styles.overlayArea}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: hexToRGBA('#000', 0.5),
  },
  overlayArea: {
    flex: 1,
  },
  modalContainer: {
    padding: ms(18),
    backgroundColor: Colors.white,
    width: (width * 90) / 100,
    borderRadius: ms(10),
    marginHorizontal: ms(20),
  },
  titleText: {
    ...typography._16SofticesExtraBold,
    marginBottom: ms(12),
    color: Colors.black,
  },
  btnContainer: {
    paddingVertical: ms(12),
  },
  btnTxt: {
    ...typography._16SofticesMedium,
    color: Colors.black,
  },
  btnCancelContainer: {
    paddingTop: ms(12),
    alignSelf: 'flex-end',
  },
  btnCancelText: {
    ...typography._16SofticesExtraBold,
    color: Colors.black,
  },
});

export default ImagePickerModal;
