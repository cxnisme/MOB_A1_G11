// Shared data shapes (TypeScript types). Member 3 owns this file.
export const CATEGORIES = ['Vegetables', 'Fruits', 'Grains', 'Dairy', 'Textiles', 'Meat'] as const;
export const RISKS = ['Low', 'Medium', 'High'] as const;

export type Category = (typeof CATEGORIES)[number];
export type Risk = (typeof RISKS)[number];
export type Level = 'Low' | 'Medium' | 'High';
export type Status = 'Draft' | 'In progress' | 'In review' | 'Completed';

export type Zone = {
  id: string;
  name: string;
  code: string;
  category: Category;
  status: Status;
  priority: Level;
};

// What the inspector is typing right now (not saved yet).
export type Draft = {
  alias: string;
  stallCode: string;
  category: Category | null;
  phone: string;
  risk: Risk | null;
  consent: boolean;
  imageUri: string | null;
};

// A saved inspection.
export type Inspection = {
  id: string;
  alias: string;
  stallCode: string;
  category: Category;
  phone: string;
  risk: Risk;
  imageUri: string;
  createdAt: string; // ISO date text
  groupCode: string;
};
