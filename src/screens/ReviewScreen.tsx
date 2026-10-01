// Review before saving: validated fields, photo, timestamp and group code. Member 4 owns this file.
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NewStackParamList, RootTabParamList } from '../navigation/types';
import { useInspections } from '../context/InspectionContext';
import { cleanPhone, isValid, validateDraft } from '../utils/validation';
import { GROUP_CODE } from '../config';
import { colors } from '../theme';
import { Header } from '../components/Header';
import { InspectionSummary } from '../components/InspectionSummary';
import { Button } from '../components/Button';
import { EmptyState } from '../components/EmptyState';

type Props = NativeStackScreenProps<NewStackParamList, 'Review'>;

export function ReviewScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { draft, addRecord, resetDraft } = useInspections();
  const tabs = useNavigation<NavigationProp<RootTabParamList>>();
  // The time is captured once when this screen opens, so the review and the saved record match.
  const [now] = useState(() => new Date());

  const { category, risk, imageUri } = draft;
  const ready = isValid(validateDraft(draft)) && category !== null && risk !== null && imageUri !== null;

  function handleSave() {
    if (!ready || category === null || risk === null || imageUri === null) {
      return;
    }
    addRecord({
      id: String(now.getTime()),
      alias: draft.alias.trim(),
      stallCode: draft.stallCode.trim(),
      category,
      phone: cleanPhone(draft.phone),
      risk,
      imageUri,
      createdAt: now.toISOString(),
      groupCode: GROUP_CODE,
    });
    resetDraft();
    navigation.popToTop(); // so New Inspection starts fresh next time
    tabs.navigate('RecordsTab', { screen: 'RecordsList' });
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
      <Header title="Review" onBack={() => navigation.goBack()} />
      <View style={styles.body}>
        {ready && category !== null && risk !== null && imageUri !== null ? (
          <>
            <InspectionSummary
              alias={draft.alias.trim()}
              stallCode={draft.stallCode.trim()}
              category={category}
              phone={cleanPhone(draft.phone)}
              risk={risk}
              imageUri={imageUri}
              timestamp={now.toLocaleString()}
            />
            <Button title="Save inspection" icon="check" onPress={handleSave} />
            <Button title="Edit" variant="secondary" onPress={() => navigation.goBack()} />
          </>
        ) : (
          <EmptyState icon="list" title="Nothing to review" actionTitle="Back to form" onAction={() => navigation.popToTop()} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.bg },
  body: { paddingHorizontal: 22, paddingTop: 16, gap: 12 },
});
