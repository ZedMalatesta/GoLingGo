import React, { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';

const AppHeader: FC = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.header}>
      <Text style={styles.brand}>
        GoLing<Text style={styles.brandAccent}>Go</Text> 🌍
      </Text>
      <Text style={styles.tagline}>{t('header.tagline')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 4,
    backgroundColor: colors.background,
  },
  brand: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  brandAccent: {
    color: colors.primary,
  },
  tagline: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
});

export default AppHeader;
