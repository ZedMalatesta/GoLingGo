import React, { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { colors, levelRamp } from '../constants/colors';
import {
  AttendeeLevelCategory,
  AttendeeLevelStats,
} from '../models/Profile';

const CATEGORIES: AttendeeLevelCategory[] = [
  'A1',
  'A2',
  'B1',
  'B2',
  'C1',
  'C2',
  'native',
];

const MAX_BAR_HEIGHT = 72;

interface LevelStatsChartProps {
  stats: AttendeeLevelStats;
  /** The current user's own category when they RSVPed, to highlight it. */
  userCategory?: AttendeeLevelCategory | null;
}

const LevelStatsChart: FC<LevelStatsChartProps> = ({
  stats,
  userCategory,
}) => {
  const { t } = useTranslation();

  const counts = CATEGORIES.map((category) => ({
    category,
    count: stats[category] + (userCategory === category ? 1 : 0),
  }));
  const max = Math.max(...counts.map((item) => item.count));

  if (max === 0) {
    return <Text style={styles.empty}>{t('stats.empty')}</Text>;
  }

  return (
    <View>
      <View style={styles.chart}>
        {counts.map(({ category, count }, index) => {
          const isYou = userCategory === category;
          const barHeight =
            count === 0 ? 3 : Math.max(10, (count / max) * MAX_BAR_HEIGHT);
          return (
            <View key={category} style={styles.column}>
              <Text style={[styles.value, isYou && styles.valueYou]}>
                {count > 0 ? count : ''}
              </Text>
              <View
                style={[
                  styles.bar,
                  {
                    height: barHeight,
                    backgroundColor:
                      count === 0 ? colors.border : levelRamp[index],
                  },
                  isYou && styles.barYou,
                ]}
              />
              <Text style={[styles.axisLabel, isYou && styles.axisLabelYou]}>
                {category === 'native' ? '★' : category}
              </Text>
            </View>
          );
        })}
      </View>
      <Text style={styles.legend}>
        {t('stats.nativeLegend')}
        {userCategory ? ` · ${t('stats.youLegend')}` : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  value: {
    fontSize: 11,
    color: colors.textMuted,
    height: 14,
  },
  valueYou: {
    color: colors.primaryDark,
    fontWeight: '700',
  },
  bar: {
    alignSelf: 'stretch',
    marginHorizontal: 5,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  barYou: {
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: colors.primaryDark,
  },
  axisLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  axisLabelYou: {
    color: colors.primaryDark,
    fontWeight: '700',
  },
  legend: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 6,
  },
  empty: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 8,
  },
});

export default LevelStatsChart;
