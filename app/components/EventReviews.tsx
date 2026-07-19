import React, { FC, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, handFont } from '../constants/colors';
import { AppLocale, LOCALE_TAGS } from '../i18n';
import { mockReviews } from '../mocks/reviews';
import { EventReview } from '../models/Review';

const PREVIEW_COUNT = 2;

const Stars: FC<{ rating: number }> = ({ rating }) => (
  <View style={styles.stars}>
    {[1, 2, 3, 4, 5].map((value) => (
      <Ionicons
        key={value}
        name={value <= rating ? 'star' : 'star-outline'}
        size={11}
        color={colors.star}
      />
    ))}
  </View>
);

const ReviewRow: FC<{ review: EventReview; locale: string }> = ({
  review,
  locale,
}) => {
  const { t } = useTranslation();
  const date = new Date(review.dateISO).toLocaleDateString(
    LOCALE_TAGS[locale as AppLocale] ?? locale,
    { day: 'numeric', month: 'short' },
  );

  return (
    <View style={styles.review}>
      <Image source={{ uri: review.avatarUrl }} style={styles.avatar} />
      <View style={styles.reviewBody}>
        <View style={styles.reviewHeader}>
          <Text style={styles.author}>{review.author}</Text>
          <Text style={styles.levelBadge}>
            {review.level === 'native'
              ? `★ ${t('stats.native')}`
              : review.level}
          </Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <Stars rating={review.rating} />
        <Text style={styles.text}>{review.text}</Text>
      </View>
    </View>
  );
};

const EventReviews: FC<{ eventId: string }> = ({ eventId }) => {
  const { t, i18n } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const reviews = mockReviews[eventId] ?? [];
  if (reviews.length === 0) {
    return null;
  }

  const average =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const visible = expanded ? reviews : reviews.slice(0, PREVIEW_COUNT);
  const hiddenCount = reviews.length - visible.length;

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>💬 {t('reviews.title')}</Text>
        <Ionicons name="star" size={13} color={colors.star} />
        <Text style={styles.average}>{average.toFixed(1)}</Text>
        <Text style={styles.count}>({reviews.length})</Text>
      </View>
      {visible.map((review) => (
        <ReviewRow key={review.id} review={review} locale={i18n.language} />
      ))}
      {hiddenCount > 0 && (
        <Pressable onPress={() => setExpanded(true)}>
          <Text style={styles.more}>
            {t('reviews.more', { count: hiddenCount })}
          </Text>
        </Pressable>
      )}
      {expanded && reviews.length > PREVIEW_COUNT && (
        <Pressable onPress={() => setExpanded(false)}>
          <Text style={styles.more}>{t('reviews.hide')}</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontFamily: handFont,
    fontSize: 21,
    color: colors.primaryDark,
    marginRight: 4,
  },
  average: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  count: {
    fontSize: 12,
    color: colors.textMuted,
  },
  review: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  reviewBody: {
    flex: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  author: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  levelBadge: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.primaryDark,
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    overflow: 'hidden',
  },
  date: {
    fontSize: 11,
    color: colors.textMuted,
    marginLeft: 'auto',
  },
  stars: {
    flexDirection: 'row',
    gap: 1,
    marginTop: 2,
  },
  text: {
    fontSize: 12,
    color: colors.text,
    lineHeight: 17,
    marginTop: 3,
  },
  more: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    marginTop: 8,
  },
});

export default EventReviews;
