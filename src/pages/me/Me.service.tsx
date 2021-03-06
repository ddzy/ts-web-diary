import { query } from "services/request";

export interface IStaticOptions {
  // ** 我的文章列表 **
  my_article_list: any[];
  // ** 删除的文章标题 **
  delete_article_title: string;
  // ** 我的收藏夹列表 **
  my_collection_list: any[],
};


/**
 * 个人中心 获取我的文章 首屏数据
 */
export function serviceHandleGetMyArticleList(
  callback?: (data: any) => void,
) {
  query({
    url: '/api/me/myarticle',
    method: 'GET',
    data: {
      type: '随笔',
      userid: localStorage.getItem('userid'),
    },
    jsonp: false
  })
    .then((res) => {
      callback && callback(res);
    });
}

/**
 * 个人中心 删除我的文章
 * @param articleid 文章id
 * @param callback 回调函数
 */
export function serviceHandleDeleteMyArticle(
  articleid: string,
  callback?: (data: any) => void,
) {
  query({
    method: 'GET',
    url: '/api/me/delete',
    data: {
      articleid,
      userid: localStorage.getItem('userid'),
    },
    jsonp: false,
  }).then((res) => {
    callback && callback(res);
  });
}


/**
 * 个人中心 获取我的文章 分类
 * @param type 我的文章 分类类型
 */
export function serviceHandleGetMyArticle(
  type: string,
  callback?: (data: any) => void,
) {
  query({
    url: '/api/me/myarticle',
    method: 'GET',
    data: {
      type,
      userid: localStorage.getItem('userid'),
    },
    jsonp: false
  })
    .then((res) => {
      callback && callback(res);
    });
}


/**
 * 个人中心 获取我的收藏 列表
 */
export function serviceHandleGetMyCollection(
  callback?: (data: any) => void,
) {
  query({
    method: 'GET',
    url: '/api/me/collection/getinfo',
    jsonp: false,
    data: {
      userid: localStorage.getItem('userid'),
    },
  }).then((res) => {
    callback && callback(res);
  });
}


/**
 * 个人中心 删除我的收藏夹
 * @param collectionId 删除的收藏夹id
 * @param callback 回调
 */
export function serviceHandleDeleteMyCollection(
  collectionId: string,
  callback?: (data: any) => void,
) {
  query({
    method: 'GET',
    // url: '/api/me/collection/delete',
    url: '/api/collection/delete/single',
    jsonp: false,
    data: {
      userid: localStorage.getItem('userid'),
      collectionId,
    },
  }).then((res) => {
    callback && callback(res);
  });
}
