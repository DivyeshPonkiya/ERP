import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ActionBar from '../../components/ActionBar';
import {BackSvg, DetailTitleSvg, ProductionsSvg} from '../../assets/Images/svg';
import {goBack} from '../../navigators/RootNavigation';
import {Colors} from '../../theme/variables';
import {ms, vs} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import {strings} from '../../localization';
import {QuantitySvg} from '../../assets/Images/svg/QuantitySvg';
import {DateSvg} from '../../assets/Images/svg/DateSvg';
import {CommonProps} from '../types';
import moment from 'moment';

export default function StockDetail({route}: CommonProps) {
  const detail = route?.params?.stockData;

  // Example data, replace with actual props or navigation params
  const sale = {
    code: 'PAT - Patola',
    customer: 'Divy Patel',
    quantity: '10 Pcs',
    date: '07-05-2025',
    note: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    // icon: require('../../assets/Images/sale.png'), // Replace with your icon
  };

  return (
    <SafeAreaWrapper statusBg={Colors.primary} barStyle="light-content">
      <ActionBar
        title={strings.stocks}
        LeftIcon={<BackSvg width={28} height={28} color={Colors.white} />}
        onLeftPress={() => goBack()}
      />

      <View style={styles.container}>
        {/* Sale Code Card */}
        <View style={styles.codeCard}>
          {/* Replace Image with your SVG if needed */}
          {/* <Image source={sale.icon} style={styles.saleIcon} /> */}
          <View style={styles.saleIcon}>
            <DetailTitleSvg width={32} height={44} color={Colors.secondary} />
          </View>

          <Text style={styles.codeText}>{detail?.product?.name}</Text>
        </View>

        {/* Details Card */}
        <View style={styles.detailCard}>
          {detail?.production?.name ? (
            <>
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <ProductionsSvg
                    width={24}
                    height={24}
                    color={Colors.secondary}
                  />
                </View>

                <View style={styles.detailTextBox}>
                  <Text style={styles.detailLabel}>{strings.production}</Text>
                  <Text
                    style={[
                      styles.detailValue,
                      {
                        color: Colors.secondary,
                        textDecorationLine: 'underline',
                      },
                    ]}>
                    {`${detail?.production?.name}`}
                  </Text>
                </View>
              </View>
            </>
          ) : null}

          {detail?.quantity ? (
            <>
              <View style={styles.divider} />
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <QuantitySvg
                    width={24}
                    height={24}
                    color={Colors.secondary}
                  />
                </View>

                <View style={styles.detailTextBox}>
                  <Text style={styles.detailLabel}>{strings.quantity}</Text>
                  <Text style={styles.detailValue}>
                    {[detail?.quantity, detail?.quantity_unit]?.join(' ')}
                  </Text>
                </View>
              </View>
            </>
          ) : null}

          {detail?.created_at ? (
            <>
              <View style={styles.divider} />
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <DateSvg width={24} height={24} color={Colors.secondary} />
                </View>

                <View style={styles.detailTextBox}>
                  <Text style={styles.detailLabel}>{strings.date}</Text>
                  <Text style={styles.detailValue}>{`${moment(
                    detail?.created_at,
                  ).format('DD-MM-YYYY')}`}</Text>
                </View>
              </View>
            </>
          ) : null}
          {detail?.product?.notes ? (
            <>
              <View style={styles.divider} />
              <View style={styles.noteBox}>
                <Text style={styles.noteLabel}>{strings.notes}:</Text>
                <Text style={styles.noteValue}>{detail?.product?.notes}</Text>
              </View>
            </>
          ) : null}
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
    height: vs(1),
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
