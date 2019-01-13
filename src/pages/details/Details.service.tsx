import { query } from "services/request";
import {
  IGlobalStaticServiceReturns,
} from "service";


// ** Common Types Defines **

// ** 评论from字段 **
export interface IGlobalStaticCommentWhereUserOptions {
  username: string;
  _id: string;
  useravatar: string;
}



// ** ServiceState Types Defines **
export interface IServiceState {
  articleInfo: IStaticArticleInfoOptions;
};
export interface IStaticArticleInfoOptions {
  author: string,
  articleContent: string,
  articleTitle: string,
  articleCount: number,
  authorAvatar: string,
  create_time: number | string,
  mode: string,
  newArticle: IStaticArticleInfoNewArticleOptions[],
  tag: string,
  type: string,
  watchCount: number,
  img: string,
  isLiked: boolean,
  comments: IStaticArticleInfoCommentsOptions[],
  relatedArticles: IStaticArticleInfoRelatedArticlesOptions[],
};
export interface IStaticArticleInfoNewArticleOptions {
  title: string;
  _id: string;
};
export interface IStaticArticleInfoCommentsOptions {
  article: string;
  create_time: number | string;
  from: IGlobalStaticCommentWhereUserOptions;
  replys: IStaticArticleInfoCommentsReplysOptions[];
  value: string;
  _id: string;
};
export interface IStaticArticleInfoCommentsReplysOptions {
  article: string;
  comment: string;
  create_time: number | string;
  from: IGlobalStaticCommentWhereUserOptions;
  to: IGlobalStaticCommentWhereUserOptions;
  value: string;
  _id: string;
};
export interface IStaticArticleInfoRelatedArticlesOptions {
  _id: string;
  create_time: string | number;
  type: string;
  tag: string;
  title: string;
  img: string;
  author: {
    _id: string,
    username: string,
  };
};


// ** Commen Types Defines **
export interface IStaticCollectionItem {
  name: string;
  _id: string;
};


// ** Service Handle Types Defines **
interface IGetOneArticleInfoParams {
  articleId: string;
  commentPageSize: number;
  replyPageSize: number;
};
interface IGetOneArticleReturns extends IGlobalStaticServiceReturns {
  info: IServiceState;
}

export interface ISendCommentParams {
  value: string;
  articleId: string;
  from: string;
};
export interface ISendCommentReturns extends IGlobalStaticServiceReturns {
  info: {
    commentInfo: IStaticArticleInfoCommentsOptions,
  };
};

export interface ISendReplyParams {
  commentId: string;
  value: string;
  from: string;
  to: string;
  articleId: string;
};
export interface ISendReplyReturns extends IGlobalStaticServiceReturns {
  info: {
    replyInfo: IStaticArticleInfoCommentsReplysOptions,
  };
};

export interface IFixedControlBarStarParams {
  articleId: string;
  liked: boolean;
};
export interface IFixedControlBarStarReturns extends IGlobalStaticServiceReturns {
  info: {
    starInfo: {
      isLiked: boolean;
    },
  };
};

export interface ICreateCollectionParams {
  collectionName: string;
};
export interface ICreateCollectionReturns extends IGlobalStaticServiceReturns {
  info: {
    collectionInfo: IStaticCollectionItem,
  };
};

export interface ISaveToCollectionParams {
  collectionId: string;
  articleId: string;
};
export interface ISaveToCollectionReturns extends IGlobalStaticServiceReturns {
  info: {
    collectionInfo: IStaticCollectionItem,
  };
};

export interface IGetCollectionListParams {
  userId?: string;
};
export interface IGetCollectionListReturns extends IGlobalStaticServiceReturns {
  info: {
    collectionInfo: IStaticCollectionItem[],
  };
};

export interface IGetCommentUserInfoParams {
  isReply: boolean;
  commentId: string;
};
export interface IGetCommentUserInfoReturns extends IGlobalStaticServiceReturns {
  info: {
    userInfo: {
      _id: string,
      username: string,
      useravatar: string,
      articlesCount: number,
      followersCount: number,
      isFollowed: boolean,
    },
  };
};
export interface ICommentUserFollowParams {
  follower: string;
};
export interface ICommentUserFollowReturns extends IGlobalStaticServiceReturns {
  info: {
    followInfo: {
      isFollowed: boolean,
    },
  };
};

export interface IGetMoreCommentsParams {
  articleId: string;
  lastCommentId: string;
  commentPageSize: number;
  replyPageSize: number;
};
export interface IGetMoreCommentsReturns extends IGlobalStaticServiceReturns {
  info: {
    commentsInfo: {
      comments: IStaticArticleInfoCommentsOptions[],
      hasMore: boolean,
    },
  };
};

export interface IGetMoreReplysParams {
  commentId: string;
  lastReplyId: string;
  replyPageSize: number;
};
export interface IGetMoreReplysReturns extends IGlobalStaticServiceReturns {
  info: {
    replysInfo: {
      replys: IStaticArticleInfoCommentsReplysOptions[],
      hasMore: boolean,
    },
  };
};

export interface IGetMoreRelatedArticlesParams {
  articleId: string;
  page: number;
  pageSize: number;
};
export interface IGetMoreRelatedArticlesReturns extends IGlobalStaticServiceReturns {
  info: {
    relatedArticlesInfo: {
      articles: IStaticArticleInfoRelatedArticlesOptions[],
      hasMore: boolean,
    },
  };
};



/**
 * 获取文章数据
 * @param articleid 文章id
 * @param callback 回调函数
 */
export function serviceHandleGetOneArticleInfo(
  payload: IGetOneArticleInfoParams,
  callback: (res: IGetOneArticleReturns) => void,
): void {
  query({
    method: 'GET',
    url: '/api/details',
    data: {
      ...payload,
      userId: localStorage.getItem('userid'),
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
  v: ISendCommentParams,
  callback?: (res: ISendCommentReturns) => void,
): void {
  query({
    method: 'POST',
    url: '/api/details/comment/create',
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
  v: ISendReplyParams,
  callback?: (res: ISendReplyReturns) => void,
): void {
  query({
    method: 'POST',
    url: '/api/details/reply/create',
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
  payload: IFixedControlBarStarParams,
  callback?: (res: IFixedControlBarStarReturns) => void,
): void {
  query({
    method: 'GET',
    url: '/api/details/star',
    data: {
      articleid: payload.articleId,
      liked: payload.liked,
      userid: localStorage.getItem('userid'),
    },
    jsonp: false,
  }).then((res) => {
    callback && callback(res);
  });
}


/**
 * 文章详情 => 创建新的收藏夹
 * @param collection 收藏夹名称
 */
export function serviceHandleCreateCollection(
  payload: ICreateCollectionParams,
  callback?: (res: ICreateCollectionReturns) => void,
): void {
  query({
    url: '/api/details/collection/create',
    method: 'GET',
    jsonp: false,
    data: {
      collection: payload.collectionName,
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
  payload: ISaveToCollectionParams,
  callback?: (res: ISaveToCollectionReturns) => void,
): void {
  query({
    method: 'POST',
    url: '/api/details/collection/save',
    jsonp: false,
    data: {
      userid: localStorage.getItem('userid'),
      articleId: payload.articleId,
      collectionId: payload.collectionId,
    },
  }).then((res) => {
    callback && callback(res);
  });
}


/**
 * 文章详情 -> 控制栏 -> 获取用户收藏夹信息
 */
export function serviceHandleGetCollectionList(
  payload: IGetCollectionListParams,
  callback?: (res: IGetCollectionListReturns) => void,
): void {
  query({
    method: 'GET',
    url: '/api/details/collection/info',
    jsonp: false,
    data: {
      userId: payload.userId
        ? payload.userId
        : localStorage.getItem('userid'),
    },
  }).then((res) => {
    callback && callback(res);
  });
}


/**
 * 文章详情 -> comment -> 头像框hover获取评论者信息
 */
export function serviceHandleGetCommentUserInfo(
  payload: IGetCommentUserInfoParams,
  callback?: (data: IGetCommentUserInfoReturns) => void,
): void {
  query({
    method: 'POST',
    url: '/api/details/comment/user/info',
    jsonp: false,
    data: {
      ...payload,
      userId: localStorage.getItem('userid'),
    },
  }).then((res) => {
    callback && callback(res);
  });
}


/**
 * 文章详情 -> comment -> 头像框点击关注
 */
export function serviceHandleCommentUserFollow(
  payload: ICommentUserFollowParams,
  callback?: (
    data: ICommentUserFollowReturns,
  ) => void,
): void {
  query({
    method: 'POST',
    url: '/api/details/comment/user/follow',
    jsonp: false,
    data: {
      ...payload,
      actioner: localStorage.getItem('userid'),
    },
  }).then((res) => {
    callback && callback(res);
  });
}


/**
 * 文章详情 -> comment -> 评论获取加载更多
 */
export function serviceHandleGetMoreComments(
  payload: IGetMoreCommentsParams,
  callback?: (
    data: IGetMoreCommentsReturns,
  ) => void,
): void {
  query({
    method: 'GET',
    url: '/api/details/comment/info',
    jsonp: false,
    data: {
      ...payload,
      userId: localStorage.getItem('userid'),
    },
  }).then((res) => {
    callback && callback(res);
  });
}


/**
 * 文章详情 -> reply -> 回复获取加载更多
 */
export function serviceHandleGetMoreReplys(
  payload: IGetMoreReplysParams,
  callback?: (
    data: IGetMoreReplysReturns,
  ) => void,
): void {
  query({
    method: 'GET',
    url: '/api/details/reply/info',
    jsonp: false,
    data: {
      ...payload,
      userId: localStorage.getItem('userid'),
    },
  }).then((res) => {
    callback && callback(res);
  });
}


/**
 * 文章详情 -> related -> 推荐文章加载更多
 */
export function serviceHandleGetMoreRelatedArticles(
  payload: IGetMoreRelatedArticlesParams,
  callback?: (
    data: IGetMoreRelatedArticlesReturns,
  ) => void,
): void {
  query({
    jsonp: false,
    method: 'GET',
    url: '/api/details/related/more',
    data: {
      ...payload,
      userId: localStorage.getItem('userid'),
    },
  }).then((res) => {
    callback && callback(res);
  });
}