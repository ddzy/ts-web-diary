import { ThunkDispatch } from "redux-thunk";
import { query } from "src/services/request";
// import { query } from "src/services/request";

interface IActionStaticOptions<T> {
  type: string,
  payload: T
};

export interface IInitialState {
  topSearchArticles: any[];
};


const initialState: IInitialState = {
  topSearchArticles: [],
};


const SAVE_HOT_SEARCH_ARTICLES: string = 'SAVE_HOT_SEARCH_ARTICLES';


// function saveHotSearchArticles<T>(
//   data: T,
// ): ActionStaticOptions<T> {
//   return {
//     type: SAVE_HOT_SEARCH_ARTICLES,
//     payload: data,
//   };
// }


export function HeaderReducer(
  state: IInitialState = initialState,
  action: IActionStaticOptions<any>,
) {
  switch (action.type) {
    case SAVE_HOT_SEARCH_ARTICLES:
      return {
        topSearchArticles: action.payload.data,
      };
    default:
      return state;
  }
}


/**
 * 获取热搜
 */
export function reduxHandleGetHotSearchArticles() {
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    console.log(localStorage.getItem('userid'));
  }
}

/**
 * 获取用户搜索
 * @param v 查找的文章
 */
export function reduxHandleGetUserSearchArticles(
  keyword: string,
) {
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    query({
      method: 'GET',
      data: {
        keyword,
        userId: localStorage.getItem('userid'),
      },
      jsonp: false,
      url: '/api/article/search/input/list',
    }).then((res) => {
      console.log(res.data);
    });
  }
}
