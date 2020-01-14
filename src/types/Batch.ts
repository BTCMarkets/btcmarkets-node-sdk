import { IBaseResponse } from './Response';
import { IOrder } from './Orders';
import { IPlaceOrderRequest } from '../types/OrderRequest';

//Models

export interface IGetBatch {
    unprocessedRequests: IUnprocessedBatch[];
    placeOrders: IOrder[];
}

export interface ICancelBatch {
    unprocessedRequests: IUnprocessedBatch[];
    cancelOrders: { orderId: string; clientOrderId: string }[];
}

export interface IBatch {
    unprocessedRequests: IUnprocessedBatch[];
    placeOrders: IOrder[];
    cancelOrders: { orderId: string; clientOrderId: string }[];
}

export interface IUnprocessedBatch {
    requestId: string;
    code: string;
    message: string;
}

//Responses
export interface IBatchResponse extends IBaseResponse {
    data: IBatch;
}

export interface IGetBatchResponse extends IBaseResponse {
    data: IGetBatch;
}

export interface ICancelBatchResponse extends IBaseResponse {
    data: ICancelBatch;
}

//Requests

export interface IBatchRequest {
    placeOrder: IPlaceOrderRequest;
    cancelOrder: { clientOrderId: string };
}
