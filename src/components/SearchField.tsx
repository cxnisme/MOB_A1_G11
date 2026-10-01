// Search box with a clear button. Member 2 owns this file.
import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { colors, fonts, radii } from '../theme';
import { Hairline } from './Hairline';
import { Icon } from './Icon';

type Props = { value: string; onChangeText: (text: string) => void; placeholder: string };

export function SearchField({ value, onChangeText, placeholder }: Props) {
  const [focused, setFocused] = useState(false);
  return (
    <Hairline radius={radii.md} tone={focused ? 'focus' : 'default'} fill={focused ? colors.surface : colors.surfaceSoft}>
      <View style={styles.row}>
        <Icon name="search" size={16} color={colors.ink3} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#A0A0A8"
          accessibilityLabel={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoCorrect={false}
          returnKeyType="search"
          style={styles.input}
        />
        {value !== '' ? (
          <Pressable onPress={() => onChangeText('')} accessibilityRole="button" accessibilityLabel="Clear search" hitSlop={10}>
            <Icon name="close" size={16} color={colors.ink3} />
          </Pressable>
        ) : null}
      </View>
    </Hairline>
  );
}

const styles = StyleSheet.create({
  row: { minHeight: 46, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
  input: { flex: 1, fontFamily: fonts.medium, fontSize: 14, color: colors.ink, paddingVertical: 8 },
});
