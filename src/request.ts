import { message } from 'ant-design-vue';
import axios, { AxiosRequestConfig } from 'axios';
import { isObject } from 'lodash';
import { cookie } from 'wa-utils';
import errorsCode, { ErrorCode } from './config/errors';
import { getParameterByName } from './utils';

message.config({
  maxCount: 1,
});

const _request = axios.create({
  baseURL: 'http://111.229.138.125:8080',
  timeout: 150000,
  withCredentials: true,
});

class R {
  public commonData: any = {};
  constructor() {
    _request.interceptors.request.use((request) => {
      request.headers['Authorization'] = `Bearer ${cookie.get('Admin-Token')}`;
      request.params = {
        ...(this.commonData.storeCode && {
          storeCode: this.commonData.storeCode,
        }),
        ...(request.params || {}),
        storeHeadquartersCode:
          request.params?.storeHeadquartersCode ||
          getParameterByName('storeHeadquartersCode'),
      };
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
            const msg = errorsCode?.[data.code];
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
