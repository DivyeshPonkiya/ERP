import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const navigationRef: any = createNavigationContainerRef();

export function navigate(name: string | any, params?: object | any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function replace(name: string | any, params?: object | any) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
}

export function push(...args: string | any) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(args));
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}
