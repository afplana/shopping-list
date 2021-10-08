import { FunctionComponent, useEffect } from 'react';
import { ShoppingItem } from './types';


interface Props {
    msg: string;
    type: string;
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

    return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert