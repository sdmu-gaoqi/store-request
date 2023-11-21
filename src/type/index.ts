export type CommonResponse<T> = { code: number; msg: string } & T;

export type ListResponse = {
  total: number;
  current: number;
  pageSize: number;
  rows?: any[];
};

export type ResponseList<T> = {
  total: number;
  rows?: T[];
};

export type ListParams<T> = {
  pageNum: number;
  pageSize: number;
} & T;

export type RoleInfo = {
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;
  remark: string;
  roleId: string | number;
  roleName: string;
  roleKey: string;
  roleSort: number;
  dataScope: string;
  menuCheckStrictly: boolean;
  status: string;
  delFlag: string;
  flag: boolean;
  menuIds: unknown[];
  permissions: unknown[];
  admin: boolean;
};
