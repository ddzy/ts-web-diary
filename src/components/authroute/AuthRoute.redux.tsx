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
export const UPDATE_USER_AVATAR = 'UPDATE_USER_AVATAR' as string;
export const CHECK_AUTHOR_SUCCESS = 'CHECK_AUTHOR_SUCCESS';
export const CHECK_AUTHOR_FAILD = 'CHECK_AUTHOR_FAILD';



export function setAuth(data: any): { type: string, payload: any } {
  return {
    type: CHECK_AUTHOR,
    payload: data,
  };
}

export function setAuthSuccess(
  data: {
    isAuth: boolean,
    userInfo: {
      _id: string,
      username: string,
      useravatar: string,
      usergender: string,
    },
  },
) {
  return {
    type: CHECK_AUTHOR_SUCCESS,
    payload: data,
  };
}

export function setAuthFaild(
  data: {
    isAuth: boolean,
  },
) {
  return {
    type: CHECK_AUTHOR_FAILD,
    payload: data,
  };
}

export function setUserAvatar(
  data: {
    userid: string,
    useravatar: string,
  },
) {
  return {
    type: UPDATE_USER_AVATAR,
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
    };
    case UPDATE_USER_AVATAR: {
      return {
        ...state,
        useravatar: action.payload.useravatar,
      };
    };
    case CHECK_AUTHOR_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        ...action.payload.userInfo,
      };
    };
    case CHECK_AUTHOR_FAILD: {
      return {
        ...state,
        ...action.payload,
      };
    };
    default: {
      return state;
    }
  }
}


/**
 * 每一次路由跳转, 进行的鉴权认证
 * @param callback 回调函数
 */
export function reduxHandleCheckAuth(callback: () => void) {
  return (dispatch: ThunkDispatch<any, any, any>): void => {
    query({
      url: '/api/auth/app',
      method: 'POST',
      jsonp: false,
      data: {
        userId: localStorage.getItem('userid')
      }
    })
      .then((res) => {
        const resCode = res.code;
        const resData = res.data;

        if (resCode === 0) {
          dispatch(setAuthSuccess(resData));
        } else {
          dispatch(setAuthFaild(resData));
        }
      })
      .catch((err) => {
        if(err.status === 401) {
          dispatch(setAuthFaild({
            ...err.data,
            isAuth: false,
          }));
          callback();
        }
      })
  };
}


/**
 * 更新用户头像
 * @param callback 回调函数
 */
export function reduxHandleUpdateUseravatar(
  data: {
    userId: string,
    avatarUrl: string,
  },
  callback?: () => void,
) {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    query({
      url: '/api/user/update/avatar',
      method: 'POST',
      jsonp: false,
      data: {
        ...data,
      },
    }).then((res) => {
      if (res.code === 0) {
        const { userInfo } = res.data;

        dispatch(setUserAvatar(userInfo));

        callback && callback();
      }
    });
  };
}