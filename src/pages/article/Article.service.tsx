import { query } from "src/services/request";


/**
 * 处理获取文章页 首屏数据
 */
export function serviceHandleGetArticleList(
  callback: (
    data: object[],
  ) => void,
) {
  query({
    url: '/api/article/list',
    method: 'GET',
    data: {
      page: 1,
      pageSize: 5,
    },
    jsonp: false,
  }).then((res) => {
    callback(res.articleList);
  });
}

/**
 * 处理文章页 加载更多
 * @param page 页数
 * @param pageSize 当前页个数
 * @param callback 回调
 */
export function serviceHandleArticleLoadMore(
  page: number,
  pageSize: number,
  callback: (data: {
    hasMore: boolean,
    articleList: object[],
  }) => void,
) {
  query({
    url: '/api/article/list',
    method: 'GET',
    jsonp: false,
    data: {
      page,
      pageSize,
    },
  })
    .then((res) => {
      callback(res);
    });
}