import { ListParams } from 'waRequest/type';

export const formatListResponse = <T>(param: ListParams<any>, data: any): T => {
  return {
    ...data,
    current: param?.pageNum || 1,
    pageSize: param?.pageSize || 10,
  };
};
