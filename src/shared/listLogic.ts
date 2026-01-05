import { Category, ShoppingItem } from '../types';

export type ValidationResult =
    | { ok: true; trimmed: string }
    | { ok: false; reason: 'empty' | 'duplicate' };

export const trimName = (name: string) => name.trim();

export const isDuplicate = (list: ShoppingItem[], name: string, editingId = '') =>
    list.some((it) => it.title.toLowerCase() === name.toLowerCase() && it.id !== editingId);

export const validateName = (name: string, list: ShoppingItem[], editingId = ''): ValidationResult => {
    const trimmed = trimName(name);
    if (!trimmed) return { ok: false, reason: 'empty' };
    if (isDuplicate(list, trimmed, editingId)) return { ok: false, reason: 'duplicate' };
    return { ok: true, trimmed };
};

export const createItem = (title: string, category: Category, idFactory = () => new Date().getTime().toString()): ShoppingItem => ({
    id: idFactory(),
    title,
    category,
    completed: false,
});

export const addItem = (list: ShoppingItem[], title: string, category: Category) => [
    ...list,
    createItem(title, category),
];

export const updateItemDetails = (list: ShoppingItem[], id: string, title: string, category: Category) =>
    list.map((it) => (it.id === id ? { ...it, title, category } : it));

export const findItem = (list: ShoppingItem[], id: string) => list.find((item) => item.id === id);

export const removeItemById = (list: ShoppingItem[], id: string) => list.filter((item) => item.id !== id);

export const toggleCompleteById = (list: ShoppingItem[], id: string) =>
    list.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item));

export const clearCompletedItems = (list: ShoppingItem[]) => list.filter((item) => !item.completed);

export type ListFilter = {
    term: string;
    category: Category | 'All';
    hideCompleted: boolean;
};

export const filterList = (list: ShoppingItem[], { term, category, hideCompleted }: ListFilter) => {
    const normalizedTerm = term.trim().toLowerCase();
    return list.filter((item) => {
        const categoryMatch = category === 'All' ? true : item.category === category;
        const completionMatch = hideCompleted ? !item.completed : true;
        const searchMatch = normalizedTerm ? item.title.toLowerCase().includes(normalizedTerm) : true;
        return categoryMatch && completionMatch && searchMatch;
    });
};
