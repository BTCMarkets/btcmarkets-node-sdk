const BTCMarkets = require('../dist/btcmarkets-node-sdk.cjs.development').default;

const client = new BTCMarkets({ key: 'XXX', secret: 'XXX' });

(() => {
    const webSocket = client.socket;
    webSocket.subscribe({
        marketIds: ['BTC-AUD'],
        channels: ['tick'],
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
    webSocket.on('close', ws => {
        console.log('closed');
    });

    setTimeout(() => {
        webSocket.addSubscription({
            marketIds: ['BTC-AUD', 'ETH-AUD', 'LTC-AUD'],
            channels: ['orderbook', 'trade'],
        });
    }, 30000);

    setTimeout(() => {
        webSocket.removeSubscription({
            marketIds: ['BTC-AUD', 'ETH-AUD', 'LTC-AUD'],
            channels: ['trade'],
        });
    }, 60000);

    setTimeout(() => {
        webSocket.close();
    }, 120000);
})();
