import apis from 'waRequest/apis';
import { default as _request } from 'waRequest/request';
import { CommonResponse } from 'waRequest/type';
import { ResponsePermTree } from 'waRequest/type/perm';
import { MenuItem } from 'waRequest/type/system';
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
  projectList(data: Record<string, any>) {
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
  addProject(data: Record<string, any>) {
    return request({
      url: '/manage/serviceProject/create',
      method: 'post',
      data: data,
    });
  }
  updateProject(data: Record<string, any>) {
    return request({
      url: '/manage/serviceProject/update',
      method: 'post',
      data: data,
    });
  }
  projectStatus(data: Record<string, any>) {
    return request({
      url: '/manage/serviceProject/changeStatus',
      data,
      method: 'post',
    });
  }
  deleteProject(data: Record<string, any>) {
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
  orderHome(data: Record<string, any>) {
    return request({
      url: '/order/console',
      method: 'post',
      data: formatRequest(data),
    });
  }
  async createOrder(data: Record<string, any>) {
    const res = (await request({
      url: '/sequence/getOrderNo',
      method: 'post',
    })) as any;
    return request({
      url: '/order/create',
      data: {
        ...data,
        orderNo: res?.data,
      },
      method: 'post',
    });
  }
  updateOrder(data: Record<string, any>) {
    return request({
      url: '/order/update',
      data,
      method: 'post',
    });
  }
  submitOrder(data: Record<string, any>) {
    return request({
      url: '/order/submit',
      data,
      method: 'post',
    });
  }
  deleteOrder(data: { orderId: any; orderNo: any }) {
    return request({
      url: '/order/delete',
      data,
      method: 'post',
    });
  }
  preSettle(data: Record<string, any>) {
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
  orderList(data: Record<string, any>) {
    return request({
      url: '/order/manageList',
      method: 'post',
      data: formatRequest(data),
    });
  }
  permList(params: any) {
    return request<CommonResponse<{ data: MenuItem[] }>>({
      url: '/system/menu/list',
      method: 'get',
      params: params,
    });
  }
  addPerm(data: Record<string, any>) {
    return request({
      url: '/system/menu',
      method: 'post',
      data,
    });
  }
  updatePerm(data: any) {
    return request({
      url: '/system/menu',
      method: 'put',
      data,
    });
  }
  deletePerm(id: any) {
    return request({
      url: `/system/menu/${id}`,
      method: 'delete',
    });
  }
  permTree() {
    return request<ResponsePermTree>({
      url: '/system/menu/treeselect',
      method: 'get',
    });
  }
  rolePermTree(roleId: any) {
    return request<ResponsePermTree>({
      url: `/system/menu/roleMenuTreeselect/${roleId}`,
      method: 'get',
    });
  }
}

export default CommonService;
