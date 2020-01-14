import Http from '../http';
import { HttpMethods } from '../constants/HttpMethods';
import { getParsedBody } from '../helpers/responseHelpers';
import {
    IMarketsResponse,
    ITickerResponse,
    ITickersResponse,
    ITicker,
    IMarketTradesRequest,
    IMarketTradesResponse,
    IOrderbookRequest,
    IOrderbookResponse,
    IOrderbooksResponse,
    ICandlesRequest,
    IMarketTrade,
} from '../types/Markets';

export default class Markets extends Http {
    public async getActiveMarkets(): Promise<IMarketsResponse> {
        let response = await this.publicRequest(HttpMethods.GET, '/markets', null);
        return getParsedBody(response) as IMarketsResponse;
    }
    public async getMarketTrades(queryParmas: IMarketTradesRequest): Promise<IMarketTradesResponse> {
        let response = await this.publicRequest(
            HttpMethods.GET,
            `/markets/${queryParmas.marketId}/trades`,
            queryParmas
        );
        const body = response.data as IMarketTrade[];
        const headers = response.headers;
        return {
            data: body,
            paging: this.getPaging(headers, queryParmas.limit),
        } as IMarketTradesResponse;
    }
    public async getTicker(queryParmas: ITicker): Promise<ITickerResponse> {
        let response = await this.publicRequest(HttpMethods.GET, `/markets/${queryParmas.marketId}/ticker`, null);
        return getParsedBody(response) as ITickerResponse;
    }
    public async getTickers(queryParmas: ITicker): Promise<ITickersResponse> {
        let response = await this.publicRequest(HttpMethods.GET, `/markets/tickers`, queryParmas);
        return getParsedBody(response) as ITickersResponse;
    }
    public async getOrderbook(queryParmas: IOrderbookRequest): Promise<IOrderbookResponse> {
        let response = await this.publicRequest(
            HttpMethods.GET,
            `/markets/${queryParmas.marketId}/orderbook`,
            queryParmas
        );
        return getParsedBody(response) as IOrderbookResponse;
    }
    public async getOrderbooks(queryParmas: IOrderbookRequest): Promise<IOrderbooksResponse> {
        let response = await this.publicRequest(HttpMethods.GET, `/markets/orderbooks`, queryParmas);
        return getParsedBody(response) as IOrderbooksResponse;
    }
    public async getCandles(queryParmas: ICandlesRequest): Promise<any> {
        let response = await this.publicRequest(
            HttpMethods.GET,
            `/markets/${queryParmas.marketId}/candles`,
            queryParmas
        );
        return getParsedBody(response);
    }
}
