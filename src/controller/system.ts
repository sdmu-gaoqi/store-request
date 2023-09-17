import { isEqual } from 'lodash';
import apis from 'waRequest/apis';
import request from 'waRequest/request';
import { ListParams, ListResponse } from 'waRequest/type';
import { ReturnRoleList, RoleInfo, RoleParams } from 'waRequest/type/system';

class System {
  public roleList: {
    data: RoleInfo[];
  } & ListResponse;
  constructor() {
    this.roleList = {
      data: [],
      current: 0,
      pageSize: 10,
      total: 0,
    };
  }

  public async getRoleList(params: ListParams<RoleParams>) {
    try {
      const searchPage = { pageNum: params.pageNum, pageSize: params.pageSize };
      const currentPage = {
        pageNum: this.roleList.current,
        pageSize: this.roleList.pageSize,
      };
      if (isEqual(searchPage, currentPage)) {
        return this.roleList;
      }
      const data = await request<ReturnRoleList>({
        url: apis.getRoleList,
        params: params,
      });
      this.roleList.data = data.rows;
      this.roleList.current = params.pageNum;
      this.roleList.pageSize = params.pageSize;
      this.roleList.total = data.total;
      return this.roleList;
    } catch (err) {
      console.log(err, '获取角色失败');
      return Promise.reject(err);
    }
  }

  clear() {
    this.roleList = {
      data: [],
      current: 0,
      pageSize: 10,
      total: 0,
    };
  }
}

export default System;
