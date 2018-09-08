import { ThunkDispatch } from "redux-thunk";
import { query } from "../../services/request";

export interface IInitialState {
  collectionInfo: any;
};

const initailState: IInitialState = {
  collectionInfo: {},
};


export const SAVE_COLLECTION_INFO = 'SAVE_COLLECTION_INFO' as string;



export function saveCollectionInfo(
  data: any
): { type: string, payload: any } {
  return {
    type: SAVE_COLLECTION_INFO,
    payload: data,
  };
}



export function CollectionReducer(
  state: IInitialState = initailState,
  action: { type: string, payload: any },
) {
  switch(action.type) {
    case SAVE_COLLECTION_INFO: {
      return {
        ...state,
        collectionInfo: {
          ...state.collectionInfo,
        },
      };
    }
    default: {
      return state;
    }
  }
}



/**
 * 获取收藏夹信息
 * @param collectionId 我的收藏夹id
 */
export function reduxHandleGetCollectionInfo(
  collectionId: string,
  callback?: () => void,
) {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    query({
      method: 'GET',
      url: '/collection/getinfo',
      jsonp: false,
      data: {
        userid: localStorage.getItem('userid'),
        collectionId,
      },
    }).then((res) => {
      console.log(res);
    });
  };
}