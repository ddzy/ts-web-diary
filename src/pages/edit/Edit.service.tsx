import { query } from "src/services/request";

export interface IStaticOptions {
  articleInfo: any;
};


/**
 * 获取编辑文章信息
 * @param articleid 编辑的文章id
 * @param [callback] 回调
 */
export function serviceHandleGetEditArticleInfo(
  articleid: string,
  callback?: (data: any) => void,
) {
    query({
      method: 'GET',
      url: '/api/write/geteditinfo',
      data: {
        articleid,
      },
      jsonp: false,
    }).then((res) => {
      callback && callback(res);
    });
}


/**
 * 提交编辑文章信息
 * @param data 提交的文章id
 * @param [callback] 回调
 */
export function serviceHandleSendEditArticleInfo(
  data: any,
  callback?: (data: any) => void,
) {
    query({
      method: 'POST',
      url: '/api/write/update',
      data: {
        userid: localStorage.getItem('userid'),
        ...data,
      },
      jsonp: false,
    })
      .then((res) => {
        callback && callback(res);
      });
}