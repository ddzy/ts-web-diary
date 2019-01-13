import { query } from "services/request";

export interface IStaticOptions {
  message: string;
  isAuth: boolean;
};


/**
 * 处理注册
 * @param data 注册数据
 * @param callback 回调
 */
export function serviceHandleRegister(
  data: any,
  callback?: (data: any) => void
) {
  query({ url: '/api/register', method: 'POST', data, jsonp: false })
    .then((res) => {
      callback && callback(res);
    })
}
