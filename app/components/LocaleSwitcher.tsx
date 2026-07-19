import React, { FC } from 'react';

import { Pressable, StyleSheet, Text } from 'react-native';

import { bodyFont, colors } from '../constants/colors';
import { APP_LOCALES } from '../i18n';
import useAppStore from '../store/appStore';

/** Compact pill visible on every tab: tap to cycle the app language. */
const LocaleSwitcher: FC = () => {
  const locale = useAppStore((state) => state.locale);
  const setLocale = useAppStore((state) => state.setLocale);

  const cycle = () => {
    const codes = APP_LOCALES.map((item) => item.code);
    setLocale(codes[(codes.indexOf(locale) + 1) % codes.length]);
  };

  return (
    <Pressable onPress={cycle} style={styles.pill} hitSlop={6}>
      <Text style={styles.label}>🌐 {locale.toUpperCase()}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pill: {
    borderWidth: 1.2,
    borderColor: colors.border,
    borderRadius: 16,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  label: {
    fontFamily: bodyFont.bold,
    fontSize: 12,
    color: colors.primaryDark,
  },
});

export default LocaleSwitcher;
