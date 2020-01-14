const BTCMarkets = require('../dist/btcmarkets-node-sdk.cjs.development').default;

const client = new BTCMarkets({ key: 'XXX', secret: 'XXX' });

// Public examples
/* (async () => {
    const response = await client.markets.getActiveMarkets();
    console.log(response.data);
})(); */
/* 
(async () => {
    const response = await client.markets.getMarketTrades('BTC-AUD', { limit: 2 });
    console.log(response.data);
})(); */

/* // Private examples
(async () => {
    const response = await client.account.getTradingFees();
    console.log(response.data);
})();
 */
