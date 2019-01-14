import * as Router from 'koa-router';

import {
  Posts,
} from '../../../model/model';

const pageHomeController: Router = new Router();


/**
 * 首页 -> 获取首屏信息
 */
pageHomeController.get('/info', async (ctx) => {
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


export default pageHomeController;