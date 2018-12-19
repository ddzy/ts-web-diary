import { query } from "src/services/request";


export interface IDetailsInfoOptions {
  author: string,
  articleContent: string,
  articleTitle: string,
  articleCount: number,
  authorAvatar: string,
  create_time: number,
  mode: string,
  newArticle: object[],
  tag: string,
  type: string,
  watchCount: number,
  img: string,
  isLiked: boolean,     // 是否点过赞
  comments: any[],      // 评论信息
  collections: any[],   // 我的收藏夹列表
  collectionName: string,   // 添加至的收藏夹名称
};


/**
 * 获取文章数据
 * @param articleid 文章id
 * @param callback 回调函数
 */
export function serviceHandleGetOneArticleInfo(
  articleid: string,
  callback: (res: any) => void,
) {
  query({
    method: 'GET',
    url: '/api/details',
    data: {
      articleid,
      userid: localStorage.getItem('userid'),
    },
    jsonp: false,
  }).then((res) => {
    callback(res);
  });
}


/**
 * 发表评论
 * @param articleid 文章id
 * @param commentValue 评论内容
 * @param callback 回调函数
 */
export function serviceHandleSendComment(
  v: any,
  callback?: (res: any) => void,
) {
  query({
    method: 'POST',
    url: '/api/details/comment',
    jsonp: false,
    data: {
      userId: localStorage.getItem('userid') || '',
      ...v,
    },
  })
    .then((res) => {
      callback && callback(res);
    });
}


/**
 * 发表回复
 * @param v 回复相关信息
 * @param callback 回调函数
 */
export function serviceHandleSendReply(
  v: any,
  callback?: (res: any) => void,
) {
  query({
    method: 'POST',
    url: '/api/details/reply',
    jsonp: false,
    data: {
      ...v,
      userId: localStorage.getItem('userid'),
    },
  }).then((res) => {
    callback && callback(res);
  });
}


/**
 * 文章详情 => 点赞文章
 * @param articleid 文章id
 * @param liked 点赞or取消
 * @param callback 回调函数
 */
export function serviceHandleFixedControlBarStar(
  articleid: string,
  liked: boolean,
  callback?: () => void,
) {
  query({
    method: 'GET',
    url: '/api/details/star',
    data: {
      articleid,
      liked,
      userid: localStorage.getItem('userid'),
    },
    jsonp: false,
  }).then((res) => {
    // res.code === 0
    //   && callback
    //   && callback();
    callback && callback();
  });
}


/**
 * 文章详情 => 创建新的收藏夹
 * @param collection 收藏夹名称
 */
export function serviceHandleCreateCollection(
  collection: string,
  callback?: (res: any) => void,
) {
  query({
    url: '/api/details/collection/create',
    method: 'GET',
    jsonp: false,
    data: {
      collection,
      userid: localStorage.getItem('userid'),
    },
  })
    .then((res) => {
      callback && callback(res);
    });
}


/**
 * 文章详情 => 确认添加至收藏夹
 * @param articleId 文章id
 * @param collectionId 收藏夹id
 */
export function serviceHandleSaveToCollection(
  articleId: string,
  collectionId: string,
  callback?: (res: any) => void,
) {
  query({
    method: 'POST',
    url: '/api/details/collection/save',
    jsonp: false,
    data: {
      userid: localStorage.getItem('userid'),
      articleId,
      collectionId,
    },
  }).then((res) => {
    callback && callback(res);
  });
}