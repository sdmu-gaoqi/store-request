import { message } from 'ant-design-vue';
import axios, { AxiosRequestConfig } from 'axios';
import { isObject } from 'lodash';
import { cookie } from 'wa-utils';
import errorsCode, { ErrorCode } from './config/errors';
import { getParameterByName } from './utils';

// @ts-nocheck
function tansParams(params: any) {
  if (!params || typeof params !== 'object') {
    return params;
  }
  let result = '';
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    let part = encodeURIComponent(propName) + '=';
    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (
            value[key] !== null &&
            value[key] !== '' &&
            typeof value[key] !== 'undefined'
          ) {
            let params = propName + '[' + key + ']';
            let subPart = encodeURIComponent(params) + '=';
            result += subPart + encodeURIComponent(value[key]) + '&';
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&';
      }
    }
  }
  return result;
}

message.config({
  maxCount: 1,
});

const isProd =
  location.host.includes('mengxiangjia') || location.search?.includes('isProd');

const _request = axios.create({
  baseURL: isProd
    ? 'http://mengxiangjia.rixinyy.com:8080'
    : 'http://111.229.138.125:8080',
  timeout: 150000,
  withCredentials: true,
});

class R {
  public commonData: any = {};
  constructor() {
    _request.interceptors.request.use((request) => {
      request.headers['Authorization'] = `Bearer ${cookie.get('Admin-Token')}`;
      request.headers['Content-Type'] = `application/json`;
      request.params = {
        ...(this.commonData.storeCode && {
          storeCode: this.commonData.storeCode,
        }),
        ...(request.params || {}),
        storeHeadquartersCode:
          request.params?.storeHeadquartersCode ||
          getParameterByName('storeHeadquartersCode'),
      };
      // get请求映射params参数
      if (request.method === 'get' && request.params) {
        let url = request.url + '?' + tansParams(request.params);
        url = url.slice(0, -1);
        request.params = {};
        request.url = url;
      }
      request.data = {
        ...(this.commonData || {}),
        ...(request.data || {}),
        storeHeadquartersCode:
          request.data?.storeHeadquartersCode ||
          getParameterByName('storeHeadquartersCode'),
      };
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
            let msg = errorsCode?.[data.code];
            if (data?.code === 1028) {
              const roomName = data?.msg
                ?.replace('Exception, the roomNo:', '')
                ?.replace(' has no enough amount', '');
              msg = `${roomName}房间客数已满,暂不能创建订单`;
            }
            message.error(msg || data.msg);
            if (data?.code === ErrorCode.登录失效) {
              cookie.remove('Admin-Token');
              location.reload();
              return;
            }
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
        message.error('网络错误, 请稍后再试~');
        if (error?.code === ErrorCode.登录失效) {
          cookie.remove('Admin-Token');
          setTimeout(() => {
            location.reload();
          }, 300);
        }
        return Promise.reject(error);
      },
    );
  }

  request = async <T>(data: AxiosRequestConfig<any>) => {
    const res = (await _request.request(data)) as T;
    return res;
  };

  upDateCommonData = (data: any) => {
    this.commonData = {
      ...this.commonData,
      ...data,
    };
  };
}

const r = new R();

export default r;
