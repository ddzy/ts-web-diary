import { ThunkDispatch } from "redux-thunk";
import { query } from "../../services/request";

export interface IInitialState {
  isAuth: boolean;
  username: string;
  usergender: string;
  useravatar: string;
};


const initialState = {
  isAuth: false,      // 用户权限
  username: '',
  usergender: '',
  useravatar: '',
};


export const CHECK_AUTHOR = 'CHECK_AUTHOR' as string;



export function setAuth(data: any): { type: string, payload: any } {
  return {
    type: CHECK_AUTHOR,
    payload: data,
  };
}


export function AuthRouteReducer(
  state: IInitialState = initialState,
  action: { type: string, payload: any },
) {
  switch(action.type) {
    case CHECK_AUTHOR: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
}


export function reduxHandleCheckAuth(callback: () => void) {
  return (dispatch: ThunkDispatch<any, any, any>): void => {
    query({ url: '/api/checkauth', method: 'POST', jsonp: false, data: { userid: localStorage.getItem('userid') } })
      .then((res) => {
        res.code === 0
          && dispatch(setAuth(res));
      })
      .catch((err) => {
        if(err.status === 401) {
          dispatch(setAuth(err.data));
          callback();
        }
      })
  };
}

