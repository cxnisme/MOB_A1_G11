// The floating bottom tab bar (Home, New Inspection, Records) with a sliding pill.
// Member 3 owns the tab wiring; Member 1 owns the look.
import React, { useEffect, useState } from 'react';
import { Animated, Easing, Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radii } from '../theme';
import { Hairline } from './Hairline';
import { Icon, IconName } from './Icon';

const TAB_ICONS: Record<string, IconName> = { HomeTab: 'home', NewTab: 'plus', RecordsTab: 'list' };

export function Dock({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [barWidth, setBarWidth] = useState(0);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [slide] = useState(() => new Animated.Value(0));

  const tabWidth = barWidth > 0 ? (barWidth - 10) / state.routes.length : 0;

  // Hide the dock while the keyboard is open, so it never covers the form.
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  // Slide the pill under the active tab.
  useEffect(() => {
    Animated.timing(slide, {
      toValue: state.index * tabWidth,
      duration: 420,
      easing: Easing.bezier(0.32, 0.72, 0, 1),
      useNativeDriver: true,
    }).start();
  }, [state.index, tabWidth, slide]);

  if (keyboardOpen) {
    return null;
  }

  return (
    <View style={[styles.outer, { bottom: insets.bottom + 12 }]} pointerEvents="box-none">
      <Hairline radius={radii.xl} tone="dock" fill="transparent" style={styles.shadow}>
        <View style={styles.bar} onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}>
          <BlurView intensity={28} tint="light" style={StyleSheet.absoluteFill} />
          <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.surfaceGlass }]} />
          {tabWidth > 0 ? <Animated.View style={[styles.pill, { width: tabWidth, transform: [{ translateX: slide }] }]} /> : null}
          {state.routes.map((route, index) => {
            const focused = state.index === index;
            const title = descriptors[route.key].options.title ?? route.name;
            const color = focused ? '#FFFFFF' : colors.ink3;
            return (
              <Pressable
                key={route.key}
                accessibilityRole="tab"
                accessibilityState={{ selected: focused }}
                accessibilityLabel={title}
                onPress={() => {
                  const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                  if (!focused && !event.defaultPrevented) {
                    navigation.navigate(route.name, route.params);
                  }
                }}
                style={styles.button}
              >
                <Icon name={TAB_ICONS[route.name] ?? 'home'} size={19} color={color} />
                <Text style={[styles.label, { color }]} numberOfLines={1} adjustsFontSizeToFit maxFontSizeMultiplier={1.15}>
                  {title}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </Hairline>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: { position: 'absolute', left: 16, right: 16 },
  shadow: { boxShadow: '0 20px 44px -18px rgba(22,22,26,0.30)' },
  bar: { height: 60, padding: 5, flexDirection: 'row', alignItems: 'center' },
  pill: {
    position: 'absolute',
    top: 5,
    bottom: 5,
    left: 5,
    borderRadius: 19.5,
    backgroundColor: colors.nav,
    boxShadow: '0 6px 18px -6px rgba(4,132,117,0.65)',
  },
  button: { flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center', gap: 3 },
  label: { fontFamily: fonts.bold, fontSize: 9, letterSpacing: 0.5, textTransform: 'uppercase' },
});
