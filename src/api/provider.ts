import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { stringify } from 'query-string';
import { error as e, info as i } from '../utils/logger';
/**
 *
 */
export type RequestImpl = {
  /**
   *
   *
   */
  get: (endpoint: string, headers?: {}) => Promise<any>;
  post: (endpoint: string, payload: any, headers?: {}) => Promise<any>;
  patch: (endpoint: string, payload: any, headers: {}) => Promise<any>;
  put: (endpoint: string, payload: any, headers?: {}) => Promise<any>;
  delete: (endpoint: string, headers?: {}) => Promise<any>;
};
/**
 *
 * @param api
 * @returns
 */
export const Request = (api: AxiosInstance): RequestImpl => {
  api.interceptors.request.use((config) => {
    var url = config.url;
    //config.headers = GetHeaders
    //config.data = stringify(config.data);
    i({
      name: 'http request',
      msg: {
        url,
        data: config.data,
        headers: config.headers
      }
    });
    return config;
  });

  const HandleResponse = (response: AxiosResponse<any>) => {
    i({
      name: 'http response',
      msg: response.data
    });
    return Promise.resolve(response);
  };

  const HandleError = (error: AxiosError) => {
    e({
      name: 'http error',
      msg: error.toJSON()
    });
    return Promise.reject(error.response);
  };

  return {
    get: (endpoint: string, headers = {}) =>
      api
        .get(endpoint, headers)
        .then((res) => HandleResponse(res))
        .catch((error) => HandleError(error)),
    post: (endpoint: string, payload: any, headers = {}) =>
      api
        .post(endpoint, payload, headers)
        .then((res) => HandleResponse(res))
        .catch((error) => HandleError(error)),
    patch: (endpoint: string, payload: any, headers = {}) =>
      api
        .patch(endpoint, payload, headers)
        .then((res) => HandleResponse(res))
        .catch((error) => HandleError(error)),
    put: (endpoint: string, payload: any, headers = {}) =>
      api
        .put(endpoint, payload, headers)
        .then((res) => HandleResponse(res))
        .catch((error) => HandleError(error)),
    delete: (endpoint: string, headers = {}) =>
      api
        .delete(endpoint, headers)
        .then((res) => HandleResponse(res))
        .catch((error) => HandleError(error))
  };
};
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
  getManyReference(
    resource: any,
    params: {
      pagination: { page: any; perPage: any };
      sort: { field: any; order: any };
      filter: any;
      target: any;
      id: any;
    }
  ): Promise<any>;
  /**
   *
   *
   * @param {*} resource
   * @param {{ id: any; data: any }} params
   * @return {*}  {Promise<any>}
   * @memberof ApiProviderImpl
   */
  update(resource: any, params: { id: any; data: any }): Promise<any>;
  /**
   *
   *
   * @param {*} resource
   * @param {{ ids: any; data: any }} params
   * @return {*}  {Promise<any>}
   * @memberof ApiProviderImpl
   */
  updateMany(resource: any, params: { ids: any; data: any }): Promise<any>;
  /**
   *
   *
   * @param {*} resource
   * @param {{ data: any }} params
   * @return {*}  {Promise<any>}
   * @memberof ApiProviderImpl
   */
  create(resource: any, params: { data: any }): Promise<any>;
  /**
   *
   *
   * @param {*} resource
   * @param {{ id: any }} params
   * @return {*}  {Promise<any>}
   * @memberof ApiProviderImpl
   */
  delete(resource: any, params: { id: any }): Promise<any>;
  /**
   *
   *
   * @param {*} resource
   * @param {{ ids: any }} params
   * @return {*}  {Promise<any>}
   * @memberof ApiProviderImpl
   */
  deleteMany(resource: any, params: { ids: any }): Promise<any>;
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
export class ApiProvider implements ApiProviderImpl {
  /**
   * Creates an instance of ApiProvider.
   * @param {RequestImpl} request
   * @memberof ApiProvider
   */
  constructor(readonly request: RequestImpl) {}
  /**
   *
   *
   * @param {*} data
   * @return {*}  {string}
   * @memberof ApiProvider
   */
  public stringify(data: any): string {
    return stringify(data);
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
  public getList(
    resource: string,
    params: {
      pagination: { page: any; perPage: any };
      sort: { field: any; order: any };
      filter: any;
    }
  ) {
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
        .get(`/${resource}?${stringify(query)}`)
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
  public getOne(resource: any, params: any) {
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
  public getMany(resource: any, params: { ids: any }) {
    const query = {
      filter: JSON.stringify({ ids: params.ids })
    };
    // const url = `${apiUrl}/${resource}?${stringify(query)}`;
    // return httpClient(url).then(({ json }) => ({ data: json }));
    return new Promise((resolve, reject) => {
      this.request
        .get(`/${resource}?${stringify(query)}`)
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
  public getManyReference(
    resource: any,
    params: {
      pagination: { page: any; perPage: any };
      sort: { field: any; order: any };
      filter: any;
      target: any;
      id: any;
    }
  ) {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id
      })
    };
    return new Promise((resolve, reject) => {});
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
  public update(resource: any, params: { id: any; data: any }): Promise<any> {
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
  public updateMany(resource: any, params: { ids: any; data: any }): Promise<any> {
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
  public create(resource: any, params: { data: any }): Promise<any> {
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
  public delete(resource: any, params: { id: any }): Promise<any> {
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
  public deleteMany(resource: any, params: { ids: any }): Promise<any> {
    return Promise.resolve();
  }
  /**
   *
   *
   * @return {*}  {RequestImpl}
   * @memberof ApiProvider
   */
  getRequest(): RequestImpl {
    return this.request;
  }
}
/**
 *
 */
export const GetHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};
