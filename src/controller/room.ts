import { default as _request } from 'waRequest/request';

const request = _request.request;

class Room {
  list(data: Record<string, any>) {
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

  create(data: Record<string, any>) {
    return request({
      method: 'post',
      url: '/manage/guestRoom/create',
      data,
    });
  }

  update(data: Record<string, any>) {
    return request({
      method: 'post',
      url: '/manage/guestRoom/update',
      data,
    });
  }

  delete(data: Record<string, any>) {
    return request({
      method: 'post',
      url: '/manage/guestRoom/remove',
      data,
    });
  }
}

export default Room;
