import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ms} from '../theme/spacing';
import {Colors} from '../theme/variables';

const LoadViewList = (props: any) => {
  const dataCount = props?.count || 8;
  const data: number[] = Array.from(
    {length: dataCount},
    (_, index) => index + 1,
  );

  return (
    <View style={[styles.container, props?.style]}>
      {data.map((item, index) => {
        return <View style={styles.loadContainer} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: ms(10),
    paddingHorizontal: ms(20),
  },
  loadContainer: {
    height: ms(60),
    borderRadius: ms(10),
    backgroundColor: Colors.cardBg,
    marginBottom: ms(10),
  },
});

export default LoadViewList;
