import * as Router from 'koa-router';

import {
  User,
} from '../../../model/model';

const collectionInfo: Router = new Router();


/**
 * 文章详情 -> 控制栏 -> 获取收藏夹信息
 */
collectionInfo.get('/', async (
  ctx,
) => {
  const {
    userId,
  } = await ctx.request.query;

  const collectionList = await User
    .findById(
      userId,
      'collections',
    )
    .populate([{
      path: 'collections',
      select: ['name'],
    }])
    .lean();

  ctx.body = {
    code: 0,
    message: 'Success!',
    info: {
      collectionInfo: collectionList.collections,
    },
  };
});

export default collectionInfo;