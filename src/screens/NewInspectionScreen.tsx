// New Inspection: the validated form. Member 3 owns the form; Member 4 owns the photo field inside it.
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NewStackParamList } from '../navigation/types';
import { useInspections } from '../context/InspectionContext';
import { Errors, FieldName, isValid, validateDraft } from '../utils/validation';
import { CATEGORIES, RISKS } from '../types';
import { colors, levelColors } from '../theme';
import { Header } from '../components/Header';
import { Field } from '../components/Field';
import { ChoiceField } from '../components/ChoiceField';
import { ConsentRow } from '../components/ConsentRow';
import { PhotoField } from '../components/PhotoField';
import { Button } from '../components/Button';

type Props = NativeStackScreenProps<NewStackParamList, 'Form'>;

export function NewInspectionScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { draft, updateDraft, resetDraft } = useInspections();
  // Error messages stay hidden until the user presses Review once.
  const [submitted, setSubmitted] = useState(false);

  // Recalculated on every change, so a message disappears as soon as its field is fixed.
  const errors: Errors = useMemo(() => validateDraft(draft), [draft]);
  const show = (field: FieldName) => (submitted ? errors[field] : undefined);

  function handleReview() {
    setSubmitted(true);
    if (!isValid(errors)) {
      return; // blocked until every rule passes
    }
    navigation.navigate('Review');
  }

  function handleClear() {
    resetDraft();
    setSubmitted(false);
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      keyboardShouldPersistTaps="handled"
    >
      <Header title={'New\nInspection'} />
      <View style={styles.form}>
        <Field
          label="Vendor alias"
          value={draft.alias}
          onChangeText={(text) => updateDraft({ alias: text })}
          placeholder="e.g. Mama Uwase"
          autoCorrect={false}
          error={show('alias')}
        />
        <Field
          label="Stall code"
          value={draft.stallCode}
          onChangeText={(text) => updateDraft({ stallCode: text })}
          placeholder="MSZ-000"
          autoCapitalize="characters"
          autoCorrect={false}
          mono
          error={show('stallCode')}
        />
        <ChoiceField
          label="Category"
          options={CATEGORIES}
          value={draft.category}
          onChange={(category) => updateDraft({ category })}
          error={show('category')}
        />
        <Field
          label="Contact number"
          value={draft.phone}
          onChangeText={(text) => updateDraft({ phone: text })}
          placeholder="+250 7XX XXX XXX"
          keyboardType="phone-pad"
          error={show('phone')}
        />
        <ChoiceField
          label="Risk level"
          options={RISKS}
          value={draft.risk}
          onChange={(risk) => updateDraft({ risk })}
          dotFor={(risk) => levelColors[risk]}
          error={show('risk')}
        />
        <PhotoField uri={draft.imageUri} onChange={(imageUri) => updateDraft({ imageUri })} error={show('image')} />
        <ConsentRow checked={draft.consent} onToggle={() => updateDraft({ consent: !draft.consent })} error={show('consent')} />
        <View style={styles.actions}>
          <Button title="Review" icon="arrow" onPress={handleReview} />
          <Button title="Clear" variant="secondary" onPress={handleClear} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.bg },
  form: { paddingHorizontal: 22, paddingTop: 20, gap: 20 },
  actions: { gap: 10 },
});
