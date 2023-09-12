import { message } from 'ant-design-vue';
import axios from 'axios';
import { isObject } from 'lodash';
import { cookie } from 'wa-utils';
import errorsCode from './config/errors';

message.config({
  maxCount: 1,
});

const request = axios.create({
  baseURL: 'http://vue.ruoyi.vip/prod-api/',
  timeout: 15000,
});

request.interceptors.request.use((request) => {
  request.headers['Authorization'] = `Bearer ${cookie.get('Admin-Token')}`;
  return request;
});

request.interceptors.response.use(
  // @ts-ignore
  // eslint-disable-next-line
  (res) => {
    let data: Record<string, any> = res.data;
    if (isObject(data)) {
      if (data?.code === 200) {
        return Promise.resolve(res);
      } else {
        const msg = errorsCode?.[data.code];
        if (msg) {
          message.error(msg);
        }
        message.error(res.data.msg);
        return Promise.reject(res);
      }
    }
    //比如响应一些报错信息
    return Promise.resolve(res);
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default request;
