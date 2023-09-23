import { CommonResponse, ListResponse } from '.';

export type ReturnLoginlog = Partial<
  CommonResponse<
    ListResponse & {
      rows: {
        browser: string;
        createBy: string;
        createTime: string;
        infoId: boolean;
        ipaddr: string;
        loginLocation: string;
        loginTime: string;
        msg: string;
        os: string;
        remark: any;
        status: string;
        updateBy: string;
        updateTime: string;
        userName: string;
      }[];
    }
  >
>;
