import React, { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import {
  FORMAT_CODES,
  LANGUAGE_CODES,
  LANGUAGE_FLAGS,
  levelLabel,
  LEVELS,
} from '../constants/catalogs';
import { colors } from '../constants/colors';
import useAppStore from '../store/appStore';
import Chip from './Chip';

const FilterBar: FC = () => {
  const { t } = useTranslation();
  const filters = useAppStore((state) => state.filters);
  const setFilters = useAppStore((state) => state.setFilters);
  const resetFilters = useAppStore((state) => state.resetFilters);

  const hasActiveFilters =
    filters.language !== null ||
    filters.level !== null ||
    filters.format !== null ||
    filters.freeOnly;

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {LANGUAGE_CODES.map((code) => (
          <Chip
            key={code}
            label={`${LANGUAGE_FLAGS[code]} ${t(`languages.${code}`)}`}
            active={filters.language === code}
            onPress={() =>
              setFilters({
                language: filters.language === code ? null : code,
              })
            }
          />
        ))}
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {LEVELS.map((level) => (
          <Chip
            key={level}
            label={levelLabel(level, t)}
            active={filters.level === level}
            onPress={() =>
              setFilters({ level: filters.level === level ? null : level })
            }
          />
        ))}
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {FORMAT_CODES.map((format) => (
          <Chip
            key={format}
            label={t(`formats.${format}`)}
            active={filters.format === format}
            onPress={() =>
              setFilters({
                format: filters.format === format ? null : format,
              })
            }
          />
        ))}
        <Chip
          label={t('filters.free')}
          active={filters.freeOnly}
          onPress={() => setFilters({ freeOnly: !filters.freeOnly })}
        />
      </ScrollView>
      {hasActiveFilters && (
        <Text style={styles.reset} onPress={resetFilters}>
          {t('filters.reset')}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  reset: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
  },
});

export default FilterBar;
