import { AxiosRequestConfig } from 'axios';
/**
 * request object template structure
 */
export declare type RequestImpl = {
    /**
     * calls a get request to the specified endpoint
     *
     */
    get: (endpoint: string, headers?: {}) => Promise<any>;
    /**
     *
     *
     */
    post: (endpoint: string, payload: any, headers?: {}) => Promise<any>;
    /**
     *
     *
     */
    patch: (endpoint: string, payload: any, headers: {}) => Promise<any>;
    put: (endpoint: string, payload: any, headers?: {}) => Promise<any>;
    delete: (endpoint: string, headers?: {}) => Promise<any>;
};
/**
 *
 * @param api
 * @returns
 */
export declare const Request: (options: AxiosRequestConfig) => RequestImpl;
/**
 *
 *
 * @export
 * @interface ApiProviderImpl
 */
export interface ApiProviderImpl {
    /**
     *
     *
     * @param {*} resource
     * @param {*} params
     * @return {*}  {Promise<any>}
     * @memberof ApiProviderImpl
     */
    getList(resource: any, params: any): Promise<any>;
    /**
     *
     * @param resource
     * @param params
     */
    getOne(resource: any, params: any): Promise<any>;
    /**
     *
     * @param resource
     * @param params
     */
    getMany(resource: any, params: any): Promise<any>;
    /**
     *
     * @param resource
     * @param params
     */
    getManyReference(resource: any, params: {
        pagination: {
            page: any;
            perPage: any;
        };
        sort: {
            field: any;
            order: any;
        };
        filter: any;
        target: any;
        id: any;
    }): Promise<any>;
    /**
     *
     *
     * @param {*} resource
     * @param {{ id: any; data: any }} params
     * @return {*}  {Promise<any>}
     * @memberof ApiProviderImpl
     */
    update(resource: any, params: {
        id: any;
        data: any;
    }): Promise<any>;
    /**
     *
     *
     * @param {*} resource
     * @param {{ ids: any; data: any }} params
     * @return {*}  {Promise<any>}
     * @memberof ApiProviderImpl
     */
    updateMany(resource: any, params: {
        ids: any;
        data: any;
    }): Promise<any>;
    /**
     *
     *
     * @param {*} resource
     * @param {{ data: any }} params
     * @return {*}  {Promise<any>}
     * @memberof ApiProviderImpl
     */
    create(resource: any, params: {
        data: any;
    }): Promise<any>;
    /**
     *
     *
     * @param {*} resource
     * @param {{ id: any }} params
     * @return {*}  {Promise<any>}
     * @memberof ApiProviderImpl
     */
    delete(resource: any, params: {
        id: any;
    }): Promise<any>;
    /**
     *
     *
     * @param {*} resource
     * @param {{ ids: any }} params
     * @return {*}  {Promise<any>}
     * @memberof ApiProviderImpl
     */
    deleteMany(resource: any, params: {
        ids: any;
    }): Promise<any>;
    /**
     *
     *
     * @return {*}  {RequestImpl}
     * @memberof ApiProviderImpl
     */
    getRequest(): RequestImpl;
}
/**
 *
 *
 * @export
 * @class ApiProvider
 * @implements {ApiProviderImpl}
 */
export declare class ApiProvider implements ApiProviderImpl {
    readonly request: RequestImpl;
    /**
     * Creates an instance of ApiProvider.
     * @param {RequestImpl} request
     * @memberof ApiProvider
     */
    constructor(request: RequestImpl);
    /**
     *
     *
     * @param {*} data
     * @return {*}  {string}
     * @memberof ApiProvider
     */
    stringify(data: any): string;
    /**
     *
     *
     * @param {string} resource
     * @param {{
     * 			pagination: { page: any; perPage: any };
     * 			sort: { field: any; order: any };
     * 			filter: any;
     * 		}} params
     * @return {*}
     * @memberof ApiProvider
     */
    getList(resource: string, params: {
        pagination: {
            page: any;
            perPage: any;
        };
        sort: {
            field: any;
            order: any;
        };
        filter: any;
    }): Promise<unknown>;
    /**
     *
     *
     * @param {*} resource
     * @param {*} params
     * @return {*}
     * @memberof ApiProvider
     */
    getOne(resource: any, params: any): Promise<unknown>;
    /**
     *
     *
     * @param {*} resource
     * @param {{ ids: any }} params
     * @return {*}
     * @memberof ApiProvider
     */
    getMany(resource: any, params: {
        ids: any;
    }): Promise<unknown>;
    /**
     *
     *
     * @param {*} resource
     * @param {{
     * 			pagination: { page: any; perPage: any };
     * 			sort: { field: any; order: any };
     * 			filter: any;
     * 			target: any;
     * 			id: any;
     * 		}} params
     * @return {*}
     * @memberof ApiProvider
     */
    getManyReference(resource: any, params: {
        pagination: {
            page: any;
            perPage: any;
        };
        sort: {
            field: any;
            order: any;
        };
        filter: any;
        target: any;
        id: any;
    }): Promise<unknown>;
    /**
     *
     *
     * @param {*} resource
     * @param {{ id: any; data: any }} params
     * @return {*}  {Promise<any>}
     * @memberof ApiProvider
     */
    update(resource: any, params: {
        id: any;
        data: any;
    }): Promise<any>;
    /**
     *
     *
     * @param {*} resource
     * @param {{ ids: any; data: any }} params
     * @return {*}  {Promise<any>}
     * @memberof ApiProvider
     */
    updateMany(resource: any, params: {
        ids: any;
        data: any;
    }): Promise<any>;
    /**
     *
     *
     * @param {*} resource
     * @param {{ data: any }} params
     * @return {*}  {Promise<any>}
     * @memberof ApiProvider
     */
    create(resource: any, params: {
        data: any;
    }): Promise<any>;
    /**
     *
     *
     * @param {*} resource
     * @param {{ id: any }} params
     * @return {*}  {Promise<any>}
     * @memberof ApiProvider
     */
    delete(resource: any, params: {
        id: any;
    }): Promise<any>;
    /**
     *
     *
     * @param {*} resource
     * @param {{ ids: any }} params
     * @return {*}  {Promise<any>}
     * @memberof ApiProvider
     */
    deleteMany(resource: any, params: {
        ids: any;
    }): Promise<any>;
    /**
     *
     *
     * @return {*}  {RequestImpl}
     * @memberof ApiProvider
     */
    getRequest(): RequestImpl;
}
/**
 *
 */
export declare const GetHeaders: {
    'Content-Type': string;
    Accept: string;
};
