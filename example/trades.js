const BTCMarkets = require('../dist/btcmarkets-node-sdk.cjs.development').default;

const client = new BTCMarkets({ key: 'XXX', secret: 'XXX' });

/*
(async () => {
  try {
    const response = await client.trades.getTrades({marketId:'XRP-AUD', limit: 3});
    console.log(response);
  } catch (error) {
    console.log('error', error);
  }
})();
*/
/*
(async () => {
  try {
    const response = await client.trades.getTradeById('818033');
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
*/