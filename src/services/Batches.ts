import Http from '../http';
import { HttpMethods } from '../constants/HttpMethods';
import { getParsedBody } from '../helpers/responseHelpers';
import { IBatchResponse, IGetBatchResponse, ICancelBatchResponse, IBatchRequest } from './../types/Batch';

export default class Batches extends Http {
    public async batchOrders(data: IBatchRequest[]): Promise<IBatchResponse> {
        const response = await this.privateRequest(HttpMethods.POST, '/batchorders', null, data);
        return getParsedBody(response) as IBatchResponse;
    }

    public async getOrdersById(ids: string[]): Promise<IGetBatchResponse> {
        const pathIds = ids.join(',');
        const response = await this.privateRequest(HttpMethods.GET, `/batchorders/${pathIds}`, null, null);
        return getParsedBody(response) as IGetBatchResponse;
    }

    public async cancelOrdersById(ids: string[]): Promise<ICancelBatchResponse> {
        const pathIds = ids.join(',');
        const response = await this.privateRequest(HttpMethods.DELETE, `/batchorders/${pathIds}`, null, null);
        return getParsedBody(response) as ICancelBatchResponse;
    }
}
