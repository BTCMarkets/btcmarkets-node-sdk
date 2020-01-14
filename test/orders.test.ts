import BTCMarkets from '../src/index';
import BaseError from '../src/models/BaseError';
import { IPlaceOrderRequest } from '../src/types/OrderRequest';

const orders = new BTCMarkets({ key: 'XXX', secret: 'XXX' }).orders;

test('getOrder method throws InvalidOrderId exception if id is undefined', async () => {
    let result;
    try {
        const response = await orders.getOrder('');
        result = response;
    } catch (error) {
        result = error;
    }

    expect(result.code).toBe('InvalidOrderId');
});

const placeNewOrder = async (data: IPlaceOrderRequest): Promise<BaseError> => {
    let result;
    try {
        const response = await orders.placeNewOrder(data);
        result = response;
    } catch (error) {
        result = error;
    }
    return result as BaseError;
};

test('placeNewOrder method throws exception if data is invalid', async () => {
    expect(
        (await placeNewOrder({
            marketId: '',
            price: '0.03',
            amount: '0.01',
            type: 'Limit',
            side: 'Bid',
        } as IPlaceOrderRequest)).code
    ).toBe('InvalidMarketId');

    expect(
        (await placeNewOrder({
            marketId: 'BTC-AUD',
            price: '0.03',
            amount: '0.01',
            type: '',
            side: 'Bid',
        } as IPlaceOrderRequest)).code
    ).toBe('InvalidOrderType');

    expect(
        (await placeNewOrder({
            marketId: 'BTC-AUD',
            price: '0.03',
            amount: '0.01',
            type: 'limit1',
            side: 'Bid',
        } as IPlaceOrderRequest)).code
    ).toBe('InvalidOrderType');

    expect(
        (await placeNewOrder({
            marketId: 'BTC-AUD',
            price: '0.03',
            amount: '0.01',
            type: 'Limit',
            side: '',
        } as IPlaceOrderRequest)).code
    ).toBe('InvalidOrderSide');

    expect(
        (await placeNewOrder({
            marketId: 'BTC-AUD',
            price: '0.03',
            amount: '0.01',
            type: 'Limit',
            side: 'Bid1',
        } as IPlaceOrderRequest)).code
    ).toBe('InvalidOrderSide');
});

test('cancelOrder method throws InvalidOrderId exception if id is undefined', async () => {
    let result;
    try {
        const response = await orders.cancelOrder('');
        result = response;
    } catch (error) {
        result = error;
    }

    expect(result.code).toBe('InvalidOrderId');
});
