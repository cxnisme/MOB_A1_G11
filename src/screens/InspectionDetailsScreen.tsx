// Inspection Details: one saved record. The record id arrives as a typed route parameter.
// Member 3 owns this file.
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RecordsStackParamList } from '../navigation/types';
import { useInspections } from '../context/InspectionContext';
import { colors } from '../theme';
import { Header } from '../components/Header';
import { InspectionSummary } from '../components/InspectionSummary';
import { EmptyState } from '../components/EmptyState';

type Props = NativeStackScreenProps<RecordsStackParamList, 'InspectionDetails'>;

export function InspectionDetailsScreen({ route, navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { recordId } = route.params; // typed: TypeScript knows this is a string
  const { records } = useInspections();
  const record = records.find((r) => r.id === recordId);

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
      <Header title={'Inspection\nDetails'} onBack={() => navigation.goBack()} />
      <View style={styles.body}>
        {record ? (
          <InspectionSummary
            alias={record.alias}
            stallCode={record.stallCode}
            category={record.category}
            phone={record.phone}
            risk={record.risk}
            imageUri={record.imageUri}
            timestamp={new Date(record.createdAt).toLocaleString()}
          />
        ) : (
          <EmptyState icon="list" title="Record not found" />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.bg },
  body: { paddingHorizontal: 22, paddingTop: 16 },
});
