import React, { FC } from 'react';

import { ScrollView, StyleSheet, Text, View } from 'react-native';

import {
  FORMAT_CODES,
  FORMATS,
  LANGUAGE_CODES,
  LANGUAGES,
  LEVEL_LABELS,
  LEVELS,
} from '../constants/catalogs';
import { colors } from '../constants/colors';
import useAppStore from '../store/appStore';
import Chip from './Chip';

const FilterBar: FC = () => {
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
            label={`${LANGUAGES[code].flag} ${LANGUAGES[code].name}`}
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
            label={LEVEL_LABELS[level]}
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
            label={FORMATS[format]}
            active={filters.format === format}
            onPress={() =>
              setFilters({
                format: filters.format === format ? null : format,
              })
            }
          />
        ))}
        <Chip
          label="Бесплатно"
          active={filters.freeOnly}
          onPress={() => setFilters({ freeOnly: !filters.freeOnly })}
        />
      </ScrollView>
      {hasActiveFilters && (
        <Text style={styles.reset} onPress={resetFilters}>
          Сбросить фильтры
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
