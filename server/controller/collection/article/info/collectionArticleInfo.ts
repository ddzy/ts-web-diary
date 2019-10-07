import * as Router from 'koa-router';

import {
  User,
} from '../../../../model/model';


const collectionArticleInfoController = new Router();


/**
 * [处理] 分页获取收藏夹列表
 */
collectionArticleInfoController.post('/list', async (ctx) => {
  interface IRequestParams {
    userId: string;
    page: number;
    pageSize: number;
  };

  const {
    userId,
    page,
    pageSize,
  } = ctx.request.body as IRequestParams;

  try {
    // ? 查询用户信息
    const foundUserInfo = await User
      .findById(userId, 'collections.article')
      .populate([{
        path: 'collections.article',
        options: {
          limit: pageSize,
          skip: (page - 1) * pageSize,
        },
      }])
      .lean();

    // ? 获取收藏夹列表
    const foundCollectionList = await foundUserInfo.collections.article;

    ctx.body = {
      code: 0,
      message: 'Success!',
      data: {
        collectionList: foundCollectionList,
      },
    };
  } catch (error) {
    ctx.body = {
      code: -1,
      message: '后端出错, 请稍后重试!',
      data: error,
    };
  }
});

export default collectionArticleInfoController