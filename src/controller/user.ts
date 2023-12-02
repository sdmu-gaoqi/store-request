import { cookie } from 'wa-utils';
import apis from 'waRequest/apis';
import { default as _request } from 'waRequest/request';
import { LoginParams, ReturnLogin, ReturnUserInfo } from 'waRequest/type/user';
import { getParameterByName } from 'waRequest/utils';

const request = _request.request;

class User {
  public token: string = cookie.get('Admin-Token') as string;
  public request = request;
  public userInfo: ReturnUserInfo = {};

  public login(params: LoginParams) {
    return request<ReturnLogin>({
      url: apis.login,
      data: {
        ...params,
        storeHeadquartersCode: getParameterByName('storeHeadquartersCode'),
        storeCode:
          getParameterByName('storeCode') || localStorage.getItem('storeCode'),
      },
      method: 'POST',
    })
      .then(async (res) => {
        this.token = res.token;
        cookie.set('Admin-Token', this.token);
        const userInfo = await this.getUserInfo();
        return {
          ...res,
          ...userInfo,
        };
      })
      .catch((err) => Promise.reject(err));
  }

  public logout() {
    return request({
      url: apis.logout,
    })
      .then((res) => {
        delete _request.commonData.storeCode;
        this.token = '';
        this.userInfo = {};
        cookie.remove('Admin-Token');
        return res;
      })
      .catch((err) => Promise.reject(err));
  }

  public getUserInfo() {
    return request<ReturnUserInfo>({
      url: apis.getUserInfo,
    })
      .then((res) => {
        this.userInfo = res;
        _request.upDateCommonData({ storeCode: res?.user?.currentStoreCode });
        return res;
      })
      .catch((err) => Promise.reject(err));
  }

  changePassword(data: { oldPassword: string; newPassword: string }) {
    return request({
      url: '/system/user/profile/updatePwd',
      method: 'put',
      params: data,
    });
  }
}

export default User;
