// Records: saved inspections. Tapping one opens Inspection Details (a stack route with a parameter).
// Member 3 owns this file.
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RecordsStackParamList, RootTabParamList } from '../navigation/types';
import { useInspections } from '../context/InspectionContext';
import { CATEGORY_ICONS } from '../data/zones';
import { colors, fonts, radii } from '../theme';
import { Header } from '../components/Header';
import { Hairline } from '../components/Hairline';
import { Icon } from '../components/Icon';
import { LevelChip } from '../components/LevelChip';
import { EmptyState } from '../components/EmptyState';

type Props = NativeStackScreenProps<RecordsStackParamList, 'RecordsList'>;

export function RecordsScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { records } = useInspections();
  const tabs = useNavigation<NavigationProp<RootTabParamList>>();

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      data={records}
      keyExtractor={(record) => record.id}
      ListHeaderComponent={
        <View>
          <Header title="Records" />
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Saved</Text>
            <Text style={styles.sectionCount} accessibilityLabel={`${records.length} records`}>
              {String(records.length).padStart(2, '0')}
            </Text>
          </View>
        </View>
      }
      renderItem={({ item }) => (
        <Pressable
          style={styles.item}
          onPress={() => navigation.navigate('InspectionDetails', { recordId: item.id })}
          accessibilityRole="button"
          accessibilityLabel={`${item.alias}, ${item.stallCode}, ${item.category}, ${item.risk} risk`}
        >
          <Hairline radius={radii.lg}>
            <View style={styles.row}>
              <View style={styles.tile}>
                <Icon name={CATEGORY_ICONS[item.category]} size={24} color={colors.ink2} />
              </View>
              <View style={styles.body}>
                <Text style={styles.name}>{item.alias}</Text>
                <Text style={styles.meta}>
                  <Text style={styles.code}>{item.stallCode}</Text>
                  {'  ·  '}
                  {item.category}
                  {'  ·  '}
                  {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
                <View style={styles.chips}>
                  <LevelChip level={item.risk} kind="risk" />
                </View>
              </View>
            </View>
          </Hairline>
        </Pressable>
      )}
      ListEmptyComponent={
        <View style={styles.item}>
          <EmptyState
            icon="list"
            title="No records yet"
            actionTitle="New Inspection"
            onAction={() => tabs.navigate('NewTab', { screen: 'Form' })}
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: colors.bg },
  section: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', paddingHorizontal: 22, paddingTop: 20, paddingBottom: 12 },
  sectionLabel: { fontFamily: fonts.bold, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: colors.ink3 },
  sectionCount: { fontFamily: fonts.monoBold, fontSize: 11, color: colors.ink3 },
  item: { marginHorizontal: 22, marginBottom: 6 },
  row: { flexDirection: 'row', gap: 12, padding: 12, alignItems: 'flex-start' },
  tile: { width: 52, height: 52, borderRadius: 15.5, backgroundColor: colors.tile, alignItems: 'center', justifyContent: 'center' },
  body: { flex: 1, gap: 4 },
  name: { fontFamily: fonts.semibold, fontSize: 15, letterSpacing: -0.2, color: colors.ink },
  meta: { fontFamily: fonts.medium, fontSize: 12, color: colors.ink3 },
  code: { fontFamily: fonts.monoBold, fontSize: 11, color: colors.ink2 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4 },
});
