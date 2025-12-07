import { FunctionComponent, useEffect } from 'react';
import { ShoppingItem, AlertType } from '../types';


interface Props {
    msg: string;
    type: AlertType | null;
    removeAlert: () => void;
    itemList: ShoppingItem[];
}

const Alert: FunctionComponent<Props> = ({ msg, type, removeAlert, itemList }) => {

    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAlert();
        }, 3000);
        return () => clearTimeout(timeout);
    }, [itemList, removeAlert]);

    const alertClass = type ? `alert alert-${type}` : 'alert';
    return <p className={alertClass}>{msg}</p>
}

export default Alert
