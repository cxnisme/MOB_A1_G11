// A rounded box with a 1px gradient outline (the "hairline" look). Member 1 owns this file.
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, hairlines, HairlineTone } from '../theme';

type Props = {
  radius: number;
  fill?: string;
  tone?: HairlineTone;
  style?: StyleProp<ViewStyle>;
  innerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

export function Hairline({ radius, fill = colors.surface, tone = 'default', style, innerStyle, children }: Props) {
  const line = hairlines[tone];
  return (
    <LinearGradient
      colors={line.colors}
      locations={line.locations}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[{ borderRadius: radius, padding: 1 }, style]}
    >
      <View style={[{ borderRadius: radius - 1, backgroundColor: fill, overflow: 'hidden' }, innerStyle]}>{children}</View>
    </LinearGradient>
  );
}
