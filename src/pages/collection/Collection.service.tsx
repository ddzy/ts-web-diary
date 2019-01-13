import { query } from "services/request";
import {
  IGlobalStaticServiceReturns,
} from 'service';


export interface IServiceState {
  collectionInfo: {
    _id: string,
    name: string,
    create_time: string | number,
    articles: IStaticArticlesOptions[],
  };
};
export interface IStaticArticlesOptions {
  _id: string;
  create_time: string | number;
  type: string;
  tag: string;
  title: string;
  star: number;
  img: string;
  author: {
    _id: string,
    username: string,
  };
};


interface IGetCollectionInfoParams {
  collectionId: string;
};
interface IGetCollectionInfoReturns extends IGlobalStaticServiceReturns {
  info: IServiceState;
};

interface IDeleteCollectionArticleParams {
  articleId: string;
  collectionId: string;
};
interface IDeleteCollectionArticleReturns extends IGlobalStaticServiceReturns {
  info: {
    collectionInfo: {
      collectionId: string,
      articleId: string,
    },
  };
};



/**
 * 获取收藏夹信息
 * @param collectionId 我的收藏夹id
 */
export function serviceHandleGetCollectionInfo(
  payload: IGetCollectionInfoParams,
  callback?: (data: IGetCollectionInfoReturns) => void,
) {
  query({
    method: 'GET',
    url: '/api/collection/getinfo',
    jsonp: false,
    data: {
      userid: localStorage.getItem('userid'),
      collectionId: payload.collectionId,
    },
  }).then((res) => {
    callback && callback(res);
  });
}

/**
 * 删除我的收藏夹文章
 * @param articleId 删除的文章id
 * @param collectionId 收藏夹id
 * @param callback 回调
 */
export function serviceHandleDeleteCollectionArticle(
  payload: IDeleteCollectionArticleParams,
  callback?: (data: IDeleteCollectionArticleReturns) => void,
) {
  query({
    url: '/api/collection/article/delete',
    method: 'GET',
    jsonp: false,
    data: {
      userid: localStorage.getItem('userid'),
      ...payload,
    },
  }).then((res) => {
    callback && callback(res);
  })
}