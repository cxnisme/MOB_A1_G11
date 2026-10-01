// Home: the market catalog. Search, category filters, reusable ZoneCards, empty state.
// Member 2 owns this file.
import React, { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootTabParamList } from '../navigation/types';
import { useInspections } from '../context/InspectionContext';
import { ZONES } from '../data/zones';
import { CATEGORIES, Category, Zone } from '../types';
import { colors, fonts } from '../theme';
import { Header } from '../components/Header';
import { SearchField } from '../components/SearchField';
import { Chip } from '../components/Chip';
import { ZoneCard } from '../components/ZoneCard';
import { EmptyState } from '../components/EmptyState';

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const tabs = useNavigation<NavigationProp<RootTabParamList>>();
  const { updateDraft } = useInspections();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | 'All'>('All');

  const zones = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ZONES.filter((zone) => {
      const matchesCategory = category === 'All' || zone.category === category;
      const matchesQuery = q === '' || `${zone.name} ${zone.code} ${zone.category}`.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  // Tapping a zone starts an inspection for it: the stall code and category are filled in.
  function openZone(zone: Zone) {
    updateDraft({ stallCode: zone.code, category: zone.category });
    tabs.navigate('NewTab', { screen: 'Form' });
  }

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      data={zones}
      keyExtractor={(zone) => zone.id}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item }) => (
        <View style={styles.item}>
          <ZoneCard zone={item} onPress={() => openZone(item)} />
        </View>
      )}
      ListHeaderComponent={
        <View>
          <Header title={'Market\nZones'} />
          <View style={styles.search}>
            <SearchField value={query} onChangeText={setQuery} placeholder="Search name or code" />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.filters}>
            <Chip label="All" selected={category === 'All'} onPress={() => setCategory('All')} />
            {CATEGORIES.map((c) => (
              <Chip key={c} label={c} selected={category === c} onPress={() => setCategory(c)} />
            ))}
          </ScrollView>
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Zones</Text>
            <Text style={styles.sectionCount} accessibilityLabel={`${zones.length} zones`}>
              {String(zones.length).padStart(2, '0')}
            </Text>
          </View>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.item}>
          <EmptyState
            icon="search"
            title="No zones found"
            actionTitle="Clear filters"
            onAction={() => {
              setQuery('');
              setCategory('All');
            }}
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: colors.bg },
  search: { paddingHorizontal: 22, marginTop: 16 },
  filters: { paddingHorizontal: 22, paddingTop: 14, gap: 6 },
  section: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', paddingHorizontal: 22, paddingTop: 24, paddingBottom: 12 },
  sectionLabel: { fontFamily: fonts.bold, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: colors.ink3 },
  sectionCount: { fontFamily: fonts.monoBold, fontSize: 11, color: colors.ink3 },
  item: { marginHorizontal: 22, marginBottom: 6 },
});
