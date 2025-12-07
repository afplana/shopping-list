import { FunctionComponent } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { ShoppingItem } from './types';

interface Props {
    items: ShoppingItem[];
    removeItem: (id: string) => void;
    editItem: (id: string) => void;
    toggleComplete: (id: string) => void;
}

const List: FunctionComponent<Props> = ({ items, removeItem, editItem, toggleComplete }) => {
    return <div className="grocery-list">
        {items.map((item) => {
            const { id, title, category, completed } = item;
            return (
                <article key={id} className="grocery-item">
                    <label className="checkbox">
                        <input type="checkbox" checked={completed} onChange={() => toggleComplete(id)} aria-label={`Mark ${title} as ${completed ? 'not done' : 'done'}`} />
                    </label>
                    <div className="item-content">
                        <p className={`title ${completed ? 'title-completed' : ''}`}>{title}</p>
                        <span className="pill">{category}</span>
                    </div>
                    <div className="btn-container">
                        <button className="edit-btn" onClick={() => editItem(id)}><FaEdit /></button>
                        <button className="delete-btn" onClick={() => removeItem(id)}><FaTrash /></button>
                    </div>
                </article>
            );
        })}
    </div>
}

export default List
