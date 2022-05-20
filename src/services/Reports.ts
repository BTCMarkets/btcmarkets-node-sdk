import Http from '../http';
import BaseError from '../models/BaseError';
import { HttpMethods } from '../constants/HttpMethods';
import { getParsedBody } from '../helpers/responseHelpers';
import { INewReportRequest, IGetReportResponse, ICreateReportResponse } from './../types/Reports';

export default class Reports extends Http {
    public async createReport(report: INewReportRequest): Promise<ICreateReportResponse> {
        if (!report) {
            throw new BaseError('InvalidReportParameter', 'Report arguments are missing');
        }

        if (!report.type) {
            throw new BaseError('InvalidReportParameter', 'invalid report type');
        }
        if (!report.format) {
            throw new BaseError('InvalidReportParameter', 'invalid report format');
        }

        const response = await this.privateRequest(HttpMethods.POST, '/reports', null, report);
        return getParsedBody(response);
    }

    public async getReportById(id: string, withFileData: boolean = false): Promise<IGetReportResponse> {
        const response = await this.privateRequest(HttpMethods.GET, `/reports/${id}`, null);
        const result = getParsedBody(response) as IGetReportResponse;
        if (result && result.data && withFileData) {
            const fileData = await this.downloadRequest(result.data.contentUrl);
            result.data.file = fileData;
        }
        return result;
    }
}
