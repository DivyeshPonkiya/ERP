import {StyleSheet} from 'react-native';

const Layout = StyleSheet.create({
  /* Column Layouts */
  column: {
    flexDirection: 'column',
  },
  colCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  /* Row Layouts */
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowSpaceAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rowFlexEnd: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  /* Default Layouts */
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignItemsStart: {
    alignItems: 'flex-start',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  justifyContentAround: {
    justifyContent: 'space-around',
  },
  justifyContentBetween: {
    justifyContent: 'space-between',
  },
  /* Sizes Layouts */
  fill: {
    flex: 1,
  },
  fullSize: {
    height: '100%',
    width: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowFlex: {
    flexDirection: 'row',
    flex: 1,
  },
});

export default Layout;
