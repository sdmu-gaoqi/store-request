const apis = {
  login: '/login',
  logout: '/logout',
  getUserInfo: '/getInfo',
  getRoleList: '/system/role/list',
  getLoginLog: '/monitor/logininfor/list',
  getCaptchaImage: '/captchaImage',
  dict: '/system/dict/type/optionselect', // 数据 字典

  // 角色
  addRole: '/system/role',
  roleList: '/system/role/list',
  roleStatus: '/system/role/changeStatus',
  roleMap: '/system/role/optionselect',

  // member
  memberList: '/member/getManageList',
  member: 'member/create',
  memberStatus: '/system/user/changeStatus',
  memberDetail: '/member/getDetail',
  memberPay: '/member/deposit/recharge',
  payLogs: '/member/deposit/rechargeList',

  // room
  roomList: '/manage/guestRoom/getManageList',

  // 员工
  employee: '/system/user',
  employeeList: '/system/user/list',
  employeeStatus: '/system/user/changeStatus',
};

export default apis;
