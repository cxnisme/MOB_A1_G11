// Status pill: black shape icon + label (Draft, In progress, In review, Completed). Member 2 owns this file.
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Status } from '../types';
import { colors, fonts } from '../theme';
import { Icon, IconName } from './Icon';

const STATUS_ICONS: Record<Status, IconName> = {
  Draft: 'status-draft',
  'In progress': 'status-progress',
  'In review': 'status-review',
  Completed: 'status-done',
};

export function StatusChip({ status }: { status: Status }) {
  return (
    <View style={styles.chip} accessible accessibilityLabel={`Status ${status}`}>
      <Icon name={STATUS_ICONS[status]} size={14} color="#000000" />
      <Text style={styles.text}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: colors.bg,
  },
  text: { fontFamily: fonts.semibold, fontSize: 12, color: colors.ink2 },
});
