// @ts-nocheck

import apis from 'waRequest/apis';
import { default as _request } from 'waRequest/request';

const request = _request.request;

class Member {
  list(data) {
    console.log(data, 'data');
    const sendData = {
      ...(data || {}),
      pageNum: data?.pageNum || 1,
      pageSize: data?.pageSize || 10,
      // spendEndTime: data?.spendEndTime || '',
      // spendStartTime: data?.spendStartTime || '',
    };
    return request({
      method: 'post',
      url: apis.memberList,
      data: sendData,
    });
  }
  add(data) {
    return request({ method: 'post', url: apis.member, data });
  }
  update(data) {
    return request({ method: 'put', url: apis.member, data });
  }
  delete(id) {
    return request({ method: 'delete', url: `${apis.member}/${id}` });
  }
  status(data) {
    return request({ method: 'put', url: apis.memberStatus, data });
  }
  info(id) {
    return request({ method: 'get', url: `${apis.member}/${id}` });
  }
  memberDetail(id) {
    return request({
      method: 'post',
      url: apis.memberDetail,
      data: {
        memberId: id,
      },
    });
  }
  memberPay(data) {
    return request({
      method: 'post',
      url: apis.memberPay,
      data,
    });
  }
  payLogs(data) {
    const sendData = {
      ...(data || {}),
      pageNum: data?.pageNum || 1,
      pageSize: data?.pageSize || 10,
    };
    return request({
      method: 'post',
      url: apis.payLogs,
      data: sendData,
    });
  }
}

export default Member;
