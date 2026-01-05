import { Category, ShoppingItem } from '../types';
import { StorageAdapter } from './storage';

export const LIST_STORAGE_KEY = 'list';

const normalizeCategory = (category: unknown, categories: Category[]) =>
    typeof category === 'string' && categories.includes(category as Category) ? (category as Category) : 'Other';

const migrateItem = (item: Partial<ShoppingItem> | null | undefined, categories: Category[]): ShoppingItem | null => {
    if (!item || typeof item.title !== 'string' || typeof item.id !== 'string') return null;
    return {
        id: item.id,
        title: item.title,
        category: normalizeCategory(item.category, categories),
        completed: typeof item.completed === 'boolean' ? item.completed : false,
    };
};

export const readList = (storage: StorageAdapter | null, categories: Category[]): ShoppingItem[] => {
    if (!storage) return [];
    try {
        const raw = storage.getItem(LIST_STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed
            .map((item) => migrateItem(item, categories))
            .filter((item): item is ShoppingItem => Boolean(item));
    } catch (error) {
        console.warn('Unable to read localStorage, falling back to empty list.', error);
        return [];
    }
};

export const writeList = (storage: StorageAdapter | null, list: ShoppingItem[]) => {
    if (!storage) return;
    try {
        storage.setItem(LIST_STORAGE_KEY, JSON.stringify(list));
    } catch (error) {
        console.warn('Unable to write list to localStorage.', error);
    }
};
