import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {CloseSvg} from '../../assets/Images/svg';
import {goBack, navigate} from '../../navigators/RootNavigation';
import {Colors} from '../../theme/variables';
import {ms, width} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import {strings} from '../../localization';
import {CommonProps} from '../types';
import {ACTIVE_OPACITY} from '../../constants/constants';
import FastImageView from '../../components/FastImageView';
import {NAVIGATION} from '../../constants/navigation';

export default function ProductsImagesDetail({route, navigation}: CommonProps) {
  const detail = route?.params;

  const imageList: string[] = Array.isArray(detail) ? detail : [];

  const [selectIndex, setSelectIndex] = useState(0);
  return (
    <SafeAreaWrapper statusBg={Colors.white} barStyle="dark-content">
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            onPress={() => goBack()}
            style={{marginTop: ms(34), marginHorizontal: ms(20)}}>
            <CloseSvg height={20} width={20} color={Colors.textCl} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            onPress={() =>
              navigate(NAVIGATION.ImageZoom, imageList[selectIndex]?.photo)
            }>
            <FastImageView
              source={imageList[selectIndex]?.photo}
              resizeMode="contain"
              style={styles.mainImage}
            />
          </TouchableOpacity>
          <View style={{alignItems: 'center', marginTop: ms(20)}}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{marginHorizontal: ms(0)}}>
              {imageList?.map((item: any, index: any) => {
                return (
                  <TouchableOpacity
                    activeOpacity={ACTIVE_OPACITY}
                    onPress={() => {
                      setSelectIndex(index);
                    }}
                    style={styles.imageLists}>
                    <FastImageView
                      source={item?.photo}
                      resizeMode="contain"
                      style={styles.images}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
        <Text style={styles.textContainer}>{strings.tapTheImageToZoomIn}</Text>
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
  },
  mainImage: {
    height: width - ms(80),
    width: width,
    backgroundColor: Colors.cardBg,
    marginTop: ms(20),
  },
  imageLists: {
    height: ms(66),
    width: ms(66),
    borderRadius: ms(10),
    borderColor: Colors.borderCl,
    borderWidth: ms(1),
    marginHorizontal: ms(5),
    overflow: 'hidden',
  },
  images: {
    height: ms(66),
    width: ms(66),
  },
  textContainer: {
    textAlign: 'center',
    ...typography._16SofticesRegular,
    color: Colors.textCl,
  },
  image: {
    width: 300,
    height: 300,
  },
});
