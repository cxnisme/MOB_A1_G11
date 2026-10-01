// Outlined pill with a colored dot: "High priority" or "Medium risk". Member 2 owns this file.
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Level } from '../types';
import { colors, fonts, levelColors } from '../theme';
import { Hairline } from './Hairline';

type Props = { level: Level; kind: 'priority' | 'risk' };

export function LevelChip({ level, kind }: Props) {
  return (
    <Hairline radius={999} fill={colors.surface}>
      <View style={styles.row} accessible accessibilityLabel={`${level} ${kind}`}>
        <View style={[styles.dot, { backgroundColor: levelColors[level] }]} />
        <Text style={styles.text}>
          {level} {kind}
        </Text>
      </View>
    </Hairline>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 9, paddingVertical: 4 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  text: { fontFamily: fonts.semibold, fontSize: 12, color: colors.ink2 },
});
