import { query } from "services/request";


export interface IServiceState {
  articleList: IStaticArticleListOptions[];
};

export interface IStaticArticleListOptions {
  author: {
    username: string,
    _id: string,
  };
  create_time: number,
  description: string,
  img: string,
  star: number,
  title: string,
  _id: string,
  watch: number,
};



export interface IGetHomeInfoParams extends IGetArticleListParams { };
export interface IGetHomeInfoReturns {
  code: number,
  message: string,
  info: {
    articleList: IStaticArticleListOptions[],
  },
};

export interface IGetArticleListParams {
  type: string,
  page: number,
  pageSize: number,
};
export interface IGetArticleListReturns {
  code: number,
  message: string,
  info: {
    articleList: IStaticArticleListOptions[],
    hasMore: boolean,
  },
};


/**
 * 首页 - 首屏数据
 * @param payload 数据
 * @param callback 回调
 */
export function serviceHandleGetHomeInfo(
  payload: IGetHomeInfoParams,
  callback?: (
    data: IGetHomeInfoReturns,
  ) => void,
) {
  query({
    url: '/api/home/info',
    data: payload,
    jsonp: false,
    method: 'GET',
  }).then((res) => {
    callback && callback(res);
  });
}

/**
 * 首页 - 文章 - 加载更多
 */
export function serviceHandleGetArticleList(
  payload: IGetArticleListParams,
  callback?: (
    data: IGetArticleListReturns,
  ) => void,
) {
  query({
    url: '/api/home/article/list',
    method: 'GET',
    data: payload,
    jsonp: false,
  }).then((res) => {
    callback && callback(res);
  });
}