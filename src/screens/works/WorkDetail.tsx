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
  CalendarSvg,
  CheckBoxSvg,
  CodeSvg,
  DateSvg,
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
import {ACTIVE_OPACITY} from '../../constants/constants';
import FastImageView from '../../components/FastImageView';
import {NAVIGATION} from '../../constants/navigation';
import {WorkItemSvg} from '../../assets/Images/svg/WorkItemSvg';

export default function WorkDetail({route, navigation}: CommonProps) {
  const detail = route?.params?.workData;
  // Example data, replace with actual props or navigation params

  const imageList = [1, 3, 4, 5, 6];

  return (
    <SafeAreaWrapper statusBg={Colors.primary} barStyle="light-content">
      <ActionBar
        title={strings.work}
        LeftIcon={<BackSvg width={28} height={28} color={Colors.white} />}
        onLeftPress={() => goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* Details Card */}
        <View style={styles.detailCard}>
          <View style={[styles.detailRow, {justifyContent: 'space-between'}]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.detailIcon}>
                <WorkItemSvg width={24} height={24} color={Colors.secondary} />
              </View>
              <View style={styles.detailTextBox}>
                <Text style={styles.detailLabel}>{strings.name}</Text>
                <Text style={styles.detailValue}>{detail?.name}</Text>
              </View>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <DateSvg width={24} height={24} color={Colors.secondary} />
            </View>
            <View style={styles.detailTextBox}>
              <Text style={styles.detailLabel}>{strings.workingTime}</Text>
              <Text style={styles.detailValue}>
                {[detail?.time_to_finish, detail?.time_unit]?.join(' ')}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={[styles.detailRow, {justifyContent: 'space-between'}]}>
            <View style={styles.bottomStatus}>
              <Text
                style={[
                  styles.bottomStatusText,
                  {
                    color: detail?.last_step
                      ? Colors.NorthTexasGreen
                      : Colors.colorRedD4,
                    marginRight: ms(10),
                  },
                ]}>
                {strings.lastStep}?
              </Text>
              <CheckBoxSvg
                height={20}
                width={20}
                activeDeActive={true}
                color={
                  detail?.last_step ? Colors.NorthTexasGreen : Colors.colorRedD4
                }
              />
            </View>
            <View style={styles.bottomStatus}>
              <Text
                style={[
                  styles.bottomStatusText,
                  {
                    color: detail?.active
                      ? Colors.NorthTexasGreen
                      : Colors.colorRedD4,
                    marginRight: ms(10),
                  },
                ]}>
                {strings.active}
              </Text>
              <CheckBoxSvg
                height={20}
                width={20}
                activeDeActive={true}
                color={
                  detail?.active ? Colors.NorthTexasGreen : Colors.colorRedD4
                }
              />
            </View>
          </View>
          {detail?.description ? (
            <>
              <View style={styles.divider} />
              <View style={styles.noteBox}>
                <Text style={styles.noteLabel}>{strings.description}:</Text>
                <Text style={styles.noteValue}>{detail?.description}</Text>
              </View>
            </>
          ) : null}
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
  imageLists: {
    height: ms(66),
    width: ms(66),
    borderRadius: ms(10),
    borderColor: Colors.borderCl,
    borderWidth: ms(1),
    marginHorizontal: ms(5),
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
  bottomStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  bottomStatusText: {
    ...typography._14SofticesSemibold,
  },
});
