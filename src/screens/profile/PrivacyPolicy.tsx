import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import ActionBar from '../../components/ActionBar';
import {BackSvg} from '../../assets/Images/svg';
import {goBack} from '../../navigators/RootNavigation';
import {Colors} from '../../theme/variables';
import {strings} from '../../localization';
import {ms} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';

const PrivacyPolicy = () => {
  return (
    <SafeAreaWrapper statusBg={Colors.primary} barStyle="light-content">
      <ActionBar
        title={strings.privacyPolicy}
        LeftIcon={<BackSvg height={28} width={28} color={Colors.white} />}
        onLeftPress={() => goBack()}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.paragraph}>
          Softices consultancy built the app on a [open source, here: [reemium]
          and-reprovened] commercial app. This SERVICE is provided by Softices
          consultancy and is intended for use as it.
        </Text>

        <Text style={styles.paragraph}>
          This page is used to inform website visitors regarding our policies
          with the collection, use, an disclosure of personal information if
          anyone decided to use our service.
        </Text>

        <Text style={styles.sectionTitle}>Information Collection and Use</Text>

        <Text style={styles.paragraph}>
          For a better experience while using our service, we may require you to
          provide us with certain personally identifiable information, including
          but not limited to [add whatever else you collect here, e.g. users
          name] address [location pictural]. The information that we wanted is
          [remixed on your device and is not collected by us in my way][full be
          retained by us and used as described in this privacy policy.
        </Text>

        <Text style={styles.paragraph}>
          The app does use third-party services that may collect information
          used to identify you. [You can mention google services here and link
          to google's privacy policy if you want].
        </Text>

        <Text style={styles.sectionTitle}>Log Data</Text>

        <Text style={styles.paragraph}>
          We want to inform you that whenever you use our service, in case of an
          error in the app we collect data and information [through third party
          products] on your phone called [to date]. This log data may include
          information such as your devices's internet protocol [PPT address,
          device name, operating system version, configuration of the app when
          utilities and services, the time and date of your use of the service,
          and other statistics.
        </Text>

        <Text style={styles.sectionTitle}>Cookies</Text>

        <Text style={styles.paragraph}>
          Cookies are files with small amount of data that is commonly used on
          anonymous unique identifie. These are sent to your browser from the
          website that you visit and are stored on your devices's natural
          memory.
        </Text>

        <Text style={styles.sectionTitle}>Service Providers</Text>

        <Text style={styles.paragraph}>
          We may employ third-party companies and individuals due to the
          following reasons:
        </Text>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>To facilitate our service</Text>
        </View>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>
            To provide the service on our behalf
          </Text>
        </View>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>
            To perform service-related services
          </Text>
        </View>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>
            To assist us in analyzing how our service is used
          </Text>
        </View>

        <Text style={styles.paragraph}>
          We want to inform users of this service that these third parties have
          access to your personal information. The reason is to perform the
          tasks assigned to them on our behalf. However, they are obligated not
          to disclose or use the information for anyother purpose.
        </Text>

        <Text style={styles.sectionTitle}>Security</Text>

        <Text style={styles.paragraph}>
          We value your trust in providing us your personal information, thus we
          are striving to use commercially acceptable means of protecting it.
        </Text>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: ms(20),
    paddingBottom: ms(40),
  },

  sectionNumber: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  sectionTitle: {
    ...typography._20SofticesExtraBold,
    color: Colors.primary,
    marginTop: ms(20),
    marginBottom: ms(10),
  },

  paragraph: {
    ...typography._16SofticesRegular,
    color: Colors.textCl,
    lineHeight: ms(24),
    marginBottom: ms(15),
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: ms(10),
  },
  bullet: {
    ...typography._16SofticesRegular,
    color: Colors.textCl,
    marginRight: ms(10),
    lineHeight: ms(24),
  },
  bulletText: {
    ...typography._16SofticesRegular,
    color: Colors.textCl,
    flex: 1,
  },
});

export default PrivacyPolicy;
