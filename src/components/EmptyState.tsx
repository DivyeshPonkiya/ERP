import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {height, ms, width} from '../theme/spacing';
import {Colors} from '../theme/variables';
import {typography} from '../theme/typography';
import {EmptySvg} from '../assets/Images/svg/EmptySvg';

interface EmptyStateProps {
  title: string;
  description?: string;
  imageSource?: any; // Optional: pass image source if needed
}

const EmptyState = ({
  title,
  description = '',
  imageSource,
}: EmptyStateProps) => (
  <View style={styles.container}>
    {imageSource ? (
      <Image source={imageSource} style={styles.image} resizeMode="contain" />
    ) : (
      // You can use a default SVG or image here if needed
      <EmptySvg width={200} height={150} />
    )}
    <Text style={styles.title}>{title}</Text>
    {description ? <Text style={styles.description}>{description}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ms(24),
    backgroundColor: Colors.white,
    height: (height * 65) / 100,
  },
  image: {
    width: ms(180),
    height: ms(180),
    marginBottom: ms(24),
  },

  title: {
    ...typography._18SofticesSemibold,
    color: Colors.textCl,
    textAlign: 'center',
    marginBottom: ms(8),
  },
  description: {
    ...typography._16SofticesRegular,
    color: Colors.textLight,
    textAlign: 'center',
  },
});

export default EmptyState;
