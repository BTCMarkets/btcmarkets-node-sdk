const BTCMarkets = require('../dist/btcmarkets-node-sdk.cjs.development').default;

const client = new BTCMarkets({ key: 'XXX', secret: 'XXX' });

(async () => {
  try {
    const response = await client.markets.getActiveMarkets();
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();

/*
(async () => {
  try {
    const response = await client.markets.getMarketTrades({marketId: 'BTC-AUD', limit: 10 });
    console.log(response);
  } catch (error) {
    console.log('error', error);
  }
})();
*/
/*
(async () => {
  try {
    const response = await client.markets.getTicker({marketId: 'XRP-AUD'});
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
*/
/*
(async () => {
  try {
    const response = await client.markets.getTickers({marketId: 'BTC-AUD,ETH-AUD,LTC-AUD'});
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
*/
/*
(async () => {
  try {
    const response = await client.markets.getOrderbook({marketId: 'XRP-AUD', level: 2 });
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
*/
/*
(async () => {
  try {
    const response = await client.markets.getOrderbooks({marketId: 'BTC-AUD,ETH-AUD'});
    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.log('error', error);
  }
})();
*/
/*
(async () => {
  try {
    const response = await client.markets.getCandles({marketId: 'BTC-AUD', from: '2019-08-12T00:00:00.000000Z', to: '2019-08-18T00:00:00.000000Z', timeWindow: '1d'});
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
*/
