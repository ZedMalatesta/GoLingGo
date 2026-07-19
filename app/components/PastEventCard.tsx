import React, { FC } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';

import { LANGUAGE_FLAGS } from '../constants/catalogs';
import { bodyFont, cardShadow, colors, handFont } from '../constants/colors';
import { EventAIAnalytics } from '../models/Analytics';
import { LanguageEvent } from '../models/Event';
import { formatEventDate } from './EventCard';

interface PastEventCardProps {
  event: LanguageEvent;
  analytics: EventAIAnalytics;
}

const PastEventCard: FC<PastEventCardProps> = ({ event, analytics }) => {
  const { t, i18n } = useTranslation();
  const imageUrl =
    event.imageUrl ?? `https://picsum.photos/seed/${event.id}/600/320`;
  const noShowPercent = Math.round(
    ((analytics.rsvps - analytics.attended) / analytics.rsvps) * 100,
  );

  return (
    <View style={styles.card}>
      <View style={styles.coverWrap}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.cover}
          resizeMode="cover"
        />
        <View style={styles.coverShade} />
        <Text style={styles.coverFlag}>{LANGUAGE_FLAGS[event.language]}</Text>
        <View style={styles.doneBadge}>
          <Ionicons name="checkmark-circle" size={12} color={colors.background} />
          <Text style={styles.doneBadgeLabel}>{t('past.badge')}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.meta}>
          {formatEventDate(event.dateISO, i18n.language)} · {event.organizer}
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Ionicons name="people" size={13} color={colors.primary} />
            <Text style={styles.statLabel}>
              {t('past.attended', {
                attended: analytics.attended,
                rsvps: analytics.rsvps,
              })}
            </Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Ionicons name="star" size={13} color={colors.star} />
            <Text style={styles.statLabel}>
              {analytics.averageRating.toFixed(1)}
            </Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="happy" size={13} color={colors.success} />
            <Text style={styles.statLabel}>
              {t('past.sentiment', { percent: analytics.sentiment })}
            </Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="walk" size={13} color={colors.accent} />
            <Text style={styles.statLabel}>
              {t('past.noShow', { percent: noShowPercent })}
            </Text>
          </View>
        </View>

        <View style={styles.aiBlock}>
          <Text style={styles.aiTitle}>✨ {t('past.aiTitle')}</Text>
          <Text style={styles.aiSummary}>{analytics.summary}</Text>
          {analytics.insights.map((insight, index) => (
            <View key={index} style={styles.insightRow}>
              <Text style={styles.insightBullet}>→</Text>
              <Text style={styles.insightText}>{insight}</Text>
            </View>
          ))}
          <Text style={styles.aiDisclaimer}>{t('past.aiDisclaimer')}</Text>
        </View>
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
    height: 110,
    backgroundColor: colors.surface,
  },
  coverShade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,254,251,0.55)',
  },
  coverFlag: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 24,
  },
  doneBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.textMuted,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    transform: [{ rotate: '2deg' }],
  },
  doneBadgeLabel: {
    fontFamily: bodyFont.bold,
    fontSize: 11,
    color: colors.background,
  },
  body: {
    padding: 14,
  },
  title: {
    fontFamily: bodyFont.extrabold,
    fontSize: 15,
    color: colors.text,
    letterSpacing: -0.2,
  },
  meta: {
    fontFamily: bodyFont.regular,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 8,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statLabel: {
    fontFamily: bodyFont.semibold,
    fontSize: 12,
    color: colors.text,
  },
  aiBlock: {
    marginTop: 12,
    borderWidth: 1.5,
    borderColor: colors.accent,
    borderStyle: 'dashed',
    borderRadius: 14,
    padding: 12,
    backgroundColor: colors.background,
  },
  aiTitle: {
    fontFamily: handFont,
    fontSize: 21,
    color: colors.accent,
  },
  aiSummary: {
    fontFamily: bodyFont.regular,
    fontSize: 13,
    color: colors.text,
    lineHeight: 19,
    marginTop: 4,
  },
  insightRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 7,
  },
  insightBullet: {
    fontFamily: bodyFont.bold,
    fontSize: 13,
    color: colors.accent,
  },
  insightText: {
    fontFamily: bodyFont.regular,
    fontSize: 12,
    color: colors.text,
    lineHeight: 17,
    flex: 1,
  },
  aiDisclaimer: {
    fontFamily: bodyFont.regular,
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 9,
  },
});

export default PastEventCard;
