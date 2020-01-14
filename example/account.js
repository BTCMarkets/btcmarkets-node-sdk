const BTCMarkets = require('../dist/btcmarkets-node-sdk.cjs.development').default;

const client = new BTCMarkets({ key: 'XXX', secret: 'XXX' });

// Private examples
/*
(async () => {
  try {
    const response = await client.account.getTradingFees();
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
*/
/*
(async () => {
  try {
    const response = await client.account.getBalances();
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
*/
/*
(async () => {
  try {
    const response = await client.account.getTransactions({assetName:'BTC',limit: 3 });
    console.log(response);
  } catch (error) {
    console.log('error', error);
  }
})();
*/
