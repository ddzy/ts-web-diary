import * as Router from 'koa-router';

import {
  changeId,
  Collections,
} from '../model/model';

const collectionController: Router = new Router();


/**
 * 收藏页 => 获取收藏夹信息
 */
collectionController.get('/getinfo', async (ctx, next) => {

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


/**
 * 收藏页 => 删除收藏夹文章
 */
collectionController.get('/article/delete', async (ctx, next) => {

  const {
    articleId,
    collectionId,
  } = await ctx.request.query;

  await Collections
    .findByIdAndUpdate(
      changeId(collectionId),
      {
        '$pull': { articles: articleId },
      },
      { new: true },
    )
    .lean();

  ctx.body = {
    code: 0,
    message: 'Success!',
    info: {
      collectionInfo: {
        collectionId,
        articleId,
      },
    },
  };

});


export default collectionController;
