import { query } from "src/services/request";

export interface IStaticOptions {
  collectionInfo: {
    name: string;
    articles: any[];
    [key: string]: any;
  };
};


/**
 * 获取收藏夹信息
 * @param collectionId 我的收藏夹id
 */
export function serviceHandleGetCollectionInfo(
  collectionId: string,
  callback?: (data: any) => void,
) {
  query({
    method: 'GET',
    url: '/api/collection/getinfo',
    jsonp: false,
    data: {
      userid: localStorage.getItem('userid'),
      collectionId,
    },
  }).then((res) => {
    callback && callback(res);
  });
}

/**
 * 删除我的收藏夹文章
 * @param articleId 删除的文章id
 * @param collectionId 收藏夹id
 * @param callback 回调
 */
export function serviceHandleDeleteCollectionArticle(
  articleId: string,
  collectionId: string,
  callback?: (result: any) => void,
) {
  query({
    url: '/api/collection/article/delete',
    method: 'GET',
    jsonp: false,
    data: {
      userid: localStorage.getItem('userid'),
      articleId,
      collectionId,
    },
  }).then((res) => {
    callback && callback(res);
  })
}