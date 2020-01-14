import { IBaseResponse } from './Response';
import { IPaging } from '../types/Paging';

export interface IAsset {
    assetName: string;
    minDepositAmount: string;
    maxDepositAmount: string;
    depositDecimals: string;
    minWithdrawalAmount: string;
    maxWithdrawalAmount: string;
    WithdrawalDecimals: string;
    withdrawalFee: string;
    depositFee: string;
}
export interface IAssetsResponse extends IBaseResponse {
    data: IAsset[];
}

export interface ICryptoWithdrawRequest {
    assetName: string;
    amount: string;
    toAddress: string;
}

export interface IFiatWithdrawRequest {
    assetName: string;
    amount: string;
    accountName: string;
    accountNumber: string;
    bsbNumber: string;
    bankName: string;
}

export interface IPaymentDetail {
    address: string;
    txId: string;
}

export interface IFundTranser {
    id: string;
    assetName: string;
    amount: string;
    type: string;
    creationTime: string;
    status: string;
    description: string;
    fee: string;
    lastUpdate: string;
    paymentDetail: IPaymentDetail;
}

export interface IFundTransfersResponse extends IBaseResponse {
    data: IFundTranser[];
    paging: IPaging;
}

export interface IFundTransferResponse extends IBaseResponse {
    data: IFundTranser;
}

export interface IFundTransferRequest {
    before: number;
    after: number;
    limit: number;
}

export interface IDepositAddress {
    address: string;
    assetName: string;
}

export interface IDepositAddressResponse extends IBaseResponse {
    data: IDepositAddress;
}

export interface IWithdrawalFee {
    assetName: string;
    fee: string;
}

export interface IWithdrawalFeesResponse extends IBaseResponse {
    data: IWithdrawalFee[];
}
