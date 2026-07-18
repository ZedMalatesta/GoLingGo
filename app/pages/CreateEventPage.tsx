import React, { FC, useState } from 'react';

import { useTranslation } from 'react-i18next';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  Pressable,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Chip from '../components/Chip';
import {
  FORMAT_CODES,
  LANGUAGE_CODES,
  LANGUAGE_FLAGS,
  levelLabel,
  LEVELS,
} from '../constants/catalogs';
import { colors } from '../constants/colors';
import { EventFormat, LanguageCode, Level } from '../models/Event';
import useAppStore from '../store/appStore';

const parseDate = (value: string): Date | null => {
  const match = value
    .trim()
    .match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})$/);
  if (!match) {
    return null;
  }
  const [, year, month, day, hours, minutes] = match.map(Number);
  const date = new Date(year, month - 1, day, hours, minutes);
  return Number.isNaN(date.getTime()) ? null : date;
};

const CreateEventPage: FC = () => {
  const { t } = useTranslation();
  const addEvent = useAppStore((state) => state.addEvent);
  const profile = useAppStore((state) => state.profile);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [level, setLevel] = useState<Level>('any');
  const [format, setFormat] = useState<EventFormat>('speaking-club');
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState('');
  const [venue, setVenue] = useState('');
  const [dateText, setDateText] = useState('');
  const [capacity, setCapacity] = useState('15');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert(t('create.missingDataTitle'), t('create.missingTitle'));
      return;
    }
    const date = parseDate(dateText);
    if (!date) {
      Alert.alert(t('create.badDateTitle'), t('create.badDateFormat'));
      return;
    }
    if (date.getTime() <= Date.now()) {
      Alert.alert(t('create.badDateTitle'), t('create.dateInPast'));
      return;
    }
    if (!venue.trim()) {
      Alert.alert(t('create.missingDataTitle'), t('create.missingVenue'));
      return;
    }

    addEvent({
      id: `my-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      language,
      level,
      format,
      isFree,
      price: isFree ? undefined : price.trim() || undefined,
      city: format === 'online' ? t('formats.online') : profile.city,
      venue: venue.trim(),
      dateISO: date.toISOString(),
      organizer: profile.name.trim() || t('create.organizerFallback'),
      capacity: Math.max(1, parseInt(capacity, 10) || 15),
      attendees: 0,
      imageUrl: imageUrl.trim() || undefined,
    });

    setTitle('');
    setDescription('');
    setVenue('');
    setDateText('');
    setPrice('');
    setImageUrl('');
    Alert.alert(t('create.successTitle'), t('create.successMessage'));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.heading}>{t('create.heading')}</Text>
          <Text style={styles.subheading}>{t('create.subheading')}</Text>

          <Text style={styles.label}>{t('create.title')}</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder={t('create.titlePlaceholder')}
            placeholderTextColor={colors.textMuted}
          />

          <Text style={styles.label}>{t('create.description')}</Text>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            value={description}
            onChangeText={setDescription}
            placeholder={t('create.descriptionPlaceholder')}
            placeholderTextColor={colors.textMuted}
            multiline
          />

          <Text style={styles.label}>{t('create.language')}</Text>
          <View style={styles.chipRow}>
            {LANGUAGE_CODES.map((code) => (
              <Chip
                key={code}
                label={`${LANGUAGE_FLAGS[code]} ${t(`languages.${code}`)}`}
                active={language === code}
                onPress={() => setLanguage(code)}
              />
            ))}
          </View>

          <Text style={styles.label}>{t('create.level')}</Text>
          <View style={styles.chipRow}>
            {LEVELS.map((item) => (
              <Chip
                key={item}
                label={levelLabel(item, t)}
                active={level === item}
                onPress={() => setLevel(item)}
              />
            ))}
          </View>

          <Text style={styles.label}>{t('create.format')}</Text>
          <View style={styles.chipRow}>
            {FORMAT_CODES.map((item) => (
              <Chip
                key={item}
                label={t(`formats.${item}`)}
                active={format === item}
                onPress={() => setFormat(item)}
              />
            ))}
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.label}>{t('create.freeEvent')}</Text>
            <Switch
              value={isFree}
              onValueChange={setIsFree}
              trackColor={{ true: colors.primary }}
            />
          </View>
          {!isFree && (
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              placeholder={t('create.pricePlaceholder')}
              placeholderTextColor={colors.textMuted}
            />
          )}

          <Text style={styles.label}>{t('create.date')}</Text>
          <TextInput
            style={styles.input}
            value={dateText}
            onChangeText={setDateText}
            placeholder="2026-07-25 19:00"
            placeholderTextColor={colors.textMuted}
            autoCapitalize="none"
          />

          <Text style={styles.label}>{t('create.venue')}</Text>
          <TextInput
            style={styles.input}
            value={venue}
            onChangeText={setVenue}
            placeholder={t('create.venuePlaceholder')}
            placeholderTextColor={colors.textMuted}
          />

          <Text style={styles.label}>{t('create.cover')}</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={setImageUrl}
            placeholder={t('create.coverPlaceholder')}
            placeholderTextColor={colors.textMuted}
            autoCapitalize="none"
            keyboardType="url"
          />

          <Text style={styles.label}>{t('create.capacity')}</Text>
          <TextInput
            style={styles.input}
            value={capacity}
            onChangeText={setCapacity}
            keyboardType="number-pad"
            placeholder="15"
            placeholderTextColor={colors.textMuted}
          />

          <Pressable style={styles.submit} onPress={handleSubmit}>
            <Text style={styles.submitLabel}>{t('create.submit')}</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  subheading: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginTop: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  inputMultiline: {
    minHeight: 72,
    textAlignVertical: 'top',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  submit: {
    marginTop: 24,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitLabel: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CreateEventPage;
