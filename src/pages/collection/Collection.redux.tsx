import { ThunkDispatch } from "redux-thunk";
import { query } from "../../services/request";

export interface IInitialState {
  collectionInfo: any;
};

const initailState: IInitialState = {
  collectionInfo: {},
};


export const SAVE_COLLECTION_INFO = 'SAVE_COLLECTION_INFO' as string;
export const DELETE_COLLECTION_ARTICLE = 'DELETE_COLLECTION_ARTICLE' as string;



export function saveCollectionInfo(
  data: any
): { type: string, payload: any } {
  return {
    type: SAVE_COLLECTION_INFO,
    payload: data,
  };
}

export function deleteCollectionArticle(
  data: any,
): { type: string, payload: any } {
  return {
    type: DELETE_COLLECTION_ARTICLE,
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
          ...action.payload.collectionInfo,
        },
      };
    }
    case DELETE_COLLECTION_ARTICLE: {
      return {
        ...state,
        collectionInfo: {
          ...state.collectionInfo,
          articles: state.collectionInfo.articles
            .filter((item: any) => {
              return item._id !== action.payload.result.articleId;
            }),
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
      url: '/api/collection/getinfo',
      jsonp: false,
      data: {
        userid: localStorage.getItem('userid'),
        collectionId,
      },
    }).then((res) => {
      dispatch(saveCollectionInfo(res));
    });
  };
}


/**
 * 删除我的收藏夹文章
 * @param articleId 删除的文章id
 * @param collectionId 收藏夹id
 * @param callback 回调
 */
export function reduxHandleDeleteCollectionArticle(
  articleId: string,
  collectionId: string,
  callback?: () => void,
) {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    query({
      url: '/api/collection/article/delete',
      method: 'GET',
      jsonp: false,
      data: {
        userid: localStorage.getItem('userid'),
        articleId,
        collectionId,
      },
    }).then((res) => {
      dispatch(deleteCollectionArticle(res));
      callback && callback();
    })
  };
}