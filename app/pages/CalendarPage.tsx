import React, { FC, useMemo, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import EventCard from '../components/EventCard';
import PastEventCard from '../components/PastEventCard';
import { bodyFont, cardShadow, colors, handFont } from '../constants/colors';
import useToggleRsvp from '../hooks/useToggleRsvp';
import { AppLocale, LOCALE_TAGS } from '../i18n';
import { mockEvents } from '../mocks/events';
import { mockPastAnalytics, mockPastEvents } from '../mocks/pastEvents';
import useAppStore from '../store/appStore';

const dateKey = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(2, '0')}`;

interface DayCell {
  key: string;
  day: number;
}

const buildCells = (monthDate: Date): (DayCell | null)[] => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // Mon = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (DayCell | null)[] = Array(firstWeekday).fill(null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ key: dateKey(new Date(year, month, day)), day });
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }
  return cells;
};

const CalendarPage: FC = () => {
  const { t, i18n } = useTranslation();
  const localeTag = LOCALE_TAGS[i18n.language as AppLocale] ?? i18n.language;
  const myEvents = useAppStore((state) => state.myEvents);
  const rsvpIds = useAppStore((state) => state.rsvpIds);
  const handleToggleRsvp = useToggleRsvp();

  const today = new Date();
  const [monthDate, setMonthDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedKey, setSelectedKey] = useState(() => dateKey(today));

  const eventsByDay = useMemo(() => {
    const map: Record<string, number> = {};
    [...myEvents, ...mockEvents, ...mockPastEvents].forEach((event) => {
      const key = dateKey(new Date(event.dateISO));
      map[key] = (map[key] ?? 0) + 1;
    });
    return map;
  }, [myEvents]);

  const dayEvents = useMemo(
    () =>
      [...myEvents, ...mockEvents, ...mockPastEvents]
        .filter((event) => dateKey(new Date(event.dateISO)) === selectedKey)
        .sort(
          (a, b) =>
            new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime(),
        ),
    [myEvents, selectedKey],
  );

  const cells = useMemo(() => buildCells(monthDate), [monthDate]);

  // Jan 5, 2026 is a Monday — used to derive localized weekday initials.
  const weekdays = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) =>
        new Date(2026, 0, 5 + i)
          .toLocaleDateString(localeTag, { weekday: 'short' })
          .slice(0, 2),
      ),
    [localeTag],
  );

  const monthTitle = monthDate.toLocaleDateString(localeTag, {
    month: 'long',
    year: 'numeric',
  });

  const shiftMonth = (delta: number) =>
    setMonthDate(
      (current) =>
        new Date(current.getFullYear(), current.getMonth() + delta, 1),
    );

  const todayKey = dateKey(today);

  const calendar = (
    <View style={styles.calendarCard}>
      <View style={styles.monthRow}>
        <Pressable onPress={() => shiftMonth(-1)} hitSlop={10}>
          <Ionicons name="chevron-back" size={20} color={colors.primary} />
        </Pressable>
        <Text style={styles.monthTitle}>🗓️ {monthTitle}</Text>
        <Pressable onPress={() => shiftMonth(1)} hitSlop={10}>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </Pressable>
      </View>

      <View style={styles.grid}>
        {weekdays.map((label, index) => (
          <View key={`wd-${index}`} style={styles.cell}>
            <Text style={styles.weekday}>{label}</Text>
          </View>
        ))}
        {cells.map((cell, index) =>
          cell === null ? (
            <View key={`empty-${index}`} style={styles.cell} />
          ) : (
            <View key={cell.key} style={styles.cell}>
              <Pressable
                onPress={() => setSelectedKey(cell.key)}
                style={[
                  styles.dayCircle,
                  cell.key === todayKey && styles.dayToday,
                  cell.key === selectedKey && styles.daySelected,
                ]}
              >
                <Text
                  style={[
                    styles.dayLabel,
                    cell.key === selectedKey && styles.dayLabelSelected,
                  ]}
                >
                  {cell.day}
                </Text>
                <View
                  style={[
                    styles.dot,
                    !eventsByDay[cell.key] && styles.dotHidden,
                    cell.key === selectedKey && styles.dotSelected,
                  ]}
                />
              </Pressable>
            </View>
          ),
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={dayEvents}
        keyExtractor={(event) => event.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={calendar}
        renderItem={({ item }) =>
          mockPastAnalytics[item.id] ? (
            <PastEventCard
              event={item}
              analytics={mockPastAnalytics[item.id]}
            />
          ) : (
            <EventCard
              event={item}
              isRsvped={rsvpIds.includes(item.id)}
              onToggleRsvp={handleToggleRsvp}
            />
          )
        }
        ListEmptyComponent={
          <Text style={styles.empty}>{t('calendar.empty')}</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  list: {
    paddingBottom: 24,
  },
  calendarCard: {
    backgroundColor: colors.background,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
    marginHorizontal: 16,
    marginTop: 14,
    padding: 12,
    ...cardShadow,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  monthTitle: {
    fontFamily: handFont,
    fontSize: 24,
    color: colors.primaryDark,
    textTransform: 'capitalize',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  cell: {
    width: '14.28%',
    alignItems: 'center',
    marginVertical: 2,
  },
  weekday: {
    fontFamily: bodyFont.bold,
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayToday: {
    borderWidth: 1.5,
    borderColor: colors.accent,
    borderStyle: 'dashed',
  },
  daySelected: {
    backgroundColor: colors.primary,
  },
  dayLabel: {
    fontFamily: bodyFont.regular,
    fontSize: 13,
    color: colors.text,
  },
  dayLabelSelected: {
    color: colors.background,
    fontWeight: '700',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.accent,
    marginTop: 1,
  },
  dotHidden: {
    opacity: 0,
  },
  dotSelected: {
    backgroundColor: colors.background,
  },
  empty: {
    fontFamily: bodyFont.regular,
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 28,
    paddingHorizontal: 32,
  },
});

export default CalendarPage;
