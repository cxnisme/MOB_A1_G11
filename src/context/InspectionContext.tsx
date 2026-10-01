// Keeps the form draft and the saved records in memory for the whole session,
// so nothing is lost when the user switches tabs or presses Back.
// Member 3 owns this file.
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Draft, Inspection } from '../types';

export const EMPTY_DRAFT: Draft = {
  alias: '',
  stallCode: '',
  category: null,
  phone: '',
  risk: null,
  consent: false,
  imageUri: null,
};

type InspectionContextValue = {
  draft: Draft;
  updateDraft: (patch: Partial<Draft>) => void;
  resetDraft: () => void;
  records: Inspection[];
  addRecord: (record: Inspection) => void;
};

const InspectionContext = createContext<InspectionContextValue | null>(null);

export function InspectionProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [records, setRecords] = useState<Inspection[]>([]);

  const updateDraft = useCallback((patch: Partial<Draft>) => {
    setDraft((current) => ({ ...current, ...patch }));
  }, []);

  const resetDraft = useCallback(() => setDraft(EMPTY_DRAFT), []);

  const addRecord = useCallback((record: Inspection) => {
    setRecords((current) => [record, ...current]); // newest first
  }, []);

  const value = useMemo(
    () => ({ draft, updateDraft, resetDraft, records, addRecord }),
    [draft, updateDraft, resetDraft, records, addRecord]
  );

  return <InspectionContext.Provider value={value}>{children}</InspectionContext.Provider>;
}

export function useInspections(): InspectionContextValue {
  const value = useContext(InspectionContext);
  if (value === null) {
    throw new Error('useInspections must be used inside InspectionProvider');
  }
  return value;
}
