import axios, { AxiosInstance } from 'axios';
import { IClientConfig } from './types/Client';
import config from './config';
import { BASE_URL, API_VERSION } from './constants';
import { HttpMethods } from './constants/HttpMethods';
import { buildAuthHeaders } from './helpers/authHelpers';
import { getParsedError } from './helpers/responseHelpers';
import { IPaging } from './types/Paging';

class Http {
    private config: IClientConfig;
    private instance: AxiosInstance;

    constructor() {
        this.config = config;
        this.instance = axios.create({
            baseURL: BASE_URL + API_VERSION,
            headers: {
                'Accept-Charset': 'UTF-8',
                'Content-Type': 'application/json',
            },
            responseType: 'json',
            timeout: 5000,
        });
    }

    public getPaging(headers: object | any, limit: number | null) {
        const pagination = {
            before: headers['bm-before'],
            after: headers['bm-after'],
            limit: limit,
        };
        return pagination as IPaging;
    }

    public async publicRequest(method: HttpMethods, path: string, query: object | null) {
        const requestConfig = {
            method,
            url: path,
            params: query,
        };

        try {
            return await this.instance.request(requestConfig);
        } catch (error) {
            throw getParsedError(error); // new Error(error.message);
        }
    }

    public async privateRequest(method: HttpMethods, path: string, query: object | null | string, data: object | null) {
        const { key, secret } = this.config;

        if (!key || !secret) {
            throw new Error('you must provide a key and secret to make this API request');
        }

        const headers = buildAuthHeaders(method, path, data, key, secret);

        const requestConfig = {
            headers,
            method,
            url: path,
            params: query,
            data,
        };

        try {
            return await this.instance.request(requestConfig);
        } catch (error) {
            throw getParsedError(error);
        }
    }

    public async downloadRequest(url: string) {
        const requestConfig = {
            method: HttpMethods.GET,
            url: url,
            responseType: 'arraybuffer' as 'arraybuffer',
        };
        try {
            const response = await this.instance.request(requestConfig);
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }
}
export default Http;
