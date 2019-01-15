import * as Router from 'koa-router';

import {
  User,
  changeId,
  Collections,
} from '../../../model/model';

const collectionInfo: Router = new Router();


/**
 * 获取收藏夹列表
 */
collectionInfo.get('/list', async (
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

/**
 * 获取单个收藏夹信息
 */
collectionInfo.get('/single', async (ctx) => {

  const {
    collectionId,
  } = await ctx.request.query;

  const getCollectionInfo = await Collections
    .findById(
      changeId(collectionId),
      `name create_time articles`,
    )
    .populate({
      path: 'articles',
      select: ['create_time', 'type', 'tag', 'title', 'star', 'img', 'author'],
      populate: {
        path: 'author',
        select: ['username'],
      },

    })
    .lean();

  ctx.body = {
    code: 0,
    message: 'Success!',
    info: {
      collectionInfo: getCollectionInfo,
    },
  };
});


export default collectionInfo;