// The two button styles: solid teal (primary) and outlined (secondary). Member 1 owns this file.
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radii } from '../theme';
import { Hairline } from './Hairline';
import { Icon, IconName } from './Icon';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  icon?: IconName;
};

export function Button({ title, onPress, variant = 'primary', icon }: Props) {
  const primary = variant === 'primary';
  const content = (
    <View style={styles.row}>
      <Text style={[styles.text, { color: primary ? '#FFFFFF' : colors.ink }]}>{title}</Text>
      {icon ? <Icon name={icon} size={16} color={primary ? '#FFFFFF' : colors.ink} /> : null}
    </View>
  );
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {primary ? (
        <View style={styles.primary}>{content}</View>
      ) : (
        <Hairline radius={radii.md} fill={colors.surface}>
          {content}
        </Hairline>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: { borderRadius: radii.md, backgroundColor: colors.nav },
  row: { minHeight: 50, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 },
  text: { fontFamily: fonts.bold, fontSize: 14.5, letterSpacing: -0.2 },
});
