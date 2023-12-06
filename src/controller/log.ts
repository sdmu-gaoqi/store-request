import apis from 'waRequest/apis';
import { default as _request } from 'waRequest/request';
import { ReturnLoginlog } from 'waRequest/type/log';
import { formatListResponse, formatRequest } from 'waRequest/utils';

const request = _request.request;

class Log {
  public loginLog: ReturnLoginlog = {};

  public getLoginLog(params: Record<string, any>) {
    return request<ReturnLoginlog>({
      url: apis.getLoginLog,
      params: formatRequest(params),
    })
      .then((res) => {
        this.loginLog = res;
        return formatListResponse<typeof res>(params, res);
      })
      .catch((err) => Promise.reject(err));
  }

  getOperateLog(params: Record<string, any>) {
    return request({
      url: '/monitor/operlog/list',
      method: 'get',
      params: formatRequest(params),
    });
  }
}

export default Log;
