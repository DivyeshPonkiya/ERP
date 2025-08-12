import Toast from 'react-native-toast-message';
class ToastMessage {
  static set(type?: string, msg?: string) {
    Toast.show({
      type: type,
      position: 'bottom',
      text1: msg,
      visibilityTime: 2000,
      autoHide: true,
      bottomOffset: 30,
    });
  }
}

export default ToastMessage;
