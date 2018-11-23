import { Dispatch } from "redux";
import { query } from "src/services/request";


export interface IInitialState {
  editorImageInfo: object,
};

const initialState: IInitialState = {
  editorImageInfo: {},
};


export const SAVE_EDITOR_IMAGE: string = 'SAVE_EDITOR_IMAGE';


export function saveEditorImage(
  data: object,
): { type: string, payload: object } {
  return {
    type: SAVE_EDITOR_IMAGE,
    payload: data,
  };
}


export function WriteReducer(
  state: IInitialState = initialState,
  action: { type: string, payload: any },
) {
  switch (action.type) {
    case SAVE_EDITOR_IMAGE:
      return {
        ...state,
        editorImageInfo: {
          ...state.editorImageInfo,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}


/**
 * 获取七牛云token
 * @param record 参数
 * @param callback 回调
 */
export function reduxHandleGetQiniuToken(
  record: { userid: string },
  callback: () => void,
) {
  return (dispatch: Dispatch) => {
    query({
      url: '/upload/get_qiniu_token',
      method: 'GET',
      data: {
        userid: record.userid,
      },
      jsonp: false,
    })
      .then((res) => {
        dispatch(saveEditorImage(res.data));
        callback && callback();
      });
  }
}