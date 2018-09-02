import { ThunkDispatch } from "redux-thunk";
import { query } from "../../services/request";

export interface IInitialState {
  articleInfo: any,     // 编辑的文章信息
};


const initialState: IInitialState = {
  articleInfo: '',
};


export const SAVE_ARTICLE_INFO = 'SAVE_ARTICLE_INFO' as string;


export function setArticleInfo(
  data: any
): { type: string, payload: any } {
  return {
    type: SAVE_ARTICLE_INFO,
    payload: data,
  };
}


export function EditReducer(
  state: IInitialState = initialState,
  action: { type: string, payload: any }
) {
  switch(action.type) {
    case SAVE_ARTICLE_INFO: {
      return {
        ...state,
        articleInfo: action.payload.articleInfo,
      };
    }
    default: {
      return state;
    }
  }
}


//// 获取编辑文章信息
export function getEditArticleInfo(
  articleid: string,
) {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    query({
      method: 'GET',
      url: '/write/geteditinfo',
      data: {
        articleid,
      },
      jsonp: false,
    }).then((res) => {
      dispatch(setArticleInfo(res));
    });
  };
}


//// 提交编辑文章信息
export function sendEditArticleInfo(
  data: any,
  callback: () => void,
) {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    query({
      method: 'POST',
      url: '/write/update',
      data: {
        userid: localStorage.getItem('userid'),
        ...data,
      },
      jsonp: false,
    })
      .then((res) => {
        dispatch(setArticleInfo(res));
        callback();
      }); 
  };
}