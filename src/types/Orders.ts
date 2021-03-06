import { IBaseResponse } from './Response';
import { IPaging } from './Paging';

export interface IBaseOrder {
    orderId: string;
}

export interface IOrder extends IBaseOrder {
    marketId: string;
    side: string;
    type: string;
    creationTime: string;
    price: string;
    amount: string;
    openAmount: string;
    status: string;
    triggerPrice: string;
    targetAmount: string;
    timeInForce: string;
    postOnly: boolean;
    selfTrade: string;
    clientOrderId: string;
}

export interface IOrderResponse extends IBaseResponse {
    data: IOrder;
}

export interface IOpenOrdersResponse extends IBaseResponse {
    data: IOrder[];
}

export interface IOrdersResponse extends IOpenOrdersResponse {
    paging: IPaging;
}

export interface ICancelOrderResponse extends IBaseResponse {
    data: IBaseOrder;
}

export interface ICancelAllOrderResponse extends IBaseResponse {
    data: IBaseOrder[];
}

export interface IReplaceOrder extends IBaseOrder {
    price: string;
    amount: string;
    clientOrderId: string;
}
