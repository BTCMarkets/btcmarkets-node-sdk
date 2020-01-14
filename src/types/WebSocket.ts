export interface IPublicSocketRequest {
    clientType: string;
}

export interface ISocketRequest {
    timestamp: number;
    key: string;
    signature: string;
    clientType: string;
}

export interface ISubscriptionRequest {
    marketIds: string[];
    channels: string[];
}

export interface IEventData {
    messageType: string;
}

export interface IOrderChangeEvent extends IEventData {
    data: IOrderChangeEventData;
}
export interface ITickEvent extends IEventData {
    data: ITickEventData;
}
export interface IOrderbookEvent extends IEventData {
    data: IOrderbookEventData;
}
export interface ITradeEvent extends IEventData {
    data: ITradeEventData;
}
export interface IFundChangeEvent extends IEventData {
    data: IFundChangeEventData;
}
export interface IHeartbeatEvent extends IEventData {
    data: IHeartbeatEventData;
}
export interface IOrderBookUpdateEvent extends IEventData {
    data: IOrderBookUpdateEventData;
}

export interface IOrderChangeEventData {
    orderId: string;
    marketId: string;
    type: string;
    side: string;
    openVolume: string;
    status: string;
    triggerStatus: string;
    timestamp: Date;
    trades: ITradeData[];
    messageType: string;
}

export interface ITickEventData {
    marketId: string;
    timestamp: Date;
    bestBid: string;
    bestAsk: string;
    lastPrice: string;
    volume24h: string;
    messageType: string;
    price24h: string;
    low24h: string;
    high24h: string;
}

export interface IOrderbookEventData {
    marketId: string;
    timestamp: Date;
    bids: Array<Array<string>>;
    asks: Array<Array<string>>;
}

export interface ITradeEventData {
    marketId: string;
    timestamp: Date;
    tradeId: string;
    price: string;
    volume: string;
    messageType: string;
    side: string;
}

export interface IFundChangeEventData {
    fundtransferId: string;
    type: string;
    status: string;
    timestamp: Date;
    amount: string;
    currency: string;
    fee: string;
    messageType: string;
}

export interface IOrderBookUpdateEventData {
    marketId: string;
    timestamp: Date;
    snapshotId: number;
    bids: Array<Array<any>>;
    asks: Array<Array<any>>;
    channel: string;
}

export interface IHeartbeatEventData {
    channels: {
        name: string;
        marketIds: string[];
    };
}

export interface ITradeData {
    tradeId: string;
    price: string;
    volume: string;
    fee: string;
    liquidityType: string;
}

export interface IEventError extends IEventData {
    code: number;
    message: string;
}
