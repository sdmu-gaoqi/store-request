export enum ErrorCode {
  登录失效 = 401,
}

const errorsCode: Record<number, string> = {
  [ErrorCode.登录失效]: '用户信息已过期,请重新登录',
};

export default errorsCode;
