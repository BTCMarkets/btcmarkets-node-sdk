import BTCMarkets from '../src/index';

test('new bids and asks should be added', () => {
    const webSocket = new BTCMarkets().socket;
    //@ts-ignore
    webSocket._castOrderbookUpdate(createSnapshot('BTC-AUD'));

    //@ts-ignore
    const result = webSocket._castOrderbookUpdate(
        createSnapshotUpdate('BTC-AUD', 1576093627757001, [['58.05', '0.05', 1]], [['99.97', '0.2', 2]])
    );

    expect(result).not.toBeNull();
    if (result) {
        const newBid = result.bids[1]; //Choose Second element for testing sorting logic
        expect(newBid[0]).toBe('58.05');
        expect(newBid[1]).toBe('0.05');
        expect(newBid[2]).toBe(1);

        const newAsk = result.asks[2]; //Choose Third element for testing sorting logic

        expect(newAsk[0]).toBe('99.97');
        expect(newAsk[1]).toBe('0.2');
        expect(newAsk[2]).toBe(2);
    }
});

test('bids and asks elements should change', () => {
    const webSocket = new BTCMarkets().socket;
    //@ts-ignore
    webSocket._castOrderbookUpdate(createSnapshot('BTC-AUD'));

    //@ts-ignore
    const result = webSocket._castOrderbookUpdate(
        createSnapshotUpdate('BTC-AUD', 1576093627757001, [['58.13', '0.5', 15]], [['99.96', '0.15', 2]])
    );

    expect(result).not.toBeNull();
    if (result) {
        const newBid = result.bids[0];
        expect(newBid[0]).toBe('58.13');
        expect(newBid[1]).toBe('0.5');
        expect(newBid[2]).toBe(15);

        const newAsk = result.asks[1];

        expect(newAsk[0]).toBe('99.96');
        expect(newAsk[1]).toBe('0.15');
        expect(newAsk[2]).toBe(2);
    }
});

test('Bids and asks should add to top', () => {
    const webSocket = new BTCMarkets().socket;
    //@ts-ignore
    webSocket._castOrderbookUpdate(createSnapshot('BTC-AUD'));

    //@ts-ignore
    const result = webSocket._castOrderbookUpdate(
        createSnapshotUpdate('BTC-AUD', 1576093627757001, [['58.14', '0.5', 15]], [['99.94', '0.15', 2]])
    );

    expect(result).not.toBeNull();
    if (result) {
        const newBid = result.bids[0];
        expect(newBid[0]).toBe('58.14');
        expect(newBid[1]).toBe('0.5');
        expect(newBid[2]).toBe(15);

        const newAsk = result.asks[0];

        expect(newAsk[0]).toBe('99.94');
        expect(newAsk[1]).toBe('0.15');
        expect(newAsk[2]).toBe(2);
    }
});

test('Bids and asks should ignored if snapshotId is less or equal', () => {
    const webSocket = new BTCMarkets().socket;
    //@ts-ignore
    webSocket._castOrderbookUpdate(createSnapshot('BTC-AUD'));

    //@ts-ignore
    const result = webSocket._castOrderbookUpdate(
        createSnapshotUpdate('BTC-AUD', 1576093627757000, [['58.14', '0.5', 15]], [['99.94', '0.15', 2]])
    );

    expect(result).toBeNull();
});

test('Bids and asks should removed from snapshot when volume count is 0', () => {
    const webSocket = new BTCMarkets().socket;
    //@ts-ignore
    webSocket._castOrderbookUpdate(createSnapshot('BTC-AUD'));

    //@ts-ignore
    const result = webSocket._castOrderbookUpdate(
        createSnapshotUpdate('BTC-AUD', 1576093627757001, [['58.13', '0.5', 0]], [['99.95', '0.15', 0]])
    );

    expect(result).not.toBeNull();
    if (result) {
        expect(result.bids.length).toBe(1);
        expect(result.asks.length).toBe(1);
    }
});

test('queue should merge to snapshot', () => {
    const webSocket = new BTCMarkets().socket;
    //@ts-ignore
    webSocket._castOrderbookUpdate(
        createSnapshotUpdate('BTC-AUD', 1576093627757001, [['58.05', '0.05', 1]], [['99.97', '0.2', 2]])
    );

    //@ts-ignore
    webSocket._castOrderbookUpdate(createSnapshotUpdate('BTC-AUD', 1576093627757002, [['58.13', '0.05', 6]], []));

    //@ts-ignore
    const result = webSocket._castOrderbookUpdate(createSnapshot('BTC-AUD'));

    expect(result).not.toBeNull();
    if (result) {
        const newBid = result.bids[1]; //Choose Second element for testing sorting logic
        expect(newBid[0]).toBe('58.05');
        expect(newBid[1]).toBe('0.05');
        expect(newBid[2]).toBe(1);
        expect(result.bids[0][2]).toBe(6); //Checking if queue for multiple elements works

        const newAsk = result.asks[2]; //Choose Third element for testing sorting logic

        expect(newAsk[0]).toBe('99.97');
        expect(newAsk[1]).toBe('0.2');
        expect(newAsk[2]).toBe(2);
    }
});

test('mutliple market queues should merge to snapshot', () => {
    const webSocket = new BTCMarkets().socket;
    //@ts-ignore
    webSocket._castOrderbookUpdate(
        createSnapshotUpdate('BTC-AUD', 1576093627757001, [['58.05', '0.05', 1]], [['99.97', '0.2', 2]])
    );

    //@ts-ignore
    webSocket._castOrderbookUpdate(createSnapshotUpdate('BTC-AUD', 1576093627757002, [['58.13', '0.05', 6]], []));

    //@ts-ignore
    webSocket._castOrderbookUpdate(
        createSnapshotUpdate('XRP-BTC', 1576093627757003, [['59.13', '0.5', 4]], [['98.97', '0.02', 0]])
    );

    //@ts-ignore
    const result = webSocket._castOrderbookUpdate(createSnapshot('BTC-AUD'));

    expect(result).not.toBeNull();
    if (result) {
        const newBid = result.bids[1]; //Choose Second element for testing sorting logic
        expect(newBid[0]).toBe('58.05');
        expect(newBid[1]).toBe('0.05');
        expect(newBid[2]).toBe(1);
        expect(result.bids[0][2]).toBe(6); //Checking if queue for multiple elements works

        const newAsk = result.asks[2]; //Choose Third element for testing sorting logic

        expect(newAsk[0]).toBe('99.97');
        expect(newAsk[1]).toBe('0.2');
        expect(newAsk[2]).toBe(2);
    }

    //@ts-ignore
    const xrpResult = webSocket._castOrderbookUpdate(createSnapshot('XRP-BTC'));

    console.log(xrpResult);
});

function createSnapshot(marketId: string): any {
    return {
        marketId: marketId,
        timestamp: '2019-12-11T20:35:00.486Z',
        snapshotId: 1576093627757000,
        snapshot: true,
        bids: [['58.13', '0.09', 5], ['57.12', '0.01', 1]],
        asks: [['99.95', '0.01', 1], ['99.96', '0.1', 1]],
        channel: 'orderbookUpdate',
        messageType: 'orderbookUpdate',
    };
}

function createSnapshotUpdate(marketId: string, snapshotId: number, bids: any[][], asks: any[][]): any {
    return {
        marketId: marketId,
        timestamp: '2019-12-11T19:38:58.277Z',
        snapshotId: snapshotId,
        bids: bids,
        asks: asks,
        messageType: 'orderbookUpdate',
    };
}
