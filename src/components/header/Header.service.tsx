import { query } from "src/services/request";


/**
 * 获取热搜
 */
// export function serviceHandleGetHotSearchArticles() {

// }

/**
 * 获取用户搜索
 * @param v 查找的文章
 */
export function serviceHandleGetUserSearchArticles(
  keyword: string,
  callback?: (data: any) => void,
) {
  query({
    method: 'GET',
    data: {
      keyword,
      userId: localStorage.getItem('userid'),
    },
    jsonp: false,
    url: '/api/article/search/input/list',
  }).then((res) => {
    callback && callback(res.data);
  });
}
