import apis from 'waRequest/apis';
import { default as _request } from 'waRequest/request';
import { CommonResponse } from 'waRequest/type';
import { formatRequest } from 'waRequest/utils';

const request = _request.request;

class CommonService {
  getCaptchaImage() {
    return request<CommonResponse<{ img: string; uuid: string }>>({
      url: apis.getCaptchaImage,
      method: 'GET',
    });
  }
  getDict() {
    return request({
      url: apis.dict,
      method: 'get',
    });
  }
  // 房间列表
  getRoomeList() {
    return request({
      url: apis.roomList,
      method: 'post',
    });
  }
  // 价目表
  projectList(data: any) {
    const sendData = {
      ...(data || {}),
      pageNum: data?.pageNum || 1,
      pageSize: data?.pageSize || 10,
    };
    return request({
      url: '/manage/serviceProject/list',
      method: 'post',
      data: sendData,
    });
  }
  addProject(data: any) {
    return request({
      url: '/manage/serviceProject/create',
      method: 'post',
      data: data,
    });
  }
  updateProject(data: any) {
    return request({
      url: '/manage/serviceProject/update',
      method: 'post',
      data: data,
    });
  }
  projectStatus(data: any) {
    return request({
      url: '/manage/serviceProject/changeStatus',
      data,
      method: 'post',
    });
  }
  deleteProject(data: any) {
    return request({
      url: '/manage/serviceProject/remove',
      data,
      method: 'post',
    });
  }
  routers() {
    return request({
      url: '/getRouters',
      method: 'get',
    });
  }
  orderHome(data: any) {
    return request({
      url: '/order/console',
      method: 'post',
      data: formatRequest(data),
    });
  }
  createOrder(data: any) {
    return request({
      url: '/order/create',
      data,
      method: 'post',
    });
  }
  updateOrder(data: any) {
    return request({
      url: '/order/update',
      data,
      method: 'post',
    });
  }
  submitOrder(data: any) {
    return request({
      url: '/order/submit',
      data,
      method: 'post',
    });
  }
  preSettle(data: any) {
    return request({
      url: '/order/preSettle',
      data,
      method: 'post',
    });
  }
  changeStore(data: { storeCode: string }) {
    return request({
      url: '/changeLoginStore',
      data,
      method: 'post',
    });
  }
  orderDetail(data: { orderId: any; orderNo: any }) {
    return request({
      url: '/order/detail',
      method: 'post',
      data,
    });
  }
  orderList(data: any) {
    return request({
      url: '/order/manageList',
      method: 'post',
      data: formatRequest(data),
    });
  }
}

export default CommonService;
