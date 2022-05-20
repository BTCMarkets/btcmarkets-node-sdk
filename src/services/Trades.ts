import Http from '../http';
import { HttpMethods } from '../constants/HttpMethods';
import { getParsedBody } from '../helpers/responseHelpers';
import { ITradeRequest, ITradeResponse, ITradesResponse, ITrade } from '../types/Trades';

export default class Trades extends Http {
    public async getTradeById(id: string): Promise<ITradeResponse> {
        let response = await this.privateRequest(HttpMethods.GET, `/trades/${id}`, null);
        return getParsedBody(response) as ITradeResponse;
    }
    public async getTrades(queryParmas: ITradeRequest): Promise<ITradesResponse> {
        let response = await this.privateRequest(HttpMethods.GET, '/trades', queryParmas);
        const body = response.data as ITrade[];
        const headers = response.headers;
        return {
            data: body,
            paging: this.getPaging(headers, queryParmas.limit),
        } as ITradesResponse;
    }
}
