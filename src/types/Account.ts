import { IBaseResponse } from './Response';
import { IPaging } from './Paging';

export interface ITradingFees {
    volume30Day: string;
    feeByMarkets: [
        {
            marketId: string;
            makerFeeRate: string;
            takerFeeRate: string;
        }
    ];
}
export interface ITradingFeesResponse extends IBaseResponse {
    data: ITradingFees[];
}

export interface IBalance {
    assetName: string;
    balance: string;
    available: string;
    locked: string;
}
export interface IBalancesResponse extends IBaseResponse {
    data: IBalance[];
}
export interface ITransaction {
    id: string;
    creationTime: string;
    description: string;
    assetName: string;
    amount: string;
    balance: string;
    type: string;
    recordType: string;
    referenceId: string;
}
export interface ITransactionsResponse extends IBaseResponse {
    data: ITransaction[];
    paging: IPaging;
}
export default interface ITransactionsRequest {
    assetName: string;
    limit: number;
    before: number;
    after: number;
}
