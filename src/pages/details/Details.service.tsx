import { query } from "src/services/request";


export interface IServiceState {
  articleInfo: IStaticArticleInfoOptions;
};
export interface IStaticArticleInfoOptions {
  author: string,
  articleContent: string,
  articleTitle: string,
  articleCount: number,
  authorAvatar: string,
  create_time: number,
  mode: string,
  newArticle: IStaticArticleInfoNewArticleOptions[],
  tag: string,
  type: string,
  watchCount: number,
  img: string,
  isLiked: boolean,
  comments: IStaticArticleInfoCommentsOptions[],
};
export interface IStaticArticleInfoNewArticleOptions {
  title: string;
  _id: string;
};
export interface IStaticArticleInfoCommentsOptions {
  article: string;
  create_time: number | string;
  from: {
    username: string,
    _id: string,
    useravatar: string,
  };
  replys: IStaticArticleInfoCommentsReplysOptions[];
  value: string;
  _id: string;
};
export interface IStaticArticleInfoCommentsReplysOptions {
  article: string;
  comment: string;
  create_time: string | number;
  from: {
    username: string,
    useravatar: string,
    _id: string,
  };
  to: {
    _id: string,
    username: string,
    useravatar: string,
  };
  value: string;
  _id: string;
};


interface IGetOneArticleInfoParams {
  articleId: string;
};
interface IGetOneArticleReturns {
  code: 0;
  message: string;
  info: IServiceState;
}

interface ISendCommentParams {
  value: string;
  articleId: string;
  from: string;
};
interface ISendCommentReturns {
  code: number;
  message: string;
  info: {
    commentInfo: IStaticArticleInfoCommentsOptions,
  };
};

interface ISendReplyParams {
  commentId: string;
  value: string;
  from: string;
  to: string;
  articleId: string;
};
interface ISendReplyReturns {
  code: number;
  message: string;
  info: {
    replyInfo: IStaticArticleInfoCommentsReplysOptions,
  };
};

interface IFixedControlBarStarParams {
  articleId: string;
  liked: boolean;
};
interface IFixedControlBarStarReturns {
  code: number;
  message: string;
  info: {
    starInfo: {
      isLiked: boolean;
    },
  };
};

interface ICreateCollectionParams {
  collectionName: string;
};
interface ICreateCollectionReturns {
  code: number;
  message: string;
  info: {
    collectionInfo: {
      name: string,
      _id: string,
    },
  };
};

interface ISaveToCollectionParams {
  collectionId: string;
  articleId: string;
};
interface ISaveToCollectionReturns {
  code: number;
  message: string;
  info: {
    collectionInfo: {
      name: string,
      _id: string,
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
) {
  query({
    method: 'GET',
    url: '/api/details',
    data: {
      articleid: payload.articleId,
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
  v: ISendCommentParams,
  callback?: (res: ISendCommentReturns) => void,
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
  v: ISendReplyParams,
  callback?: (res: ISendReplyReturns) => void,
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
  payload: IFixedControlBarStarParams,
  callback?: (res: IFixedControlBarStarReturns) => void,
) {
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
) {
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
) {
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
