// Camera + gallery workflow: permission, capture or select, preview, replace, remove,
// and helpful messages for denied permission and cancelled picking. Member 4 owns this file.
import React, { useState } from 'react';
import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors, fonts, radii } from '../theme';
import { Button } from './Button';
import { Hairline } from './Hairline';
import { Icon, IconName } from './Icon';
import { fieldStyles } from './Field';

type Props = { uri: string | null; onChange: (uri: string | null) => void; error?: string };

function TileButton({ icon, label, onPress, danger = false }: { icon: IconName; label: string; onPress: () => void; danger?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.tileWrap, { opacity: pressed ? 0.85 : 1 }]}
    >
      <Hairline radius={radii.md} tone={danger ? 'error' : 'default'} fill={colors.surfaceSoft}>
        <View style={styles.tile}>
          <Icon name={icon} size={20} color={danger ? colors.danger : colors.ink2} />
          <Text style={[styles.tileText, danger && { color: colors.danger }]}>{label}</Text>
        </View>
      </Hairline>
    </Pressable>
  );
}

export function PhotoField({ uri, onChange, error }: Props) {
  // Message shown when permission is denied or picking is cancelled.
  const [message, setMessage] = useState<string | null>(null);
  // True when Android will no longer show the permission popup, so Settings is the only way.
  const [needsSettings, setNeedsSettings] = useState(false);

  async function takePhoto() {
    setMessage(null);
    setNeedsSettings(false);
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        if (permission.canAskAgain) {
          setMessage('Camera access was denied. Tap Camera to try again, or use Gallery.');
        } else {
          setNeedsSettings(true);
          setMessage('Camera access is off. Turn it on in Settings, or use Gallery.');
        }
        return;
      }
      const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
      if (result.canceled) {
        setMessage('No photo taken.');
        return;
      }
      onChange(result.assets[0].uri);
    } catch {
      setMessage('The camera could not open. Try again or use Gallery.');
    }
  }

  async function chooseFromGallery() {
    setMessage(null);
    setNeedsSettings(false);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.7 });
      if (result.canceled) {
        setMessage('No image selected.');
        return;
      }
      onChange(result.assets[0].uri);
    } catch {
      setMessage('The gallery could not open. Try again or use Camera.');
    }
  }

  function removePhoto() {
    onChange(null);
    setMessage(null);
    setNeedsSettings(false);
  }

  return (
    <View style={styles.wrap}>
      <Text style={fieldStyles.label}>
        Evidence photo <Text style={styles.star}>*</Text>
      </Text>

      {uri ? (
        <>
          <Hairline radius={radii.lg} fill={colors.tile}>
            <Image source={{ uri }} style={styles.preview} accessibilityLabel="Evidence photo preview" resizeMode="cover" />
          </Hairline>
          <View style={styles.row}>
            <TileButton icon="camera" label="Retake" onPress={takePhoto} />
            <TileButton icon="image" label="Replace" onPress={chooseFromGallery} />
            <TileButton icon="close" label="Remove" onPress={removePhoto} danger />
          </View>
        </>
      ) : (
        <View style={styles.row}>
          <TileButton icon="camera" label="Camera" onPress={takePhoto} />
          <TileButton icon="image" label="Gallery" onPress={chooseFromGallery} />
        </View>
      )}

      {message ? (
        <Hairline radius={radii.md} tone="error" fill="#FFF7F7">
          <View style={styles.message} accessibilityRole="alert">
            <Text style={styles.messageText}>{message}</Text>
            {needsSettings ? <Button title="Open Settings" variant="secondary" onPress={() => Linking.openSettings()} /> : null}
          </View>
        </Hairline>
      ) : null}

      {error ? (
        <Text style={fieldStyles.error} accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 10 },
  star: { color: '#D93B3B' },
  row: { flexDirection: 'row', gap: 8 },
  tileWrap: { flex: 1 },
  tile: { minHeight: 76, alignItems: 'center', justifyContent: 'center', gap: 6, paddingHorizontal: 6 },
  tileText: { fontFamily: fonts.semibold, fontSize: 12.5, color: colors.ink2, textAlign: 'center' },
  preview: { width: '100%', height: 200 },
  message: { padding: 12, gap: 10 },
  messageText: { fontFamily: fonts.semibold, fontSize: 13, color: colors.danger },
});
