import { query } from "src/services/request";

export interface IStaticOptions {
  article_list: object[];
};
export interface IStaticPayloadOptions {
  type: string,
  page: number,
  pageSize: number,
};

/**
 * 处理获取文章页 首屏数据
 */
export function serviceHandleGetArticleList(
  payload: IStaticPayloadOptions,
  callback?: (
    data: object[],
  ) => void,
) {
  query({
    url: '/api/article/list',
    method: 'GET',
    data: payload,
    jsonp: false,
  }).then((res) => {
    callback && callback(res.articleList);
  });
}