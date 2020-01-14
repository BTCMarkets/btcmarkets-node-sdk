const BTCMarkets = require('../dist/btcmarkets-node-sdk.cjs.development').default;

const client = new BTCMarkets({ key: 'XXX', secret: 'XXX' });

(() => {
    const webSocket = client.socket;

    webSocket.subscribe({
        marketIds: ['BTC-AUD', 'XRP-BTC'],
        channels: ['orderbookUpdate'],
    });
    webSocket.on('open', () => {
        console.log('connected...');
    });
    webSocket.on('message', data => {
        console.log('message', JSON.stringify(data));
    });
    webSocket.on('error', error => {
        console.log('error', error);
    });
    webSocket.on('close', () => {
        console.log('closed');
    });
})();
