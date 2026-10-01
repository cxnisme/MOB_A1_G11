// Label + text box + error message with focus and error outlines. Member 3 owns this file.
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, fonts, radii } from '../theme';
import { Hairline } from './Hairline';

type Props = TextInputProps & { label: string; error?: string; mono?: boolean };

export function Field({ label, error, mono = false, onFocus, onBlur, ...inputProps }: Props) {
  const [focused, setFocused] = useState(false);
  const tone = error ? 'error' : focused ? 'focus' : 'default';
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>
        {label} <Text style={styles.star}>*</Text>
      </Text>
      <Hairline radius={radii.md} tone={tone} fill={focused ? colors.surface : colors.surfaceSoft}>
        <TextInput
          {...inputProps}
          accessibilityLabel={label}
          placeholderTextColor="#A0A0A8"
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          style={[styles.input, mono && styles.mono]}
        />
      </Hairline>
      {error ? (
        <Text style={styles.error} accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

export const fieldStyles = StyleSheet.create({
  label: { fontFamily: fonts.bold, fontSize: 10.5, letterSpacing: 0.9, textTransform: 'uppercase', color: colors.ink3 },
  error: { fontFamily: fonts.semibold, fontSize: 12.5, color: colors.danger },
});

const styles = StyleSheet.create({
  wrap: { gap: 8 },
  label: fieldStyles.label,
  star: { color: '#D93B3B' },
  input: { minHeight: 48, paddingHorizontal: 13, fontFamily: fonts.medium, fontSize: 14.5, color: colors.ink },
  mono: { fontFamily: fonts.mono, fontSize: 13.5, letterSpacing: 0.3 },
  error: fieldStyles.error,
});
