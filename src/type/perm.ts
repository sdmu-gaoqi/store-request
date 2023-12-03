import { CommonResponse } from '.';

export type PermMenuItem = {
  id: number;
  label: string;
  children: PermMenuItem[];
};

export type ResponsePermTree = CommonResponse<{
  menus: PermMenuItem;
  checkedKeys: number[];
}>;
