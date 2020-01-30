const BTCMarkets = require('../dist/btcmarkets-node-sdk.cjs.development').default;

const client = new BTCMarkets({ key: 'XXX', secret: 'XXX' });

//Get Open Orders
/* (async () => {
    try {
        const response = await client.orders.getOpenOrders();
        console.log(response);
    } catch (error) {
        console.log('error', error);
    }
})(); */

//Get Orders
/* (async () => {
    try {
        const response = await client.orders.getOrders({ limit: 3 });
        console.log(response);
    } catch (error) {
        console.log('error', error);
    }
})(); */

//Get Order
/* (async () => {
    try {
        const response = await client.orders.getOrder('1231111');
        console.log(response);
    } catch (error) {
        console.log('error', error);
    }
})(); */

//Place new Order Order
/* (async () => {
    try {
        const newOrder = {
            marketId: 'BTC-AUD',
            price: '58.13',
            amount: '0.02',
            type: 'Limit',
            side: 'Bid',
        };
        const response = await client.orders.placeNewOrder(newOrder);
        console.log(response);
    } catch (error) {
        console.log('error', error);
    }
})(); */

//Cancel Order
/* (async () => {
    try {
        const response = await client.orders.cancelOrder('1231111');
        console.log(response);
    } catch (error) {
        console.log('error', error);
    }
})(); */

//Cancel All Order
/* (async () => {
    try {
        const response = await client.orders.cancelAll(['BTC-AUD', 'BTC-AUD']);
        console.log(response);
    } catch (error) {
        console.log('error', error);
    }
})();
 */

//Error handling

(async () => {
    try {
        const newOrder = {
            price: '100.12',
            amount: '1.034',
            type: 'Limit',
            side: 'Bid',
        };
        const response = await client.orders.placeNewOrder(newOrder);
        console.log(response.data);
    } catch (error) {
        if (error.code === 'InvalidApiKey') {
            console.log(error.message, 'api key is not correct');
        } else if (error.code === 'InvalidMarketId') {
            console.log(error.message, 'market id not correct');
        } else if (error.code === 'InvalidOrderType') {
            console.log(error.message, 'order type is not correct');
        } else if (error.code === 'InvalidOrderSide') {
            console.log(error.message, 'order side is not correct');
        }
    }
})();
