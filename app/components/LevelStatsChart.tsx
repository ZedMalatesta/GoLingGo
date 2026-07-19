import React, { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

import { bodyFont, colors, levelRamp } from '../constants/colors';
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

const SIZE = 116;
const STROKE = 20;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SLICE_GAP = 2;

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

  const slices = CATEGORIES.map((category, index) => ({
    category,
    color: levelRamp[index],
    count: stats[category] + (userCategory === category ? 1 : 0),
  })).filter((slice) => slice.count > 0);
  const total = slices.reduce((sum, slice) => sum + slice.count, 0);

  if (total === 0) {
    return <Text style={styles.empty}>{t('stats.empty')}</Text>;
  }

  // Stroke-dash donut: each slice is an arc of the same circle, with a
  // small gap between slices (none when a single slice fills the ring).
  const gap = slices.length > 1 ? SLICE_GAP : 0;
  let offset = 0;
  const arcs = slices.map((slice) => {
    const length = (slice.count / total) * CIRCUMFERENCE;
    const arc = { ...slice, length: Math.max(length - gap, 1), start: offset };
    offset += length;
    return arc;
  });

  return (
    <View style={styles.row}>
      <View style={styles.donutWrap}>
        <Svg width={SIZE} height={SIZE}>
          <G rotation={-90} originX={SIZE / 2} originY={SIZE / 2}>
            {arcs.map((arc) => (
              <Circle
                key={arc.category}
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke={arc.color}
                strokeWidth={STROKE}
                strokeDasharray={`${arc.length} ${CIRCUMFERENCE - arc.length}`}
                strokeDashoffset={-arc.start}
              />
            ))}
          </G>
        </Svg>
        <View style={styles.center} pointerEvents="none">
          <Text style={styles.total}>{total}</Text>
        </View>
      </View>

      <View style={styles.legend}>
        {arcs.map((arc) => {
          const isYou = userCategory === arc.category;
          return (
            <View key={arc.category} style={styles.legendRow}>
              <View style={[styles.swatch, { backgroundColor: arc.color }]} />
              <Text
                style={[styles.legendLabel, isYou && styles.legendLabelYou]}
                numberOfLines={1}
              >
                {arc.category === 'native'
                  ? `★ ${t('stats.native')}`
                  : arc.category}
                {isYou ? ` · ${t('stats.you')}` : ''}
              </Text>
              <Text style={[styles.legendCount, isYou && styles.legendLabelYou]}>
                {arc.count}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 16,
  },
  donutWrap: {
    width: SIZE,
    height: SIZE,
  },
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  total: {
    fontFamily: bodyFont.bold,
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  legend: {
    flex: 1,
    gap: 5,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  swatch: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
  legendLabel: {
    fontFamily: bodyFont.regular,
    fontSize: 12,
    color: colors.text,
    flex: 1,
  },
  legendLabelYou: {
    color: colors.primaryDark,
    fontWeight: '700',
  },
  legendCount: {
    fontFamily: bodyFont.regular,
    fontSize: 12,
    color: colors.textMuted,
  },
  empty: {
    fontFamily: bodyFont.regular,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 8,
  },
});

export default LevelStatsChart;
