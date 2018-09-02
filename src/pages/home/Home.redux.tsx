import { ThunkDispatch } from "redux-thunk";
import { query } from "../../services/request";

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
    query({
      url: 'http://v.juhe.cn/toutiao/index?type=top&key=00d6adb318f9374e5f14529d101ecae0',
      jsonp: false,
      method: 'GET',  
    }).then((res) => {
      res.result.data && dispatch(saveList(res.result.data.slice(0, 10)));
    }); 
  };
}