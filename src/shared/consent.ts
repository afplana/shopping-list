import { ConsentPreference } from '../types';

const CONSENT_KEY = 'adsConsent';

export const getStoredConsent = (): ConsentPreference => {
    if (typeof window === 'undefined') return null;
    try {
        const value = window.localStorage.getItem(CONSENT_KEY);
        if (value === 'granted' || value === 'denied') {
            return value;
        }
        return null;
    } catch (error) {
        console.warn('Unable to read consent from localStorage, defaulting to null.', error);
        return null;
    }
};

export const setStoredConsent = (value: ConsentPreference) => {
    if (typeof window === 'undefined') return;
    try {
        if (value) {
            window.localStorage.setItem(CONSENT_KEY, value);
        } else {
            window.localStorage.removeItem(CONSENT_KEY);
        }
    } catch (error) {
        console.warn('Unable to persist consent preference.', error);
    }
};
