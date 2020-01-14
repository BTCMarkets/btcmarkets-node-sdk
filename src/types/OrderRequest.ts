export interface IGetOrdersRequest {
    marketId: string;
    limit: number;
    before: string;
    after: string;
}

export interface IPlaceOrderRequest {
    marketId: string;
    price: string;
    amount: string;
    type: string;
    side: string;
    triggerPrice: string;
    targetAmount: string;
    timeInForce: string;
    postOnly: boolean;
    selfTrade: string;
    clientOrderId: string;
}
