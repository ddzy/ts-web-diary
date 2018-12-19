import { query } from "src/services/request";

export interface IStaticOptions {
  userid: string;
  username: string;
  message: string;
};


/**
 * 处理登录
 * @param data 用户名 & 密码
 */
export function serviceHandleLogin(
  data: IStaticOptions,
  callback?: (data: any) => void,
) {
  query({ url: '/api/login', method: 'POST', data, jsonp: false })
    .then((res) => {
      // if (res.code === 0) {
      //   dispatch(authSuccess(res));
      //   localStorage.setItem('token', res.token);
      //   localStorage.setItem('userid', res.userid);
      //   callback();
      // } else {
      //   dispatch(authFailed(res));
      //   callback();
      // }
      callback && callback(res);
    })
    .catch((err) => {
      throw new Error(err);
    });
}
