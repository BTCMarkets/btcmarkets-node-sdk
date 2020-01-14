# BTC Markets Node SDK


![](https://github.com/ngin-io/btcmarkets-node-sdk/workflows/Node%20CI/badge.svg)

A complete Node.js wrapper for the BTC Markets API.

### Installation
Install with npm
```
npm install btcmarkets-node-sdk
```
Install with yarn
```
yarn add btcmarkets-node-sdk
```

### Getting started

```js
// ESM 
import BTMarkets from 'btcmarkets-node-sdk'

// Common JS
const BTCMarkets = require('btcmarkets-node-sdk').default;

// Authenticated client, can make signed calls
const client = new BTCMarkets({ key: 'XXX', secret: 'XXX' });
// Or use without api key for public methods
const client = new BTCMarkets();
```

Every method returns a Promise, making this library async await ready, the following examples will use the await form.

### APIs
- [BTC Markets Node SDK](#btc-markets-node-sdk)
    - [Installation](#installation)
    - [Getting started](#getting-started)
    - [APIs](#apis)
    - [Account APIs](#account-apis)
      - [balances](#balances)
      - [trading fees](#trading-fees)
      - [transactions](#transactions)
    - [Fund Management APIs](#fund-management-apis)
      - [list assets](#list-assets)
      - [list deposits](#list-deposits)
      - [deposit by Id](#deposit-by-id)
      - [transfers](#transfers)
      - [transfer by Id](#transfer-by-id)
      - [deposit address](#deposit-address)
      - [request to withdraw crypto](#request-to-withdraw-crypto)
      - [request to withdraw fiat](#request-to-withdraw-fiat)
      - [list withdrawals](#list-withdrawals)
      - [withdraw by Id](#withdraw-by-id)
      - [withdrawal fees](#withdrawal-fees)
    - [Market data APIs](#market-data-apis)
      - [orderbook](#orderbook)
      - [multiple orderbooks](#multiple-orderbooks)
      - [active markets](#active-markets)
      - [market ticker](#market-ticker)
      - [market tickers](#market-tickers)
      - [market trades](#market-trades)
      - [market candles](#market-candles)
    - [Trade APIs](#trade-apis)
      - [list trades](#list-trades)
      - [trade by id](#trade-by-id)
    - [Order Placement APIs](#order-placement-apis)
      - [place new order](#place-new-order)
      - [list orders](#list-orders)
      - [cancel open orders](#cancel-open-orders)
      - [get an order](#get-an-order)
      - [cancel an order](#cancel-an-order)
    - [Batch Order APIs](#batch-order-apis)
      - [place and cancel orders](#place-and-cancel-orders)
      - [get orders by Id](#get-orders-by-Id)
      - [cancel orders by Id](#cancel-orders-by-Id)
    - [Report APIs](#batch-order-apis)
      - [create new report](#create-new-report)
      - [get report by Id](#get-report-by-Id)
    - [websocket](#websocket)
      - [websocket subscription](#websocket-subscription)
      - [add remove subscriptions](#add-remove-subscriptions)
      - [websocket events](#websocket-events)
        - [trade](#trade)
        - [tick](#trade)
        - [orderbook event](#orderbook-event)
        - [orderchange](#orderchange)
        - [fundchange](#fundchange)
        - [heartbeat](#heartbeat)
        - [error](#error)
    - [Error handling](#error-handling)
  - [Local Development](#local-development)
      - [`npm start` or `yarn start`](#npm-start-or-yarn-start)
      - [`npm run build` or `yarn build`](#npm-run-build-or-yarn-build)
      - [`npm test` or `yarn test`](#npm-test-or-yarn-test)
    - [TSLint](#tslint)
    - [Prettier](#prettier)
  - [Contributing](#contributing)
  - [License](#license)

### Account APIs
#### balances
Returns list of assets covering balance, available, and locked amount for each asset due to open orders or pending withdrawals. This formula represents the relationship between those three elements: balance = available + locked.

```js
(async () => {
  try {
    const response = await client.account.getBalances();
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
```
<details>
<summary>Output</summary>

```js
[
  {
    "assetName": "LTC",
    "balance": "5",
    "available": "5",
    "locked": "0"
  },
  {
    "assetName": "ETH",
    "balance": "1.07583642",
    "available": "1.0",
    "locked": "0.07583642"
  }
]
```

</details>

#### trading fees
Returns 30 day trading fee volume plus trading fee per market covering marker and taker.

```js
(async () => {
  try {
    const response = await client.account.getTradingFees();
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
```
<details>
<summary>Output</summary>

```js
{
"volume30Day": "0.0098275",
"feeByMarkets": [
  {
  "makerFeeRate": "0.00849999",
  "takerFeeRate": "0.00849999",
  "marketId": "BTC-AUD"
  },
  {
  "makerFeeRate": "0.00849999",
  "takerFeeRate": "0.00849999",
  "marketId": "LTC-AUD"
  },
  {...},
  {...}
 ]
}
```

</details>

#### transactions
Returns detail ledger recoerds for underlying wallets. This API supports pagination.
```js
(async () => {
  try {
    const response = await client.account.getTransactions({assetName: 'BTC', limit: 10 });
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
```

|Param|Type|Required|Default|
|--- |--- |--- |--- |
|assetName|String|false|Example: assetName=BTC filter transactions for specific asset.|
|before|Number|false|Example: before=78234976this is part of the pagination parameters.|
|after|Number|false|Example: after=78234876this is part of the pagination parameters.|
|limit|Number|false|Example: limit=10 this is part of the pagination parameters.|



<details>

<summary>Output</summary>

```js
[
  {
    "id": "1759",
    "creationTime": "2015-02-21T21:49:54.911000Z",
    "description": "Sell 0.3000BTC @ AUD 200.0000 Trading fee",
    "assetName": "AUD",
    "amount": "0.5082",
    "balance": "81.9401",
    "type": "Trading Fee",
    "recordType": "Trade",
    "referenceId": "17949"
  },
  {
    "id": "17958",
    "creationTime": "2015-02-21T21:49:54.906000Z",
    "description": "Sell 0.3000BTC @ AUD 200.0000 Trade settled",
    "assetName": "AUD",
    "amount": "60",
    "balance": "82.4483",
    "type": "Sell Order",
    "recordType": "Trade",
    "referenceId": "17949"
  },
  {...},
  {...},
]
```

</details>

### Fund Management APIs
#### list assets
Retrieves list of assets including configuration.
```js
(async () => {
  try {
    const response = await client.funds.getAssets();
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
```

<details>

<summary>Output</summary>

```js
[
  {
    "assetName": "BTC",
    "minDepositAmount": "0.0001",
    "maxDepositAmount": "1000000",
    "depositDecimals": "8",
    "minWithdrawalAmount": "0.0001",
    "maxWithdrawalAmount": "1000000",
    "WithdrawalDecimals": "8",
    "withdrawalFee": "0",
    "depositFee": "0"
  },
 
  {...},
  {...},
]
```

</details>

#### list deposits
Returns list of depoists. This API supports pagination.


```js
(async () => {
  try {
    const response = await client.funds.getDeposits({limit: 2});
    console.log(response);
  } catch (error) {
    console.log('error', error);
  }
})();
```
Param|Type|Required|Default|
|--- |--- |--- |--- |
|before|Number|false|Example: before=78234976 this is part of the pagination parameters.|
|after|Number|false|Example: after=78234876t his is part of the pagination parameters.|
|limit|Number|false|Example: limit=10 this is part of the pagination parameters.|

<details>

<summary>Output</summary>

```js
[
  {
    "id": "123989",
    "assetName": "BTC",
    "amount": "0.3",
    "type": "Withdraw",
    "creationTime": "2019-08-27T21:41:56.832000Z",
    "status": "Pending Authorization",
    "description": "BTC withdraw from [me@test.io] to Address: 3QJsRCW3qSinyC amount: 0.3 fee: 0",
    "fee": "0",
    "lastUpdate": "2019-08-27T21:41:57.004000Z",
    "paymentDetail": {
        "address": "3QJmihAf3sRCW3qSinyC"
}
  },
  {
    "id": "1167870",
    "assetName": "AUD",
    "amount": "0.15710206",
    "type": "Deposit",
    "creationTime": "2019-08-16T23:23:39.452000Z",
    "status": "Complete",
    "description": "EFT Deposit, $ 0.15710206",
    "fee": "0",
    "lastUpdate": "2019-08-16T23:23:39.603000Z"
  },
  {...},
]
```

</details>

#### deposit by Id
This API returns a deposit by id.
```js
(async () => {
  try {
    const response = await client.funds.getDepositById('777386');
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
```

|Param|Type|Required|Default|
|--- |--- |--- |--- |
|id|String|true|

<details>
<summary>Output</summary>

```js
{
  "id": "17866",
  "assetName": "BTC",
  "amount": "0.15710206",
  "type": "Deposit",
  "creationTime": "2019-08-16T23:19:03.553000Z",
  "status": "Complete",
  "description": "BITCOIN Deposit, B 0.15710206",
  "fee": "0",
  "lastUpdate": "2019-08-16T23:19:03.619000Z",
  "paymentDetail": {
  "txId": "E1264A7D5742480B28494"
   }
}
```

</details>

#### transfers
A transfer record refers either to a deposit or withdraw and this API returns list of transfers covering both depoists and withdrawals. This API supports pagination.
```js
(async () => {
  try {
    const response = await client.funds.getTransfers({limit: 10});
    console.log(response);
  } catch (error) {
    console.log('error', error);
  }
})();
```
Param|Type|Required|Default|
|--- |--- |--- |--- |
|before|Number|false|Example: before=78234976 this is part of the pagination parameters.|
|after|Number|false|Example: after=78234876t his is part of the pagination parameters.|
|limit|Number|false|Example: limit=10 this is part of the pagination parameters.|

<details>
<summary>Output</summary>

```js
[
 {
  "id": "123989",
  "assetName": "BTC",
  "amount": "0.3",
  "type": "Withdraw",
  "creationTime": "2019-08-27T21:41:56.832000Z",
  "status": "Pending Authorization",
  "description": "BTC withdraw from [me@test.io] to Address: 3QJsRCW3qSinyC amount: 0.3 fee: 0",
  "fee": "0",
  "lastUpdate": "2019-08-27T21:41:57.004000Z",
  "paymentDetail": {
    "address": "3QJmihAf3sRCW3qSinyC"
    }
 },
 {
  "id": "1167870",
  "assetName": "AUD",
  "amount": "0.15710206",
  "type": "Deposit",
  "creationTime": "2019-08-16T23:23:39.452000Z",
  "status": "Complete",
  "description": "EFT Deposit, $ 0.15710206",
  "fee": "0",
  "lastUpdate": "2019-08-16T23:23:39.603000Z"
 }
]
```

</details>

#### transfer by Id
This API retruns either deposit or withdrawal by id

```js
(async () => {
  try {
    const response = await client.funds.getTransferById('1228749');
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
```
Param|Type|Required|Default|
|--- |--- |--- |--- |
|id|string|true|

<details>
<summary>Output</summary>

```js
{
  "id": "17866",
  "assetName": "BTC",
  "amount": "0.15710206",
  "type": "Deposit",
  "creationTime": "2019-08-16T23:19:03.553000Z",
  "status": "Complete",
  "description": "BITCOIN Deposit, B 0.15710206",
  "fee": "0",
  "lastUpdate": "2019-08-16T23:19:03.619000Z",
  "paymentDetail": {
    "txId": "E1264A7D5742480B28494"
  }
}
```

</details>


#### deposit address
returns deposit address for the given asset.
```js
(async () => {
  try {
    const response = await client.funds.getDepositAddress({assetName:'XRP'});
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
```

Param|Type|Required|Default|
|--- |--- |--- |--- |
|assetName|string|true|asset name for the deposit address|

<details>
<summary>Output</summary>

```js
{
  "address": "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
  "assetName": "BTC"
}
```
</details>

#### request to withdraw crypto
Triggers the withdraw process.

```js
(async () => {
  try {
    const response = await client.funds.withdrawCrypto
    ({assetName: 'XRP', amount: '25', toAddress: 'abc'});
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
```

|Param|Type|Required|Description|
|--- |--- |--- |--- |
|assetName|String|true|name of the asset to withdraw e.g. AUD or BTC|
|amount|String|true|amount to withdraw|
|toAddress|string|true|destination address for crypto withdrawals|

<details>
<summary>Output</summary>

```js
{
  "id": "4126657",
  "assetName": "XRP",
  "amount": "25",
  "type": "Withdraw",
  "creationTime": "2019-09-04T00:04:10.973000Z",
  "status": "Pending Authorization",
  "description": "XRP withdraw from [me@test.com] to Address: abc amount: 25 fee: 0",
  "fee": "0",
  "lastUpdate": "2019-09-04T00:04:11.018000Z"
}
```

</details>

#### request to withdraw fiat
Triggers the withdraw process.

```js
(async () => {
  try {
    const response = await client.funds.withdrawFiat({assetName: 'AUD', amount: '25', accountName: 'abcd', accountNumber: '1234', bsbNumber: '456789', bankName:'NAB'});
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
```

|Param|Type|Required|Description|
|--- |--- |--- |--- |
|assetName|String|true|name of the asset to withdraw e.g. AUD or BTC|
|amount|String|true|amount to withdraw|
|accountName|String|true|optional for AUD withdrawal. when not speciifed default bank information is used|
|accountNumber|string|true|optional for AUD withdrawal. when not speciifed default bank information is used|
|bsbNumber|string|true|optional for AUD withdrawal. when not speciifed default bank information is used|
|bankName|string|true|optional for AUD withdrawal. when not speciifed default bank information is used|


<details>
<summary>Output</summary>

```js
{
  "id": '1330337',
  "assetName": 'AUD',
  "amount": '25',
  "type": 'Withdraw',
  "creationTime": '2019-11-27T19:52:41.204000Z',
  "status": 'Pending Authorization',
  "description":
   'Withdraw from [m@test.com] to NAB, abcd(BSB: 456789, Account: 1234)',
  "fee": '0',
  "lastUpdate": '2019-11-27T19:52:41.230000Z'
}
```

</details>

#### list withdrawals
Returns list of withdrawals. This API supports pagination.

```js
(async () => {
  try {
    const response = await client.funds.getWithdrawls({limit: 2});
    console.log(response);
  } catch (error) {
    console.log('error', error);
  }
})();
```

Param|Type|Required|Default|
|--- |--- |--- |--- |
|before|Number|false|Example: before=78234976 this is part of the pagination parameters.|
|after|Number|false|Example: after=78234876t his is part of the pagination parameters.|
|limit|Number|false|Example: limit=10 this is part of the pagination parameters.|


<details>

<summary>Output</summary>

```js
[
  {
    "id": "123989",
    "assetName": "BTC",
    "amount": "0.3",
    "type": "Withdraw",
    "creationTime": "2019-08-27T21:41:56.832000Z",
    "status": "Pending Authorization",
    "description": "BTC withdraw from [me@test.io] to Address: 3QJsRCW3qSinyC amount: 0.3 fee: 0",
    "fee": "0",
    "lastUpdate": "2019-08-27T21:41:57.004000Z",
    "paymentDetail": {}
  },
  {
    ...
  }
]
```

</details>


#### withdraw by Id
This API is used to request to get withdraw by id.

```js
(async () => {
  try {
    const response = await client.funds.getWithdrawById('1229216');
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
```
Param|Type|Required|Default|
|--- |--- |--- |--- |
|id|string|true|

<details>
<summary>output</summary>

```js
{
  "id": "4126657",
  "assetName": "XRP",
  "amount": "25",
  "type": "Withdraw",
  "creationTime": "2019-09-04T00:04:10.973000Z",
  "status": "Pending Authorization",
  "description": "XRP withdraw from [me@test.com] to Address: abc amount: 25 fee: 0",
  "fee": "0",
  "lastUpdate": "2019-09-04T00:04:11.018000Z"
}
```

</details>


#### withdrawal fees

Returns fees associated with withdrawals. This API is public and does not require authentication as the fees as system wide and published on the website.

```js
(async () => {
  try {
    const response = await client.funds.getWithdrawalFees();
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
```

<details>

<summary>output</summary>

```js
[
  {
  "assetName": "AUD",
  "fee": "0"
  },
  {
  "assetName": "BTC",
  "fee": "0.0003"
  },
  {
  "assetName": "BCHABC",
  "fee": "0.001"
  }
]
```

</details>

### Market data APIs
#### orderbook

Retrieves list of bids and asks for a given market. passing level=1 returns top 50 for bids and asks. level=2 returns full orderbook (full orderbook data is cached and usually updated every 10 seconds). Each market order is represented as an array of string [price, volume]. The attribute, snapshotId, is a uniqueue number associated to orderbook and it changes every time orderbook changes
```js
(async () => {
  try {
    const response = await client.markets.getOrderbook({marketId: 'XRP-AUD', level: 2 });
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
```

|Param|Type|Required|Default|
|--- |--- |--- |--- |
|marketId|String|true|
|level|Number|false|`1`|

<details>

<summary>Output</summary>

```js
{
  marketId: 'XRP-AUD',
  snapshotId: 1573067029187000,
  asks:
   [
     [ '0.4366', '2000' ],
     [ '0.4367', '5000' ]
   ],
  bids:
   [
     [ '0.4343', '7354.059867' ],
     [ '0.4341', '6903.66131681' ]
   ]
}
```

</details>

 #### multiple orderbooks
It retrieves orderbooks for a given list of marketIds provided via query string (e.g. ?marketId=ETH-BTC&marketId=XRP-BTC).

To gain better performance, restrict the number of marketIds to the items needed for your trading app instead of requesting all markets.

Retrieving full orderbook (level=2), for multiple markets, was mainly provided for customers who are interested in capturing and keeping full orderbook history. Therefore, it's recommended to call this API with lower frequency as the data size can be large and also cached.
 ```js
 (async () => {
  try {
    const response = await client.markets.getOrderbooks({marketId: 'BTC-AUD,ETH-AUD'});
    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.log('error', error);
  }
})();
 ```
|Param|Type|Required|Default|
|--- |--- |--- |--- |
|marketId|String|true|


 <details>
 <summary>output</summary>

 ```js
[
  {
    "marketId": "BAT-AUD",
    "snapshotId": 1567334110144000,
    "asks": [
        [
        "0.2677",
        "5665.85"
        ],
        [
        "0.2681",
        "52355"
        ],
        [],
        [],
  "bids": []
  },
  {
    "marketId": "LTC-AUD",
    "snapshotId": 1567334110146000,
    "asks": [],
    "bids": []
  }
]
 ```

 </details>

 #### active markets
Retrieves list of active markets including configuration for each market.

 ```js
 (async () => {
  try {
    const response = await client.markets.getActiveMarkets();
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
 ```

 <details>
 <summary>output</summary>

 ```js
 [
  {
    "marketId": "BTC-AUD",
    "baseAsset": "BTC",
    "quoteAsset": "AUD",
    "minOrderAmount": "0.0001",
    "maxOrderAmount": "1000000",
    "amountDecimals": "8",
    "priceDecimals": "2"
  },
  {
    "marketId": "LTC-AUD",
    "baseAsset": "LTC",
    "quoteAsset": "AUD",
    "minOrderAmount": "0.001",
    "maxOrderAmount": "1000000",
    "amountDecimals": "8",
    "priceDecimals": "2"
  },
  ...
]
 ```

 </details>

 #### market ticker
 Retrieves tikcer for the given marketId.
 ```js
 (async () => {
  try {
    const response = await client.markets.getTicker({marketId: 'BAT-AUD'});
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
 ```
|Param|Type|Required|Default|
|--- |--- |--- |--- |
|marketId|String|true|

 <details>
 <summary>output</summary>

 ```js
 {
  "marketId": "BAT-AUD",
  "bestBid": "0.2612",
  "bestAsk": "0.2677",
  "lastPrice": "0.2652",
  "volume24h": "6392.34930418",
  "price24h": "0.0024",
  "low24h": "0.2621",
  "high24h": "0.2708",
  "timestamp": "2019-09-01T10:35:04.940000Z"
}
 ```

 </details>

 #### market tickers
 This API works similar to /v3/markets/{marketId}/ticker except it retrieves tickers for a given list of marketIds provided via query string (e.g. ?marketId=ETH-BTC&marketId=XRP-BTC).

To gain better performance, restrict the number of marketIds to the items needed for your trading app instead of requesting all markets.

 ```js
 (async () => {
  try {
    const response = await client.markets.getTickers({marketId: 'BTC-AUD,LTC-AUD'});
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
 ```
|Param|Type|Required|Default|
|--- |--- |--- |--- |
|marketId|String|true|

 <details>
 <summary>output</summary>

 ```js
 [
  {
    "marketId": "BTC-AUD",
    "bestBid": "9000",
    "bestAsk": "9900",
    "lastPrice": "8500",
    "volume24h": "1444.44",
    "price24h": "130",
    "low24h": "12",
    "high24h": "50000",
    "timestamp": "2019-07-31T21:32:08.659000Z"
  },
  {
    "marketId": "LTC-AUD",
    "bestBid": "99.12",
    "bestAsk": "101.14",
    "lastPrice": "100",
    "volume24h": "1199.8",
    "price24h": "10",
    "low24h": "100",
    "high24h": "120",
    "timestamp": "2019-05-02T15:22:51.770000Z"
  }
]
 ```

 </details>

 #### market trades
Retrieves list of most recent trades for the given market. this API supports pagination.

 ```js
 (async () => {
  try {
    const response = await client.markets.getMarketTrades({marketId: 'XRP-AUD', limit: 2 });
    console.log(response);
  } catch (error) {
    console.log('error', error);
  }
})();
 ```

|Param|Type|Required|Default|
|--- |--- |--- |--- |
|assetName|String|true|Example: assetName=BTC filter transactions for specific asset.|
|before|Number|false|Example: before=78234976this is part of the pagination parameters.|
|after|Number|false|Example: after=78234876this is part of the pagination parameters.|
|limit|Number|false|Example: limit=10 this is part of the pagination parameters.|

 <details>
 <summary>output</summary>

 ```js
 [
  {
    "id": "4107372347",
    "price": "0.265",
    "amount": "11.25",
    "timestamp": "2019-09-02T12:49:42.874000Z",
    "side": "Ask"
  },
  {
    "id": "4107297908",
    "price": "0.265",
    "amount": "250",
    "timestamp": "2019-09-02T12:15:29.570000Z",
    "side": "Bid"
  }
]
 ```

 </details>

 #### market candles
Retrieves array of candles for a given market. Each candle record is an array of string representing [time,open,high,low,close,volume] for the time window specified (default time window is 1 day).

This API can be used to retrieve candles either by pagination (before, after, limit) or by specifying timestamp parameters (from and/or to). Pagination parameters can't be combined with timestamp parameters and default behavior is pagination when no query param is specified.

When using timestamp parameters as query string, the maximum number of items that can be retrieved is 1000, and depending on the specified timeWindow this can be different time windows. For instance, when using timeWindow=1d then up to 1000 days of market candles can be retrieved.

 ```js
 (async () => {
  try {
    const response = await client.markets.getCandles({marketId: 'BTC-AUD', from: '2019-08-12T00:00:00.000000Z', to: '2019-08-18T00:00:00.000000Z', timeWindow: '1d'});
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
 ```

 <details>
 <summary>output</summary>

 ```js
 [ 
   [ '2019-08-12T00:00:00.000000Z',
    '17058.27',
    '17058.27',
    '16709.83',
    '16930',
    '95.90894788' ],
  [ '2019-08-13T00:00:00.000000Z',
    '16929.99',
    '16956.13',
    '15910.25',
    '15980',
    '200.38024828' ],
  [ '2019-08-14T00:00:00.000000Z',
    '15963.43',
    '16000',
    '14824.55',
    '14913.62',
    '307.88269851' ],
  [ '2019-08-15T00:00:00.000000Z',
    '14942.16',
    '15470.61',
    '14104.7',
    '15246.5',
    '525.08515297' ],
  [ '2019-08-16T00:00:00.000000Z',
    '15274.05',
    '15599.99',
    '14457.04',
    '15339.79',
    '267.69989487' ],
  [ '2019-08-17T00:00:00.000000Z',
    '15367.12',
    '15487.12',
    '14865.3',
    '15170.63',
    '113.75006306' ],
  [ '2019-08-18T00:00:00.000000Z',
    '15184.33',
    '15567',
    '14955.51',
    '15262.04',
    '70.00196391' ]
     ]
 ```

 </details>

### Trade APIs
#### list trades
Retrieves trades and optionally filters by marketId or orderId/clientOrderId. The default behavior, when no query parameter is specified, is to return your most recent trades for all orders and markets. When a valid order id is provided then all trades for the order is returned. provding marketId also filters trades. Mixing orderId and marketId parameters is not supported.
```js
(async () => {
  try {
    const response = await client.trades.getTrades({marketId:'XRP-AUD', limit: 3});
    console.log(response);
  } catch (error) {
    console.log('error', error);
  }
})();
```
|Param|Type|Required|Default|
|--- |--- |--- |--- |
|marketId|String|false|optionally filter trades by marketId (e.g. XRP-AUD)|
|OrderId|String|false|optionally list all trades for a single order|
|before|Number|false|Example: before=78234976this is part of the pagination parameters.|
|after|Number|false|Example: after=78234876this is part of the pagination parameters.|
|limit|Number|false|Example: limit=10 this is part of the pagination parameters.|

<details>

<summary>output</summary>

```js
{ data:
   [ { id: '818075',
       marketId: 'XRP-AUD',
       timestamp: '2019-07-10T00:56:34.882000Z',
       price: '205.1554',
       amount: '0.002',
       side: 'Ask',
       fee: '0.00340557',
       orderId: '818064',
       liquidityType: 'Taker' },
     { id: '818061',
       marketId: 'XRP-AUD',
       timestamp: '2019-07-10T00:55:10.209000Z',
       price: '205.1554',
       amount: '0.001',
       side: 'Ask',
       fee: '0.00170278',
       orderId: '818050',
       liquidityType: 'Taker' },
     { id: '818047',
       marketId: 'XRP-AUD',
       timestamp: '2019-07-10T00:54:03.702000Z',
       price: '205.1554',
       amount: '0.001',
       side: 'Ask',
       fee: '0.00170278',
       orderId: '818036',
       liquidityType: 'Taker' } ],
  paging: { before: '818075', after: '818047', limit: 3 } }
```

</details>

#### trade by id
Retrieves a trade by id.
```js
(async () => {
  try {
    const response = await client.trades.getTradeById('818033');
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})();
```

Param|Type|Required|Default|
|--- |--- |--- |--- |
|id|String|true| |

<details>
<summary>output</summary>

```js
{ 
  id: '818033',
  marketId: 'XRP-AUD',
  timestamp: '2019-07-10T00:49:36.397000Z',
  price: '205.1554',
  amount: '0.001',
  side: 'Ask',
  fee: '0.00170278',
  orderId: '818022',
  liquidityType: 'Taker'
 }
```

</details>

### Order Placement APIs
#### place new order
This API is used to place a new order

```js
(async () => {
  try {
    const newOrder = {
      marketId: 'BTC-AUD',
      price: '100.12',
      amount: '1.034',
      type: 'Limit',
      side: 'Bid',
    };
    const response = await client.orders.placeNewOrder(newOrder);
    console.log(response);
  } catch (error) {
    console.log('error', error);
  }
})();
```

|Param|Type|Required|Description|
|--- |--- |--- |--- |
|marketId|String|true|name of the asset to withdraw e.g. AUD or BTC|
|price|String|true|
|amount|string|true|
|type|String|true|Enum: "Limit" "Market" "Stop Limit" "Stop" "Take Profit"type of the order bank information is used|
|side|string|true|Enum: "Bid" "Ask" side of the order
triggerPrice|string|false|this is mandatory if order type is Stop, Stop Limit or Take Profit
targetAmount|string|false|specifiy target amount when a desired target outcome is required for order execution
timeInForce|string|false|possible values are GTC (default option) , FOK and IOC
postOnly|string|false|if this is a post-only order
selfTrade|string|false|A or P
clientOrderId|string|false|a unique order id speciifed by client app.

<details>
<summary>Output</summary>

```js
{
  "orderId": "7524",
  "marketId": "BTC-AUD",
  "side": "Bid",
  "type": "Limit",
  "creationTime": "2019-08-30T11:08:21.956000Z",
  "price": "100.12",
  "amount": "1.034",
  "openAmount": "1.034",
  "status": "Accepted"
}
```

</details>

#### list orders
Returns an array of historical orders or open orders only. All query string parametesr are optional so by default and when no query parameter is provided, this API retrieves open orders only for all markets. This API supports pagination only when retrieving all orders status=all, When sending using status=open all open orders are returned and with no pagination.
```js
(async () => {
  try {
    const response = await client.orders.getOrders({ limit: 3 });
    console.log(response);
  } catch (error) {
    console.log('error', error);
  }
})();
```
|Param|Type|Required|Default|
|--- |--- |--- |--- |
|marketId|String|false|Example: marketId=ETH-AUD by default orders for all markets are returned. specify a marketId for filtering.|
|status|String|false|Enum: "open" "all" returns orders with open status or all statuses.|
|before|Number|false|Example: before=78234976this is part of the pagination parameters.|
|after|Number|false|Example: after=78234876this is part of the pagination parameters.|
|limit|Number|false|Example: limit=10 this is part of the pagination parameters.|

<details>
<summary>output</summary>

```js
{
  "orderId": "7524",
  "marketId": "BTC-AUD",
  "side": "Bid",
  "type": "Limit",
  "creationTime": "2019-08-30T11:08:21.956000Z",
  "price": "100.12",
  "amount": "1.034",
  "openAmount": "1.034",
  "status": "Accepted"
}
```

</details>

#### cancel open orders
Cancels all open orders for all markets or optionally for a given list of marketIds only.
```js
* (async () => {
  try {
    const response = await client.orders.cancelAll(['BTC-AUD', 'XRP-AUD']);
    console.log(response);
  } catch (error) {
    console.log('error', error);
  }
})();
```

|Param|Type|Required|Default|
|--- |--- |--- |--- |
|marketId|String|false|restricts cancellation for those given marketIds only. can be provided in the form of marketId=BTC-AUD&marketId=ETH-AUD|

<details>
<summary>output</summary>

```js
[
  {
    "orderId": "7524",
    "clientOrderId": "123-456"
  },
  {
    "orderId": "435",
    "clientOrderId": "abc"
  }
]
```

</details>

#### get an order
Returns an order by using either the exchange orderId or clientOrderId.
```js
(async () => {
  try {
    const response = await client.orders.getOrder('7524');
    console.log(response);
  } catch (error) {
    console.log('error', error);
  }
})();
```
Param|Type|Required|Default|
|--- |--- |--- |--- |
|id|String|true|

<details>
<summary>output</summary>

```js
{
  "orderId": "7524",
  "marketId": "BTC-AUD",
  "side": "Bid",
  "type": "Limit",
  "creationTime": "2019-08-30T11:08:21.956000Z",
  "price": "100.12",
  "amount": "1.034",
  "openAmount": "1.034",
  "status": "Accepted"
}
```

</details>

#### cancel an order
Cancels a single order. this API returns http error 400 if the order is realdy cancelled or matched, patrally matched.
```js
(async () => {
  try {
    const response = await client.orders.cancelOrder('7523');
    console.log(response);
  } catch (error) {
    console.log('error', error);
  }
})();
```
Param|Type|Required|Default|
|--- |--- |--- |--- |
|id|String|true|

<details>
<summary>output</summary>

```js
{
  "orderId": "7523",
  "clientOrderId": "123-456"
}
```

</details>

### Batch Order APIs

#### place and cancel orders
Use this API to place multiple new orders or cancel existing ones via a single request.Batch operations are only containers for multiple requests, so each individual request is handled separately from the rest of the requests in the batch.
Once all items in the batch are processed then a single response containing orders added and orders cancalled is returned along with an attribute called unprocessedRequests that is an array of any item in the batch thet can't be processed.

Note that you must provide clientOrderId when placing orders in batch. This allows items inside a batch request to be tracked and processed accurately. When cancelling orders, you can either use orderId or clientOrderId within the request. clientOrderId is only mandatory for creating new orders.

rrequestId that appears inside the `unprocessedRequests` represents whatever id was used to identify an order (e.g., clientOrderId or orderId)

```js
(async () => {
    try {
        const response = await client.batches.batchOrders([
            {
                placeOrder: {
                    marketId: 'BTC-AUD',
                    side: 'ASK',
                    type: 'Limit',
                    price: '112',
                    amount: '1.03',
                    clientOrderId: '44',
                },
                cancelOrder: { clientOrderId: '43' },
            },
            {
                placeOrder: {
                    marketId: 'BTC-AUD',
                    side: 'ASK',
                    type: 'Limit',
                    price: '112',
                    amount: '1.03',
                    clientOrderId: '45',
                },
                cancelOrder: { orderId: '533467439' },
            },
        ]);
        console.log(response.data.placeOrders, 'placeOrders');
        console.log(response.data.cancelOrders, 'cancelOrders');
        console.log(response.data.unprocessedRequests, 'unprocessedRequests');
    } catch (error) {
        console.log(error);
    }
})();
```

Param|Type|Required|Default|
|--- |--- |--- |--- |
|marketId|String|true|
|side|String|true|
|type|String|true|
|price|String|true|
|amount|String|true|
|clientOrderId|String|true|clientOrderId must be provided when creating new orders|
|orderId|String|true|When cancelling orders, you can either use orderId or clientOrderId|


<details>
<summary>output</summary>

```js
{
  "placeOrders": [
    {
      "orderId": "752132",
      "marketId": "BTC-AUD",
      "side": "Ask",
      "type": "Limit",
      "creationTime": "2019-09-01T17:38:17.404000Z",
      "price": "112",
      "amount": "1.03",
      "openAmount": "1.03",
      "status": "Accepted",
      "clientOrderId": "44"
    }
  ],
  "cancelOrders": [
    {
      "orderId": "752129",
      "clientOrderId": "43"
    }
  ],
    "unprocessedRequests": []
}
```

</details>

#### get orders by Id
Retrieves batch of orders by using either the exchange orderId or clientOrderId.
```js
(async () => {
  try {
    const response = await client.batches.getOrdersById([12, 'abcdefgh', 751843]);
    console.log(response.data.orders, 'orders');
    console.log(response.data.unprocessedRequests, 'unprocessedRequests');
  } catch (error) {
    console.log(error);
  }
})();
```

Param|Type|Required|Default|
|--- |--- |--- |--- |
|Ids|String|true|comma delimited list of ids|

<details>
<summary>output</summary>

```js
{
  "orders": [
  {
    "orderId": "751843",
    "marketId": "BTC-AUD",
    "side": "Ask",
    "type": "Limit",
    "creationTime": "2019-08-29T13:12:33.576000Z",
    "price": "148",
    "amount": "1.1",
    "openAmount": "1.1",
    "status": "Cancelled",
    "clientOrderId": "2"
  }
  ],
  "unprocessedRequests": [
  {
    "code": "OrderNotFound",
    "message": "order was not found",
    "requestId": "abcdefgh"
  },
  {
    "code": "OrderNotFound",
    "message": "order was not found",
    "requestId": "12"
  }
  ]
}
```

</details>


#### cancel orders by Id
This API can be used to cancel a list of orders specified by id in a single request.

```js
(async () => {
    try {
        const response = await client.batches.cancelOrdersById([39, 36, 1]);
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
})();
```

Param|Type|Required|Default|
|--- |--- |--- |--- |
|Ids|String|true|comma delimited list of ids|


<details>
<summary>output</summary>

```js
{
  "cancelOrders": [
  {
    "orderId": "414186",
    "clientOrderId": "39"
  },
  {
    "orderId": "414192",
    "clientOrderId": "36"
  }
  ],
  "unprocessedRequests": [
  {
    "code": "OrderAlreadyCancelled",
    "message": "order is already cancelled.",
    "requestId": "1"
  }
  ]
}
```

</details>

### Report APIs

#### create new report
request to generate a new report.
```js
(async () => {
  try {
    const response = await client.reports.createReport({
      type: 'TransactionReport',
      format: 'json',
    });
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})()
```

Param|Type|Required|Default|
|--- |--- |--- |--- |
|type|String|true|ype of the report. the only accepted value is TransactionReport at this stage.|
|format|String|true|value can be either csv or json|


#### get report by Id

This API returns details of the report once it's been created via the previous API.

On average report generation takes about 20 seconds so please allow at least 10 seconds and recommended 30 seconds before attempting to get detail of the report after requesting it via the previous API. Trying too quickly to get detail a newly created report will result in http 404 response. A successful response of this API contains a link that you can use to download the report content.

Transaction report covers all historical changes made to all of your wallets including deposit/withdrawals, order executions and trading fees.

```js
(async () => {
  try {
    const response = await client.reports.getReportById('75rtip0dqo7j8944le9ffsf3jj', true);
    if (response.data) {
      download(response.data.file, response.data.format);
    }
  } catch (error) {
    console.log('error', error);
  }
})();

function download(buffer, fileType) {
  const path = Path.resolve(__dirname, 'report.' + fileType);
  const file = fs.createWriteStream(path);
  file.write(buffer);

  return new Promise((resolve, reject) => {
    file.on('end', () => {
      resolve();
    });

    file.on('error', err => {
      reject(err);
    });
  });
}
```

Param|Type|Required|Default|
|--- |--- |--- |--- |
|reportId|String|true|
|boolean|boolean|false|fasle by default, if boolean is true then it will download the report file|


<details>

<summary>output</summary>

The attribute contentUrl inside the response is a link to download the report content (in either json or csv format). Please note that report content files are only available for download for up to 30 minutes after creation time.

```js
{
  "id": "jsqmkd72lmd13cd0",
  "contentUrl": "https://report.s3.ap-southeast-2.amazonaws.com/jsqmkd72lmd13cd0",
  "creationTime": "2019-08-20T18:08:06.110000Z",
  "type": "TransactionReport",
  "status": "Complete",
  "format": "json"
}
```

</details>

### websocket

#### websocket subscription
Sending subscribe message allows you to start receiving events for the specified channels and marketIds.
```js
const webSocket = client.socket;
      webSocket.subscribe({
      marketIds: ['LTC-AUD'],
      channels: ['heartbeat', 'trade'],
    });
```
open, message, error and close events can be emitted from webSocket.

```js
webSocket.on('open', () => {
        console.log('connected...');
});
webSocket.on('message', data => {
        console.log('message', JSON.stringify(data));
});
webSocket.on('error', error => {
        console.log('error', error);
});
webSocket.on('close', ws => {
        console.log('closed');
});
```

#### add remove subscriptions
add or remove subscription is used when you want to have the flexibility to change subscriptions at runtime.

```js
webSocket.addSubscription({
        marketIds: ['BTC-AUD', 'ETH-AUD', 'LTC-AUD'],
        channels: ['orderbook'],
 });
 webSocket.removeSubscription({
        marketIds: ['BTC-AUD', 'ETH-AUD', 'LTC-AUD'],
        channels: ['trade'],
 });
```

#### websocket events
##### trade
`trade` is a public event covering new trades in a given market
```js
const webSocket = client.socket;
      webSocket.subscribe({
      marketIds: ['BTC-AUD'],
      channels: ['trade'],
    });
```

<details>

<summary>output</summary>

```js
{ 
  marketId: 'BTC-AUD',
  timestamp: '2019-04-08T20:54:27.632Z',
  tradeId: 3153171493,
  price: '7370.11',
  volume: '0.10901605',
  side: 'Ask',
  messageType: 'trade'
}
```
</details>

##### tick
`tick` is a public event and is published every time lastPrice, bestBid or bestAsk is updated which is the result of orderbook changes or trade matches.

```js
const webSocket = client.socket;
      webSocket.subscribe({
      marketIds: ['BTC-AUD'],
      channels: ['tick'],
     });
```

<details>

<summary>output</summary>

```js
{ 
  marketId: 'BTC-AUD',
  timestamp: '2019-04-08T18:56:17.405Z',
  bestBid: '7309.12',
  bestAsk: '7326.88',
  lastPrice: '7316.81',
  volume24h: '299.12936654',
  messageType: 'tick'
}
```
</details>

##### heartbeat
if you subscribe to heartbeat event then the server will send you a heartbeat event every 5 seconds.

```js
const webSocket = client.socket;
      webSocket.subscribe({
      marketIds: ['LTC-AUD'],
      channels: ['heartbeat','tick'],
     });
```

<details>

<summary>output</summary>

```js
message {"messageType":"heartbeat","data":{"channels":[{"name":"tick","marketIds":["LTC-AUD"]},{"name":"heartbeat"}]}}
```
</details>


##### orderbook event
`orderbook` event is pubic  and represents the latest state of the orderbook with a maximum of 50 bids, and asks included in each event.

```js
const webSocket = client.socket;
      webSocket.subscribe({
      marketIds: ['BTC-AUD'],
      channels: ['orderbook'],
     });
```

<details>

<summary>output</summary>

```js
{ 
   marketId: 'BTC-AUD',
   timestamp: '2019-04-08T22:23:37.643Z',
   bids:
      [ [ '7418.46', '0.04' ],
        [ '7418.45', '0.56' ],
        [ '7100', '0.01' ] ]
  asks:
        [ [ '7437.53', '0.76' ],
          [ '7437.54', '0.3646349' ],
          [ '7446.94', '0.6' ],
          [ '7700', '0.1' ] ]
  messageType: 'orderbook'
}
```
</details>

##### orderchange
`orderchange` is a private event which requires authentication using api key and secret. This event is published when there is any change in the order status, including placement, matching, cancellation, and triggering.
```js
const webSocket = client.socket;
      webSocket.subscribe({
      marketIds: ['BTC-AUD'],
      channels: ['orderChange'],
     });
```

<details>

<summary>output</summary>
Placed

```js
{ 
   orderId: 79003,
    marketId: 'BTC-AUD',
    side: 'Bid',
    type: 'Limit',
    openVolume: '1',
    status: 'Placed',
    triggerStatus: '',
    trades: [],
    timestamp: '2019-04-08T20:41:19.339Z',
    messageType: 'orderChange'
}
```

Triggered

```js
{ 
   orderId: 7903,
    marketId: 'BTC-AUD',
    side: 'Bid',
    type: 'Limit',
    openVolume: '1.2',
    status: 'Placed',
    triggerStatus: 'Triggered',
    trades: [],
    timestamp: '2019-04-08T20:41:41.857Z',
    messageType: 'orderChange'
}
```
</details>

##### fundchange
Those events are published when deposit or withdraws of funds are requested by a user or approved by the system (and result in balance updates). Channel name used is fundChange.

```js
const webSocket = client.socket;
      webSocket.subscribe({
      channels: ['fundChange'],
     });
```

<details>

<summary>output</summary>

```js
{ 
  fundtransferId: 276811,
  type: 'Deposit',
  status: 'Complete',
  timestamp: '2019-04-16T01:38:02.931Z',
  amount: '0.001',
  currency: 'BTC',
  fee: '0',
  messageType: 'fundChange'
}
```
</details>

##### error

### Error handling

## Local Development

Below is a list of commands you will probably find useful.

#### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

Your library will be rebuilt if you make edits.

#### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

#### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.

### TSLint

The tslint.json file contains a set of rules on the style of the code for the project.

### Prettier

The .prettierrc file contains rules for code formatting for the project.


## Contributing

BTC Markets welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](CONTRIBUTING.md).

## License

MIT License

Copyright (c) 2019 BTC Markets Pty Ltd

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


