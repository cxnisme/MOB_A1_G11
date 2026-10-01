// Consent checkbox. Member 3 owns this file.
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';
import { Hairline } from './Hairline';
import { Icon } from './Icon';
import { fieldStyles } from './Field';

type Props = { checked: boolean; onToggle: () => void; error?: string };

export function ConsentRow({ checked, onToggle, error }: Props) {
  return (
    <View style={styles.wrap}>
      <Pressable
        onPress={onToggle}
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
        accessibilityLabel="Vendor consent confirmed"
        style={styles.row}
      >
        {checked ? (
          <View style={styles.checked}>
            <Icon name="check" size={16} color="#FFFFFF" />
          </View>
        ) : (
          <Hairline radius={9} tone={error ? 'error' : 'default'} fill={colors.surfaceSoft}>
            <View style={styles.box} />
          </Hairline>
        )}
        <Text style={styles.text}>Vendor consent confirmed</Text>
      </Pressable>
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
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 48 },
  box: { width: 26, height: 26 },
  checked: { width: 28, height: 28, borderRadius: 9, backgroundColor: colors.nav, alignItems: 'center', justifyContent: 'center' },
  text: { flex: 1, fontFamily: fonts.semibold, fontSize: 14.5, color: colors.ink },
});
