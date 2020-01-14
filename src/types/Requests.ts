import { HttpMethods } from '../constants/HttpMethods';

export interface IPublicRequest {
    url: string;
    method: HttpMethods;
}

export interface IRequestError extends Error {
    httpStatusCode?: number;
}
