// Screen header: group code tag, optional Back button, big title. Member 1 owns this file.
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GROUP_CODE } from '../config';
import { colors, fonts, radii } from '../theme';
import { Hairline } from './Hairline';
import { Icon } from './Icon';

function GroupTag() {
  return (
    <Hairline radius={radii.xs} fill={colors.surfaceSoft} innerStyle={styles.tag}>
      <Text style={styles.tagText} accessibilityLabel={`Group verification code ${GROUP_CODE}`}>
        {GROUP_CODE}
      </Text>
    </Hairline>
  );
}

function BackButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel="Back" hitSlop={6}>
      <Hairline radius={22} fill={colors.surfaceSoft} innerStyle={styles.back}>
        <Icon name="back" size={20} color={colors.ink} />
      </Hairline>
    </Pressable>
  );
}

type Props = { title: string; onBack?: () => void };

export function Header({ title, onBack }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.wrap, { paddingTop: insets.top + 14 }]}>
      <View style={styles.top}>
        {onBack ? <BackButton onPress={onBack} /> : <GroupTag />}
        {onBack ? <GroupTag /> : null}
      </View>
      <Text style={styles.title} accessibilityRole="header" maxFontSizeMultiplier={1.3}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 22, paddingBottom: 6 },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  tag: { paddingHorizontal: 9, paddingVertical: 5 },
  tagText: { fontFamily: fonts.monoBold, fontSize: 10, letterSpacing: 0.8, color: colors.ink3 },
  back: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  title: { fontFamily: fonts.extrabold, fontSize: 36, lineHeight: 40, letterSpacing: -1.4, color: colors.ink },
});
