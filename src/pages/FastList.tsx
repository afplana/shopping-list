import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import Alert from '../components/Alert';
import List from '../List';
import AdComponent from '../components/AdComponent';
import ConsentBanner from '../components/ConsentBanner';

import { ShoppingItem, AlertStatus, AlertType, AlertTypes, ConsentPreference, CATEGORIES, Category } from '../types';
import { useI18n } from '../i18n';
import { getStoredConsent, setStoredConsent } from '../shared/consent';
import { addItem, clearCompletedItems, filterList, findItem, removeItemById, toggleCompleteById, updateItemDetails, validateName } from '../shared/listLogic';
import { readList, writeList } from '../shared/listStorage';
import { getBrowserStorage } from '../shared/storage';

const alertStatus: AlertStatus = { show: false, msg: '', type: null };
const editingId: string = '';

const FastList: FunctionComponent = () => {
    const { t } = useI18n();
    const storage = useMemo(() => getBrowserStorage(), []);
    const [name, setName] = useState('');
    const [category, setCategory] = useState<Category>('Grocery');
    const [list, setList] = useState(() => readList(storage, CATEGORIES));
    const [isEditing, setIsEditing] = useState(false);
    const [editID, setEditID] = useState(editingId);
    const [alert, setAlert] = useState(alertStatus);
    const [adsConsent, setAdsConsent] = useState<ConsentPreference>(getStoredConsent);
    const [filterCategory, setFilterCategory] = useState<Category | 'All'>('All');
    const [hideCompleted, setHideCompleted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validation = validateName(name, list, editID);
        if (!validation.ok) {
            showAlert(
                true,
                AlertTypes.DANGER,
                validation.reason === 'empty' ? t('fastlist.alert.enterValue') : t('fastlist.alert.duplicate')
            );
            return;
        }

        const trimmedName = validation.trimmed;
        if (isEditing) {
            setList(updateItemDetails(list, editID, trimmedName, category));
            setName('');
            setCategory('Grocery');
            setEditID('');
            setIsEditing(false);
            showAlert(true, AlertTypes.SUCCESS, t('fastlist.alert.updated'));
        } else {
            showAlert(true, AlertTypes.SUCCESS, t('fastlist.alert.added'));
            setList(addItem(list, trimmedName, category));
            setName('');
            setCategory('Grocery');
        }
    };

    const showAlert = (show = false, type: AlertType | null = null, msg = '') => setAlert({ show, type, msg });

    const clearList = () => {
        showAlert(true, AlertTypes.DANGER, t('fastlist.alert.empty'));
        setList([]);
    };

    const removeItem = (id: string) => {
        showAlert(true, AlertTypes.DANGER, t('fastlist.alert.removed'));
        setList(removeItemById(list, id));
    };

    const editItem = (id: string) => {
        const selectedItem: ShoppingItem | undefined = findItem(list, id);
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
        setList(toggleCompleteById(list, id));
    };

    const clearCompleted = () => {
        setList(clearCompletedItems(list));
        showAlert(true, AlertTypes.SUCCESS, t('fastlist.alert.clearedCompleted'));
    };

    useEffect(() => {
        writeList(storage, list);
    }, [list, storage]);

    const filteredList = useMemo(() => {
        return filterList(list, { term: name, category: filterCategory, hideCompleted });
    }, [filterCategory, hideCompleted, list, name]);

    const handleConsentChange = (value: ConsentPreference) => {
        setAdsConsent(value);
        setStoredConsent(value);
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
