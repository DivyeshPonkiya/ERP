import {NavigationProp, RouteProp} from '@react-navigation/native';

export interface CommonProps {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}

type ParamValue =
  | string
  | boolean
  | number
  | {
      uri: string;
      name: string;
      type: string;
    };

export type ParamsProps = {
  [key: string]: ParamValue;
};
