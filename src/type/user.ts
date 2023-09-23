import { CommonResponse } from '.';

export type UserInfo = {
  admin: boolean;
  avatar: string;
  createBy: string;
  createTime: string;
  delFlag: string;
  deptId: number;
  email: string;
  loginDate: string;
  loginIp: string;
  nickName: string;
  password: string;
  phonenumber: string;
  postIds: any;
  remark: string;
  roleId: string | number;
  roleIds: (string | number)[];
};

export type ReturnLogin = CommonResponse<
  { token: string } & {
    permissions: string[];
    roles: string[];
    user: UserInfo;
  }
>;
export type ReturnUserInfo = Partial<
  CommonResponse<{
    permissions: string[];
    roles: string[];
    user: UserInfo;
  }>
>;

export type LoginParams = {
  username: string;
  password?: string;
  code?: string;
  uuid?: string;
};
