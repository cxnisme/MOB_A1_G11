// Fictional market zones and the icon used for each category. Member 2 owns this file.
import { Category, Zone } from '../types';
import { IconName } from '../components/Icon';

export const ZONES: Zone[] = [
  { id: 'z1', name: 'Kigombe Fresh Produce', code: 'MSZ-104', category: 'Vegetables', status: 'Completed', priority: 'Low' },
  { id: 'z2', name: 'Muhoza Grain Store', code: 'MSZ-118', category: 'Grains', status: 'In progress', priority: 'High' },
  { id: 'z3', name: 'Nyange Fruit Corner', code: 'MSZ-127', category: 'Fruits', status: 'Completed', priority: 'Low' },
  { id: 'z4', name: 'Rugarama Dairy Point', code: 'MSZ-133', category: 'Dairy', status: 'In review', priority: 'Medium' },
  { id: 'z5', name: 'Kivugiza Textile Bay', code: 'MSZ-142', category: 'Textiles', status: 'Draft', priority: 'Medium' },
  { id: 'z6', name: 'Busogo Butchery', code: 'MSZ-156', category: 'Meat', status: 'In progress', priority: 'High' },
];

export const CATEGORY_ICONS: Record<Category, IconName> = {
  Vegetables: 'cat-veg',
  Grains: 'cat-grain',
  Fruits: 'cat-fruit',
  Dairy: 'cat-dairy',
  Textiles: 'cat-textile',
  Meat: 'cat-meat',
};
