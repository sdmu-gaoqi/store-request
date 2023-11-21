import apis from 'waRequest/apis';
import { default as _request } from 'waRequest/request';
import {
  CommonResponse,
  ListParams,
  ResponseList,
  RoleInfo,
} from 'waRequest/type';

const request = _request.request;

export type addRoleParams = {
  roleName: string;
  status?: number;
  remark?: string;
  roleId?: string;
};

class Role {
  public request = request;
  public roles = [];
  addRole(data: addRoleParams) {
    return request({
      url: apis.addRole,
      method: 'post',
      data,
    });
  }
  roleList(params: ListParams<any>) {
    const sendParams = {
      ...params,
      pageNum: params?.pageNum || 1,
      pageSize: params?.pageSize || 10,
    };
    return request<ResponseList<any>>({
      url: apis.roleList,
      method: 'get',
      params: sendParams,
    });
  }
  roleStatus(data: { status: boolean; roleId: number | string }) {
    return request<CommonResponse<RoleInfo>>({
      url: apis.roleStatus,
      method: 'put',
      data: {
        status: data.status ? 1 : 0,
        roleId: data.roleId,
      },
    });
  }
  roleInfo(id: string | number) {
    return request({
      url: `${apis.addRole}/${id}`,
      method: 'get',
    });
  }
  deleteRole(id: string | number) {
    return request({
      url: `${apis.addRole}/${id}`,
      method: 'delete',
    });
  }
  updateRole(data: addRoleParams) {
    return request({
      url: apis.addRole,
      method: 'put',
      data,
    });
  }
  roleMap() {
    return request({
      url: apis.roleMap,
      method: 'get',
    }).then((res: any) => {
      const roles = res?.data?.map((item: any) => ({
        ...item,
        label: item?.roleName,
        value: item?.roleId,
      }));
      this.roles = roles;
      return roles;
    });
  }
}

export default Role;
