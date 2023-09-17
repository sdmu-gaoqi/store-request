import axios, { AxiosRequestConfig } from 'axios';
import { cookie, isObject } from 'wa-utils';
import errorsCode from './config/errors';

const _request = axios.create({
  baseURL: 'http://vue.ruoyi.vip/prod-api/',
  timeout: 15000,
});

_request.interceptors.request.use((request) => {
  request.headers['Authorization'] = `Bearer ${cookie.get('Admin-Token')}`;
  return request;
});

_request.interceptors.response.use(
  // @ts-ignore
  // eslint-disable-next-line
  (res) => {
    let data: Record<string, any> = res.data;
    if (isObject(data)) {
      if (data?.code === 200) {
        return Promise.resolve(data);
      } else {
        const msg = errorsCode?.[data.code];
        return Promise.reject({
          ...data,
          msg: msg || data.msg,
        });
      }
    }
    //比如响应一些报错信息
    return Promise.resolve(data);
  },
  function (error) {
    return Promise.reject(error);
  },
);

const request = async <T>(data: AxiosRequestConfig<any>) => {
  const res = (await _request.request(data)) as T;
  return res;
};

export default request;
