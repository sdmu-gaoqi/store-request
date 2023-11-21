import apis from 'waRequest/apis';
import { default as _request } from 'waRequest/request';
import { ListParams } from 'waRequest/type';
import { ReturnLoginlog } from 'waRequest/type/log';
import { formatListResponse } from 'waRequest/utils';

const request = _request.request;

class Log {
  public loginLog: ReturnLoginlog = {};

  public getLoginLog(
    params: ListParams<{
      keyword: string;
      beginTime: string;
      endTime: string;
    }>,
  ) {
    return request<ReturnLoginlog>({
      url: apis.getLoginLog,
      params,
    })
      .then((res) => {
        this.loginLog = res;
        return formatListResponse<typeof res>(params, res);
      })
      .catch((err) => Promise.reject(err));
  }
}

export default Log;
