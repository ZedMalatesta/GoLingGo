import React, { FC, useMemo } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Chip from '../components/Chip';
import {
  AVATARS,
  INTERESTS,
  LANGUAGE_CODES,
  LANGUAGE_FLAGS,
  PROFICIENCY_LEVELS,
} from '../constants/catalogs';
import { colors } from '../constants/colors';
import { APP_LOCALES } from '../i18n';
import { pluralForm } from '../i18n/plural';
import { mockEvents } from '../mocks/events';
import { ProficiencyLevel, UserLanguage } from '../models/Profile';
import useAppStore from '../store/appStore';

const nextLevel = (level: ProficiencyLevel): ProficiencyLevel =>
  PROFICIENCY_LEVELS[
    (PROFICIENCY_LEVELS.indexOf(level) + 1) % PROFICIENCY_LEVELS.length
  ];

const ProfilePage: FC = () => {
  const { t, i18n } = useTranslation();
  const profile = useAppStore((state) => state.profile);
  const myEvents = useAppStore((state) => state.myEvents);
  const locale = useAppStore((state) => state.locale);
  const setLocale = useAppStore((state) => state.setLocale);
  const updateProfile = useAppStore((state) => state.updateProfile);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const removeLanguage = useAppStore((state) => state.removeLanguage);

  const availableCodes = LANGUAGE_CODES.filter(
    (code) => !profile.languages.some((item) => item.code === code),
  );

  const communityCounts = useMemo(() => {
    const all = [...myEvents, ...mockEvents];
    return profile.languages.map((item) => ({
      ...item,
      count: all.filter((event) => event.language === item.code).length,
    }));
  }, [profile.languages, myEvents]);

  const eventForms = t('profile.eventForms', {
    returnObjects: true,
  }) as unknown as string[];

  const toggleRole = (item: UserLanguage) =>
    setLanguage({
      ...item,
      role: item.role === 'native' ? 'learning' : 'native',
    });

  const toggleInterest = (interest: string) =>
    updateProfile({
      interests: profile.interests.includes(interest)
        ? profile.interests.filter((item) => item !== interest)
        : [...profile.interests, interest],
    });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.avatarCurrent}>{profile.avatar}</Text>
          <View style={styles.headerText}>
            <Text style={styles.heading}>
              {profile.name.trim() || t('profile.title')}
            </Text>
            <Text style={styles.headerCity}>{profile.city}</Text>
          </View>
        </View>

        <Text style={styles.label}>{t('profile.appLanguage')}</Text>
        <View style={styles.chipRow}>
          {APP_LOCALES.map((item) => (
            <Chip
              key={item.code}
              label={item.label}
              active={locale === item.code}
              onPress={() => setLocale(item.code)}
            />
          ))}
        </View>

        <Text style={styles.label}>{t('profile.avatar')}</Text>
        <View style={styles.avatarRow}>
          {AVATARS.map((avatar) => (
            <Pressable
              key={avatar}
              onPress={() => updateProfile({ avatar })}
              style={[
                styles.avatarOption,
                profile.avatar === avatar && styles.avatarOptionActive,
              ]}
            >
              <Text style={styles.avatarEmoji}>{avatar}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>{t('profile.name')}</Text>
        <TextInput
          style={styles.input}
          value={profile.name}
          onChangeText={(name) => updateProfile({ name })}
          placeholder={t('profile.namePlaceholder')}
          placeholderTextColor={colors.textMuted}
        />

        <Text style={styles.label}>{t('profile.city')}</Text>
        <TextInput
          style={styles.input}
          value={profile.city}
          onChangeText={(city) => updateProfile({ city })}
          placeholder={t('profile.cityPlaceholder')}
          placeholderTextColor={colors.textMuted}
        />

        <Text style={styles.label}>{t('profile.bio')}</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          value={profile.bio}
          onChangeText={(bio) => updateProfile({ bio })}
          placeholder={t('profile.bioPlaceholder')}
          placeholderTextColor={colors.textMuted}
          multiline
        />

        <Text style={styles.sectionTitle}>{t('profile.interestsTitle')}</Text>
        <Text style={styles.hint}>{t('profile.interestsHint')}</Text>
        <View style={styles.chipRow}>
          {INTERESTS.map((interest) => (
            <Chip
              key={interest}
              label={t(`interests.${interest}`)}
              active={profile.interests.includes(interest)}
              onPress={() => toggleInterest(interest)}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>{t('profile.languagesTitle')}</Text>
        <Text style={styles.hint}>{t('profile.languagesHint')}</Text>
        {profile.languages.map((item) => (
          <View key={item.code} style={styles.languageRow}>
            <Text style={styles.languageName}>
              {LANGUAGE_FLAGS[item.code]} {t(`languages.${item.code}`)}
            </Text>
            <Pressable
              style={[
                styles.roleBadge,
                item.role === 'native' && styles.roleBadgeNative,
              ]}
              onPress={() => toggleRole(item)}
            >
              <Text
                style={[
                  styles.roleLabel,
                  item.role === 'native' && styles.roleLabelNative,
                ]}
              >
                {item.role === 'native'
                  ? t('profile.native')
                  : t('profile.learning')}
              </Text>
            </Pressable>
            {item.role === 'learning' && (
              <Pressable
                style={styles.levelBadge}
                onPress={() =>
                  setLanguage({ ...item, level: nextLevel(item.level) })
                }
              >
                <Text style={styles.levelLabel}>{item.level}</Text>
              </Pressable>
            )}
            <Pressable
              onPress={() => removeLanguage(item.code)}
              hitSlop={8}
              style={styles.removeButton}
            >
              <Ionicons name="close" size={18} color={colors.textMuted} />
            </Pressable>
          </View>
        ))}

        {availableCodes.length > 0 && (
          <View style={styles.addRow}>
            {availableCodes.map((code) => (
              <Chip
                key={code}
                label={`+ ${LANGUAGE_FLAGS[code]} ${t(`languages.${code}`)}`}
                active={false}
                onPress={() =>
                  setLanguage({ code, role: 'learning', level: 'B1' })
                }
              />
            ))}
          </View>
        )}

        <Text style={styles.sectionTitle}>
          {t('profile.communitiesTitle')}
        </Text>
        <Text style={styles.hint}>{t('profile.communitiesHint')}</Text>
        {communityCounts.map((item) => (
          <View key={item.code} style={styles.communityRow}>
            <Text style={styles.languageName}>
              {LANGUAGE_FLAGS[item.code]} {t(`languages.${item.code}`)}
            </Text>
            <Text style={styles.communityCount}>
              {item.count} {pluralForm(item.count, eventForms, i18n.language)}
            </Text>
          </View>
        ))}
      </ScrollView>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerText: {
    flex: 1,
  },
  headerCity: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  avatarCurrent: {
    fontSize: 40,
  },
  avatarRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  avatarOption: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarOptionActive: {
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  avatarEmoji: {
    fontSize: 22,
  },
  inputMultiline: {
    minHeight: 72,
    textAlignVertical: 'top',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 24,
  },
  hint: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: 10,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 8,
  },
  languageName: {
    fontSize: 15,
    color: colors.text,
    flex: 1,
  },
  roleBadge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: colors.surface,
  },
  roleBadgeNative: {
    backgroundColor: colors.success,
  },
  roleLabel: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
  },
  roleLabelNative: {
    color: colors.background,
  },
  levelBadge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: colors.primary,
  },
  levelLabel: {
    fontSize: 12,
    color: colors.background,
    fontWeight: '600',
  },
  removeButton: {
    marginLeft: 4,
  },
  addRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  communityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  communityCount: {
    fontSize: 14,
    color: colors.textMuted,
  },
});

export default ProfilePage;
