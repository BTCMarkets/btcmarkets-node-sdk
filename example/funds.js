const BTCMarkets = require('../dist/btcmarkets-node-sdk.cjs.development').default;

const client = new BTCMarkets({ key: 'XXX', secret: 'XXX' });

/*
(async () => {
  try {
    const response = await client.funds.getAssets();
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
*/
/*
(async () => {
  try {
    const response = await client.funds.getWithdrawalFees();
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
*/
/*
(async () => {
  try {
    const response = await client.funds.getDepositAddress({assetName:'XRP'});
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
*/
/*
(async () => {
  try {
    const response = await client.funds.getDeposits({limit: 2});
    console.log(response);
  } catch (error) {
    console.log('error', error);
  }
})();
*/
/*
(async () => {
  try {
    const response = await client.funds.getDepositById('777386');
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
*/
/*
(async () => {
  try {
    const response = await client.funds.getTransfers({limit: 10});
    console.log(response);
  } catch (error) {
    console.log('error', error);
  }
})();
*/
/*
(async () => {
  try {
    const response = await client.funds.getTransferById('1228749');
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
*/
/*
(async () => {
  try {
    const response = await client.funds.getWithdrawls({limit: 2});
    console.log(response);
  } catch (error) {
    console.log('error', error);
  }
})();
*/
/*
(async () => {
  try {
    const response = await client.funds.getWithdrawById('1229216');
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
*/
/*
(async () => {
  try {
    const response = await client.funds.withdrawCrypto({assetName: 'XRP', amount: '25', toAddress: 'abc'});
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
*/
/*
(async () => {
  try {
    const response = await client.funds.withdrawFiat({assetName: 'AUD', amount: '1', accountName: 'John Smith', accountNumber: '10099999', bsbNumber: '111111', bankName:'Test Bank', paymentDescription: 'test'});
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
*/
