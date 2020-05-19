import { IBase } from './base/IBase';

export interface IOrder extends IBase{
    // id: string;
    appUserName: string;
    orderNumber: string;
    createdAt: string;
    appUserId: string;
}