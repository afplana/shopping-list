import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import Alert from '../components/Alert';
import List from '../List';
import AdComponent from '../components/AdComponent';
import ConsentBanner from '../components/ConsentBanner';

import { ShoppingItem, AlertStatus, AlertType, AlertTypes, ConsentPreference, CATEGORIES, Category } from '../types';
import { useI18n } from '../i18n';

const STORAGE_KEY = 'list';
const CONSENT_KEY = 'adsConsent';
const migrateItem = (item: ShoppingItem | any): ShoppingItem => ({
    id: item.id,
    title: item.title,
    category: item.category && CATEGORIES.includes(item.category) ? item.category : 'Other',
    completed: typeof item.completed === 'boolean' ? item.completed : false,
});

const getLocalStorage: (() => ShoppingItem[]) = () => {
    if (typeof window === 'undefined') return [];
    try {
        const list = window.localStorage.getItem(STORAGE_KEY);
        return list ? (JSON.parse(list) as ShoppingItem[]).map(migrateItem) : [];
    } catch (error) {
        console.warn('Unable to read localStorage, falling back to empty list.', error);
        return [];
    }
};

const getConsentPreference = (): ConsentPreference => {
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

const emptyShoppingItems: ShoppingItem[] = [];
const alertStatus: AlertStatus = { show: false, msg: '', type: null };
const editingId: string = '';

const FastList: FunctionComponent = () => {
    const { t } = useI18n();
    const [name, setName] = useState('');
    const [category, setCategory] = useState<Category>('Grocery');
    const [list, setList] = useState(getLocalStorage);
    const [isEditing, setIsEditing] = useState(false);
    const [editID, setEditID] = useState(editingId);
    const [alert, setAlert] = useState(alertStatus);
    const [adsConsent, setAdsConsent] = useState<ConsentPreference>(getConsentPreference);
    const [filterCategory, setFilterCategory] = useState<Category | 'All'>('All');
    const [hideCompleted, setHideCompleted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmedName = name.trim();
        if (!trimmedName) {
            showAlert(true, AlertTypes.DANGER, t('fastlist.alert.enterValue'));
            return;
        }

        const duplicate = list.some(
            (it) => it.title.toLowerCase() === trimmedName.toLowerCase() && it.id !== editID
        );
        if (duplicate) {
            showAlert(true, AlertTypes.DANGER, t('fastlist.alert.duplicate'));
            return;
        }

        if (isEditing) {
            setList(list.map((it) => {
                if (it.id === editID) {
                    return { ...it, title: trimmedName, category };
                }
                return it;
            }));
            setName('');
            setCategory('Grocery');
            setEditID('');
            setIsEditing(false);
            showAlert(true, AlertTypes.SUCCESS, t('fastlist.alert.updated'));
        } else {
            showAlert(true, AlertTypes.SUCCESS, t('fastlist.alert.added'));
            const newItem: ShoppingItem = { id: new Date().getTime().toString(), title: trimmedName, category, completed: false };
            setList([...list, newItem]);
            setName('');
            setCategory('Grocery');
        }
    };

    const showAlert = (show = false, type: AlertType | null = null, msg = '') => setAlert({ show, type, msg });

    const clearList = () => {
        showAlert(true, AlertTypes.DANGER, t('fastlist.alert.empty'));
        setList(emptyShoppingItems);
    };

    const removeItem = (id: string) => {
        showAlert(true, AlertTypes.DANGER, t('fastlist.alert.removed'));
        setList(list.filter((item) => item.id !== id));
    };

    const editItem = (id: string) => {
        const selectedItem: ShoppingItem | undefined = list.find((item) => item.id === id);
        if (!selectedItem) {
            showAlert(true, AlertTypes.DANGER, t('fastlist.alert.notFound'));
            return;
        }
        setIsEditing(true);
        setEditID(id);
        setName(selectedItem.title);
        setCategory(selectedItem.category);
    };

    const toggleComplete = (id: string) => {
        setList(list.map((item) => item.id === id ? { ...item, completed: !item.completed } : item));
    };

    const clearCompleted = () => {
        setList(list.filter((item) => !item.completed));
        showAlert(true, AlertTypes.SUCCESS, t('fastlist.alert.clearedCompleted'));
    };

    useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        } catch (error) {
            console.warn('Unable to write list to localStorage.', error);
        }
    }, [list]);

    const filteredList = useMemo(() => {
        const term = name.trim().toLowerCase();
        return list.filter((item) => {
            const categoryMatch = filterCategory === 'All' ? true : item.category === filterCategory;
            const completionMatch = hideCompleted ? !item.completed : true;
            const searchMatch = term ? item.title.toLowerCase().includes(term) : true;
            return categoryMatch && completionMatch && searchMatch;
        });
    }, [filterCategory, hideCompleted, list, name]);

    const handleConsentChange = (value: ConsentPreference) => {
        setAdsConsent(value);
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

    return (
        <section className="section-center">
            <form onSubmit={handleSubmit} className="grocery-form">
                {alert.show && <Alert {...alert} removeAlert={showAlert} itemList={list} />}
                <h3>{t('fastlist.title')}</h3>
                <div className="form-control">
                    <label htmlFor="item-input" className="sr-only">{t('fastlist.itemNameLabel')}</label>
                    <input
                        id="item-input"
                        type="text"
                        className="grocery"
                        placeholder={t('fastlist.placeholder')}
                        value={name}
                        autoFocus
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="category-select" className="sr-only">{t('fastlist.itemCategoryLabel')}</label>
                    <select
                        id="category-select"
                        aria-label={t('fastlist.itemCategoryLabel')}
                        className="category-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value as Category)}
                    >
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <button type="submit" className="submit-btn">
                        {isEditing ? t('fastlist.edit') : t('fastlist.submit')}
                    </button>
                </div>
            </form>

            <div className="controls-row">
                <div className="quick-add">
                    <span className="quick-add-label">{t('fastlist.quickAdd')}</span>
                    {['Milk', 'Bread', 'Shampoo', 'Soap', 'Batteries'].map((item) => (
                        <button
                            key={item}
                            type="button"
                            className="chip chip-ghost"
                            onClick={() => {
                                setName(item);
                                setCategory(item === 'Shampoo' || item === 'Soap' ? 'Personal Care' : item === 'Batteries' ? 'Electronics' : 'Grocery');
                            }}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            <div className="controls-row">
                <div className="chips">
                    {['All', ...CATEGORIES].map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            className={`chip ${filterCategory === cat ? 'chip-active' : ''}`}
                            onClick={() => setFilterCategory(cat as Category | 'All')}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <label className="toggle">
                    <input type="checkbox" checked={hideCompleted} onChange={(e) => setHideCompleted(e.target.checked)} />
                    <span>{t('fastlist.hideCompleted')}</span>
                </label>
            </div>

            {list.length > 0 && (
                <div className="grocery-container">
                    <List items={filteredList} removeItem={removeItem} editItem={editItem} toggleComplete={toggleComplete} />
                    <div className="actions-row">
                        <button className="clear-btn" onClick={clearList}>{t('fastlist.clearAll')}</button>
                        <button className="clear-btn" onClick={clearCompleted}>{t('fastlist.clearCompleted')}</button>
                    </div>
                </div>
            )}

            <AdComponent consent={adsConsent === 'granted'} />
            <ConsentBanner visible={adsConsent === null} onSetConsent={handleConsentChange} />
        </section>
    );
}

export default FastList;
