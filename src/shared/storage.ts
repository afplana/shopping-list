export type StorageAdapter = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export const getBrowserStorage = (): StorageAdapter | null => {
    if (typeof window === 'undefined') return null;
    try {
        return window.localStorage;
    } catch (error) {
        console.warn('Unable to access localStorage.', error);
        return null;
    }
};
