const koa = require('koa');
const Router = require('koa-router');
const multer = require('koa-multer');

const { 
  changeId, 
  User, 
  Posts, 
  Collections,
} = require('../model/model');
const { 
  FILTER_SENSITIVE, 
  FILTER_AUTHOR,
} = require('../constants/constants');
const { formatPath, isArray, } = require('../utils/utils');


const me = new Router();



// 自定义本地储存
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './static/images/user');
  },
  filename: (req, file, cb) => {
    const fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
});


//// 个人中心 => 上传头像
me.post(
  '/upload/avatar', 
  new multer({ storage }).single('user_avatar'), 
  async (ctx, next) => {

    const { userid } = ctx.req.body || '';
    const { path } = ctx.req.file;
    
    const result = await User.findByIdAndUpdate(
      changeId(userid),
      { useravatar: path },
      { new: true, select: FILTER_SENSITIVE },
    );

    ctx.body = {
      code: 0,
      useravatar: formatPath(result.useravatar),
    };
  }
);


//// 个人中心 => 获取我的文章分类列表
me.get('/myarticle', async (ctx, next) => {

  const { 
    userid, 
    type,
  } = ctx.request.query;


  const newList = await Posts
    .find({ author: userid })
    .populate('author')
    .sort({ create_time: -1 });

  const myArticleList = await User
    .findById(
      changeId(userid),
      null,
      { lean: true },
    )
    .populate({
      path: 'articles',
      options: { 
        lean: true,
        sort: {
          create_time: -1,
        },
      },
    });

  ctx.body = {
    code: 0,
    message: 'Success!',
    myArticleList: myArticleList.articles.filter((item) => {
      return item 
        && item.type === type; 
    }),
  };
});


//// 个人中心 => 删除我的文章
me.get('/delete', async (ctx, next) => {
  
  const { articleid, userid } = ctx.request.query;

  // 删除指定文章
  const waitDelete = await Posts
    .findByIdAndRemove(changeId(articleid))
    .populate('author', 'username');

  // 返回列表
  const result = await Posts
    .find({ author: changeId(userid) });

  ctx.body = {
    code: 0,
    message: 'Success!',
    title: waitDelete.title,
    myArticleList: result,
  };

});


/**
 * 个人中心 => 获取我的收藏列表
 */
me.get('/collection/getinfo', async (ctx, next) => {
  
  const { userid } = ctx.request.query;

  const getMyCollections = await User
    .findById(
      changeId(userid),
      null,
      {
        select: {
          'collections': 'collections',
        },
      },
    )
    .populate({
      path: 'collections',
    });

  ctx.body = {
    code: 0,
    message: 'Success!',
    my_collection_list: getMyCollections.collections,
  };

});


/**
 * 个人中心 => 删除我的收藏夹
 */
me.get('/collection/delete', async (ctx, next) => {
  
  const { userid, collectionId } = await ctx.request.query;

  const deleteUserResult = await User
    .findByIdAndUpdate(
      changeId(userid),
      {
        '$pull': { collections: collectionId },
      },
      { lean: true, new: true },
    )

  const deleteCollectionsResult = await Collections
    .findByIdAndRemove(
      changeId(collectionId),
      { lean: true, new: true },
    )

  ctx.body = {
    code: 0,
    message: 'Success!',
    collectionId,
  };

});


module.exports = me;