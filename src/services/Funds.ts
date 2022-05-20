import Http from '../http';
import { HttpMethods } from '../constants/HttpMethods';
import { getParsedBody } from '../helpers/responseHelpers';
import {
    IAssetsResponse,
    IFundTransfersResponse,
    ICryptoWithdrawRequest,
    IFiatWithdrawRequest,
    IFundTransferRequest,
    IDepositAddressResponse,
    IDepositAddress,
    IWithdrawalFeesResponse,
    IFundTransferResponse,
    IFundTranser,
} from '../types/Funds';

export default class Funds extends Http {
    public async getAssets(): Promise<IAssetsResponse> {
        let response = await this.publicRequest(HttpMethods.GET, '/assets', null);
        return getParsedBody(response) as IAssetsResponse;
    }
    public async getWithdrawalFees(): Promise<IWithdrawalFeesResponse> {
        let response = await this.publicRequest(HttpMethods.GET, '/withdrawal-fees', null);
        return getParsedBody(response) as IWithdrawalFeesResponse;
    }
    public async getDepositAddress(queryParmas: IDepositAddress): Promise<IDepositAddressResponse> {
        let response = await this.privateRequest(HttpMethods.GET, '/addresses', queryParmas);
        return getParsedBody(response) as IDepositAddressResponse;
    }
    public async getTransfers(queryParmas: IFundTransferRequest): Promise<IFundTransfersResponse> {
        let response = await this.privateRequest(HttpMethods.GET, '/transfers', queryParmas);
        const body = response.data as IFundTranser[];
        const headers = response.headers;
        return {
            data: body,
            paging: this.getPaging(headers, queryParmas.limit),
        } as IFundTransfersResponse;
    }
    public async getTransferById(id: string): Promise<IFundTransferResponse> {
        let response = await this.privateRequest(HttpMethods.GET, `/transfers/${id}`, null);
        return getParsedBody(response) as IFundTransferResponse;
    }
    public async getWithdrawById(id: string): Promise<IFundTransferResponse> {
        let response = await this.privateRequest(HttpMethods.GET, `/withdrawals/${id}`, null);
        return getParsedBody(response) as IFundTransferResponse;
    }
    public async getWithdrawls(queryParmas: IFundTransferRequest): Promise<IFundTransfersResponse> {
        let response = await this.privateRequest(HttpMethods.GET, '/withdrawals', queryParmas);
        const body = response.data as IFundTranser[];
        const headers = response.headers;
        return {
            data: body,
            paging: this.getPaging(headers, queryParmas.limit),
        } as IFundTransfersResponse;
    }
    public async getDeposits(queryParmas: IFundTransferRequest): Promise<IFundTransfersResponse> {
        let response = await this.privateRequest(HttpMethods.GET, '/deposits', queryParmas);
        const body = response.data as IFundTranser[];
        const headers = response.headers;
        return {
            data: body,
            paging: this.getPaging(headers, queryParmas.limit),
        } as IFundTransfersResponse;
    }
    public async getDepositById(id: string): Promise<IFundTransferResponse> {
        let response = await this.privateRequest(HttpMethods.GET, `/deposits/${id}`, null);
        return getParsedBody(response) as IFundTransferResponse;
    }
    public async withdrawCrypto(data: ICryptoWithdrawRequest): Promise<IFundTransfersResponse> {
        let response = await this.privateRequest(HttpMethods.POST, '/withdrawals', null, data);
        return getParsedBody(response) as IFundTransfersResponse;
    }
    public async withdrawFiat(data: IFiatWithdrawRequest): Promise<IFundTransfersResponse> {
        let response = await this.privateRequest(HttpMethods.POST, '/withdrawals', null, data);
        return getParsedBody(response) as IFundTransfersResponse;
    }
}
