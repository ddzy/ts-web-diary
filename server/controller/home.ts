import * as Router from 'koa-router';

import { Posts } from './../model/model';


const homeController: Router = new Router();


/**
 * 首页 -> 获取首屏信息
 */
homeController.get('/info', async (ctx) => {
  const {
    type,
    page,
    pageSize,
  } = await ctx.request.query;

  // ** 获取文章列表 **
  const articleList = await Posts
  .find(
    { type: { $regex: type } },
    'author img create_time title description star watch',
  )
  .populate([
    {
      path: 'author',
      select: ['username'],
    }
  ])
  .sort({ create_time: -1 })
  .skip((page - 1) * pageSize)
  .limit(Number(pageSize));


  ctx.body = {
    code: 0,
    message: 'Success!',
    info: {
      articleList,
    },
  };
});


/**
 * 首页 -> 获取文章列表 -> 加载更多
 */
homeController.get('/article/list', async (ctx) => {
  const {
    type,
    page,
    pageSize,
  } = ctx.request.query;

  const articleList = await Posts
    .find(
      { type: { $regex: type } },
      'author img create_time title description star watch',
    )
    .populate([
      {
        path: 'author',
        select: ['username'],
      }
    ])
    .sort({ create_time: -1 })
    .skip((page - 1) * pageSize)
    .limit(Number(pageSize));

  ctx.body = {
    code: 0,
    message: 'Success!',
    info: {
      articleList,
      hasMore: articleList.length !== 0,
    },
  };
});


/**
 * 首页 -> 点赞
 */
homeController.get('/article/star', async (ctx) => {

  const {
    // userid,
    articleid,
    star,
  } = ctx.request.query;

  const getArticle = await Posts.findById(
    articleid,
  );

  const result = await Posts
    .findByIdAndUpdate(
      articleid,
      {
        star: star === 'true'
          ? getArticle.star + 1
          : getArticle.star - 1,
      },
      { new: true },
    )
    .populate('author', 'username');

  ctx.body = {
    code: 0,
    message: 'Success!',
    star: result.star,
    author: result.author.username,
  };
});



export default homeController;