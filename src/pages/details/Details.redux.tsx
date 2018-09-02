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
  },
};


export const SAVE_DETAILS_INFO = 'SAVE_DETAILS_INFO' as string;


export function saveDetailsInfo(
  data: any,
): { type: string, payload: any } {
  return {
    type: SAVE_DETAILS_INFO,
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
        detailsInfo: action.payload.result,
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

