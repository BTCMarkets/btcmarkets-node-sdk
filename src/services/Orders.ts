import Http from '../http';
import { HttpMethods } from '../constants/HttpMethods';
import { getParsedBody } from '../helpers/responseHelpers';
import { IGetOrdersRequest, IPlaceOrderRequest } from '../types/OrderRequest';
import orderTypes from '../collections/orderTypes';
import orderSides from '../collections/orderSides';
import BaseError from '../models/BaseError';
import { IOrder, IOrdersResponse, IOpenOrdersResponse, ICancelOrderResponse, IOrderResponse } from '../types/Orders';
import { IPaging } from '../types/Paging';

export default class Orders extends Http {
    public async getOpenOrders(marketId: string): Promise<IOpenOrdersResponse> {
        let qs = {
            status: 'open',
            marketId,
        };

        let response = await this.privateRequest(HttpMethods.GET, '/orders', qs);

        return getParsedBody(response) as IOpenOrdersResponse;
    }

    public async getOrders(queryParameters: IGetOrdersRequest): Promise<IOrdersResponse> {
        let qs: object = {
            status: 'all',
        };
        if (queryParameters) {
            if (queryParameters.marketId) {
                qs = { ...qs, marketId: queryParameters.marketId };
            }
            if (queryParameters.limit) {
                qs = { ...qs, limit: queryParameters.limit };
            }
            if (queryParameters.before) {
                qs = { ...qs, before: queryParameters.before };
            }
            if (queryParameters.after) {
                qs = { ...qs, after: queryParameters.after };
            }
        }

        let response = await this.privateRequest(HttpMethods.GET, '/orders', qs);
        const body = response.data as IOrder[];
        const headers = response.headers;
        return {
            data: body,
            paging: {
                before: headers['bm-before'],
                after: headers['bm-after'],
                limit: queryParameters.limit,
            } as IPaging,
        } as IOrdersResponse;
    }

    public async getOrder(id: string): Promise<IOrderResponse> {
        if (!id) {
            throw new BaseError('InvalidOrderId', 'invalid order id');
        }

        const response = await this.privateRequest(HttpMethods.GET, `/orders/${id}`, null);
        return getParsedBody(response) as IOrderResponse;
    }

    public async placeNewOrder(data: IPlaceOrderRequest): Promise<IOrderResponse> {
        if (!data) {
            throw new BaseError('MissingArgument', 'Order arguments are missing');
        }
        if (!data.marketId) {
            throw new BaseError('InvalidMarketId', 'market symbol is invalid');
        }

        if (!data.type) {
            throw new BaseError('InvalidOrderType', 'invalid order type');
        } else {
            const type = orderTypes.find(t => t === data.type);
            if (!type) {
                throw new BaseError('InvalidOrderType', `invalid order type`);
            }
        }
        if (!data.side) {
            throw new BaseError('InvalidOrderSide', 'invalid order side');
        } else {
            const side = orderSides.find(s => s === data.side);
            if (!side) {
                throw new BaseError('InvalidOrderSide', `invalid order side`);
            }
        }

        const response = await this.privateRequest(HttpMethods.POST, '/orders', null, data);

        return getParsedBody(response) as IOrderResponse;
    }

    public async cancelOrder(id: string): Promise<ICancelOrderResponse> {
        if (!id) {
            throw new BaseError('InvalidOrderId', 'invalid order id');
        }

        const response = await this.privateRequest(HttpMethods.DELETE, `/orders/${id}`, null);
        return getParsedBody(response) as ICancelOrderResponse;
    }

    public async cancelAll(marketIds: string[]) {
        let qs = '';
        if (marketIds) {
            qs = '?marketId=' + marketIds.join('&marketId=');
        }

        const response = await this.privateRequest(HttpMethods.DELETE, `/orders`, qs);
        return getParsedBody(response);
    }
}
