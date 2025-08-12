import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import ActionBar from '../../components/ActionBar';
import {
  ActiveDeActiveSvg,
  BackSvg,
  CompanyDetailSvg,
  CompanyFillSvg,
  DetailTitleSvg,
  EmailFillSvg,
  IndividualSvg,
  LocationFillSvg,
  PhoneFillSvg,
  WhatsAppFillSvg,
} from '../../assets/Images/svg';
import {goBack} from '../../navigators/RootNavigation';
import {Colors} from '../../theme/variables';
import {ms, vs} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import {strings} from '../../localization';
import {CustomerRoleSvg} from '../../assets/Images/svg/CustomerRoleSvg';
import {CommonProps} from '../types';
import {CFL, hexToRGBA} from '../../constants/constants';
import FastImageView from '../../components/FastImageView';

export default function CustomersDetail({route, navigation}: CommonProps) {
  const detail = route?.params;

  return (
    <SafeAreaWrapper statusBg={Colors.primary} barStyle="light-content">
      <ActionBar
        title={strings.customers}
        LeftIcon={<BackSvg width={28} height={28} color={Colors.white} />}
        onLeftPress={() => goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.imageBox}>
          {detail?.photo_url ? (
            <FastImageView
              source={detail?.photo_url}
              resizeMode="contain"
              style={styles.imagePhotoBox}
            />
          ) : (
            <DetailTitleSvg width={100} height={140} color={Colors.borderCl} />
          )}
        </View>
        <Text style={styles.titleText}>{detail?.name}</Text>
        <View
          style={[
            styles.typeView,
            detail?.ctype == 'individual'
              ? {
                  borderColor: Colors.PastelOrange,
                  backgroundColor: hexToRGBA(Colors.PastelOrange, 0.15),
                }
              : {
                  borderColor: Colors.VeryLightBlue,
                  backgroundColor: hexToRGBA(Colors.VeryLightBlue, 0.15),
                },
          ]}>
          {detail?.ctype == 'individual' ? (
            <IndividualSvg width={16} height={16} color={Colors.secondary} />
          ) : (
            <CompanyFillSvg width={16} height={16} color={Colors.secondary} />
          )}
          <Text style={styles.typeText}>{CFL(detail?.ctype)}</Text>
        </View>

        {/* Details Card */}
        <View style={styles.detailCard}>
          <View style={[styles.detailRow, {justifyContent: 'space-between'}]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.detailIcon}>
                {detail?.ctype == 'individual' ? (
                  <CustomerRoleSvg
                    width={24}
                    height={24}
                    color={Colors.secondary}
                  />
                ) : (
                  <CompanyDetailSvg
                    width={24}
                    height={24}
                    color={Colors.secondary}
                  />
                )}
              </View>

              <View style={styles.detailTextBox}>
                <Text style={styles.detailLabel}>
                  {detail?.ctype == 'individual'
                    ? strings.name
                    : strings.customer}
                </Text>
                <Text style={styles.detailValue}>
                  {detail?.ctype == 'individual'
                    ? detail?.name
                    : detail?.company_name}
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
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <EmailFillSvg width={24} height={24} color={Colors.secondary} />
            </View>

            <View style={styles.detailTextBox}>
              <Text style={styles.detailLabel}>{strings.email}</Text>
              <Text style={styles.detailValue}>{detail?.email}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <PhoneFillSvg width={24} height={24} color={Colors.secondary} />
            </View>

            <View style={styles.detailTextBox}>
              <Text style={styles.detailLabel}>{strings.phone}</Text>
              <Text style={styles.detailValue}>{detail?.phone}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <WhatsAppFillSvg
                width={24}
                height={24}
                color={Colors.secondary}
              />
            </View>

            <View style={styles.detailTextBox}>
              <Text style={styles.detailLabel}>{strings.whatsApp}</Text>
              <Text style={styles.detailValue}>
                {detail?.whatsapp ? detail?.whatsapp : '-'}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <LocationFillSvg
                width={24}
                height={24}
                color={Colors.secondary}
              />
            </View>

            <View style={styles.detailTextBox}>
              <Text style={styles.detailLabel}>{strings.address}</Text>
              <Text style={styles.detailValue}>
                {detail?.address ? detail?.address : '-'}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.noteBox}>
            <Text style={styles.noteLabel}>{strings.notes}:</Text>
            <Text style={styles.noteValue}>
              {detail?.notes ? detail?.notes : '-'}
            </Text>
          </View>
        </View>
        <Text style={styles.cardTitleText}>{strings.visitingCard}</Text>
        <View style={styles.cardView}>
          <FastImageView
            source={detail?.visiting_card_url}
            resizeMode="contain"
            style={styles.visitingCardImage}
          />
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
  },
  imagePhotoBox: {
    height: ms(180),
    width: ms(180),
    borderRadius: ms(10),
    overflow: 'hidden',
  },
  titleText: {
    ...typography._20SofticesBold,
    color: Colors.textCl,
    textAlign: 'center',
    marginTop: ms(20),
  },
  typeView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderWidth: ms(1),
    borderRadius: ms(8),
    paddingVertical: ms(9),
    paddingHorizontal: ms(8),
    marginTop: ms(6),
    alignSelf: 'center',
  },
  typeText: {
    ...typography._15SofticesRegular,
    color: Colors.textCl,
    marginLeft: ms(4),
  },
  detailCard: {
    backgroundColor: Colors.white,
    borderRadius: ms(12),
    padding: ms(16),
    borderWidth: ms(1),
    marginTop: ms(18),
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
  cardTitleText: {
    ...typography._18SofticesSemibold,
    color: Colors.textCl,
    marginTop: ms(18),
  },
  cardView: {
    height: ms(180),
    backgroundColor: Colors.borderCl,
    borderRadius: ms(10),
    marginTop: ms(14),
  },
  visitingCardImage: {
    height: ms(180),
  },
});
