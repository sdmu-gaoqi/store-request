export type CommonResponse<T> = { code: number; msg: string } & T;

export type ListResponse = {
  total: number;
  current: number;
  pageSize: number;
  rows?: any[];
};

export type ListParams<T> = {
  pageNum: number;
  pageSize: number;
} & T;
