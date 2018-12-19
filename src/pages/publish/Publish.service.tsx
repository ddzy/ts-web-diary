import { query } from "src/services/request";

export interface IStaticOptions {
  tipMessage: string;
};

/**
 * 处理发表文章
 * @param data 文章具体数据
 * @param callback 回调
 */
export function serviceHandleSendArticle(
  data: any,
  callback?: (data: any) => void
) {
  query({
    url: '/api/write/insert',
    method: 'POST',
    data: { ...data, userid: localStorage.getItem('userid') }, jsonp: false
  })
    .then((res) => {
      callback && callback(res);
    }).catch((err) => {
      throw new Error(err);
    });
}
