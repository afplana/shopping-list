import { FunctionComponent } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

import { ShoppingItem } from './types'

interface Props {
    items: ShoppingItem[]
    removeItem: (id: string) => void;
    editItem: (id: string) => void;
}

const List: FunctionComponent<Props> = ({ items, removeItem, editItem }) => {
    return <div className="grocery-list">
        {items.map((item) => {
            const { id, title } = item;
            return (
                <article key={id} className="grocery-item">
                    <p className="title">{title}</p>
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