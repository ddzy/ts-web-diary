import * as Router from 'koa-router';

import {
  User,
} from '../../../../../model/model';
import { FILTER_SENSITIVE } from '../../../../../constants/constants';


const userInfoPartialArticleController = new Router();

/**
 * [获取] 分页用户的文章列表
 */
userInfoPartialArticleController.post('/list', async (ctx) => {
  interface IRequestParams {
    ownerId: string;
    page: number;
    pageSize: number;
  };

  const {
    ownerId,
    page,
    pageSize,
  } = ctx.request.body as IRequestParams;

  try {
    // ? 查询当前用户信息
    const foundUserInfo = await User
      .findById(
        ownerId,
        { ...FILTER_SENSITIVE },
      )
      .populate([
        {
          path: 'articles',
          populate: [{
            path: 'author',
            select: {
              ...FILTER_SENSITIVE,
            },
          }],
          options: {
            sort: {
              create_time: -1,
            },
            limit: pageSize,
            skip: pageSize * (page - 1),
            lean: true,
          },
        },
      ])
      .lean();

    // ? 获取文章列表
    const foundUserArticleList = await foundUserInfo.articles;

    ctx.body = {
      code: 0,
      message: 'Success!',
      data: {
        articleList: foundUserArticleList,
      },
    };
  } catch (error) {
    ctx.body = {
      code: -1,
      message: '后端发生错误, 请稍后重试!',
      data: error,
    };
  }
});

export default userInfoPartialArticleController;