// ONE reusable card for every zone in the catalog. Member 2 owns this file.
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Zone } from '../types';
import { CATEGORY_ICONS } from '../data/zones';
import { colors, fonts, radii } from '../theme';
import { Hairline } from './Hairline';
import { Icon } from './Icon';
import { StatusChip } from './StatusChip';
import { LevelChip } from './LevelChip';

type Props = { zone: Zone; onPress: () => void };

export function ZoneCard({ zone, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${zone.name}, ${zone.code}, ${zone.category}, status ${zone.status}, ${zone.priority} priority`}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      <Hairline radius={radii.lg} fill={colors.surface}>
        <View style={styles.row}>
          {/* Image placeholder tile */}
          <View style={styles.tile}>
            <Icon name={CATEGORY_ICONS[zone.category]} size={24} color={colors.ink2} />
          </View>
          <View style={styles.body}>
            <Text style={styles.name}>{zone.name}</Text>
            <Text style={styles.meta}>
              <Text style={styles.code}>{zone.code}</Text>
              {'  ·  '}
              {zone.category}
            </Text>
            <View style={styles.chips}>
              <StatusChip status={zone.status} />
              <LevelChip level={zone.priority} kind="priority" />
            </View>
          </View>
        </View>
      </Hairline>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12, padding: 12, alignItems: 'flex-start' },
  tile: {
    width: 52,
    height: 52,
    borderRadius: 15.5,
    backgroundColor: colors.tile,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1, gap: 4 },
  name: { fontFamily: fonts.semibold, fontSize: 15, letterSpacing: -0.2, color: colors.ink },
  meta: { fontFamily: fonts.medium, fontSize: 12, color: colors.ink3 },
  code: { fontFamily: fonts.monoBold, fontSize: 11, color: colors.ink2 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4 },
});
