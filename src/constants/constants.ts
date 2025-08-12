import {Platform} from 'react-native';
import _ from 'lodash';
import ToastMessage from '../components/ToastMessage';
import {strings} from '../localization';
import {Video, Image} from 'react-native-compressor';
import RNFS from 'react-native-fs';

import {
  BASE_URL_L,
  BASE_URL_D,
  BASE_URL_N,
  CLIENT_ID_L,
  CLIENT_SECRET_L,
  ACCESS_TOKEN_L,
  CLIENT_ID_D,
  CLIENT_SECRET_D,
  ACCESS_TOKEN_D,
  CLIENT_ID_N,
  CLIENT_SECRET_N,
  ACCESS_TOKEN_N,
} from '@env';

export const BaseUrl = BASE_URL_L;

export const Client_Id = CLIENT_ID_L;
export const Client_Secret = CLIENT_SECRET_L;
export const Access_Token = ACCESS_TOKEN_L;

export const TOAST_VISIBILITY = 7000;
export const KEYBOARD_OFFSET = Platform.OS === 'ios' ? 40 : 120;
export const NOTIFICATION_CHANNEL_ID = '10001';
export const FCM_TOKEN = 'FCM_TOKEN';
export const LOGIN_DATA = 'LOGIN_DATA';

export const Response_Type = 'code';
export const Redirect_Uri = 'urn:ietf:wg:oauth:2.0:oob';
export const Scope = 'read write';
export const Code_Challenge = 'wyztbFv3UoWXrFiVGEQ9-LaIXl0G0CnVFBJTD7_4sEU';
export const Code_challenge_method = 'S256';
export const Grant_type = 'authorization_code';
export const Code_verifier = 'STptQucO7cBNFSNLm5Hqk7aZ289zy53XkLza9HWQxjm';

export function errorMessageHandler(response: any) {
  var err = response;
  if (err?.data != null && !err?.status) {
    if (!err?.data?.active) {
    }
    var errResult = err?.data;
    var keys = Object.values(errResult);
    var dataString = keys.toString();
    ToastMessage.set(
      toastConst.errorToast,
      dataString || strings.somethingWent,
    );
  } else {
    if (response?.message) {
      ToastMessage.set(
        toastConst.errorToast,
        response?.message || strings.somethingWent,
      );
    }
    if (response?.error) {
      ToastMessage.set(
        toastConst.errorToast,
        response?.error || strings.somethingWent,
      );
    } else {
      var message = response?.toString();
      ToastMessage.set(toastConst.errorToast, message || strings.somethingWent);
    }
  }
}

export const validateForm = (formData: any, checkPasswordLimit?: boolean) => {
  const errors: {[key: string]: string} = {};
  Object.entries(formData).forEach(([key, value]: any) => {
    if (!value) {
      errors[key] = `${key?.split('_').join(' ')} is required`;
    }

    // Field-specific rules
    if (key === 'email' && value) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(value)) {
        errors[key] = 'Invalid email format';
      }
    }

    if (
      (key === 'password' ||
        key === 'current_password' ||
        key === 'confirm_password') &&
      value &&
      value.length < 6
    ) {
      errors[key] = 'Password must be at least 6 characters';
    }

    if (
      (key === 'phone' || key === 'company_mobile') &&
      value &&
      value.length !== 10
    ) {
      errors[key] = 'Phone must be 10 digits';
    }
  });
  if (
    formData?.confirm_password &&
    formData?.password !== formData?.confirm_password
  ) {
    errors['confirm_password'] = 'Confirm password does not match';
  }
  return errors;
};

export async function compressMedia(uri: any, mediaType: any) {
  try {
    let compressedUri;
    if (mediaType === 'video') {
      compressedUri = await Video.compress(uri, {
        compressionMethod: 'auto',
      });
    } else if (mediaType === 'image') {
      compressedUri = await Image.compress(uri, {
        compressionMethod: 'auto',
      });
    } else {
      throw new Error('Unsupported media type');
    }

    // Return the compressed file URI
    return compressedUri;
  } catch (error) {
    console.error('Media compression failed:', error);
    return null;
  }
}

export async function getFileSize(uri: any) {
  try {
    const stats = await RNFS.stat(uri);
    return stats.size; // Size in bytes
  } catch (error) {
    console.error('Failed to get file size:', error);
    return null;
  }
}

export const getOr = (object: any, path: string, def: any) => {
  return _.defaultTo(_.get(object, path, def), def);
};

export const size = (array: any) => {
  return _.size(array);
};

export function hexToRGBA(h: any, opacity: any) {
  let r: any = 0,
    g: any = 0,
    b: any = 0;

  // 3 digits
  if (h.length == 4) {
    r = '0x' + h[1] + h[1];
    g = '0x' + h[2] + h[2];
    b = '0x' + h[3] + h[3];

    // 6 digits
  } else if (h.length == 7) {
    r = '0x' + h[1] + h[2];
    g = '0x' + h[3] + h[4];
    b = '0x' + h[5] + h[6];
  }

  return 'rgba(' + +r + ',' + +g + ',' + +b + ',' + +opacity + ')';
}

export function isNull(data: any) {
  if (data == '' || data == 'null' || data === null || data === undefined) {
    return true;
  } else {
    return false;
  }
}

export function CFL(string: String) {
  return !isNull(string)
    ? string?.charAt(0)?.toUpperCase() + string?.slice(1)
    : '';
}

export function keyValueEmptyFilter(url?: any) {
  const data = Object.entries(url).reduce((acc, [key, value]) => {
    if (value !== '' && value !== undefined && value !== null) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);
  return data;
}

export const ACTIVE_OPACITY = 0.7;

interface ToastConstProps {
  successToast: string;
  errorToast: string;
  toastTop: string;
  toastBottom: string;
}
export const toastConst: ToastConstProps = {
  successToast: 'success',
  toastBottom: 'bottom',
  toastTop: 'top',
  errorToast: 'error',
};

export const asyncKeys = {
  accessToken: 'accessToken',
  logInData: 'logInData',
  RememberMe: 'RememberMe',
  defaultToken: 'defaultToken',
  isLogIn: 'isLogIn',
  cartItems: 'cartItems',
  language: 'language',
  FCMToken: 'FCMToken',
};
