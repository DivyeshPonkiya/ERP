import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import ActionBar from '../../components/ActionBar';
import {BackSvg} from '../../assets/Images/svg';
import {Colors} from '../../theme/variables';
import {strings} from '../../localization';
import {goBack} from '../../navigators/RootNavigation';
import {typography} from '../../theme/typography';
import {ms} from '../../theme/spacing';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';

const TermsOfUse = () => {
  return (
    <SafeAreaWrapper statusBg={Colors.primary} barStyle="light-content">
      <ActionBar
        title={strings.termUse}
        LeftIcon={<BackSvg height={28} width={28} color={Colors.white} />}
        onLeftPress={() => goBack()}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.updatedText}>Last Updated: 24th October 2021</Text>

        <Text style={styles.paragraph}>
          Softices consultancy Pvt. Ltd. (Here in after Softices) maintains this
          site for information about our product and services. Please feel free
          to browse the site.
        </Text>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>
            Please read and understand these terms and conditions carefully
            before using Softices.com website.
          </Text>
        </View>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>
            The user must agree and accept all the 'Terms and Conditions' before
            using Softices.com website.
          </Text>
        </View>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>
            This web site Softices.com is owned and operated by Softices only.
            All content present on this site is the property of Softices
            including all the graphics, images, logos, software, trademarks,
            video, text, audio and animation used on this site.
          </Text>
        </View>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>
            The site, and all the content, materials, information, software,
            products and services provided on the site, are provided on an "as
            is" and "as available" basis. Softices expressly disclaims all
            warranties of any kind, whether express or implied, including, but
            not limited to, the implied warranty of merchantability, fitness for
            a particular purpose and non-infringement.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: ms(20),
    paddingBottom: ms(49),
  },

  updatedText: {
    ...typography._18SofticesSemibold,
    color: Colors.primary,
    marginBottom: ms(20),
  },
  paragraph: {
    ...typography._16SofticesRegular,
    color: Colors.textCl,
    lineHeight: ms(24),
    marginBottom: ms(20),
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

export default TermsOfUse;
