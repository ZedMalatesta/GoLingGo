import React, { FC, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LocaleSwitcher from '../components/LocaleSwitcher';
import PastEventCard from '../components/PastEventCard';
import { colors, handFont } from '../constants/colors';
import { mockPastAnalytics, mockPastEvents } from '../mocks/pastEvents';

const PastEventsPage: FC = () => {
  const { t } = useTranslation();

  const events = useMemo(
    () =>
      [...mockPastEvents].sort(
        (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime(),
      ),
    [],
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={events}
        keyExtractor={(event) => event.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.titleRow}>
            <Text style={styles.title}>🕗 {t('past.title')}</Text>
            <LocaleSwitcher />
          </View>
        }
        renderItem={({ item }) => (
          <PastEventCard event={item} analytics={mockPastAnalytics[item.id]} />
        )}
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginHorizontal: 16,
  },
  title: {
    fontFamily: handFont,
    fontSize: 29,
    color: colors.primaryDark,
  },
});

export default PastEventsPage;
