import React, { FC } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { LANGUAGE_FLAGS, levelLabel } from '../constants/catalogs';
import { cardShadow, colors, handFont } from '../constants/colors';
import { AppLocale, LOCALE_TAGS } from '../i18n';
import { emptyStats, mockAttendeeStats } from '../mocks/attendeeStats';
import { LanguageEvent } from '../models/Event';
import { AttendeeLevelCategory } from '../models/Profile';
import useAppStore from '../store/appStore';
import EventReviews from './EventReviews';
import LevelStatsChart from './LevelStatsChart';

interface EventCardProps {
  event: LanguageEvent;
  isRsvped: boolean;
  onToggleRsvp: (event: LanguageEvent) => void;
}

export const formatEventDate = (dateISO: string, locale: string): string =>
  new Date(dateISO).toLocaleString(
    LOCALE_TAGS[locale as AppLocale] ?? locale,
    {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    },
  );

const EventCard: FC<EventCardProps> = ({ event, isRsvped, onToggleRsvp }) => {
  const { t, i18n } = useTranslation();
  const profile = useAppStore((state) => state.profile);
  const isFull = !isRsvped && event.attendees >= event.capacity;
  const imageUrl =
    event.imageUrl ?? `https://picsum.photos/seed/${event.id}/600/320`;

  const stats = mockAttendeeStats[event.id] ?? emptyStats;
  const userLanguage = profile.languages.find(
    (item) => item.code === event.language,
  );
  const userCategory: AttendeeLevelCategory | null =
    isRsvped && userLanguage
      ? userLanguage.role === 'native'
        ? 'native'
        : userLanguage.level
      : null;

  const going = event.attendees + (isRsvped ? 1 : 0);
  const fillPercent = Math.min(100, (going / event.capacity) * 100);

  return (
    <View style={styles.card}>
      <View style={styles.coverWrap}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.cover}
          resizeMode="cover"
        />
        <View style={[styles.coverBadge, styles.coverBadgeLeft]}>
          <Text style={styles.coverFlag}>{LANGUAGE_FLAGS[event.language]}</Text>
        </View>
        <View style={[styles.coverBadge, styles.coverBadgeRight]}>
          <Text
            style={[styles.coverPrice, event.isFree && styles.coverPriceFree]}
          >
            {event.isFree ? t('card.free') : (event.price ?? t('card.paid'))}
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.organizer}>{event.organizer}</Text>

        <View style={styles.badges}>
          <Text style={styles.badge}>{t(`languages.${event.language}`)}</Text>
          <Text style={styles.badge}>{levelLabel(event.level, t)}</Text>
          <Text style={styles.badge}>{t(`formats.${event.format}`)}</Text>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {event.description}
        </Text>

        <View style={styles.metaRow}>
          <Ionicons name="calendar" size={14} color={colors.primary} />
          <Text style={styles.meta}>
            {formatEventDate(event.dateISO, i18n.language)}
          </Text>
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="location" size={14} color={colors.primary} />
          <Text style={styles.meta}>
            {event.city} · {event.venue}
          </Text>
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="people" size={14} color={colors.primary} />
          <Text style={styles.meta}>
            {t('card.attendees', { going, total: event.capacity })}
          </Text>
        </View>
        <View style={styles.capacityTrack}>
          <View style={[styles.capacityFill, { width: `${fillPercent}%` }]} />
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>✏️ {t('stats.title')}</Text>
          <LevelStatsChart stats={stats} userCategory={userCategory} />
        </View>

        <EventReviews eventId={event.id} />

        <Pressable
          onPress={() => onToggleRsvp(event)}
          disabled={isFull}
          style={[
            styles.rsvpButton,
            isRsvped && styles.rsvpButtonActive,
            isFull && styles.rsvpButtonDisabled,
          ]}
        >
          <Text style={[styles.rsvpLabel, isRsvped && styles.rsvpLabelActive]}>
            {isFull
              ? t('card.full')
              : isRsvped
                ? t('card.rsvped')
                : t('card.rsvp')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
    marginHorizontal: 16,
    marginTop: 14,
    ...cardShadow,
  },
  coverWrap: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    overflow: 'hidden',
  },
  cover: {
    height: 150,
    backgroundColor: colors.surface,
  },
  coverBadge: {
    position: 'absolute',
    top: 10,
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  coverBadgeLeft: {
    left: 10,
    transform: [{ rotate: '-2deg' }],
  },
  coverBadgeRight: {
    right: 10,
    transform: [{ rotate: '2deg' }],
  },
  coverFlag: {
    fontSize: 16,
  },
  coverPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
  coverPriceFree: {
    color: colors.success,
  },
  body: {
    padding: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.2,
  },
  organizer: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 6,
  },
  badge: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primaryDark,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    overflow: 'hidden',
  },
  description: {
    fontSize: 13,
    color: colors.text,
    marginTop: 10,
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
    gap: 7,
  },
  meta: {
    fontSize: 12,
    color: colors.textMuted,
    flexShrink: 1,
  },
  capacityTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surface,
    marginTop: 8,
    overflow: 'hidden',
  },
  capacityFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  statsSection: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statsTitle: {
    fontFamily: handFont,
    fontSize: 21,
    color: colors.primaryDark,
  },
  rsvpButton: {
    marginTop: 14,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  rsvpButtonActive: {
    backgroundColor: colors.background,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  rsvpButtonDisabled: {
    backgroundColor: colors.border,
  },
  rsvpLabel: {
    color: colors.background,
    fontWeight: '700',
    fontSize: 14,
  },
  rsvpLabelActive: {
    color: colors.primaryDark,
  },
});

export default EventCard;
