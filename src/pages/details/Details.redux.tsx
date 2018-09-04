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
    comments: any[],        // 文章评论
    replys: any[],          // 评论回复
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

    comments: [],
    replys: [],
  },
};


export const SAVE_DETAILS_INFO = 'SAVE_DETAILS_INFO' as string;
export const SAVE_COMMENTS_LIST = 'SAVE_COMMENTS_LIST' as string;
export const SAVE_REPLYS_LIST = 'SAVE_REPLYS_LIST' as string;



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
          replys: [
            action.payload.reply,
            ...state.detailsInfo.replys,
          ],
        },
      };
    }
    default: {
      return state;
    }
  }
}



//// 获取文章数据
export function getOneArticleInfo(
  articleid: string,
  callback: () => void,
) {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    query({ 
      method: 'GET', 
      url: '/details',  
      data: {
        articleid,
      },
      jsonp: false,
    }).then((res) => {
      dispatch(saveDetailsInfo(res));
      callback();
    });
  };
}


//// 发表评论
export function reduxHandleSendComment(
  articleid: string,
  commentValue: string,
  callback?: () => void,
) {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    query({
      method: 'POST',
      url: '/details/comment',
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


//// 发表回复
export function reduxHandleSendReply(
  commentid: string,
  replyValue: string,
  callback: () => void,
) {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    query({
      method: 'POST',
      url: '/details/reply',
      jsonp: false,
      data: {
        commentid,
        replyValue,
      },
    }).then((res) => {
      console.log(res);

      callback();
    });
  };
}
