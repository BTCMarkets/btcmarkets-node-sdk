import BTCMarkets from '../src';

describe('BTCMarkets API client', () => {
    it('works with key and secret', async () => {
        const client = new BTCMarkets({ key: 'key', secret: 'secret' });
        const response = await client.markets.getActiveMarkets();
        expect(response.data).not.toBe(null);
    });
});
