import { query } from "../../services/request";
import { ThunkDispatch } from "redux-thunk";

export interface IInitialState {
  detailsInfo: {        // 文章详情页数据
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
  },
};


const initialState: IInitialState = {
  detailsInfo: {
    author: '',
    articleContent: '',
    articleTitle: '',
    articleCount: 0,
    authorAvatar: '',
    create_time: 0,
    mode: '',
    newArticle: [],
    tag: '',
    type: '',
    watchCount: 0,
    isLiked: false,
    img: '',
    comments: [],

    collections: [],

    collectionName: '',
  },
};


export const SAVE_DETAILS_INFO = 'SAVE_DETAILS_INFO' as string;
export const SAVE_COMMENTS_LIST = 'SAVE_COMMENTS_LIST' as string;
export const SAVE_REPLYS_LIST = 'SAVE_REPLYS_LIST' as string;
export const SAVE_COLLECTION = 'SAVE_COLLECTION' as string;
export const SAVE_COLLECTION_NAME = 'SAVE_COLLECTION_NAME' as string;


export function saveDetailsInfo(
  data: any,
): { type: string, payload: any } {
  return {
    type: SAVE_DETAILS_INFO,
    payload: data,
  };
}

export function saveCommentsList(
  data: any,
): { type: string, payload: any } {
  return {
    type: SAVE_COMMENTS_LIST,
    payload: data,
  };
}

export function saveReplysList(
  data: any
): { type: string, payload: any } {
  return {
    type: SAVE_REPLYS_LIST,
    payload: data,
  };
}

export function saveCollection(
  data: any,
): { type: string, payload: any } {
  return {
    type: SAVE_COLLECTION,
    payload: data,
  };
}

export function saveCollectionName(
  data: any,
): { type: string, payload: any } {
  return {
    type: SAVE_COLLECTION_NAME,
    payload: data,
  };
}



export function DetailsReducer(
  state: IInitialState = initialState,
  action: { type: string, payload: any },
) {

  switch(action.type) {
    case SAVE_DETAILS_INFO: {
      return {
        ...state,
        detailsInfo: {
          ...state.detailsInfo,
          ...action.payload.result,
        },
      };
    }
    case SAVE_COMMENTS_LIST: {
      return {
        ...state,
        detailsInfo: {
          ...state.detailsInfo,
          comments: [
            action.payload.comment,
            ...state.detailsInfo.comments,
          ]
        },
      };
    }
    case SAVE_REPLYS_LIST: {
      return {
        ...state,
        detailsInfo: {
          ...state.detailsInfo,
          comments: state.detailsInfo.comments.map((item) => {
            if(
              item._id === action.payload.reply.comment
            ) {
              return {
                ...item,
                replys: [
                  action.payload.reply,
                  ...item.replys,
                ],
              };
            }
            return item;
          }),
        },
      };
    }
    case SAVE_COLLECTION: {
      return {
        ...state,
        detailsInfo: {
          ...state.detailsInfo,
          collections: state.detailsInfo.collections.concat(
            action.payload.collection
          ),
        },
      };
    }
    case SAVE_COLLECTION_NAME: {
      return {
        ...state,
        detailsInfo: {
          ...state.detailsInfo,
          collectionName: action.payload.collectionName,
        },
      };
    }
    default: {
      return state;
    }
  }
}


/**
 * 获取文章数据
 * @param articleid 文章id
 * @param callback 回调函数
 */
export function getOneArticleInfo(
  articleid: string,
  callback: () => void,
) {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    query({
      method: 'GET',
      url: '/api/details',
      data: {
        articleid,
        userid: localStorage.getItem('userid'),
      },
      jsonp: false,
    }).then((res) => {
      dispatch(saveDetailsInfo(res));
      callback();
    });
  };
}


/**
 * 发表评论
 * @param articleid 文章id
 * @param commentValue 评论内容
 * @param callback 回调函数
 */
export function reduxHandleSendComment(
  articleid: string,
  commentValue: string,
  callback?: () => void,
) {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    query({
      method: 'POST',
      url: '/api/details/comment',
      jsonp: false,
      data: {
        userid: localStorage.getItem('userid') || '',
        articleid,
        commentValue,
      },
    })
      .then((res) => {
        dispatch(saveCommentsList(res));
        callback && callback();
      });
  };
}


/**
 * 发表回复
 * @param commentid 回复id
 * @param replyValue 回复内容
 * @param articleid 文章id
 * @param callback 回调函数
 */
// export function reduxHandleSendReply(
//   commentid: string,
//   replyValue: string,
//   articleid: string,
//   callback: () => void,
// ) {
//   return (dispatch: ThunkDispatch<any, any, any>) => {
//     query({
//       method: 'POST',
//       url: '/api/details/reply',
//       jsonp: false,
//       data: {
//         commentid,
//         replyValue,
//         articleid,
//         userid: localStorage.getItem('userid'),
//       },
//     }).then((res) => {
//       dispatch(saveReplysList(res));
//       callback();
//     });
//   };
// }



/**
 * !!!! 重构 sendReply
 */
export function reduxHandleSendReply(
  v: any,
  callback?: () => void,
) {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    query({
      method: 'POST',
      url: '/api/details/reply',
      jsonp: false,
      data: {
        ...v,
        userId: localStorage.getItem('userid'),
      },
    }).then((res) => {
      console.log(res);
    });
  };
}



/**
 * 文章详情 => 点赞文章
 * @param articleid 文章id
 * @param liked 点赞or取消
 * @param callback 回调函数
 */
export function reduxHandleFixedControlBarStar(
  articleid: string,
  liked: boolean,
  callback?: () => void,
) {
  return (dispatch: ThunkDispatch<any, any, any>): void => {
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
      res.code === 0
        && callback
        && callback();
    });
  }
}



/**
 * 文章详情 => 创建新的收藏夹
 * @param collection 收藏夹名称
 */
export function reduxHandleCreateCollection(
  collection: string,
  callback?: () => void,
) {
  return (dispatch: ThunkDispatch<any, any, any>) => {
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
        dispatch(saveCollection(res));

        callback && callback();
      });
  };
}



/**
 * 文章详情 => 确认添加至收藏夹
 * @param articleId 文章id
 * @param collectionId 收藏夹id
 */
export function reduxHandleSaveToCollection(
  articleId: string,
  collectionId: string,
  callback?: () => void,
) {
  return (dispatch: ThunkDispatch<any, any, any>) => {
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
      dispatch(saveCollectionName(res));
      callback && callback();
    });
  };
}