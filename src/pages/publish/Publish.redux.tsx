import { ThunkDispatch } from "redux-thunk";
import { query } from "../../services/request";

export interface IInitialState {
  message: string;             
};


const initialState: IInitialState = {
  message: '',
};


export const SAVE_ARTICLE_ID = 'SAVE_ARTICLE_ID' as string;


export function saveArticleInfo(data: any): { type: string, payload: any } {
  return {
    type: SAVE_ARTICLE_ID,
    payload: data,
  };
}


export function PublishReducer(
  state: IInitialState = initialState,
  action: { type: string, payload: any },
) {
  switch(action.type) {
    case SAVE_ARTICLE_ID: {
      return {
        ...state,
        message: action.payload.message,
      };
    }
    default: {
      return state;
    }
  }
}



export function reduxHandleSendArticle(
  data: any, 
  callback: () => void
) {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    query({ 
      url: '/api/write/insert', 
      method: 'POST', 
      data: { ...data, userid: localStorage.getItem('userid') }, jsonp: false 
    })
      .then((res) => {
        dispatch(saveArticleInfo(res));
        callback();
      }).catch((err) => {
        throw new Error(err);
      });
  };
}