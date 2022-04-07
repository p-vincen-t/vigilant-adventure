"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_string_1 = require("query-string");
const logger_1 = require("../utils/logger");
/**
 *
 * @param api
 * @returns
 */
exports.Request = (api) => {
    api.interceptors.request.use((config) => {
        var url = config.url;
        //config.headers = GetHeaders
        //config.data = stringify(config.data);
        logger_1.info({
            name: 'http request',
            msg: {
                url,
                data: config.data,
                headers: config.headers
            }
        });
        return config;
    });
    const HandleResponse = (response) => {
        logger_1.info({
            name: 'http response',
            msg: response.data
        });
        return Promise.resolve(response);
    };
    const HandleError = (error) => {
        logger_1.error({
            name: 'http error',
            msg: error.toJSON()
        });
        return Promise.reject(error.response);
    };
    return {
        get: (endpoint, headers = {}) => api
            .get(endpoint, headers)
            .then((res) => HandleResponse(res))
            .catch((error) => HandleError(error)),
        post: (endpoint, payload, headers = {}) => api
            .post(endpoint, payload, headers)
            .then((res) => HandleResponse(res))
            .catch((error) => HandleError(error)),
        patch: (endpoint, payload, headers = {}) => api
            .patch(endpoint, payload, headers)
            .then((res) => HandleResponse(res))
            .catch((error) => HandleError(error)),
        put: (endpoint, payload, headers = {}) => api
            .put(endpoint, payload, headers)
            .then((res) => HandleResponse(res))
            .catch((error) => HandleError(error)),
        delete: (endpoint, headers = {}) => api
            .delete(endpoint, headers)
            .then((res) => HandleResponse(res))
            .catch((error) => HandleError(error))
    };
};
/**
 *
 *
 * @export
 * @class ApiProvider
 * @implements {ApiProviderImpl}
 */
class ApiProvider {
    /**
     * Creates an instance of ApiProvider.
     * @param {RequestImpl} request
     * @memberof ApiProvider
     */
    constructor(request) {
        this.request = request;
    }
    /**
     *
     *
     * @param {*} data
     * @return {*}  {string}
     * @memberof ApiProvider
     */
    stringify(data) {
        return query_string_1.stringify(data);
    }
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
    getList(resource, params) {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            limit: perPage,
            offset: (page - 1) * perPage,
            sort: JSON.stringify([field, order]),
            //range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter)
        };
        return new Promise((resolve, reject) => {
            this.request
                .get(`/${resource}?${query_string_1.stringify(query)}`)
                .then(({ status, data }) => {
                resolve({
                    data: data.data,
                    total: data.count
                });
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    /**
     *
     *
     * @param {*} resource
     * @param {*} params
     * @return {*}
     * @memberof ApiProvider
     */
    getOne(resource, params) {
        return new Promise((resolve, reject) => {
            //const link = resource === 'user' ? 'auth' : resource;
            this.request
                .get(`/${resource}/${params.id}`)
                .then(({ status, data }) => {
                resolve({
                    data: data
                });
            })
                .catch((error) => {
                reject(error);
            });
        });
        // return httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
        //   data: json,
        // }))
    }
    /**
     *
     *
     * @param {*} resource
     * @param {{ ids: any }} params
     * @return {*}
     * @memberof ApiProvider
     */
    getMany(resource, params) {
        const query = {
            filter: JSON.stringify({ ids: params.ids })
        };
        // const url = `${apiUrl}/${resource}?${stringify(query)}`;
        // return httpClient(url).then(({ json }) => ({ data: json }));
        return new Promise((resolve, reject) => {
            this.request
                .get(`/${resource}?${query_string_1.stringify(query)}`)
                .then(({ status, data }) => {
                resolve({
                    data: data.data,
                    total: data.count
                });
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
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
    getManyReference(resource, params) {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(Object.assign(Object.assign({}, params.filter), { [params.target]: params.id }))
        };
        return new Promise((resolve, reject) => { });
        // const url = `${apiUrl}/${resource}?${stringify(query)}`;
        // return httpClient(url).then(({ headers, json }) => ({
        //     data: json,
        //     total: parseInt(headers.get('content-range').split('/').pop(), 10),
        // }));
    }
    /**
     *
     *
     * @param {*} resource
     * @param {{ id: any; data: any }} params
     * @return {*}  {Promise<any>}
     * @memberof ApiProvider
     */
    update(resource, params) {
        return Promise.resolve();
    }
    /**
     *
     *
     * @param {*} resource
     * @param {{ ids: any; data: any }} params
     * @return {*}  {Promise<any>}
     * @memberof ApiProvider
     */
    updateMany(resource, params) {
        return Promise.resolve();
    }
    /**
     *
     *
     * @param {*} resource
     * @param {{ data: any }} params
     * @return {*}  {Promise<any>}
     * @memberof ApiProvider
     */
    create(resource, params) {
        return Promise.resolve();
    }
    /**
     *
     *
     * @param {*} resource
     * @param {{ id: any }} params
     * @return {*}  {Promise<any>}
     * @memberof ApiProvider
     */
    delete(resource, params) {
        return Promise.resolve();
    }
    /**
     *
     *
     * @param {*} resource
     * @param {{ ids: any }} params
     * @return {*}  {Promise<any>}
     * @memberof ApiProvider
     */
    deleteMany(resource, params) {
        return Promise.resolve();
    }
    /**
     *
     *
     * @return {*}  {RequestImpl}
     * @memberof ApiProvider
     */
    getRequest() {
        return this.request;
    }
}
exports.ApiProvider = ApiProvider;
/**
 *
 */
exports.GetHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
};
//# sourceMappingURL=provider.js.map