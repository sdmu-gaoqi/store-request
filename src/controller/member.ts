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
    return request({ method: 'post', url: '/member/update', data });
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
  async memberPay(data) {
    const res = (await request({
      url: '/sequence/getFlowNo',
      method: 'post',
    })) as any;
    return request({
      method: 'post',
      url: apis.memberPay,
      data: {
        ...data,
        requestNo: res?.data,
      },
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
