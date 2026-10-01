// A labelled group of Chips where exactly one can be picked (Category, Risk level). Member 3 owns this file.
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Chip } from './Chip';
import { fieldStyles } from './Field';

type Props<T extends string> = {
  label: string;
  options: readonly T[];
  value: T | null;
  onChange: (value: T) => void;
  error?: string;
  dotFor?: (option: T) => string;
};

export function ChoiceField<T extends string>({ label, options, value, onChange, error, dotFor }: Props<T>) {
  return (
    <View style={styles.wrap}>
      <Text style={fieldStyles.label}>
        {label} <Text style={styles.star}>*</Text>
      </Text>
      <View style={styles.row}>
        {options.map((option) => (
          <Chip key={option} label={option} selected={option === value} onPress={() => onChange(option)} dot={dotFor?.(option)} />
        ))}
      </View>
      {error ? (
        <Text style={fieldStyles.error} accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 8 },
  star: { color: '#D93B3B' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
});
