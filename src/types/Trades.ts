import { IBaseResponse } from './Response';
import { IPaging } from '../types/Paging';

export interface ITradeRequest {
    marketId: string;
    orderId: string;
    before: number;
    after: number;
    limit: number;
}

export interface ITrade {
    id: string;
    clientOrderId: string;
    marketId: string;
    timestamp: string;
    price: string;
    amount: string;
    side: string;
    fee: string;
    orderId: string;
    liquidityType: string;
}
export interface ITradesResponse extends IBaseResponse {
    data: ITrade[];
    paging: IPaging;
}
export interface ITradeResponse extends IBaseResponse {
    data: ITrade;
}
