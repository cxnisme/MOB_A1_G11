// Pick-one chip used for filters, categories and risk levels. Member 2 owns this file.
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radii } from '../theme';
import { Hairline } from './Hairline';

type Props = { label: string; selected: boolean; onPress: () => void; dot?: string };

export function Chip({ label, selected, onPress, dot }: Props) {
  const content = (
    <View style={styles.row}>
      {dot ? <View style={[styles.dot, { backgroundColor: dot }]} /> : null}
      <Text style={[styles.text, { color: selected ? '#FFFFFF' : colors.ink2 }]}>{label}</Text>
    </View>
  );
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {selected ? (
        <View style={styles.selectedOuter}>
          <View style={styles.selected}>{content}</View>
        </View>
      ) : (
        <Hairline radius={radii.sm} fill={colors.surfaceSoft}>
          {content}
        </Hairline>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  selectedOuter: { padding: 1 },
  selected: { borderRadius: radii.sm - 1, backgroundColor: colors.nav },
  row: { minHeight: 42, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  text: { fontFamily: fonts.semibold, fontSize: 13 },
});
