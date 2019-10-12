import * as Router from 'koa-router';

import {
  User,
} from '../../../../../model/model';
import { FILTER_SENSITIVE } from '../../../../../constants/constants';


const userInfoPartialCollectionController = new Router();


/**
 * [获取] 根据类型, 获取用户的收藏夹列表
 */
userInfoPartialCollectionController.get('/list_by_type', async (ctx) => {
  interface IRequestParams {
    ownerId: string;
    collectionType: string;
  };

  const {
    ownerId,
    collectionType,
  } = ctx.request.query as IRequestParams;

  try {
    // ? 用户的收藏夹列表
    let foundUserCollectionList: any[] = [];

    // ? 查询用户信息
    const foundUserInfo = await User
      .findById(ownerId, { ...FILTER_SENSITIVE })
      .populate([
        {
          path: 'collections.article',
          populate: [
            {
              path: 'author',
              select: {
                ...FILTER_SENSITIVE,
              },
            },
          ],
        },
      ]);

    if (foundUserInfo) {
      foundUserCollectionList = await foundUserInfo.collections[collectionType];
    }

    ctx.body = {
      code: 0,
      message: 'Success!',
      data: {
        collectionList: foundUserCollectionList,
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

export default userInfoPartialCollectionController;