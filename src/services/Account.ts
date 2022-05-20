import Http from '../http';
import { HttpMethods } from '../constants/HttpMethods';
import { getParsedBody } from '../helpers/responseHelpers';
import ITransactionsRequest, {
    ITransactionsResponse,
    ITradingFeesResponse,
    IBalancesResponse,
    ITransaction,
} from '../types/Account';

export default class Account extends Http {
    public async getTradingFees(): Promise<ITradingFeesResponse> {
        let response = await this.privateRequest(HttpMethods.GET, '/accounts/me/trading-fees', null);
        return getParsedBody(response) as ITradingFeesResponse;
    }
    public async getWithdrawallimits(): Promise<any> {
        return await this.privateRequest(HttpMethods.GET, '/accounts/me/withdrawal-limits', null);
    }
    public async getBalances(): Promise<IBalancesResponse> {
        let response = await this.privateRequest(HttpMethods.GET, '/accounts/me/balances', null);
        return getParsedBody(response) as IBalancesResponse;
    }
    public async getTransactions(queryParmas: ITransactionsRequest): Promise<ITransactionsResponse> {
        let response = await this.privateRequest(HttpMethods.GET, '/accounts/me/transactions', queryParmas);
        const body = response.data as ITransaction[];
        const headers = response.headers;
        return {
            data: body,
            paging: this.getPaging(headers, queryParmas.limit),
        } as ITransactionsResponse;
    }
}
