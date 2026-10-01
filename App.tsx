// App entry point: fonts, providers, navigation, and the XDR light filter overlay.
import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import { JetBrainsMono_500Medium, JetBrainsMono_600SemiBold } from '@expo-google-fonts/jetbrains-mono';
import { InspectionProvider } from './src/context/InspectionContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { XdrFilter } from './src/components/XdrFilter';
import { colors, XDR_FILTER_ENABLED } from './src/theme';

const navTheme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: colors.bg } };

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    JetBrainsMono_500Medium,
    JetBrainsMono_600SemiBold,
  });

  // Wait for the fonts (if they fail to load, the app still starts with the system font).
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <InspectionProvider>
        <View style={{ flex: 1, backgroundColor: colors.bg }}>
          <NavigationContainer theme={navTheme}>
            <AppNavigator />
          </NavigationContainer>
          {XDR_FILTER_ENABLED ? <XdrFilter /> : null}
        </View>
      </InspectionProvider>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
