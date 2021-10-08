export type AlertStatus = {
    show: boolean;
    msg: string; 
    type: AlertType;
}

export type ShoppingItem = {
    id: string;
    title: string;
}

export enum AlertType {
    DANGER = 'danger',
    SUCCESS = 'success',
    NULL = ''
}