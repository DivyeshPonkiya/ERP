import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import ActionBar from '../../components/ActionBar';
import {
  ActiveDeActiveSvg,
  BackSvg,
  CodeSvg,
  DetailTitleSvg,
  ShareSvg,
  StatusDetailSvg,
} from '../../assets/Images/svg';
import {goBack, navigate} from '../../navigators/RootNavigation';
import {Colors} from '../../theme/variables';
import {ms, vs} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import {strings} from '../../localization';
import {CustomerRoleSvg} from '../../assets/Images/svg/CustomerRoleSvg';
import {CommonProps} from '../types';
import {ACTIVE_OPACITY, CFL} from '../../constants/constants';
import FastImageView from '../../components/FastImageView';
import {NAVIGATION} from '../../constants/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';

export default function ProductsDetail({route, navigation}: CommonProps) {
  const dispatch = useDispatch();

  const [profileData] = useSelector((state: RootState) => [
    state.authSlice.profileData,
  ]);

  const detail = route?.params;

  const imageList = detail?.images_urls || [];

  return (
    <SafeAreaWrapper statusBg={Colors.primary} barStyle="light-content">
      <ActionBar
        title={strings.product}
        LeftIcon={<BackSvg width={28} height={28} color={Colors.white} />}
        onLeftPress={() => goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View>
          <Pressable
            onPress={() => {
              navigate(NAVIGATION.ProductsImagesDetail, imageList);
            }}
            disabled={imageList ? false : true}
            style={styles.imageBox}>
            {detail?.cover_image_url ? (
              <FastImageView
                source={detail?.cover_image_url}
                resizeMode="contain"
                style={styles.image}
              />
            ) : (
              <DetailTitleSvg
                width={100}
                height={140}
                color={Colors.borderCl}
              />
            )}
          </Pressable>
          {imageList ? (
            <View style={{alignItems: 'center', marginTop: ms(14)}}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{marginHorizontal: ms(0)}}>
                {imageList?.map((item: any, index: any) => {
                  return (
                    <View style={styles.imageLists}>
                      <FastImageView
                        source={item?.photo}
                        resizeMode="contain"
                        style={styles.images}
                      />
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          ) : null}
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            style={{position: 'absolute', right: 0, top: ms(12)}}>
            <ShareSvg height={20} width={20} color={Colors.textCl} />
          </TouchableOpacity>
        </View>

        {/* Details Card */}
        <View style={styles.detailCard}>
          <View style={[styles.detailRow, {justifyContent: 'space-between'}]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.detailIcon}>
                <DetailTitleSvg
                  width={21}
                  height={20}
                  color={Colors.secondary}
                />
              </View>
              <View style={styles.detailTextBox}>
                <Text style={styles.detailLabel}>{strings.product}</Text>
                <Text style={styles.detailValue}>{detail?.name}</Text>
              </View>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <CodeSvg width={24} height={24} color={Colors.secondary} />
            </View>
            <View style={styles.detailTextBox}>
              <Text style={styles.detailLabel}>{strings.code}</Text>
              <Text style={styles.detailValue}>{detail?.code}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <StatusDetailSvg
                width={24}
                height={24}
                color={Colors.secondary}
              />
            </View>
            <View style={styles.detailTextBox}>
              <Text style={styles.detailLabel}>{strings.status}</Text>
              <Text style={styles.detailValue}>
                {detail?.status == 'in_stock'
                  ? strings.inStock
                  : strings.outOfStock}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={[
                  styles.statusText,
                  {
                    color: detail?.active
                      ? Colors.NorthTexasGreen
                      : Colors.colorRedD4,
                  },
                ]}>
                {strings.active}
              </Text>
              <ActiveDeActiveSvg
                height={16}
                width={16}
                color={
                  detail?.active ? Colors.NorthTexasGreen : Colors.colorRedD4
                }
                activeDeActive={detail?.active}
              />
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <CustomerRoleSvg
                width={24}
                height={24}
                color={Colors.secondary}
              />
            </View>
            <View style={styles.detailTextBox}>
              <Text style={styles.detailLabel}>{strings.unit}</Text>
              <Text style={styles.detailValue}>{CFL(detail?.unit)}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <CustomerRoleSvg
                width={24}
                height={24}
                color={Colors.secondary}
              />
            </View>
            <View style={styles.detailTextBox}>
              <Text style={styles.detailLabel}>{strings.createdBy}</Text>
              <Text style={styles.detailValue}>{profileData?.user?.name}</Text>
            </View>
          </View>

          <View style={styles.divider} />
          <View style={styles.noteBox}>
            <Text style={styles.noteLabel}>{strings.description}:</Text>
            <Text style={styles.noteValue}>{detail?.description}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: ms(5),
    marginHorizontal: ms(20),
  },
  imageBox: {
    height: ms(180),
    width: ms(180),
    borderWidth: ms(1),
    borderColor: Colors.borderCl,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(10),
    alignSelf: 'center',
    marginTop: ms(15),
    overflow: 'hidden',
  },
  image: {
    height: ms(180),
    width: ms(180),
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
  detailCard: {
    backgroundColor: Colors.white,
    borderRadius: ms(12),
    padding: ms(16),
    borderWidth: ms(1),
    marginTop: ms(20),
    borderColor: Colors.borderCl,
    shadowColor: Colors.black,
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  statusText: {
    ...typography._14SofticesSemibold,
    marginRight: ms(6),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vs(20),
  },
  detailIcon: {
    width: ms(40),
    height: ms(40),
    marginRight: ms(12),
    borderRadius: ms(8),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.imgBg,
    borderColor: Colors.borderCl,
  },
  detailTextBox: {
    flex: 1,
  },
  detailLabel: {
    ...typography._16SofticesRegular,
    color: Colors.textLight,
    marginBottom: ms(2),
  },
  detailValue: {
    ...typography._16SofticesSemibold,
    color: Colors.black,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderCl,
    marginBottom: vs(20),
  },
  noteBox: {},
  noteLabel: {
    ...typography._16SofticesRegular,
    color: Colors.textLight,
    marginBottom: ms(2),
  },
  noteValue: {
    ...typography._16SofticesRegular,
    color: Colors.black,
  },
});
