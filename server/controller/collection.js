const koa = require('koa');
const Router = require('koa-router');

const {
  User, 
  Posts, 
  changeId, 
  Comments, 
  Replys,
  Collections,
} = require('../model/model');
const { formatPath, isArray } = require('../utils/utils');

const collection = new Router();



/**
 * 收藏页 => 获取收藏夹信息
 */
collection.get('/getinfo', async (ctx, next) => {
  
  const { 
    collectionId, 
    userid,
  } = await ctx.request.query;

  const getCollectionInfo = await Collections
    .findById(
      changeId(collectionId),
      { '__v': 0 },
      { lean: true },
    )
    .populate({
      path: 'articles',
      populate: {
        path: 'author',
        options: {
          select: {
            _id: '_id',
            username: 'username',
            useravatar: 'useravatar',
          },
        },
      },
    })

  // 格式化图片路径
  const formatAvatarPath = getCollectionInfo.articles
    .map((item) => {
      return item && {
        ...item,
        author: {
          ...item.author,
          useravatar: formatPath(
            item.author.useravatar,
          ),
        },
      };
    });

   
  ctx.body = {
    code: 0,
    message: 'Success!',
    collectionInfo: {
      ...getCollectionInfo,
      articles: formatAvatarPath,
    },
  };

});


module.exports = collection;
