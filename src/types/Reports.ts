import { IBaseResponse } from './Response';

//Requests
export interface INewReportRequest {
    type: string;
    format: string;
}

//Responses
export interface ICreateReportResponse extends IBaseResponse {
    data: { reportId: string };
}

export interface IGetReportResponse extends IBaseResponse {
    data: IReport;
}

export interface IReport {
    id: string;
    contentUrl: string;
    creationTime: string;
    type: string;
    status: string;
    format: string;
    file: any;
}
