import { ThunkDispatch } from "redux-thunk";
import { query } from "../../services/request";

export interface IInitialState {
  my_article_list: any[];     // 我的文章列表
  delete_article_title: string;   // 删除的文章标题
  my_collection_list: any[],      // 我的收藏列表
};


const initialState = {
  my_article_list: [],
  delete_article_title: '',
  my_collection_list: [],
};


export const SAVE_MY_ARTICLE_LIST = 'SAVE_MY_ARTICLE_LIST' as string;
export const SAVE_DELETE_TITLE = 'SAVE_DELETE_TITLE' as string;
export const SAVE_MY_COLLECTION_LIST = 'SAVE_MY_COLLECTION_LIST' as string;



export function saveMyArticleList(
  data: any
): { type: string, payload: any } 
{
  return {
    type: SAVE_MY_ARTICLE_LIST,
    payload: data,
  };
}

export function saveDeleteTitle(
  data: any
): { type: string, payload: any } 
{
  return {
    type: SAVE_DELETE_TITLE,
    payload: data,
  };  
}

export function saveMyCollectionList(
  data: any
): { type: string, payload: any } {
  return {
    type: SAVE_MY_COLLECTION_LIST,
    payload: data,
  };
}



export function MeReducer(
  state: IInitialState = initialState,
  action: { type: string, payload: any }
) {
  switch(action.type) {
    case SAVE_MY_ARTICLE_LIST: {
      return {
        ...state,
        my_article_list: action.payload.myArticleList,
      };
    }
    case SAVE_DELETE_TITLE: {
      return {
        ...state,
        delete_article_title: action.payload.title,
      };
    }
    case SAVE_MY_COLLECTION_LIST: {
      return {
        ...state,
        my_collection_list: action.payload.my_collection_list,
      };
    }
    default: {
      return state;
    }
  }
}



/**
 * 个人中心 获取我的文章 首屏数据
 */
export function getMyArticleList() {
  return (dispatch: ThunkDispatch<any, any, any>) => {
  
    query({ 
      url: '/me/myarticle', 
      method: 'GET', 
      data: { 
        type: '随笔',
        userid: localStorage.getItem('userid'), 
      }, 
      jsonp: false 
    })
      .then((res) => {
        dispatch(saveMyArticleList(res));
      });
  };
}


/**
 * 个人中心 删除我的文章
 * @param articleid 文章id
 * @param callback 回调函数
 */
export function deleteMyArticle(
  articleid: string,
  callback: (title: string) => void,
) {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    query({
      method: 'GET',
      url: '/me/delete',
      data: {
        articleid,
        userid: localStorage.getItem('userid'),
      },
      jsonp: false,
    }).then((res) => {
      dispatch(saveDeleteTitle(res));
      dispatch(saveMyArticleList(res));
      callback(res.title);
    });
  };
}


/**
 * 个人中心 获取我的文章 分类
 * @param type 我的文章 分类类型
 */
export function reduxHandleGetMyArticle(
  type: string,
) {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    query({ 
      url: '/me/myarticle', 
      method: 'GET', 
      data: { 
        type,
        userid: localStorage.getItem('userid'), 
      }, 
      jsonp: false 
    })
      .then((res) => {
        dispatch(saveMyArticleList(res));
      });  
  };
}


/**
 * 个人中心 获取我的收藏 列表
 */
export function reduxHandleGetMyCollection(
  callback?: () => void,
) {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    query({
      method: 'GET',
      url: '/me/mycollection',
      jsonp: false,
      data: {
        userid: localStorage.getItem('userid'),
      },
    }).then((res) => {
      dispatch(saveMyCollectionList(res));
    });
  };
}