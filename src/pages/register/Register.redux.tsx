import { query } from '../../services/request';
import { 
  AUTH_SUCCESS,
  AUTH_FAILED,
  authSuccess,
  authFailed,
} from '../login/Login.redux';
import { ThunkDispatch } from 'redux-thunk';


export interface IInitialState {
  message: string;
  isAuth: boolean;
};


const initialState: IInitialState = {
  isAuth: false,
  message: '',
};


export function RegisterReducer(
  state: IInitialState = initialState,
  action: { type: string, payload: any },
) {
  switch(action.type) {
    case AUTH_SUCCESS: {
      return {
        ...state,
        message: action.payload.message,
        isAuth: true,
      };
    }
    case AUTH_FAILED: {
      return {
        ...state,
        message: action.payload.message,
        isAuth: false,
      };
    }
    default: {
      return state;
    }
      
  }
}


export function reduxHandleRegister(
  data: any, 
  callback: () => void
) {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    query({ url: '/api/register', method: 'POST', data, jsonp: false })
      .then((res) => {
        res.code === 0
          ? dispatch(authSuccess(res)) && callback()
          : dispatch(authFailed(res)) && callback();
      })
  };
}
