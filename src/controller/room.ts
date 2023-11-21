import { default as _request } from 'waRequest/request';

const request = _request.request;

class Room {
  list(data: any) {
    const sendParams = {
      ...data,
      pageNum: data?.pageNum || 1,
      pageSize: data?.pageSize || 10,
    };
    return request({
      method: 'post',
      url: 'manage/guestRoom/getManageList',
      data: sendParams,
    });
  }

  create(data: any) {
    return request({
      method: 'post',
      url: '/manage/guestRoom/create',
      data,
    });
  }

  update(data: any) {
    return request({
      method: 'post',
      url: '/manage/guestRoom/update',
      data,
    });
  }

  delete(data: any) {
    return request({
      method: 'post',
      url: '/manage/guestRoom/remove',
      data,
    });
  }
}

export default Room;
