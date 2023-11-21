import { ListParams } from 'waRequest/type';

export const formatListResponse = <T>(param: ListParams<any>, data: any): T => {
  return {
    ...data,
    current: param?.pageNum || 1,
    pageSize: param?.pageSize || 10,
  };
};

export const formatRequest = (data: any, num = 1) => {
  return {
    ...(data || {}),
    pageNum: data?.pageNum || num,
    pageSize: data?.pageSize || 10,
  };
};

export function getParameterByName(name = '', byHash = false) {
  // @ts-nocheck
  // eslint-disable-next-line no-param-reassign
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
  let results = regex.exec(location[byHash ? 'hash' : 'search']);
  // eslint-disable-next-line eqeqeq
  return results == null ? '' : decodeURIComponent(results[1]);
}
