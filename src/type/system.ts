import { CommonResponse, ListResponse } from '.';

// 角色
export interface RoleInfo {
  admin: boolean;
  createBy: string;
  createTime: string;
  dataScope: string;
  delFlag: string;
  deptCheckStrictly: boolean;
  deptIds: any;
  flag: boolean;
  menuCheckStrictly: boolean;
  menuIds: any;
  permissions: any;
  remark: string;
  roleId: number;
  roleKey: string;
  roleName: string;
  roleSort: number;
  status: string;
  updateBy: string;
  updateTime: string;
}

export type ReturnRoleList = CommonResponse<
  ListResponse & { rows: RoleInfo[] }
>;

export type RoleParams = Record<string, any>;

export enum MenuType {
  目录 = 'M',
  菜单 = 'C',
  按钮 = 'F',
}

export type MenuItem = {
  perms: string;
  createTime: string;
  menuId: number;
  menuName: string;
  menuType: 'M' | 'C' | 'F';
  parentId: number;
  parentName: string;
  status: '0' | '1';
  updateTime: string;
  createBy: string;
  updateBy: string;
};
