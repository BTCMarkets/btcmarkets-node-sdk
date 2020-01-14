import { IBaseResponse } from './Response';
import { IPaging } from 'types/Paging';

export interface IMarket {
    marketId: string;
    baseAssetName: string;
    quoteAssetName: string;
    minOrderAmount: string;
    maxOrderAmount: string;
    amountDecimals: string;
    priceDecimals: string;
}
export interface IMarketsResponse extends IBaseResponse {
    data: IMarket[];
}

export interface ITicker {
    marketId: string;
    bestBid: string;
    bestAsk: string;
    lastPrice: string;
    volume24h: string;
    price24h: string;
    low24h: string;
    high24h: string;
    timestamp: string;
}
export interface ITickerResponse extends IBaseResponse {
    data: ITicker;
}
export interface ITickersResponse extends IBaseResponse {
    data: ITicker[];
}

export interface IMarketTradesRequest {
    marketId: string;
    before: number;
    after: number;
    limit: number;
}

export interface IMarketTrade {
    id: string;
    price: string;
    amount: string;
    side: string;
    timestamp: string;
}
export interface IMarketTradesResponse extends IBaseResponse {
    data: IMarketTrade[];
    paging: IPaging;
}

export interface IOrderbookRequest {
    marketId: string;
    level: string;
}

export interface IOrderbook {
    marketId: string;
    snapshotId: string;
    asks: string[];
    bids: string[];
}
export interface IOrderbookResponse extends IBaseResponse {
    data: IOrderbook;
}
export interface IOrderbooksResponse extends IBaseResponse {
    data: IOrderbook[];
}

export interface ICandlesRequest {
    marketId: string;
    timeWindow: string;
    before: string;
    after: string;
    from: string;
    to: string;
    limit: string;
}
