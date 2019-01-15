import { query } from "services/request";
import {
  IGlobalStaticServiceReturns,
} from 'service';


export interface IGetQiniuTokenParams { };
export interface IGetQiniuTokenReturns extends IGlobalStaticServiceReturns {
  info: {
    qiniuInfo: {
      uploadToken: string,
      userid: string,
      domain: string,
    },
  };
};


export function serviceHandleGetQiniuToken(
  payload?: IGetQiniuTokenParams,
  callback?: (
    data: IGetQiniuTokenReturns,
  ) => void,
) {
  query({
    url: '/api/upload/qiniu',
    method: 'GET',
    data: {
      userid: localStorage.getItem('userid'),
    },
    jsonp: false,
  }).then((res) => {
    callback && callback(res);
  });
}