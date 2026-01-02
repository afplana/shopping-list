import { FunctionComponent } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { ShoppingItem } from './types';
import { useI18n } from './i18n';

interface Props {
    items: ShoppingItem[];
    removeItem: (id: string) => void;
    editItem: (id: string) => void;
    toggleComplete: (id: string) => void;
}

const List: FunctionComponent<Props> = ({ items, removeItem, editItem, toggleComplete }) => {
    const { t } = useI18n();
    return <div className="grocery-list">
        {items.map((item) => {
            const { id, title, category, completed } = item;
            return (
                <article key={id} className="grocery-item">
                    <label className="checkbox">
                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={() => toggleComplete(id)}
                            aria-label={completed ? t('fastlist.markNotDone', { title }) : t('fastlist.markDone', { title })}
                        />
                    </label>
                    <div className="item-content">
                        <p className={`title ${completed ? 'title-completed' : ''}`}>{title}</p>
                        <span className="pill">{category}</span>
                    </div>
                    <div className="btn-container">
                        <button
                            type="button"
                            className="edit-btn"
                            aria-label={t('fastlist.editItem', { title })}
                            onClick={() => editItem(id)}
                        >
                            <FaEdit />
                        </button>
                        <button
                            type="button"
                            className="delete-btn"
                            aria-label={t('fastlist.deleteItem', { title })}
                            onClick={() => removeItem(id)}
                        >
                            <FaTrash />
                        </button>
                    </div>
                </article>
            );
        })}
    </div>
}

export default List
