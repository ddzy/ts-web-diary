import * as Router from 'koa-router';

import { Posts } from '../../../model/model';

const articleInfoController: Router = new Router();


/**
 * 首页 -> 获取文章列表 -> 加载更多
 */
articleInfoController.get('/list/more', async (ctx) => {
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




export default articleInfoController;