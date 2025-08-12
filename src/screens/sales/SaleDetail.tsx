import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ActionBar from '../../components/ActionBar';
import {BackSvg, DetailTitleSvg} from '../../assets/Images/svg';
import {goBack} from '../../navigators/RootNavigation';
import {Colors} from '../../theme/variables';
import {ms, vs} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import {strings} from '../../localization';
import {QuantitySvg} from '../../assets/Images/svg/QuantitySvg';
import {DateSvg} from '../../assets/Images/svg/DateSvg';
import {CustomerRoleSvg} from '../../assets/Images/svg/CustomerRoleSvg';
import {CommonProps} from '../types';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {setSalesLoaderData} from '../../createSlice/salesSlice';
import FastImageView from '../../components/FastImageView';
import moment from 'moment';

export default function SaleDetail({route, navigation}: CommonProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [salesDetailData, salesDetailLoading, error] = useSelector(
    (state: RootState) => [
      state.salesSlice.salesDetailData,
      state.salesSlice.salesDetailLoading,
      state.customersSlice.error,
    ],
  );
  // const detail = salesDetailData?.sale;
  const detail = route?.params;

  useEffect(() => {
    if (error) {
      dispatch(setSalesLoaderData(null));
    }
  }, [error]);

  return (
    <SafeAreaWrapper statusBg={Colors.primary} barStyle="light-content">
      <ActionBar
        title={strings.sales}
        LeftIcon={<BackSvg width={28} height={28} color={Colors.white} />}
        onLeftPress={() => goBack()}
      />

      <View style={styles.container}>
        {/* Sale Code Card */}
        <View style={styles.codeCard}>
          {/* Replace Image with your SVG if needed */}
          {/* <Image source={sale.icon} style={styles.saleIcon} /> */}
          <View style={styles.saleIcon}>
            {detail?.product?.cover_image_url ? (
              <FastImageView
                source={detail?.product?.cover_image_url}
                resizeMode="contain"
                style={styles.image}
              />
            ) : (
              <DetailTitleSvg width={32} height={44} color={Colors.secondary} />
            )}
          </View>

          <Text style={styles.codeText}>
            {detail?.product?.code}
            {' - '}
            {detail?.product?.name}
          </Text>
        </View>

        {/* Details Card */}
        <View style={styles.detailCard}>
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <CustomerRoleSvg
                width={24}
                height={24}
                color={Colors.secondary}
              />
            </View>

            <View style={styles.detailTextBox}>
              <Text style={styles.detailLabel}>{strings.customer}</Text>
              <Text style={styles.detailValue}>{detail?.customer?.name}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <QuantitySvg width={24} height={24} color={Colors.secondary} />
            </View>

            <View style={styles.detailTextBox}>
              <Text style={styles.detailLabel}>{strings.quantity}</Text>
              <Text style={styles.detailValue}>
                {detail?.quantity} {detail?.quantity_unit}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <DateSvg width={24} height={24} color={Colors.secondary} />
            </View>

            <View style={styles.detailTextBox}>
              <Text style={styles.detailLabel}>{strings.date}</Text>
              <Text style={styles.detailValue}>
                {moment(detail?.created_at).format('DD-MM-YY')}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.noteBox}>
            <Text style={styles.noteLabel}>{strings.notes}:</Text>
            <Text style={styles.noteValue}>{detail?.notes}</Text>
          </View>
        </View>
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: ms(16),
  },
  codeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    borderRadius: ms(12),
    padding: ms(16),
    marginBottom: ms(18),
  },
  saleIcon: {
    width: ms(48),
    height: ms(48),
    marginRight: ms(12),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(10),
    overflow: 'hidden',
  },
  image: {
    width: ms(48),
    height: ms(48),
  },
  codeText: {
    ...typography._20SofticesBold,
    color: Colors.black,
  },
  detailCard: {
    backgroundColor: Colors.white,
    borderRadius: ms(12),
    padding: ms(16),
    borderWidth: 1,
    borderColor: Colors.borderCl,
    shadowColor: Colors.black,
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
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
