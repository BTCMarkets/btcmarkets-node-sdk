import BaseError from '../models/BaseError';

function getParsedBody(response: any): any {
    let data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
    return { data };
}

function getParsedError(error: any): BaseError {
    let code: string = '';
    let message: string = '';
    if (error.response) {
        let parsedError;
        if (typeof error.response.data === 'string') {
            parsedError = JSON.parse(error.response.data);
        } else {
            parsedError = error.response.data;
        }
        code = parsedError.code || parsedError.status;
        message = parsedError.message;
    }

    return new BaseError(code, message);
}

export { getParsedError, getParsedBody };
