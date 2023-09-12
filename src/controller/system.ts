import { isEqual } from 'lodash';
import request from 'waRequest/request';
import { CommonResponse, ListParams, ListResponse } from 'waRequest/type';
import { RoleInfo, RoleParams } from 'waRequest/type/system';

const apis = {
  getList: '/system/role/list',
};

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
      const data = await request.request<
        CommonResponse<ListResponse & { rows: RoleInfo[] }>
      >({
        url: apis.getList,
        params: params,
      });
      this.roleList.data = data.data.rows;
      this.roleList.current = params.pageNum;
      this.roleList.pageSize = params.pageSize;
      this.roleList.total = data.data.total;
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
