const BTCMarkets = require('../dist/btcmarkets-api-node.cjs.development').default;

const client = new BTCMarkets({ key: 'XXX', secret: 'XXX' });

//Batch
/*
(async () => {
    try {
        const response = await client.batches.batchOrders([
            {
                placeOrder: {
                    marketId: 'XRP-AUD',
                    side: 'Bid',
                    type: 'Limit',
                    price: '0.41',
                    amount: '0.33',
                    clientOrderId: '55',
                },
                cancelOrder: { clientOrderId: '55' },
            },
            {
                placeOrder: {
                    marketId: 'XRP-AUD',
                    side: 'Bid',
                    type: 'Limit',
                    price: '0.55',
                    amount: '0.22',
                    clientOrderId: '56',
                },
                cancelOrder: { clientOrderId: '53' },
            },
        ]);
        console.log(response.data.placeOrders, 'placeOrders');
        console.log(response.data.cancelOrders, 'cancelOrders');
        console.log(response.data.unprocessedRequests, 'unprocessedRequests');
    } catch (error) {
        console.log(error);
    }
})();
*/
// Get Orders
/* (async () => {
  try {
    const response = await client.batches.getOrdersById([37, 45, 1232768]);
    console.log(response.data.orders, 'orders');
    console.log(response.data.unprocessedRequests, 'unprocessedRequests');
  } catch (error) {
    console.log(error);
  }
})(); */

//Cancel orders
/* (async () => {
    try {
        const response = await client.batches.cancelOrdersById([39, 36]);
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
})();
 */
