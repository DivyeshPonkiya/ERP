import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {typography} from '../theme/typography';
import {Colors} from '../theme/variables';
import UploadSvg from '../assets/Images/svg/UploadSvg';
import {strings} from '../localization';
import PlusSvg from '../assets/Images/svg/PlusSvg';

interface PropsViewProps {
  title?: any;
  description?: any;
  onPress?: () => void;
  file?: any;
  style?: any;
}
const HeaderView: React.FC<PropsViewProps> = ({title, description}) => {
  return (
    <View style={styles.headerView}>
      <Text style={[typography._14SofticesSemibold, {color: Colors.textcl}]}>
        {title}
      </Text>
      <Text style={[typography._12SofticesRegular, {color: Colors.gray}]}>
        {description}
      </Text>
    </View>
  );
};

const UploadView: React.FC<PropsViewProps> = ({
  title,
  description,
  onPress = () => {},
}) => {
  return (
    <View style={styles.uploadView}>
      <UploadSvg styles={{marginBottom: 4}} width={20} height={20} />
      <Text style={[typography._12SofticesRegular, {color: Colors.gray}]}>
        {title}
        <TouchableWithoutFeedback onPress={() => onPress()}>
          <Text
            style={[
              typography._12SofticesRegular,
              {textDecorationLine: 'underline', color: Colors.primary},
            ]}>
            {strings.Browse}
          </Text>
        </TouchableWithoutFeedback>
      </Text>
      <Text style={[typography._10SofticesRegular, {color: Colors.primary}]}>
        {description}
      </Text>
    </View>
  );
};

const SampleView: React.FC<PropsViewProps> = ({file, style}) => {
  return (
    <View style={[styles.sampleView, style]}>
      <Text style={[typography._10SofticesMedium, {color: Colors.textcl}]}>
        {strings.sampleDocument}
      </Text>
      <View style={{height: 10}} />
      {file ? <Image source={file} /> : null}
    </View>
  );
};

const SmallButton: React.FC<PropsViewProps> = ({
  file,
  style,
  title,
  onPress = () => {},
}) => {
  return (
    <Pressable style={[styles.smallButton, style]} onPress={() => onPress()}>
      {file ? <PlusSvg width={20} height={20} /> : null}
      <View style={{width: 5}} />
      <Text style={[typography._10SofticesMedium, {color: Colors.primary}]}>
        {title}
      </Text>
    </Pressable>
  );
};

export {HeaderView, UploadView, SampleView, SmallButton};

const styles = StyleSheet.create({
  headerView: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  uploadView: {
    width: '90%',
    height: 130,
    alignSelf: 'center',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  sampleView: {
    width: '90%',
    minHeight: 130,
    alignSelf: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.gray,
    padding: 10,
  },
  smallButton: {
    width: 100,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    flexDirection: 'row',
  },
});
