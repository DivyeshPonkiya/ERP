import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Colors, Measures} from '../theme/variables';
import {typography} from '../theme/typography';
import {ACTIVE_OPACITY} from '../constants/constants';
import {BackSvg} from '../assets/Images/svg';

interface TopbackgroundProps {
  headertxt?: any;
  desc?: any;
  showback?: boolean;
  onBack?: () => void;
}
const Topbackground: React.FC<TopbackgroundProps> = ({
  headertxt,
  showback = false,
  desc,
  onBack = () => {},
}) => {
  return (
    <View style={{height: Measures.height / 2.1}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <TopbgSvg
        styles={{position: 'absolute'}}
        height={Measures.height / 2.2}
        width={Measures.width}
      />
      <BranchSvg
        styles={{position: 'absolute', right: 0}}
        height={Measures.height / 4}
        width={Measures.width / 4}
      />
      <View style={[styles.textView]}>
        {showback ? (
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            onPress={() => onBack()}>
            <BackSvg styles={{marginRight: 2}} width={32} height={32} />
          </TouchableOpacity>
        ) : null}
        <View>
          <Text style={[typography._24SofticesBold, styles.signIn]}>
            {headertxt}
          </Text>
          <Text style={[typography._12SofticesRegular, styles.desc]}>
            {desc}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },

  dontText: {
    fontSize: Measures.fontSize / 1.6,
    color: Colors.gray,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  signup: {
    fontSize: Measures.fontSize / 1.5,
    color: Colors.primary,
  },
  signIn: {
    color: Colors.primary,
  },
  desc: {
    color: Colors.textcl,
  },
  textView: {
    position: 'absolute',
    top: Measures.height / 5.5,
    left: 20,
    flexDirection: 'row',
  },
});
export default Topbackground;
