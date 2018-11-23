import { ThunkDispatch } from "redux-thunk";

import { query } from "../../services/request";


export interface IInitialState {
  userid: string;
  username: string;
  message: string;
};


const initialState: IInitialState = {
  userid: '',
  username: '',
  message: '',
};


export const AUTH_SUCCESS = 'AUTH_SUCCESS' as string;
export const AUTH_FAILED = 'AUTH_FAILED' as string;


// 验证成功
export const authSuccess = (data: any): { type: string, payload: any } => {
  return {
    type: AUTH_SUCCESS,
    payload: data,
  };
};

// 验证失败
export const authFailed = (data: any): { type: string, payload: any } => {
  return {
    type: AUTH_FAILED,
    payload: data,
  };
};


export function LoginReducer(
  state: IInitialState = initialState,
  action: { type: string, payload: any },
) {
  switch(action.type) {
    case AUTH_SUCCESS: {
      return {
        ...state,
        userid: action.payload.userid,
        username: action.payload.username,
        message: action.payload.message,
      };
    }
    case AUTH_FAILED: {
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


/**
 * 登录
 * @param data 用户名 & 密码
 */
export function reduxHandleLogin(data: IInitialState, callback: () => void) {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    query({ url: '/api/login', method: 'POST', data, jsonp: false })
      .then((res) => {
        
        if(res.code === 0) {
          dispatch(authSuccess(res));
          localStorage.setItem('token', res.token);
          localStorage.setItem('userid', res.userid);
          callback();
        }else {
          dispatch(authFailed(res));
          callback();
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
}




