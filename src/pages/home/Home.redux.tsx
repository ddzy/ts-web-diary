import { ThunkDispatch } from "redux-thunk";
// import { query } from "../../services/request";

export interface IInitialState {
  articleList: any[];   // 首页新闻列表
};


const initialState: IInitialState = {
  articleList: [],
};


export const SAVE_ARTICLE_LIST = 'SAVE_ARTICLE_LIST' as string;


export function saveList(data: any): { type: string, payload: any } {
  return {
    type: SAVE_ARTICLE_LIST,
    payload: data,
  };
}


export function HomeReducer(
  state: IInitialState = initialState,
  action: { type: string, payload: any },
) {
  switch(action.type) {
    case SAVE_ARTICLE_LIST: {
      return {
        ...state,
        articleList: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}


// 获取首页文章列表
export function getHomeArticleList() {
  return (dispatch: ThunkDispatch<any, any, any>): void => {
    console.log();
  };
}