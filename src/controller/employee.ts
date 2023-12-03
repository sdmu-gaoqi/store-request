import apis from 'waRequest/apis';
import { default as _request } from 'waRequest/request';
import { formatRequest } from 'waRequest/utils';

const request = _request.request;

class Employee {
  list(params: Record<string, any>) {
    return request({
      url: apis.employeeList,
      method: 'get',
      params: formatRequest(params),
    });
  }
  add(data: Record<string, any>) {
    return request({
      url: apis.employee,
      method: 'post',
      data,
    });
  }
  update(data: Record<string, any>) {
    return request({
      url: apis.employee,
      method: 'put',
      data,
    });
  }
  delete(id: Record<string, any>) {
    return request({
      url: `${apis.employee}/${id}`,
      method: 'delete',
    });
  }
  status(data: Record<string, any>) {
    return request({
      url: apis.employeeStatus,
      method: 'put',
      data,
    });
  }
  info(id: Record<string, any>) {
    return request({
      url: `${apis.employee}/${id}`,
      method: 'get',
      params: {
        userId: id,
      },
    });
  }
  async engineerList() {
    return request({
      url: apis.employeeList,
      method: 'get',
      params: formatRequest({ pageSize: 100, isTechnician: 1 }),
    });
  }
}

export default Employee;
