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

export type AlertType = 'danger' | 'success';
export const AlertTypes: Record<'DANGER' | 'SUCCESS', AlertType> = {
    DANGER: 'danger',
    SUCCESS: 'success',
};

export type ConsentPreference = 'granted' | 'denied' | null;

export type AlertStatus = {
    show: boolean;
    msg: string;
    type: AlertType | null;
};
