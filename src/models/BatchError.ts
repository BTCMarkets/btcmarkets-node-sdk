import BaseError from './BaseError';

export default class BatchError extends BaseError {
    requestId: string;
    constructor(code: string, message: string, requestId: string) {
        super(code, message);
        this.requestId = requestId;
    }
}
