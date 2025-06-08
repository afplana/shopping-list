import { FunctionComponent, useEffect, useState } from 'react';
import Alert from './Alert'
import List from './List'
import AdComponent from './AdComponent'

import { ShoppingItem, AlertStatus, AlertType } from './types'

const getLocalStorage: (() => ShoppingItem[]) = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(list) as ShoppingItem[];
  } else {
    return [] as ShoppingItem[];
  }
}

const emptyShoppingItems: ShoppingItem[] = []
const alertStatus: AlertStatus = { show: false, msg: '', type: AlertType.NULL }
const editingId: string = '';

const App: FunctionComponent = () => {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(editingId);
  const [alert, setAlert] = useState(alertStatus);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, AlertType.DANGER, 'please enter value');
    } else if (name && isEditing) {
      setList(list.map((it) => {
        if (it.id === editID) {
          return { ...it, title: name }
        }
        return it
      }));
      setName('');
      setEditID('');
      setIsEditing(false);
      showAlert(true, AlertType.SUCCESS, 'value updated');
    } else {
      showAlert(true, AlertType.SUCCESS, 'item added to the list');
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  }

  const showAlert = (show = false, type = AlertType.NULL, msg = '') => setAlert({ show, type, msg })

  const clearList = () => {
    showAlert(true, AlertType.DANGER, 'empty list');
    setList(emptyShoppingItems);
  }

  const removeItem = (id: string) => {
    showAlert(true, AlertType.DANGER, 'item removed');
    setList(list.filter((item) => item.id !== id));
  }

  const editItem = (id: string) => {
    const selectedItem: ShoppingItem = list.filter((item) => item.id === id)[0];
    setIsEditing(true);
    setEditID(id);
    setName(selectedItem.title)
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form onSubmit={handleSubmit} className="grocery-form">
        {alert.show && <Alert {...alert} removeAlert={showAlert} itemList={list} />}
        <h3>shopping list</h3>
        <div className="form-control">
          <input type="text" className="grocery" placeholder="e.g. eggs" value={name} onChange={(e) => setName(e.target.value)} />
          <button type="submit" className="submit-btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>

      <AdComponent />

      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>clear items</button>
        </div>
      )}
    </section>
  );
}

export default App;
