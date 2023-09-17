import { reject } from 'lodash';
import { cookie } from 'wa-utils';
import apis from 'waRequest/apis';
import request from 'waRequest/request';
import { LoginParams, ReturnLogin, ReturnUserInfo } from 'waRequest/type/user';

class User {
  public token: string = cookie.get('Admin-Token') as string;
  public userInfo: ReturnUserInfo = {};

  public login(params: LoginParams) {
    return request<ReturnLogin>({
      url: apis.login,
      data: params,
      method: 'POST',
    })
      .then((res) => {
        this.token = res.token;
        cookie.set('Admin-Token', this.token);
        return res;
      })
      .catch((err) => Promise.reject(err));
  }

  public logout() {
    return request({
      url: apis.logout,
    })
      .then((res) => {
        this.token = '';
        this.userInfo = {};
        cookie.remove('Admin-Token');
        return res;
      })
      .catch((err) => reject(err));
  }

  public getUserInfo() {
    return request<ReturnUserInfo>({
      url: apis.getUserInfo,
    })
      .then((res) => {
        this.userInfo = res;
        return res;
      })
      .catch((err) => Promise.reject(err));
  }
}

export default User;
