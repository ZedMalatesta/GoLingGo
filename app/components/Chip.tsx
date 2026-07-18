import React, { FC } from 'react';

import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '../constants/colors';

interface ChipProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

const Chip: FC<ChipProps> = ({ label, active, onPress }) => (
  <Pressable
    onPress={onPress}
    style={[styles.chip, active && styles.chipActive]}
  >
    <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    fontSize: 13,
    color: colors.text,
  },
  labelActive: {
    color: colors.background,
    fontWeight: '600',
  },
});

export default Chip;
