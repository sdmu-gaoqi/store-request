// @ts-nocheck
import { default as _request } from 'waRequest/request';
import { formatRequest, getParameterByName } from 'waRequest/utils';

const request = _request.request;

class Store {
  list(data) {
    return request({
      url: '/store/my',
      method: 'post',
      data: {
        ...formatRequest(data),
        storeHeadquartersCode: getParameterByName('storeHeadquartersCode'),
      },
    });
  }
  add(data) {
    return request({
      url: '/store/add',
      method: 'post',
      data: data,
    });
  }
  update(data) {
    return request({
      url: '/store/edit',
      method: 'post',
      data: data,
    });
  }
  delete(data) {
    return request({
      url: '/store/remove',
      method: 'post',
      data: data,
    });
  }
  loginList(data) {
    return request({
      url: '/store/list',
      method: 'post',
      data: {
        ...formatRequest(data),
        storeHeadquartersCode: getParameterByName('storeHeadquartersCode'),
      },
    });
  }
}

export default Store;
