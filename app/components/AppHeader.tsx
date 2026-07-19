import React, { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { colors, handFont } from '../constants/colors';

const AppHeader: FC = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.header}>
      <View style={styles.brandRow}>
        <Text style={styles.brand}>
          GoLing<Text style={styles.brandAccent}>Go</Text>
        </Text>
        <Text style={styles.doodles}>✏️ 💬 🎧 📚</Text>
      </View>
      <Text style={styles.tagline}>{t('header.tagline')}</Text>
      <View style={styles.inkUnderline} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    backgroundColor: colors.background,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    fontFamily: handFont,
    fontSize: 38,
    color: colors.primary,
    letterSpacing: 0.5,
  },
  brandAccent: {
    color: colors.accent,
  },
  doodles: {
    fontSize: 16,
    letterSpacing: 4,
  },
  tagline: {
    fontFamily: handFont,
    fontSize: 19,
    color: colors.accent,
    marginTop: -4,
    transform: [{ rotate: '-1deg' }],
  },
  inkUnderline: {
    height: 2,
    marginTop: 6,
    borderRadius: 1,
    backgroundColor: colors.primary,
    opacity: 0.25,
    transform: [{ rotate: '-0.4deg' }],
  },
});

export default AppHeader;
