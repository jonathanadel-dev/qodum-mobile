import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';


// Variants
type Variant = 'h1' | 'h2' | 'h3' | 'text' | 'desc';


// Props
type Props = TextProps & {
  variant?: Variant;
};


// Styles
const VARIANT_STYLES = StyleSheet.create({
  h1: {
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
    color: colors.text,
  },
  h2: {
    fontSize: 17,
    fontFamily: 'Quicksand-Bold',
    color: colors.text,
  },
  h3: {
    fontSize: 15,
    fontFamily: 'Quicksand-SemiBold',
    color: colors.text,
  },
  text: {
    fontSize: 13,
    fontFamily: 'Quicksand-Medium',
    color: colors.text,
  },
  desc: {
    fontSize: 13,
    lineHeight: 19,
    fontFamily: 'Quicksand-Regular',
    color: colors.textSecondary,
  },
});


// App text
export default function AppText({ variant = 'text', style, ...rest }: Props) {
  return <Text style={[VARIANT_STYLES[variant], style]} {...rest} />;
}