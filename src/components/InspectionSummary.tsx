// One inspection's details, used by the Review screen AND the Details screen. Member 4 owns this file.
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { GROUP_CODE } from '../config';
import { colors, fonts, radii } from '../theme';
import { Hairline } from './Hairline';
import { LevelChip } from './LevelChip';
import { Risk } from '../types';

type Props = {
  alias: string;
  stallCode: string;
  category: string;
  phone: string;
  risk: Risk;
  imageUri: string;
  timestamp: string;
};

function Cell({ label, value, mono = false, wide = false }: { label: string; value: string; mono?: boolean; wide?: boolean }) {
  return (
    <View style={[styles.cell, wide && styles.wide]} accessible accessibilityLabel={`${label}: ${value}`}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, mono && styles.mono]}>{value}</Text>
    </View>
  );
}

export function InspectionSummary({ alias, stallCode, category, phone, risk, imageUri, timestamp }: Props) {
  return (
    <Hairline radius={radii.lg} fill={colors.surface}>
      <Image source={{ uri: imageUri }} style={styles.image} accessibilityLabel="Evidence photo" resizeMode="cover" />
      <View style={styles.grid}>
        <Cell label="Vendor alias" value={alias} />
        <Cell label="Stall code" value={stallCode} mono />
        <Cell label="Category" value={category} />
        <Cell label="Contact" value={phone} />
        <View style={styles.cell} accessible accessibilityLabel={`Risk level: ${risk}`}>
          <Text style={styles.label}>Risk level</Text>
          <View style={styles.chipRow}>
            <LevelChip level={risk} kind="risk" />
          </View>
        </View>
        <Cell label="Consent" value="Confirmed" />
        <Cell label="Date and time" value={timestamp} wide />
        <Cell label="Group code" value={GROUP_CODE} mono wide />
      </View>
    </Hairline>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', height: 210, backgroundColor: colors.tile },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 14, rowGap: 14 },
  cell: { width: '50%', paddingRight: 8, gap: 3 },
  wide: { width: '100%' },
  label: { fontFamily: fonts.bold, fontSize: 10.5, letterSpacing: 0.9, textTransform: 'uppercase', color: colors.ink3 },
  value: { fontFamily: fonts.semibold, fontSize: 15, color: colors.ink },
  mono: { fontFamily: fonts.mono, fontSize: 13.5 },
  chipRow: { flexDirection: 'row' },
});
