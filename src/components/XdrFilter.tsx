// The "BEW-AUI" XDR light filter from the prototype, drawn as a full-screen overlay.
// Warm and cool radial glows blended with color-dodge at 92% opacity. Member 1 owns this file.
// Turn it off with XDR_FILTER_ENABLED in src/theme.ts.
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

export function XdrFilter() {
  return (
    <View pointerEvents="none" style={styles.overlay} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Svg width="100%" height="100%">
        <Defs>
          <RadialGradient id="warm" cx="0.3" cy="0.3" rx="0.594" ry="0.594" gradientUnits="objectBoundingBox">
            <Stop offset="0" stopColor="rgb(255,228,190)" stopOpacity={0.18} />
            <Stop offset="1" stopColor="rgb(255,228,190)" stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id="cool" cx="0.7" cy="0.7" rx="0.594" ry="0.594" gradientUnits="objectBoundingBox">
            <Stop offset="0" stopColor="rgb(190,228,255)" stopOpacity={0.12} />
            <Stop offset="1" stopColor="rgb(190,228,255)" stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#warm)" />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#cool)" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.92, mixBlendMode: 'color-dodge' },
});
