// Message + button shown when a list is empty. Member 2 owns this file.
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radii } from '../theme';
import { Button } from './Button';
import { Hairline } from './Hairline';
import { Icon, IconName } from './Icon';

type Props = { icon: IconName; title: string; actionTitle?: string; onAction?: () => void };

export function EmptyState({ icon, title, actionTitle, onAction }: Props) {
  return (
    <Hairline radius={radii.lg} fill={colors.surfaceSoft}>
      <View style={styles.box}>
        <View style={styles.iconTile}>
          <Icon name={icon} size={22} color={colors.ink3} />
        </View>
        <Text style={styles.title}>{title}</Text>
        {actionTitle && onAction ? (
          <View style={styles.action}>
            <Button title={actionTitle} onPress={onAction} />
          </View>
        ) : null}
      </View>
    </Hairline>
  );
}

const styles = StyleSheet.create({
  box: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 24, gap: 12 },
  iconTile: { width: 46, height: 46, borderRadius: 15.5, backgroundColor: colors.tile, alignItems: 'center', justifyContent: 'center' },
  title: { fontFamily: fonts.bold, fontSize: 15, color: colors.ink, textAlign: 'center' },
  action: { alignSelf: 'stretch', marginTop: 4 },
});
