export type Category =
    | 'Grocery'
    | 'Personal Care'
    | 'Cleaning'
    | 'Electronics'
    | 'Household'
    | 'Other';

export const CATEGORIES: Category[] = ['Grocery', 'Personal Care', 'Cleaning', 'Electronics', 'Household', 'Other'];

export type ShoppingItem = {
    id: string;
    title: string;
    category: Category;
    completed: boolean;
};

export const AlertTypes = {
    DANGER: 'danger',
    SUCCESS: 'success',
} as const;

export type AlertType = typeof AlertTypes[keyof typeof AlertTypes];

export type ConsentPreference = 'granted' | 'denied' | null;

export type AlertStatus = {
    show: boolean;
    msg: string;
    type: AlertType | null;
};
