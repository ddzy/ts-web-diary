import { ThunkDispatch } from "redux-thunk";
import { query } from "../../services/request";

export interface IInitialState {
  article_list: object[];   // 发布的文章列表
  targetUser: string;       // 点赞的对象
  hasMore: boolean;         // 是否有更多文章
};


const initialState: IInitialState = {
  article_list: [],
  hasMore: false,
  targetUser: '',
};


export const SAVE_ARTICLE_LIST = 'SAVE_ARTICLE_LIST';
export const SAVE_TARGET_USER = 'SAVE_TARGET_USER';
export const CONCAT_ARTICLE_LIST = 'JOIN_ARTICLE_LIST';


export function saveArticleList(data: any): { type: string, payload: any } {
  return {
    type: SAVE_ARTICLE_LIST,
    payload: data,
  };
}

export function saveTargetUser(
  data: any
): { type: string, payload: any } {
  return {
    type: SAVE_TARGET_USER,
    payload: data,
  };
}

export function concatArticleList(
  data: any,
): { type: string, payload: any } {
  return {
    type: CONCAT_ARTICLE_LIST,
    payload: data,
  };
}



export function ArticleReducer(
  state: IInitialState = initialState,
  action: { type: string, payload: any },
) {
  switch(action.type) {
    case SAVE_ARTICLE_LIST: {
      return {
        ...state,
        article_list: action.payload.articleList,
        hasMore: action.payload.hasMore,
      };
    }
    case SAVE_TARGET_USER: {
      return {
        ...state,
        targetUser: action.payload.author,
      };
    }
    case CONCAT_ARTICLE_LIST: {
      return {
        ...state,
        hasMore: action.payload.hasMore,
        article_list: state.article_list.concat(
          action.payload.articleList,
        ),
      };
    }
    default: {
      return state;
    }
  }
}


//// 获取文章页 首屏数据
export function getArticleList() {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    query({ 
      url: 'article/list', 
      method: 'GET',
      data: {
        page: 1,
        pageSize: 5,
      }, 
      jsonp: false, 
    }).then((res) => {
      dispatch(saveArticleList(res));
    });
  };
}


//// 处理文章页 点赞
export function reduxHandleStar(
  star: boolean,
  articleid: string,
  callback: () => void,
) {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    query({
      method: 'GET',
      url: '/article/star',
      data: {
        star,
        articleid,
        userid: localStorage.getItem('userid'),
      },
      jsonp: false,
    }).then((res) => {
      dispatch(saveTargetUser(res));
      callback();
    });
  };
}


//// 文章页加载更多
export function handleArticleLoadMore(
  page: number,
  pageSize: number,
  callback: () => void,
) {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    query({
      url: '/article/list',
      method: 'GET',
      jsonp: false,
      data: {
        page,
        pageSize, 
      },
    })
      .then((res) => {
        dispatch(concatArticleList(res));
        callback();
      });
  }
}