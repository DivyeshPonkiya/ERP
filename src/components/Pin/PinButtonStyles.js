import {StyleSheet} from 'react-native';
import {Colors} from '../../theme/variables';
import {ms} from '../../theme/spacing';

export default StyleSheet.create({
  cell: {
    width: ms(44),
    height: ms(44),
    fontSize: ms(30),
    fontWeight: '900',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: ms(8),
    borderColor: Colors.borderCl,
    backgroundColor: Colors.white,
    borderWidth: ms(1),
    color: Colors.textCl,
    marginHorizontal: ms(7),
  },
  toggle: {
    width: ms(44),
    height: ms(44),
    fontSize: ms(30),
    textAlign: 'center',
  },
  focusCell: {
    borderColor: Colors.primary,
  },
});
